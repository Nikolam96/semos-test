const Kurs = require("../pkg/kurs/kursSchema");

exports.test = (req, res) => {
  return res.render("test", { message: "Тест за backend развој на софтвер" });
};

exports.database = async (req, res) => {
  try {
    const kurs = await Kurs.find();
    return res.render("kurs", { kurs: kurs });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
