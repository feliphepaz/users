<template>
  <nav>
    <router-link to="/">Home</router-link>
    <em>|</em>
    <router-link to="/login">Login</router-link>
    <em>|</em>
    <router-link to="/register">Cadastro</router-link>
    <em>|</em>
    <router-link to="/logout">Deslogar</router-link>
  </nav>
  <router-view />
</template>

<style>
h1,
p,
a {
  font-family: "Courier New", Courier, monospace;
}

p {
  color: red;
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 20px;
}

input {
  display: block;
  width: 500px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  outline: none;
  margin-bottom: 20px;
}

button,
.button {
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  text-decoration: none;
  color: black;
  background: rgba(0, 0, 0, 0.1);
  font-weight: bold;
  padding: 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

em {
  color: rgba(0, 0, 0, 0.2);
  margin: 0px 10px;
}
</style>
