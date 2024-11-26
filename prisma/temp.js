const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  //all users
  // const users = await prisma.user.findMany({
  //   include: {
  //       sentMessages:true,
  //       recievedMessages:true,
  //       profile:true
  //   }
  // })
 await prisma.profile.deleteMany({
  })
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