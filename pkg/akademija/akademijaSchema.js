const mongoose = require("mongoose");
const validator = require("validator");

const akademijaSchema = new mongoose.Schema({
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
    required: [true, "Mora da ima email"],
  },
});

const Akademija = mongoose.model("Akademija", akademijaSchema);

module.exports = Akademija;
