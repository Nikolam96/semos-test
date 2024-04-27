const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Mora da ima ime"],
    minlength: 1,
    maxlength: [30, "Ime je predugacko"],
  },
  email: {
    type: String,
    validate: validator.isEmail,
    unique: [true, "Email mora biti jedinstven"],
  },
  password: {
    type: String,
    required: [true, "Mora da ima password"],
    minlength: 5,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
