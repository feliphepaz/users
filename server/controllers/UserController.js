require("dotenv").config({ path: ".env.local" });
const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    res.status(200);
    res.json(users);
  }

  async search(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      res.json([]);
    } else {
      res.status(200);
      res.json(user);
    }
  }

  async create(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      res.send("Campos inválidos");
    } else {
      const result = await User.new(name, email, password);
      res.status(200);
      res.send(result);
    }
  }

  async edit(req, res) {
    const { id, name, email, role } = req.body;
    if (!id | !name || !email) {
      res.status(400);
      res.send("Campos inválidos");
    } else {
      const result = await User.update(id, name, email, role);
      res.status(200);
      res.send(result);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      res.send("Usuário não encontrado");
    } else {
      const result = await User.delete(id);
      res.status(200);
      res.send(result);
    }
  }

  async recoverPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      res.status(400);
      res.send("Campos inválidos");
    } else {
      const result = await PasswordToken.create(email);
      res.status(200);
      res.send(result);
    }
  }

  async changePassword(req, res) {
    const { token, password } = req.body;
    if (!token || !password) {
      res.status(400);
      res.send("Campos inválidos");
    } else {
      const validate = await PasswordToken.validate(token);
      if (validate.status) {
        const result = await User.changePassword(validate.user_id, password);
        await PasswordToken.setUsed(token);
        res.status(200);
        res.send(result);
      } else {
        res.status(400);
        res.send(validate.message);
      }
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      res.send("Campos inválidos");
    } else {
      const user = await User.findByEmail(email);
      if (!user) {
        res.status(404);
        res.send("Usuário não encontrado");
      } else {
        const validate = await bcrypt.compare(password, user.password);
        if (validate) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.SECRET
          );
          res.status(200);
          res.json({ token });
        } else {
          res.status(400);
          res.send("Senha inválida");
        }
      }
    }
  }
}

module.exports = new UserController();
