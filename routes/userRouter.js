const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const multer  = require('multer')
const storage = multer.memoryStorage()
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image'), false);
    }
  };
const upload  = multer({ storage: storage,fileFilter:multerFilter })

userRouter.post("/signup", userController.newUserCreate);
userRouter.post("/login", userController.logIn);
userRouter.delete("/users/:userid",verifyToken, userController.userDelete);
userRouter.get("/users/:username",verifyToken, userController.searchByUsername);



userRouter.get("/profile",verifyToken, userController.userProfileGet);
userRouter.get("/profiles/:profileid",verifyToken, userController.singleProfileGet);
userRouter.post("/profiles/",verifyToken, upload.single('file'), userController.profilePost);
userRouter.put("/profiles/:profileid",verifyToken, userController.profileUpdate);



module.exports = userRouter;
