
const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");


messageRouter.get("/",verifyToken, messageController.allMessagesGet);
messageRouter.get("/:authorid",verifyToken, messageController.sentMessagesGet);
messageRouter.get("/:recieverid",verifyToken, messageController.recievedMessagesGet);

messageRouter.post("/",verifyToken, messageController.newMessageCreate);
messageRouter.put("/:postid",verifyToken, messageController.messageUpdate);
messageRouter.delete("/:postid",verifyToken, messageController.messageDelete);



module.exports = messageRouter;
