const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

    const posts =await prisma.post.findMany()
    console.log(posts)
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