import http from "../http-common";

// отправка данных на сторону сервера для того, чтобы пользователь мог авторизоваться в системе
function login(user) {
    var data = {
        username: user.username,
        password: user.password
    };
    return http
        .post("/login", data)
        .then(response => {
            if (response.data.accessToken) {
                // записываем данные пользователя в локальное хранилище, которое находится в браузере
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
}

// обработка выхода пользователя
function logout() {
    // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
    localStorage.removeItem('user');
}


// обработка регистрации администратора
function registerAdmin(user) {
    var data = {
        username: user.username,
        email: user.email,
        password: user.password,
        profile_id: user.profile_id
    };
    console.log(data)
    return http.post("/registerAdmin", data);
}

function registerUser(user) {
    var data = {
        username: user.username,
        email: user.email,
        password: user.password,
        profile_id: user.profile_id
    };
    console.log(data)
    return http.post("/registerUser", data);
}



function addUserData(userData) {
    var data = {
        birthdate: userData.birthdate,
        first_name: userData.first_name,
        last_name: userData.last_name,
        address: userData.address,

    }
    console.log(data)
    return http.post("/userData", data);
}



// обработка обновления токена
// на стороне сервера установили время действия токена, если после указанного времени пользователь всё ещё работает в системе,
// то нужно сгенерировать другой токен
function refreshToken(user) {
    var data = {
        username: user.username
    };
    return http
        .post("/refreshToken", data)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));// записываем данные пользователя в локальное хранилище, которое хранится в браузере
            }
            return response.data;
        });
}


// декодируем токен jwt, чтобы в вызывающем методе использовать время (понадобится для проверки срока действия токена)
function jwtDecrypt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
}

// проверяем срока действия токена
function tokenAlive(exp) {
    // Date.now() - возвращает дату сразу в виде миллисекунд
    // exp - время из JWT токена по формату Unix Time
    // Чтобы сравнить время, нужно exp перевести в миллисекунды
    if (Date.now() >= exp * 1000) {
        return false;
    }
    return true;
}   

export default {
    login: login,
    logout: logout,
    registerAdmin: registerAdmin,
    registerUser: registerUser,
    refreshToken: refreshToken,
    jwtDecrypt: jwtDecrypt,
    tokenAlive: tokenAlive,
    addUserData:addUserData,
};