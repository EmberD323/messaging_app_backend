const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function findAllUsers() {
    const users = await prisma.user.findMany({
        include: {
            posts: true,
        }
    })
    return users
}

module.exports = {
    findAllUsers,
}