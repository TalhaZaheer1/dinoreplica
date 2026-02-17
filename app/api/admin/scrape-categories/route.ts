import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

const HOMEPAGE_URL = 'https://dinosaurresinreplica.com/';
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'categories');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

async function downloadImage(url: string, filename: string) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer', // Use arraybuffer for Next.js API compatibility
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const filepath = path.join(UPLOADS_DIR, filename);
        fs.writeFileSync(filepath, Buffer.from(response.data));
        return true;
    } catch (error: any) {
        console.error(`Error downloading image ${url}:`, error.message);
        return false;
    }
}

export async function POST(request: Request) {
    try {
        let html = '';
        const logs: string[] = [];

        // Try to read from local file first (if user saved it)
        const localFile = path.join(process.cwd(), 'homepage_source.html');
        if (fs.existsSync(localFile)) {
            logs.push('Reading from local homepage_source.html...');
            html = fs.readFileSync(localFile, 'utf-8');
        } else {
            try {
                logs.push(`Fetching ${HOMEPAGE_URL}...`);
                const response = await axios.get(HOMEPAGE_URL, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });
                html = response.data;
            } catch (error: any) {
                logs.push(`Failed to fetch website: ${error.message}`);
                return NextResponse.json({ error: 'Failed to fetch source and no local file found', logs }, { status: 500 });
            }
        }

        const $ = cheerio.load(html);
        const categories: { name: string, imgUrl: string, slug: string }[] = [];

        // Selector based on provided HTML
        $('.view-product-category .views-row').each((i: number, el: any) => {
            const name = $(el).find('.Pro-Cate-Tit a').text().trim();
            const imgUrl = $(el).find('.Pro-Cateimg img').attr('src');

            if (name && imgUrl) {
                categories.push({
                    name,
                    imgUrl,
                    slug: slugify(name, { lower: true, strict: true })
                });
            }
        });

        logs.push(`Found ${categories.length} categories.`);

        let processedCount = 0;

        for (const cat of categories) {
            let fullImgUrl = cat.imgUrl;
            if (!fullImgUrl.startsWith('http')) {
                fullImgUrl = new URL(fullImgUrl, HOMEPAGE_URL).toString();
            }

            const ext = path.extname(fullImgUrl).split('?')[0] || '.jpg';
            const filename = `${cat.slug}${ext}`;

            const downloaded = await downloadImage(fullImgUrl, filename);
            if (downloaded) {
                const dbImageUserPath = `/uploads/categories/${filename}`;

                // Upsert to DB
                try {
                    await prisma.category.upsert({
                        where: { slug: cat.slug },
                        update: {
                            image: dbImageUserPath,
                            updatedAt: new Date(),
                        },
                        create: {
                            name: cat.name,
                            slug: cat.slug,
                            image: dbImageUserPath,
                            description: `Imported category: ${cat.name}`,
                        },
                    });
                    processedCount++;
                } catch (err: any) {
                    logs.push(`Error saving database record for ${cat.name}: ${err.message}`);
                }
            } else {
                logs.push(`Failed to download image for ${cat.name}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${processedCount} categories`,
            totalFound: categories.length,
            logs
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
