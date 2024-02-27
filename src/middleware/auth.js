const bcrypt = require("bcrypt");

const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    console.log("req.body.password before hash: ", req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // a hashed password

    req.body.password = hashedPassword; // swap the value 'helloworld' in req.body.password to the value of hashedPassword
    console.log("req.body.password after hash: ", req.body.password);
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};
   
    // https://www.npmjs.com/package/bcrypt

    //compare passwords
    // what we will need;

    // plain text password (e.g. 'mypassword123) & the hashed password on the DB

    // how do we get plain text password? send it in the request body
const comparePass = async (req, res, next) => {                                        
  try {
    const plaintextpassword = req.body.password;

    // how do we get the hashed password? find the user

    // How do we find the user? by the username - sent in the request body
    const user = await User.findOne({ where: { username: req.body.username } });
    console.log("user", user.dataValues.password);

    // we've found the user - then, use bcrypt to compare.

    // const matched = use bcrypt.compare(plaintext, hashed password)
    const matched = await bcrypt.compare (
        req.body.password,
        user.dataValues.password        
    );
    console.log("matched", matched);

    //or

    // req.matched = use bcrypt.compare(plaintext, hashed password) (harder way)

    // if matched false - response with code from unauthorised
    if (!matched) {
        res.status(401).json({ message: "Invalid username/password"});
        return;
    }

    req.user = user;

    // next()

    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
};
