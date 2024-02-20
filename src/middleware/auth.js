const bcrypt = require("bcrypt")

const User = require("../users/model")

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
    try {    
        console.log("req.body.password before hash: ", req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);    

        req.body.password = hashPassword;
        next();
    } catch (error) {
        res.status(501).json({message:error.message, error: error});        
    };
}
    module.exports = {

    }


    