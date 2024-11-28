const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  //all users
  
 await prisma.message.deleteMany({
  where: {
    authorId:7
    }
  })
  await prisma.message.deleteMany({
    where: {
      receiverId:7
      }
    })

  const users = await prisma.user.findMany({
    include: {
        profile:true
    }
  })
  console.log(users)
  // await prisma.user.deleteMany({
  // })
    
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