<template>
    <div class="container">
      <div v-if="userRole !== 100">
        <h4 class="mt-4 mb-4">Добавление объявления</h4>
        <form @submit.prevent="addListing">
          <div class="form-group">
            <label for="title">Заголовок:</label>
            <input type="text" class="form-control" id="title" placeholder="Заголовок" required v-model="listing.title">
          </div>
          <div class="form-group">
            <label for="description">Описание:</label>
            <input type="text" class="form-control" id="description" placeholder="Описание" required v-model="listing.description">
          </div>
          <div class="form-group">
            <label for="price">Цена:</label>
            <input type="number" class="form-control" id="price" placeholder="Цена" required v-model="listing.price">
          </div>
          <div class="form-group">
            <label for="address">Адрес:</label>
            <input type="text" class="form-control" id="address" placeholder="Адресс" required v-model="listing.address">
          </div>
          <div class="form-group">
            <label for="type">Тип объявления:</label>
            <select class="form-control" required v-model="listing.type_id">
              <option value="" disabled selected>Выберите тип объявления</option>
              <option v-for="listingType in listingTypes" :key="listingType.id" :value="listingType.id">
                {{ listingType.name }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Добавить</button>
        </form>
      </div>
      <div v-else class="mt-4">
        <p class="alert alert-warning">Вы не авторизованы</p>
      </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddListing",
        data() {
            return {
                listing: {
                    name: "",
                    listing_type_id: null
                },
                listingTypes: [],
                userRole: 100
            };
        },
        methods: {
            addListing(e) {
                let curentDate = new Date();
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    title: this.listing.title,
                    description: this.listing.description,
                    price: this.listing.price,
                    address: this.listing.address,
                    type_id: this.listing.type_id,
                    user_id: this.$store.getters['auth/getAuthData'].user.id,
                    date_created: curentDate
                };
                http
                    .post("/addlistings", data)
                    .then((response) => { // запрос выполнился успешно
                        this.$router.push('/listings/' + response.data.id); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
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

        mounted(){ // при монтировании компонента подгружаем список групп
            this.getListingTypes();
            this.roleUser();
        }
    }
</script>