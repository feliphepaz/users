<template>
  <h1>Cadastro</h1>
  <input
    type="text"
    placeholder="Nome"
    v-model="name"
    @input="this.createError = false"
  />
  <input
    type="email"
    placeholder="Email"
    v-model="email"
    @input="this.createError = false"
  />
  <input
    type="password"
    placeholder="Senha"
    v-model="password"
    @input="this.createError = false"
  />
  <button @click="create">Cadastrar</button>
  <p v-show="createError">Não foi possível criar o usuário</p>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      createError: false,
    };
  },
  methods: {
    create: function () {
      axios
        .post("http://localhost:8686/user/", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          this.createError = true;
        });
    },
  },
};
</script>
