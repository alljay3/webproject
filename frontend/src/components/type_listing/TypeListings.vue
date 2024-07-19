<template>
  <div class="container mt-4">
    <div v-if="userRole === 2">
      <h4>Список типов</h4>
      <ul class="list-group">
        <!-- Вывод списка учебных дисциплин -->
        <li v-for="(types, index) in listingTypes" :key="index" class="list-group-item">
          <router-link :to="{
            name: 'type-details', 
            params: { id: types.id }
          }">
            {{ types.name }} 
          </router-link>
        </li>
      </ul>
      <router-link to="/addTypeListing" class="btn btn-primary mt-2">Добавить тип объявления</router-link> 
    </div>
    <div v-else class="mt-4">
      <p class="alert alert-danger">Ошибка, вы не администратор</p>
    </div>
  </div>
</template>
  
  <script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
  export default {
    name: "ListListings", // Имя шаблона
    data() { // данные компонента (определение переменных)
      return {
        listingTypes: [],
        userRole: 100,
      };
    },
    methods: { // методы компонента
      getListingTypes() { // получаем список студенческих групп для выпадающего списка
                http
                    .get("/listingTypes")
                    .then(response => {
                        this.listingTypes = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            roleUser() {
            if (this.$store.getters["auth/getLoginStatus"].loggedIn == true) {
                var userId = this.$store.getters["auth/getAuthData"].user.id;
                http
                .get("users/" + userId)
                .then(response => {
                    this.userRole = response.data.role_id;
                })
                .catch(e => {
                    console.log(e);
                });
            }
            },

    },
    


    mounted() { // загружаем данные учебных дисциплин. Обработчик mounted() вызывается после монтирования экземпляра шаблона
      this.getListingTypes();
      this.roleUser();
    }
  }
  </script>
  
  <style>
  
  </style>