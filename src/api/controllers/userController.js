const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const validator = require("email-validator");
require('dotenv').config();

exports.create_an_user = async(req, res) => {
    console.log(req.body.password)
    try {
        if(validator.validate(req.body.email)){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        let new_user = new User(req.body);
        console.log(req.body)
        let result = await new_user.save();
        res.send(result);
        }
        else{
            res.send("Il y a eu une erreur");
        }   
    } catch (error) {
        res.status(500).send(error);
    }
};

/*
app.post("/login", async (req, res) => {
    try {
        var user = await UserModel.findOne({ username: req.body.username }).exec();
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        res.send({ message: "The username and password combination is correct!" });
    } catch (error) {
        res.status(500).send(error);
    }
});

*/

exports.login_an_user = (req, res) => {
  console.log(process.env.JWT_TOKEN);
  User.findOne(
    {
      email: req.body.email,
    },
    (error, user) => {
      if (error) {
        res.status(500);
        console.log(error);
        res.json({
          message: "Erreur serveur.",
        });
      } else {
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
          jwt.sign(
            {
              email: user.email,
              role: user,
            },
            process.env.JWT_TOKEN,
            {
              expiresIn: "30 days",
            },
            (error, token) => {
                if (error) {
                    res.status(400);
                    console.log(error);
                    res.json({
                        message: "Mot de passe ou email erroné."
                    })
                } else {
                    res.json({
                        token
                    })
                }
            })        
      }
    }
  );
};
