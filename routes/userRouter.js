const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");


userRouter.post("/signup", userController.newUserCreate);//done
userRouter.post("/login", userController.logIn);//done
userRouter.delete("/users/:userid",verifyToken, userController.userDelete);//done


userRouter.get("/profiles", userController.allProfilesGet);//done -not postman tested
userRouter.get("/profiles/:profileid",verifyToken, userController.singleProfileGet);//done -not postman tested
userRouter.put("/profiles/:profileid",verifyToken, userController.profileUpdate);//done -not postman tested



module.exports = userRouter;
