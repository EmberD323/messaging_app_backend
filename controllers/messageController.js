const db = require("../prisma/queries.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const validateMessage= [
    body("text").trim()
      .escape()
      .isLength({ min: 1 }).withMessage(`Message must be atleast 1 character long.`),
    
];
// async function Name (req, res) {
//   jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
//       if(err){
//           res.sendStatus(403)
//       }else{
        
//       }   
//   })
// }
async function allMessagesGet (req, res) {
  jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
      if(err){
          res.sendStatus(403)
      }else{
        const messages = await db.findAllMessages();
        res.json(messages);
      }   
  })
}

async function sentMessagesGet (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          console.log(authData)
          const authorid = authData.user.id;
          const messages = await db.findSentMessages(authorid);
          res.json(messages);
        }   
    })
}
async function recievedMessagesGet (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          const recieverid = authData.user.id;
          const messages = await db.findRecievedMessages(recieverid);
          res.json(messages);
        }   
    })
}

newMessageCreate =[
    validateMessage,
    async function (req, res) {
        jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const authorid = authData.user.id;
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array())
                }
                let {text,recieverid} = req.body;
                await db.createMessage(text,recieverid,authorid);
                res.sendStatus(200);
            }
        })
    }
]

messageUpdate =[
    validateMessage,
    async function (req, res) {
        jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const messageid = Number(req.params.messageid);
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array())
                }
                let {text} = req.body;
                await db.updateMessage(text,messageid);
                res.sendStatus(200);
            }
        })
    }
]

async function messageDelete (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const messageid = Number(req.params.messageid);
            const user = await db.findUserById(userid);
            await db.deleteMessage(messageid);
            res.sendStatus(200);
        }   
    })
  }
module.exports = {
    allMessagesGet,
    sentMessagesGet,
    recievedMessagesGet,
    newMessageCreate,
    messageUpdate,
    messageDelete

  
};