<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link :to="{name : 'ViewProjectPerCategory', query : {category: 'arte'}}"> Arte </router-link>
        </li>
        <li>
          <router-link :to="{name : 'ViewProjectPerCategory', query : {category: 'letteratura'}}"> Letteratura </router-link>
        </li>
        <li>
          <router-link :to="{name : 'ViewProjectPerCategory', params : {category:'informatica'}}"> Informatica </router-link>
        </li>
        <li>
          <router-link :to="{name : 'ViewProjectPerCategory', params : {category:'giochi'}}"> Giochi </router-link>
        </li>
        <li>
          <router-link :to="{name : 'ViewProjectPerCategory', params : {category: 'cibo'}}"> Cibo </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
};
</script>

<style scoped>
nav {
  display: flex;
  text-align: center;
}


nav ul {
  padding: 1% 1% 0 0;
  display: flex;
  list-style: none;
  justify-content: space-between;
  width: 100%;
}

a {
  font-size: large;
  color: blue;
  text-decoration: none;
}

nav ul li{
  text-decoration: none;
}

</style>
