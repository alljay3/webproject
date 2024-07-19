<template>
  <div class="container mt-5">
    <h4>Список объявлений</h4>
    <div class="form-row mb-3">
      <div class="col">
        <input type="text" class="form-control" v-model="searchQuery" placeholder="Поиск по названию">
      </div>
      <div class="col">
        Минимальная цена:
        <input type="number" class="form-control" v-model="lowPrice" placeholder="Минимальная цена">
      </div>
      <div class="col">
        Максимальная цена:
        <input type="number" class="form-control" v-model="topPrice" placeholder="Максимальная цена">
      </div>
      <div class="col">
        <select class="form-control" v-model="selectedListingType" @change="filterListings">
          <option value="" disabled selected>Выберите тип объявления</option>
          <option v-for="listingType in listingTypes" :key="listingType.id" :value="listingType.id">
            {{ listingType.name }}
          </option>
        </select>
      </div>
    </div>

    <ul class="list-group">
      <!-- Вывод списка учебных дисциплин -->
      <li v-for="(listing, index) in filteredListings" :key="index" class="list-group-item">
        <div>
          <strong>Название:</strong>
          <router-link :to="{ name: 'listing-details', params: { id: listing.id }}">
            {{ listing.title }}
          </router-link>
        </div>
        <div>
          <br>
          <span><strong>цена:</strong> {{ listing.price }}</span>
          <br>
          <span class="ml-2"><strong>дата объявления:</strong> {{ new Date(listing.date_created).toLocaleString("ru", this.option) }}</span>
          <br>
          <span class="ml-2"><strong>Тип объявления:</strong> {{ selectedListingTypeName(listing) }}</span>
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
          <span class="ml-2"><strong>связь:</strong> {{ selectedListingMail(listing) }}</span>
        </div>
        <ul class="list-group list-group-horizontal mt-2">
          <li class="llist-group-item d-inline-block mr-2" v-for="(card, index) in cards" :key="index">
            <div class="row-auto">
              <img v-if="card.listing_id == listing.id" :src="getLink(card.file, card.mime_type)" width="50">
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <router-link v-if="userRole != 100" class="btn btn-success mt-3" to="/addListing">Добавить объявление</router-link>
  </div>
</template>
  
  <script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
  export default {
    name: "ListListings", // Имя шаблона
    data() { // данные компонента (определение переменных)
      return {
        listings: [],
        listingTypes: [],
        users: [],
        option: "",
        userRole: 100,
        selectedListingType: "",
        cards: [],
        searchQuery: "",
        lowPrice: 0,
        topPrice: 10000000
      };
    },
    computed: {
        filteredListings() {
      // Фильтрация списка объявлений по выбранному типу и запросу поиска
      let filtered = this.listings;

      if (this.selectedListingType !== "") {
        filtered = filtered.filter(listing => listing.type_id === this.selectedListingType);
      }

      if (this.searchQuery.trim() !== "") {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        filtered = filtered.filter(listing => {
          // Фильтрация по заголовку объявления
          return listing.title.toLowerCase().includes(lowerCaseQuery);
        });
      }
      filtered = filtered.filter(listing => {
            const priceInRange = listing.price >= this.lowPrice && listing.price <= this.topPrice;
            return priceInRange;
        });


      return filtered;
    },
  },
    methods: { // методы компонента
      getListings() {
        http
            .get("/listings") // обращаемся к серверу для получения списка учебных дисциплин
            .then(response => { // запрос выполнен успешно
              this.listings = response.data;
              this.option = {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              timezone: 'UTC'
            };
            })
            .catch(e => { // запрос выполнен с ошибкой
              console.log(e);
            });
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
    roleUser()
            {
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
            }
    },
    


    mounted() { // загружаем данные учебных дисциплин. Обработчик mounted() вызывается после монтирования экземпляра шаблона
      this.getListings();
      this.getListingTypes();
      this.getUsers();
      this.roleUser();
      this.getCards();
    }
  }
  </script>
  
  <style>
  
  </style>