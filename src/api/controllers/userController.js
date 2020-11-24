const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.create_an_user = (req, res) => {
  let new_user = new User(req.body);

  new_user.save((error, user) => {
    if (error) {
      res.status(500);
      console.log(error);
      res.json({ message: error });
    } else {
      res.status(200);
      res.json(user);
    }
  });
};

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
        if (user.password === req.body.password) {
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
        } else {
            res.status(400);
            console.log(error);
            res.json({
                message: "Mot de passe ou email erroné."
            }
        
          );
        }
      }
    }
  );
};
