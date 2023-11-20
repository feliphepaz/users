const knex = require("../database/connection");
const User = require("./User");

class PasswordToken {
  async create(email) {
    try {
      const user = await User.findByEmail(email);
      if (user) {
        await knex
          .insert({
            user_id: user.id,
            token: Date.now(),
            used: 0,
          })
          .table("password_tokens");
        return "Token emitido com sucesso";
      } else {
        return "Usuário não encontrado no banco de dados";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async validate(token) {
    try {
      const result = await knex
        .select()
        .where({ token })
        .table("password_tokens");
      if (result.length > 0) {
        if (result[0].used == 0) {
          return { status: true, user_id: result[0].user_id };
        } else {
          return { status: false, message: "O token já foi utilizado" };
        }
      } else {
        return { status: false, message: "O token é inválido" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async setUsed(token) {
    try {
      await knex.update({ used: 1 }).where({ token }).table("password_tokens");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new PasswordToken();
