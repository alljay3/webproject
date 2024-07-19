<template>
    <div class="container mt-5">
      <div v-if="listing && (UserID() == listing.user_id || userRole == 2)">
        <h4>Настройки объявления</h4>
        <form @submit.prevent="updateListing">
          <div class="form-group">
            <input type="text" class="form-control" name="titile" id="titile" placeholder="Заголовок" required v-model="listing.title">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" name="description" id="description" placeholder="Описание" required v-model="listing.description">
          </div>
          <div class="form-group">
            <input type="number" class="form-control" name="price" id="price" placeholder="Цена" required v-model="listing.price">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" name="address" id="address" placeholder="Адрес" required v-model="listing.address">
          </div>
          <div class="form-group">
            <select class="form-control" required v-model="listing.type_id">
              <option value="" disabled selected>Выберите тип объявления</option>
              <option v-for="listingType in listingTypes" :key="listingType.id" :value="listingType.id">
                {{ listingType.name }}
              </option>
            </select>
          </div>
          <div><h4>Отправитель:</h4><p>           <router-link
            class="item"
            :to="{
              name: 'profile-details',
              params: { id: listing.user_id }
            }"
          >
            {{ selectedListingUserr(listing) }}
          </router-link></p></div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Обновить</button>
          </div>
          <div class="form-group">
            <button type="button" @click="deleteListing" class="btn btn-danger">Удалить</button>
          </div>
        </form>
  
        <div class="col-sm-8 mt-3">
          <ul class="list-group">
            <li class="list-group-item" v-for="(card, index) in cards" :key="index">
              <div class="row">
                <div class="col-auto">
                  <a :href="getLink(card.file, card.mime_type)" target="_blank"></a>
                </div>
                <div class="col-auto">
                  <button @click="deleteCard(card.id, $event)" class="btn btn-outline-danger btn-sm">Удалить</button>
                </div>
              </div>
              <div class="col-auto">
                <img :src="getLink(card.file, card.mime_type)" width="100">
              </div>
            </li>
          </ul>
        </div>
  
        <div class="form-group mt-3">
          <button @click="addImage" class="btn btn-success">Добавить картинку</button>
        </div>
      </div>
  
      <div v-else-if="listing">
        <h4>Данные объявления</h4>
        <form @submit.prevent="updateListing">
          <div><h4>Название:</h4><p> {{ listing.title }} </p></div>
          <div><h4>Описание:</h4><p> {{ listing.description }}</p></div>
          <div><h4>Цена:</h4><p> {{ listing.price }}</p></div>
          <div><h4>Адрес:</h4><p> {{ listing.address }}</p></div>
          <div><h4>Отправитель:</h4><p>           <router-link
            class="item"
            :to="{
              name: 'profile-details',
              params: { id: listing.user_id }
            }"
          >
            {{ selectedListingUserr(listing) }}
          </router-link></p></div>
          <div class="form-group">
            <h4>Тип объявления:</h4>
            <select class="form-control" required v-model="listing.type_id" :disabled="true">
              <option value="" disabled selected>Выберите тип объявления</option>
              <option v-for="listingType in listingTypes" :key="listingType.id" :value="listingType.id">
                {{listingType.name}}
              </option>
            </select>
          </div>
  
          <div class="col-sm-8 mt-3">
            <ul class="list-group">
              <li class="list-group-item" v-for="(card, index) in cards" :key="index">
                <div class="col-auto">
                  <img :src="getLink(card.file, card.mime_type)" width="100">
                </div>
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
      name: "ListingDetails",
      props: ['id'],
      data() {
          return {
              listing: null,
              listingTypes: [],
              cards: [],
              userRole: 100,
              users: []
          };
      },
      methods: {
          getListing() {
              http
                  .get("/listings/"+ this.id)
                  .then(response => {
                      this.listing = response.data;
                  })
                  .catch(e => {
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
          updateListing(e) {
              e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
              var data = {
                    title: this.listing.title,
                    description: this.listing.description,
                    price: this.listing.price,
                    address: this.listing.address,
                    type_id: this.listing.type_id,
                    user_id: this.listing.user_id,
                    date_created: this.listing.date_created
              };
              http
                  .post("/listings/update/" + this.listing.id, data)
                  .then(() => { // запрос выполнился успешно
                      this.$router.push('/listListings'); // переходим к списку студентов
                  })
                  .catch(e => { // при выполнении запроса возникли ошибки
                      console.log(e);
                  });
          },
          deleteListing() {
              http
                  .post("/listings/delete/" + this.listing.id)
                  .then(() => {
                      this.$router.push('/listListings'); // переходим к списку студентов
                  })
                  .catch(e => {
                      console.log(e);
                  });
          },
          addImage()
          {
            this.$router.push('/addCard' + this.id); // переходим к списку студентов
          },
          getCards() {
                http
                    .get("listingImages/listing/" + this.id)
                    .then(response => {
                        this.cards = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getLink(base64, mime_type){
                var byteCharacters = atob(base64);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var file = new Blob([byteArray], { type: mime_type });
                var fileURL = URL.createObjectURL(file);
                return fileURL;
            },
            deleteCard(card_id, e) {
                e.preventDefault(e);
                http
                    .post("/listingImages/delete/" + card_id)
                    .then(() => {
                        this.getCards();
                    })
                    .catch(e => {
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
            getUsers() { // получаем список студенческих групп для выпадающего списка
                http
                    .get("/users")
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            selectedListingUserr() {
                const selectedUserType = this.users.find(type => type.id === this.listing.user_id);
                return selectedUserType ? selectedUserType.username : '...';
            },
      },
      mounted() {
          this.getListing(); // подгрузка данных студента
          this.getListingTypes();
          this.getCards();
          this.roleUser();
          this.getUsers();
      }
  }
</script>