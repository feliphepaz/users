<template>
  <div class="tag">
    <div class="info">
      <span>{{ name }}</span>
      <em>|</em>
      <span>{{ email }}</span>
    </div>
    <div class="options">
      <a class="button" :href="'/edit/' + id">Editar</a>
      <button @click="del">Deletar</button>
    </div>
  </div>
  <p v-show="deleteError">Não foi possível deletar o usuário</p>
</template>

<script>
import axios from "axios";

export default {
  name: "UserTag",
  data() {
    return {
      deleteError: false,
    };
  },
  props: {
    id: Number,
    name: String,
    email: String,
  },
  methods: {
    del: function () {
      axios
        .delete("http://localhost:8686/user/" + this.id)
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.deleteError = true;
        });
    },
  },
};
</script>

<style scoped>
.tag {
  font-family: "Courier New", Courier, monospace;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 650px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.info {
  flex: 1;
}

.options {
  display: flex;
  gap: 10px;
}
</style>
