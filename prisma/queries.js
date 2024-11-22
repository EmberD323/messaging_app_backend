const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createUser(first_name,last_name,username,password) {
    await prisma.user.create({
        data: {
            first_name,
            last_name,
            username,
            password,
        }})
  
    return 
}
async function findAllUsers() {
    const users = await prisma.user.findMany({
        include: {
            sentMessages:true,
            recievedMessages:true,
            profile:true
        }
    })
    return users
}
async function findUserByUsername(username) {
    const user = await prisma.user.findUnique({
        include: {
            sentMessages:true,
            recievedMessages:true,
            profile:true
        },
        where: {
          username,
        },
    })
    return user
}
async function findUserById(id) {
    const user = await prisma.user.findUnique({
        include: {
            sentMessages:true,
            recievedMessages:true,
            profile:true
        },
        where: {
          id,
        },
    })
    return user
}
async function deleteUser(userid) {
    const user = await prisma.user.delete({
        where: {
          id:userid
        },
    })

    return user
}
async function findAllProfiles() {
    const profiles = await prisma.profile.findMany({
        include: {
            user:true,
        }
    })
    return profiles
}

async function findProfile(profileid) {
    const user = await prisma.profile.findUnique({
        include: {
            user:true
        },
        where: {
          id:profileid,
        },
    })
    return user
}
async function udpateProfile(bio,pictureURL,id) {
    await prisma.post.update({
        where: {
            id,
        },
        data: {
            bio,
            pictureURL,
        }
      })
    return
}
module.exports = {
    createUser,
    findAllUsers,
    findUserByUsername,
    findUserById,
    deleteUser,
    findAllProfiles,
    findProfile,
    udpateProfile
}