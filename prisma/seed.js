const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Create Categories
    const categories = [
        { name: 'Theropods', slug: 'theropods', description: 'Meat-eating dinosaurs' },
        { name: 'Sauropods', slug: 'sauropods', description: 'Long-necked herbivores' },
        { name: 'Skulls', slug: 'skulls', description: 'Replica skulls' },
        { name: 'Skeletons', slug: 'skeletons', description: 'Full skeleton replicas' },
    ]

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
    }

    // Find a category
    const skullCat = await prisma.category.findUnique({ where: { slug: 'skulls' } })

    // Create Products
    if (skullCat) {
        await prisma.product.create({
            data: {
                title: 'T-Rex Skull Replica',
                slug: 't-rex-skull-replica',
                model: 'SKU-TREX-001',
                description: 'Museum quality T-Rex skull replica.',
                price: 4500.00,
                categoryId: skullCat.id,
                isVisible: true
            }
        })

        await prisma.product.create({
            data: {
                title: 'Velociraptor Skull',
                slug: 'velociraptor-skull',
                model: 'SKU-VELO-001',
                description: 'Life size Velociraptor skull.',
                price: 350.00,
                categoryId: skullCat.id,
                isVisible: true
            }
        })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
