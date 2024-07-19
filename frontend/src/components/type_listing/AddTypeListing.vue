<template>
    <div class="container mt-4">
      <div v-if="userRole === 2">
        <h4>Добавление объявления</h4>
        <form @submit.prevent="addListingType">
          <div class="form-group">
            <label for="name">Имя:</label>
            <input type="text" class="form-control" id="name" placeholder="Имя" required v-model="listingType.name">
          </div>
          <button type="submit" class="btn btn-primary">Добавить</button>
        </form>
      </div>
      <div v-else class="mt-4">
        <p class="alert alert-danger">Ошибка, вы не администратор</p>
      </div>
    </div>
  </template>
<script>
    import http from "../../http-common";
    export default {
        name: "AddListingType",
        data() {
            return {
                listingType: {
                    name: "",
                },
                userRole: 100
            };
        },
        methods: {
            addListingType(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name : this.listingType.name
                };
                http
                    .post("/listingTypes", data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listingTypes/'); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
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

        
        mounted(){ // при монтировании компонента подгружаем список групп
            this.roleUser();
        }
    }
</script>