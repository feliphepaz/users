<template>
  <h1>Index</h1>
  <UserTag
    v-for="user in users"
    :key="user.id"
    :id="user.id"
    :name="user.name"
    :email="user.email"
  />
  <p v-show="getError">Permissão negada</p>
</template>

<script>
import axios from "axios";
import UserTag from "@/components/UserTag.vue";

export default {
  name: "HomeView",
  components: {
    UserTag,
  },
  data() {
    return {
      users: [],
      getError: false,
    };
  },
  created: function () {
    axios
      .get("http://localhost:8686/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.users = res.data;
      })
      .catch(() => {
        this.getError = true;
      });
  },
};
</script>
