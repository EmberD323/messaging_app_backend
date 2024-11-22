
const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");


messageRouter.get("/",verifyToken, messageController.allMessagesGet);//done
messageRouter.get("/sent",verifyToken, messageController.sentMessagesGet);//done no test
messageRouter.get("/received",verifyToken, messageController.receivedMessagesGet);//done no test

messageRouter.post("/",verifyToken, messageController.newMessageCreate);//done
messageRouter.put("/:messageid",verifyToken, messageController.messageUpdate);//done
messageRouter.delete("/:messageid",verifyToken, messageController.messageDelete);//done



module.exports = messageRouter;
