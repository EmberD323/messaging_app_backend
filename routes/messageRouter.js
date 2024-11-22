
const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");


messageRouter.get("/",verifyToken, messageController.allMessagesGet);//done no test
messageRouter.get("/sent",verifyToken, messageController.sentMessagesGet);//done no test
messageRouter.get("/recieved",verifyToken, messageController.recievedMessagesGet);//done no test

messageRouter.post("/",verifyToken, messageController.newMessageCreate);//done no test
messageRouter.put("/:messageid",verifyToken, messageController.messageUpdate);//done no test
messageRouter.delete("/:messageid",verifyToken, messageController.messageDelete);//done no test



module.exports = messageRouter;
