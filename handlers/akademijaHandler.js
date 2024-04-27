const Akademija = require("../pkg/akademija/akademijaSchema");

exports.createAkademija = async (req, res) => {
  try {
    const akademija = await Akademija.create(req.body);

    res.status(201).json({
      status: "Success",
      data: akademija,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.getAkademija = async (req, res) => {
  try {
    const akademija = await Akademija.find();
    res.status(201).json({
      status: "Success",
      data: akademija,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.getOneAkademija = async (req, res) => {
  try {
    const akademija = await Akademija.find(req.params.id);
    res.status(201).json({
      status: "Success",
      data: akademija,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.updateAkademija = async (req, res) => {
  try {
    const akademija = await Akademija.findOneAndUpdate(
      {
        email: req.body.email,
      },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json({
      status: "Success",
      data: akademija,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.updateAkademija = async (req, res) => {
  try {
    await Akademija.findOneAndDelete({
      email: req.body.email,
    });
    res.status(201).json({
      status: "Success",
      data: "deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};
