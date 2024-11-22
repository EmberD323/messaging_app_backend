const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");


userRouter.post("/signup", userController.newUserCreate);//done -not unit tested -not postman tested
userRouter.post("/login", userController.logIn);//done -not unit tested -not postman tested
userRouter.delete("/users/:userid", userController.userDelete);//done -not unit tested -not postman tested


userRouter.get("/profiles", userController.allProfilesGet);//done -not unit tested -not postman tested
userRouter.get("/profiles/:profileid",verifyToken, userController.singleProfileGet);//done -not unit tested -not postman tested
userRouter.put("/profiles/:profileid",verifyToken, userController.profileUpdate);//done -not unit tested -not postman tested



module.exports = userRouter;
