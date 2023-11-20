const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {
  async findAll() {
    try {
      const result = await knex
        .select(["id", "name", "email", "role"])
        .table("users");
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async findById(id) {
    try {
      const result = await knex
        .select(["id", "name", "email", "role"])
        .where({ id })
        .table("users");
      return result[0];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async findByEmail(email) {
    try {
      const result = await knex
        .select(["id", "name", "password", "email", "role"])
        .where({ email })
        .table("users");
      return result[0];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async new(name, email, password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await knex
        .insert({ name, email, password: hash, role: 0 })
        .table("users");
      return "Usuário criado com sucesso";
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, name, email, role) {
    try {
      const user = await this.findById(id);
      let editUser = {};
      if (name != user.name) {
        editUser.name = name;
      }
      if (email != user.email) {
        editUser.email = email;
      }
      if (role != user.role) {
        editUser.role = role;
      }
      await knex.update(editUser).where({ id }).table("users");
      return "Usuário editado com sucesso";
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      await knex.delete().where({ id }).table("users");
      return "Usuário deletado com sucesso";
    } catch (err) {
      console.log(err);
    }
  }

  async changePassword(id, newPassword) {
    try {
      const hash = await bcrypt.hash(newPassword, 10);
      await knex.update({ password: hash }).where({ id }).table("users");
      return "Senha alterada com sucesso";
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new User();
