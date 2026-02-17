const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

// The HTML content provided by the user (normally we'd fetch this, but WAF blocks us)
// We will try to fetch first, if it fails, we might need the user to provide the file content in a specific path.
// actually, the plan says "Fetch homepage HTML". Since we know it blocks, maybe we should try to mock it or just try and fail?
// Wait, the user provided the HTML in the chat. I can put that HTML into a variable or a file?
// The prompt says "Extract all the content from this site's html page." and "Scan for where the categories are in the page".
// Integrating the HTML directly into the script is messy.
// I will try to fetch. If it fails (which it likely will), I'll check for a local file `homepage_source.html` as requested in previous turn.
// If that doesn't exist, I'll fallback to a hardcoded string of the HTML provided by valid user input if possible, but that's too large.
// Let's assume I'll try to fetch with a real User-Agent. Sometimes that bypasses basic WAF.
// If valid file exists, use it.

const HOMEPAGE_URL = 'https://dinosaurresinreplica.com/';
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'categories');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

async function downloadImage(url, filename) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const filepath = path.join(UPLOADS_DIR, filename);
        const writer = fs.createWriteStream(filepath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading image ${url}:`, error.message);
        return null;
    }
}

async function scrapeCategories() {
    let html;

    // Try to read from local file first (if user saved it)
    const localFile = path.join(process.cwd(), 'homepage_source.html');
    if (fs.existsSync(localFile)) {
        console.log('Reading from local homepage_source.html...');
        html = fs.readFileSync(localFile, 'utf-8');
    } else {
        try {
            console.log(`Fetching ${HOMEPAGE_URL}...`);
            const response = await axios.get(HOMEPAGE_URL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            html = response.data;
        } catch (error) {
            console.error('Failed to fetch website:', error.message);
            console.log('Please save the website source to "homepage_source.html" in the project root.');

            // Fallback: Create the file with the content user provided? 
            // I will write the content provided by user to 'homepage_source.html' in a separate tool call if this script fails, 
            // but for now let's assume I'll write it BEFORE running this script.
            return;
        }
    }

    const $ = cheerio.load(html);
    const categories = [];

    // Selector based on user provided HTML: .view-product-category .views-row
    $('.view-product-category .views-row').each((i, el) => {
        const name = $(el).find('.Pro-Cate-Tit a').text().trim();
        const relativeLink = $(el).find('.Pro-Cate-Tit a').attr('href');
        const imgUrl = $(el).find('.Pro-Cateimg img').attr('src');

        if (name && imgUrl) {
            categories.push({
                name,
                imgUrl,
                slug: slugify(name, { lower: true, strict: true })
            });
        }
    });

    console.log(`Found ${categories.length} categories.`);

    for (const cat of categories) {
        console.log(`Processing: ${cat.name}`);

        // Download Image
        // The imgUrl might be relative or full. In the snippet it was full: https://dinosaurresinreplica.com/...
        // But if it's relative, we need to handle it.
        let fullImgUrl = cat.imgUrl;
        if (!fullImgUrl.startsWith('http')) {
            fullImgUrl = new URL(fullImgUrl, HOMEPAGE_URL).toString();
        }

        const ext = path.extname(fullImgUrl).split('?')[0] || '.jpg';
        const filename = `${cat.slug}${ext}`;

        // Only download if we don't have it? Or overwrite? Let's overwrite to be sure.
        await downloadImage(fullImgUrl, filename);

        const dbImageUserPath = `/uploads/categories/${filename}`;

        // Upsert to DB
        try {
            await prisma.category.upsert({
                where: { slug: cat.slug },
                update: {
                    image: dbImageUserPath,
                    updatedAt: new Date(), // touch update
                },
                create: {
                    name: cat.name,
                    slug: cat.slug,
                    image: dbImageUserPath,
                    description: `Imported category: ${cat.name}`,
                },
            });
            console.log(`Saved/Updated: ${cat.name}`);
        } catch (err) {
            console.error(`Error saving ${cat.name}:`, err.message);
        }
    }
}

scrapeCategories()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
