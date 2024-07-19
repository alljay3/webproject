<!-- RegistrationForm.vue -->
<template>
  <div class="container mt-5">
    <h2 class="mb-4">Регистрация пользователя</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input type="text" class="form-control" id="username" v-model="user.username" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" v-model="user.email" required />
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" class="form-control" id="password" v-model="user.password" required />
      </div>

      <div class="form-group">
        <label for="birthdate">Дата рождения:</label>
        <input type="date" class="form-control" id="birthdate" v-model="user.birthdate" required />
      </div>

      <div class="form-group">
        <label for="first_name">Имя:</label>
        <input type="text" class="form-control" id="first_name" v-model="user.first_name" required />
      </div>

      <div class="form-group">
        <label for="last_name">Фамилия:</label>
        <input type="text" class="form-control" id="last_name" v-model="user.last_name" required />
      </div>

      <div class="form-group">
        <label for="address">Адрес:</label>
        <input type="text" class="form-control" id="address" v-model="user.address" required />
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
  import http from "../../http-common";
  export default {
    data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        birthdate: '',
        first_name: '',
        last_name: '',
        address: ''
      }
    };
  },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    mounted() {
      if (this.loggedIn) {
        // Авторизация прошла успешно, переходим к главной странице.
        // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        window.location.href = '/';
      }
    },
    methods: {
        registerUser() {
      // Выполните HTTP-запрос на сервер, чтобы зарегистрировать пользователя
      // используйте данные из this.user
      // Пример с использованием axios:
      http.post('/registerUser', this.user)
        .then(response => {
          // Обработка успешного ответа от сервера
          console.log('Пользователь зарегистрирован', response.data);
          this.$router.push('/login');
        })
        .catch(error => {
          // Обработка ошибки
          console.log(error)
          console.error('Ошибка регистрации пользователя', error);
        });
    }
    }
  }; 
  </script> 
  