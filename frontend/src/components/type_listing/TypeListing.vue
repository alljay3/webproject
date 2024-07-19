<template>
    <div class="container mt-4">
      <div v-if="listingType && userRole === 2">
        <h4>Настройки объявления</h4>
        <form @submit.prevent="updateType">
          <div class="form-group">
            <label for="name">Название:</label>
            <input type="text" class="form-control" id="name" placeholder="Название" required v-model="listingType.name">
          </div>
          <button type="submit" class="btn btn-primary">Обновить</button>
          <button type="button" class="btn btn-danger ml-2" v-on:click="deleteType()">Удалить</button>
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
        name: "TypeDetails",
        props: ['id'],
        data() {
            return {
                listingType: null,
                userRole: 100
            };
        },
        methods: {
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
            getListingType() { // получаем список студенческих групп для выпадающего списка
                  http
                      .get("/listingTypes/" + this.id)
                      .then(response => {
                          this.listingType = response.data;
                      })
                      .catch(e => {
                          console.log(e);
                      });
              },
            updateType(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.listingType.name
                };
                http
                    .post("/listingTypes/" + this.listingType.id, data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listingTypes'); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            deleteType() {
                http
                    .post("/listingTypes/delete/" + this.listingType.id)
                    .then(() => {
                        this.$router.push('/listingTypes'); // переходим к списку студентов
                    })
                    .catch(e => {
                        console.log(e);
                    });
                },
        },
        mounted() {
            this.getListingType();
            this.roleUser();
        }
    }
  </script>