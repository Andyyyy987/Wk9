const {Router} = require("express");
const userRouter = Router();

const {hashPass} = require("../middleware/auth");

const {signupUser, getAllUsers} = require("./controllers");

userRouter.post("/users/signup", hashPass, signupUser);

userRouter.get("/users/getAllUsers", getAllUsers);

module.exports = userRouter;