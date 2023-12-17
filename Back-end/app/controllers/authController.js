const User = require("../models/User");
const jwt =  require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");



dotenv.config()
const SECRET = process.env.SECRET

exports.login = async (req, res) => {
  const { matricula, senha } = req.body;
  try {
    const user = await User.findOne({ where: { matricula } });
    if (user && bcrypt.compareSync(senha, user.senha )) {

      const token = jwt.sign({ matricula: user.matricula}, SECRET,{expiresIn: 7200}) // expira em 2 horaS

      req.session.user = user;
      res.status(200).json({
        message: "Login successful", auth: true, token:token
      });
    } else {
      return res.status(401).json({ message: "Invalid matricula or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logout successfully" });
  });
};