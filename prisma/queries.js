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
            receivedMessages:true,
            profile:true
        }
    })
    return users
}
async function findUserByUsername(username) {
    const user = await prisma.user.findUnique({
        include: {
            sentMessages:true,
            receivedMessages:true,
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
            receivedMessages:true,
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

async function findProfile(userId) {
    const user = await prisma.profile.findUnique({
        include: {
            user:true
        },
        where: {
          userId,
        },
    })
    return user
}
async function createProfile(bio,pictureURL,userId) {
    await prisma.profile.create({
        data: {
            bio,
            pictureURL,
            userId
        }
      })
      console.log("done query")
    return
}
async function updateProfile(bio,pictureURL,id) { 
    if(pictureURL == null){
        await prisma.profile.update({
            where: {
                id,
            },
            data: {
                bio,
            }
          })
        return
    }
    await prisma.profile.update({
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
async function deleteProfile(id) {
    await prisma.profile.delete({
        where: {
          id
        },
    })
    return 
}
async function findAllMessages() {
    const messages = await prisma.message.findMany({
        include: {
            author:true,
            receiver:true
        }
    })
    return messages
}
async function findSentMessages(authorId) {
    const messages = await prisma.message.findMany({
        where: {
            authorId,
        },
        include: {
            author: true,
            receiver: {
                include: {
                  profile: true,
                },
              },
        }
    })
    return messages
}
async function findReceivedMessages(receiverId) {
    const messages = await prisma.message.findMany({
        where: {
            receiverId,
        },
        include: {
            receiver: true,
            author: {
                include: {
                  profile: true,
                },
              },
        }
    })
    return messages
}
async function createMessage(text,receiverId,authorId) {
    const message = await prisma.message.createManyAndReturn({
        include: {
            author: true,
            receiver: {
                include: {
                  profile: true,
                },
              },
        },
        data: {
            text,
            authorId,
            receiverId
        }

      })
    return message
}

async function updateMessage(text,id) {
    await prisma.message.update({
        where: {
            id,
        },
        data: {
            text
        }
      })
    return
}
async function deleteMessage(id) {
     await prisma.message.delete({
        where: {
          id
        },
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
    createProfile,
    updateProfile,
    findAllMessages,
    findSentMessages,
    findReceivedMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    deleteProfile
}