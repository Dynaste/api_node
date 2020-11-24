const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    required: "Le mail est requis",
    unique: true
  },
  password: {
    type: String,
    required: "Le mot de passe est requis",
  }
});

module.exports = mongoose.model("User", userSchema);
