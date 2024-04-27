const Kurs = require("../pkg/kurs/kursSchema");

exports.createKurs = async (req, res) => {
  try {
    const kurs = await Kurs.create(req.body);
    res.status(201).json({
      status: "created",
      message: kurs,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getKurs = async (req, res) => {
  try {
    const kurs = await Kurs.find();
    res.status(200).json({
      status: "created",
      message: kurs,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getOneKurs = async (req, res) => {
  try {
    const kurs = await Kurs.findById(req.params.id);
    res.status(200).json({
      status: "created",
      message: kurs,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateKurs = async (req, res) => {
  try {
    const kurs = await Kurs.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      status: "created",
      message: kurs,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.deleteKurs = async (req, res) => {
  try {
    await Kurs.findOneAndDelete({ email: req.body.email });
    res.status(201).json({
      status: "created",
      message: "Deleted",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
