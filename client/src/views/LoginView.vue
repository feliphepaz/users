<template>
  <h1>Login</h1>
  <input
    type="text"
    placeholder="Email"
    v-model="email"
    @input="this.loginError = false"
  />
  <input
    type="password"
    placeholder="Senha"
    v-model="password"
    @input="this.loginError = false"
  />
  <button @click="login">Login</button>
  <p v-show="loginError">Campos incorretos ou usuário não existe</p>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
    };
  },
  methods: {
    login: function () {
      axios
        .post("http://localhost:8686/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/");
        })
        .catch(() => {
          this.loginError = true;
        });
    },
  },
};
</script>
