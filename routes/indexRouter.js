const { Router } = require("express");
const indexRouter = Router();
const userController = require("../controllers/userController");

indexRouter.post("/signup", userController.newUserCreate);
indexRouter.post('/login', userController.logIn);
//logout
indexRouter.get("/logout", (req, res, next) => {
    //finish on front end
    res.json("logged out")
});

module.exports = indexRouter;
