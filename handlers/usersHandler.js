const User = require("../pkg/user/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "Success",
      data: user,
    });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        data: "Wrong email or password",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        data: "Wrong email or password",
      });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return res.status(400).json({
        data: "Wrong email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(201).json({
      status: "success",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};
