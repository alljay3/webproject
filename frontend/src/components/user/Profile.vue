<template>
    <div class="container mt-5">
      <div v-if="user && userData && (UserID() == user.id)">
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <h4>Имя пользователя:</h4><p>{{ user.username }}</p>
          </div>
          <div class="form-group">
            <h4>Имя:</h4>
            <input type="text" class="form-control" name="description" id="description" placeholder="Имя" required v-model="userData.first_name">
          </div>
          <div class="form-group">
            <h4>Фамилия:</h4>
            <input type="text" class="form-control" name="price" id="price" placeholder="Фамилия" required v-model="userData.last_name">
          </div>
          <div class="form-group">
            <h4>Адрес:</h4>
            <input type="text" class="form-control" name="address" id="address" placeholder="Адрес" required v-model="userData.address">
          </div>
          <div class="form-group">
            <h4>Электронная почта:</h4>
            <p>{{ user.email }}</p>
          </div>
          <div class="form-group">
            <h4>Роль</h4>
            <select class="form-control" required v-model="user.role_id" :disabled="true">
              <option value="" disabled selected>роль пользователя</option>
              <option v-for="uR in userRoles" :key="uR.id" :value="uR.id">{{uR.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Обновить">
          </div>
          <p>{{ isChange }}</p>
          <div>
            <h5>Список объявлений пользователя:</h5>
            <ul class="list-group">
              <li v-for="(listing, index) in listings" :key="index" class="list-group-item">
                Название:
                <router-link :to="{ name: 'listing-details', params: { id: listing.id }}">{{ listing.title }}</router-link>
              </li>
            </ul>
          </div>
        </form>
      </div>
  
      <div v-else-if="user && userData && userRole == 2">
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <h4>Имя пользователя:</h4><p>{{ user.username }}</p>
          </div>
          <div class="form-group">
            <h4>Имя:</h4>
            <input type="text" class="form-control" name="description" id="description" placeholder="Имя" required v-model="userData.first_name">
          </div>
          <div class="form-group">
            <h4>Фамилия:</h4>
            <input type="text" class="form-control" name="price" id="price" placeholder="Фамилия" required v-model="userData.last_name">
          </div>
          <div class="form-group">
            <h4>Адрес:</h4>
            <input type="text" class="form-control" name="address" id="address" placeholder="Адрес" required v-model="userData.address">
          </div>
          <div class="form-group">
            <h4>Электронная почта:</h4>
            <p>{{ user.email }}</p>
          </div>
          <div class="form-group">
            <h4>Роль:</h4>
            <select class="form-control" required v-model="user.role_id">
              <option value="" disabled selected>Выберите роль пользователя</option>
              <option v-for="uR in userRoles" :key="uR.id" :value="uR.id">{{uR.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Обновить">
          </div>
          <div class="form-group">
            <button @click="deleteUser" class="btn btn-danger">Удалить</button>
          </div>
          <p>{{ isChange }}</p>
          <div>
            <h5>Список объявлений пользователя:</h5>
            <ul class="list-group">
              <li v-for="(listing, index) in listings" :key="index" class="list-group-item">
                Название:
                <router-link :to="{ name: 'listing-details', params: { id: listing.id }}">{{ listing.title }}</router-link>
              </li>
            </ul>
          </div>
        </form>
      </div>
  
      <div v-else-if="user && userData">
        <form @submit.prevent="updateListing">
          <div class="form-group">
            <h4>Имя пользователя:</h4><p>{{ user.username }}</p>
          </div>
          <div class="form-group">
            <h4>Имя:</h4>
            <p>{{ userData.first_name }}</p>
          </div>
          <div class="form-group">
            <h4>Фамилия:</h4>
            <p>{{ userData.last_name }}</p>
          </div>
          <div class="form-group">
            <h4>Адрес:</h4>
            <p>{{ userData.address }}</p>
          </div>
          <div class="form-group">
            <h4>Электронная почта:</h4>
            <p>{{ user.email }}</p>
          </div>
          <div class="form-group">
            <h4>Роль:</h4>
            <select class="form-control" required v-model="user.role_id" :disabled="true">
              <option value="" disabled selected>роль пользователя</option>
              <option v-for="uR in userRoles" :key="uR.id" :value="uR.id">{{uR.name}}</option>
            </select>
          </div>
          <div>
            <h5>Список объявлений пользователя:</h5>
            <ul class="list-group">
              <li v-for="(listing, index) in listings" :key="index" class="list-group-item">
                Название:
                <router-link :to="{ name: 'listing-details', params: { id: listing.id }}">{{ listing.title }}</router-link>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
    export default {
        name: "UserDetails",
        props: ['id'],
        data() {
            return {
                userRoles: [],
                userRole: 100,
                user: null,
                userData: null,
                isChange: "",
                listings: null
            };
        },
        methods: {
            getListings() {
                http
                        .get("/listings")
                        .then(response => {
                        this.listings = response.data;
                        this.listings = this.listings.filter((listing) => listing.user_id === this.user.id);
                        })
                        .catch(e => {
                        console.log(e);
                        });
            },
            getUser() {
                http
                    .get("/users/"+ this.id)
                    .then(response => {
                        this.user = response.data;
                        this.getUserData();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getUserData() {
                http
                    .get("/userData/"+ this.user.profile_id)
                    .then(response => {
                        this.userData = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getUserTypes() { // получаем список студенческих групп для выпадающего списка
                  http
                      .get("/userRoles")
                      .then(response => {
                          this.userRoles = response.data;
                      })
                      .catch(e => {
                          console.log(e);
                      });
              },
            updateUser(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var dataUser = {
                    username: this.user.username,
                    email: this.user.email,
                    password: this.user.password,
                    role_id: this.user.role_id,
                    profile_id: this.user.profile_id
                };
                var dataUserData =
                {
                    birthdate: this.userData.birthdate,
                    first_name: this.userData.first_name,
                    last_name: this.userData.last_name,
                    address: this.userData.address
                };


                http
                    .post("users/update/" + this.user.id, dataUser)
                    .then(() => { // запрос выполнился успешно
            
                        http
                            .post("/userData/" + this.userData.id, dataUserData)
                            .then(() => { // запрос выполнился успешно
                                //alert("Данные изменены");
                                this.isChange = "Данные изменены";
                            })
                            .catch(e => { // при выполнении запроса возникли ошибки
                                console.log(e);
                                this.isChange = "Данные не изменены";
                            });    

                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });


            },
            deleteUser() {
                http
                    .post("users/delete/" + this.user.id)
                    .then(() => { // запрос выполнился успешно
            
                        http
                            .post("/userData/delete/" + this.userData.id)
                            .then(() => { // запрос выполнился успешно
                                this.$router.push('/listListings');
                            })
                            .catch(e => { // при выполнении запроса возникли ошибки
                                console.log(e);
                            });    

                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
              UserName() {
                  if (this.$store.getters['auth/getLoginStatus'].loggedIn == true)
                      return this.$store.getters['auth/getAuthData'].user.username;
              },
              UserID() {
                  if (this.$store.getters['auth/getLoginStatus'].loggedIn == true)
                      return this.$store.getters['auth/getAuthData'].user.id;
              },
              roleUser()
              {
                  console.log(this.$store.getters['auth/getLoginStatus']);
                  if (this.$store.getters['auth/getLoginStatus'].loggedIn == true)
                  {
                      var userId = this.$store.getters['auth/getAuthData'].user.id;
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
        mounted() {
            this.getUser(); // подгрузка данных студента
            this.getUserTypes();
            this.roleUser();
            this.getListings();
        }
    }
  </script>