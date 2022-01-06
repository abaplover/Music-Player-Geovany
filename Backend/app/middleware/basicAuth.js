const auth = require('basic-auth');
const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

const mwBasicAuth = async (req, res, next) => {
    
    const authUser = await auth(req);

    if (authUser && authUser.name === 'DevUser') {
        
        User.findOne({
            where: {
              username: authUser.name
            }
          })
            .then(user => {
              if (!user) {
                return res.status(404).send({ message: "User Not found." });
              }
        
              var passwordIsValid = bcrypt.compareSync(
                authUser.pass,
                user.password
              );
        
              if (!passwordIsValid) {
                return res.status(401).send("Invalid Password!");
              }
            });
            next();
    }
    else{
        res.status(403).send("Access denied");
    }
    
    
}

module.exports = mwBasicAuth;