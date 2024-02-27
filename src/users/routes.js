const {Router} = require("express");
const userRouter = Router();

const {hashPass, comparePass} = require("../middleware/auth");

const {signupUser, getAllUsers login, getOneUser} = require("./controllers");

userRouter.post("/users/signup",

hashPass,
signupUser);

userRouter.post(
    "/users/login",

    comparePass,
    login
);

userRouter.get("/users/getAllUsers", tokenCheck, getAllUsers);

userRouter.get("users/getOneUser/:username", getOneUser);

userRouter.get("/users/authCheck", tokenCheck, login);

module.exports = userRouter;