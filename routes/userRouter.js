const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");


userRouter.post("/signup", userController.newUserCreate);
userRouter.post("/login", userController.logIn);
userRouter.delete("/users/:userid",verifyToken, userController.userDelete);


userRouter.get("/profile",verifyToken, userController.userProfileGet);
userRouter.get("/profiles/:profileid",verifyToken, userController.singleProfileGet);
userRouter.post("/profiles/",verifyToken, userController.profilePost);
userRouter.put("/profiles/:profileid",verifyToken, userController.profileUpdate);



module.exports = userRouter;
