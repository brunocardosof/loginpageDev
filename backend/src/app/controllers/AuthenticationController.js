const { User } = require("../models");

class AuthenticationController {
  async signin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return res.json({
      nome: user.nome,
      id: user.id,
      email: user.email,
      token: user.generateToken()
    });
  }
}

module.exports = new AuthenticationController();
