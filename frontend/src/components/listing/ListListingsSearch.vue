<template>
  <div class="container mt-5">
    <h4>Список объявлений</h4>
    <div class="mb-3">
      <input type="text" class="form-control" v-model="searchQuery" placeholder="Поиск по названию и описанию">
      <button @click="filteredListings" class="btn btn-primary">Найти</button>
    </div>
    <ul class="list-group">
      <!-- Вывод списка объявлений -->
      <li v-for="(listing, index) in filtered" :key="index" class="list-group-item">
        Название:
        <router-link :to="{ name: 'listing-details', params: { id: listing.id }}">
          {{ listing.title }}
        </router-link>
        <br>
        <span class="ml-2">цена: {{ listing.price }}</span>
        <br>
        <span class="ml-2">дата объявления: {{ new Date(listing.date_created).toLocaleString("ru", this.option) }}</span>
        <br>
        <span class="ml-2">Тип объявления: {{ selectedListingTypeName(listing) }}</span>
        <br>
        <span class="ml-3">
          Отправитель:
          <router-link
            class="item"
            :to="{
              name: 'profile-details',
              params: { id: listing.user_id }
            }"
          >
            {{ selectedListingUserr(listing) }}
          </router-link>
        </span>
        <br>
        <span class="ml-2">связь: {{ selectedListingMail(listing) }}</span>
        <ul class="list-group list-group-horizontal mt-2">
          <li class="llist-group-item d-inline-block mr-2" v-for="(card, index) in cards" :key="index">
            <div class="row-auto">
              <img v-if="card.listing_id == listing.id" :src="getLink(card.file, card.mime_type)" width="50">
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <router-link v-if="userRole !== 100" class="btn btn-success mt-3" to="/addListing">Добавить объявление</router-link>
  </div>
</template>
  
  <script>
  import http from "../../http-common";
  
  export default {
    name: "ListListings",
    data() {
      return {
        listings: [],
        listingTypes: [],
        users: [],
        option: "",
        userRole: 100,
        selectedListingType: "",
        searchQuery: "",
        filtered: [],
        cards: []
      };
    },
    methods: {
      async getListings() {
        try {
          const response = await http.get("/listings");
          this.listings = response.data;
          this.option = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
          };
        } catch (error) {
          console.log(error);
        }
      },
      async getListingTypes() {
        try {
          const response = await http.get("/listingTypes");
          this.listingTypes = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      getCards() {
                http
                    .get("listingImages")
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
      selectedListingMail(userr) {
      const selectedUserType = this.users.find(type => type.id === userr.user_id);
      return selectedUserType ? selectedUserType.email : '...';
    },
      selectedListingTypeName(list) {
        const selectedListingType = this.listingTypes.find(type => type.id === list.type_id);
      return selectedListingType ? selectedListingType.name : 'Выберите тип объявления';
      },
      selectedListingUserr(userr) {
        const selectedUserType = this.users.find(type => type.id === userr.user_id);
      return selectedUserType ? selectedUserType.username : '...';
      },
      async getUsers() {
        try {
          const response = await http.get("/users");
          this.users = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async roleUser() {
        try {
          if (this.$store.getters['auth/getLoginStatus'].loggedIn) {
            var userId = this.$store.getters['auth/getAuthData'].user.id;
            const response = await http.get("users/" + userId);
            this.userRole = response.data.role_id;
          }
        } catch (error) {
          console.log(error);
        }
      },
      filteredListings() {
        // Фильтрация списка объявлений по выбранному типу и запросу поиска
        this.filtered = this.listings;
  
        if (this.searchQuery.trim() !== "") {
            var data = {
                search_query: this.searchQuery
                };
            http
                    .post("/listings/search", data)
                    .then((response) => { // запрос выполнился успешно
                        this.filtered = response.data;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
        }
      },
    },
  
    async mounted() {
      await this.getListings();
      await this.getListingTypes();
      await this.getUsers();
      await this.roleUser();
      this.filteredListings();
      this.getCards();
    },
  };
  </script>
  
  <style>
    /* Стили могут быть добавлены здесь */
  </style>