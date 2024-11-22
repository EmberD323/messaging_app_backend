
const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");


postRouter.get("/", postController.allPostsGet);
postRouter.post("/",verifyToken, postController.newPostCreate);


module.exports = postRouter;
