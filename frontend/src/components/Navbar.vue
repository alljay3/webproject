<template>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/listListings">Объявления</router-link>
        <router-link class="navbar-brand" to="/listListingsType">Объявления по типу</router-link>
        <router-link class="navbar-brand" to="/listListingsSearch">Объявления по поиску</router-link>
  
        <div class="navbar-collapse justify-content-end">
          <div v-if="currentUser" class="navbar-brand">
            <router-link
              :to="{
                name: 'profile-details',
                params: { id: currentUser.id }
              }"
              class="navbar-brand"
            >
              {{ currentUser.username }}
            </router-link>
            <a href="#" @click.prevent="logOut" class="btn btn-link text-success">
              Выйти
            </a>
          </div>
          <div v-else class="navbar-brand">
            <router-link to="/login" class="btn btn-link text-success">
              Войти
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "NavBar",
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch("auth/logout");
        window.location.href = "/login";
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ваши стили, если нужны */
  </style>