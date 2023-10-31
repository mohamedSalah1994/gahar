<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/screens">Screens</router-link></li>
    </ul>
  </nav>
</template>
<style scoped>
.navbar {
  background-color: #cac4c4;
  overflow: hidden;
  margin-bottom: 30px;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar li {
  float: left;
}

.navbar a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: #007bfc;
}
</style>
