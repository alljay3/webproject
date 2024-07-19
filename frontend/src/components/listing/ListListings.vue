<template>
  <div class="container mt-4">
    <h4 class="mb-3">Список объявлений</h4>

    <ul class="list-group">
      <li v-for="(listing, index) in listings" :key="index" class="list-group-item">
        Название:
        <router-link
          :to="{
            name: 'listing-details',
            params: { id: listing.id }
          }"
        >
           {{ listing.title }}
        </router-link>
        <br>
        <span class="ml-3"> Цена: {{ listing.price }}</span>
        <br>
        <span class="ml-3"> Дата объявления: {{ new Date(listing.date_created).toLocaleString("ru", this.option) }}</span>
        <br>
        <span class="ml-3"> Тип объявления: {{ selectedListingTypeName(listing) }}</span>
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
        <span class="ml-3">Связь: {{ selectedListingMail(listing) }}</span>

        <ul class="list-group list-group-horizontal mt-3">
          <li v-for="(card, index) in cards" :key="index" class="llist-group-item d-inline-block mr-2">
            <div class="row-auto">
              <img v-if="card.listing_id == listing.id" :src="getLink(card.file, card.mime_type)" width="50">
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <router-link v-if="userRole !== 100" class="btn btn-primary mt-3" to="/addListing">Добавить объявление</router-link>

    <router-link v-if="userRole === 2" class="btn btn-secondary mt-3" to="/listingTypes">Типы объявлений</router-link>
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
      cards: [],
    };
  },
  methods: {
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

    getLink(base64, mime_type) {
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

    getListings() {
      http
        .get("/listings")
        .then(response => {
          this.listings = response.data;
          this.option = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            timezone: "UTC",
          };
        })
        .catch(e => {
          console.log(e);
        });
    },

    getListingTypes() {
      http
        .get("/listingTypes")
        .then(response => {
          this.listingTypes = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    selectedListingTypeName(list) {
      const selectedListingType = this.listingTypes.find(type => type.id === list.type_id);
      return selectedListingType ? selectedListingType.name : "Выберите тип объявления";
    },

    selectedListingUserr(userr) {
      const selectedUserType = this.users.find(type => type.id === userr.user_id);
      return selectedUserType ? selectedUserType.username : "...";
    },

    selectedListingMail(userr) {
      const selectedUserType = this.users.find(type => type.id === userr.user_id);
      return selectedUserType ? selectedUserType.email : "...";
    },

    getUsers() {
      http
        .get("/users")
        .then(response => {
          this.users = response.data;
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

  mounted() {
    this.getListings();
    this.getListingTypes();
    this.getUsers();
    this.roleUser();
    this.getCards();
  },
};
</script>

<style scoped>
/* Ваши стили Bootstrap, если нужны */
</style>