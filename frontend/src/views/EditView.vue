<template>
  <h1>Edição</h1>
  <div v-show="!getError">
    <input
      type="text"
      placeholder="Nome"
      v-model="name"
      @input="this.editError = false"
    />
    <input
      type="email"
      placeholder="Email"
      v-model="email"
      @input="this.editError = false"
    />
    <button @click="edit">Editar</button>
  </div>
  <p v-show="getError">Não foi encontrado o usuário</p>
  <p v-show="editError">Não foi possível editar o usuário</p>
</template>

<script>
import axios from "axios";

export default {
  name: "EditView",
  data() {
    return {
      name: "",
      email: "",
      getError: false,
      editError: false,
    };
  },
  methods: {
    edit: function () {
      axios
        .put("http://localhost:8686/user", {
          id: this.$route.params.id,
          name: this.name,
          email: this.email,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          this.editError = true;
        });
    },
  },
  created: function () {
    axios
      .get("http://localhost:8686/user/" + this.$route.params.id)
      .then((res) => {
        this.name = res.data.name;
        this.email = res.data.email;
      })
      .catch(() => {
        this.getError = true;
      });
  },
};
</script>
