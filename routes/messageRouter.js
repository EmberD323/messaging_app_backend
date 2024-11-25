
const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");


messageRouter.get("/",verifyToken, messageController.allMessagesGet);
messageRouter.get("/sent",verifyToken, messageController.sentMessagesGet);
messageRouter.get("/received",verifyToken, messageController.receivedMessagesGet);

messageRouter.post("/",verifyToken, messageController.newMessageCreate);
messageRouter.put("/:messageid",verifyToken, messageController.messageUpdate);
messageRouter.delete("/:messageid",verifyToken, messageController.messageDelete);



module.exports = messageRouter;
