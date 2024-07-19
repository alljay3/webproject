import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListListings from "./components/listing/ListListings";
import AddListing from "./components/listing/AddListing";
import Listing from "./components/listing/MyListing";
import RegisterUser from "./components/user/RegistrationForm";
import ListListingsType from "./components/listing/listlistingType";
import Login from "./components/user/Login";
import AddCard from "./components/card/cardAdd";
import store from "./store/index";
import ListListingsSearch from "./components/listing/ListListingsSearch";
import ListingTypes from "./components/type_listing/TypeListings";
import ListingType from "./components/type_listing/TypeListing";
import AddListingType from "./components/type_listing/AddTypeListing";
import Profile from "./components/user/Profile";


// определяем маршруты 
const routes = [
    {
        path: "/listListings", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "listings", // имя маршрута
        alias: "/", // указание дополнительного маршрута
        component: ListListings, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список объявлений"
        }
    },
    {
        path: "/addListing",
        name: "add-listing",
        component: AddListing,
        meta: {
            title: "Новое объявление"
        }
    },
    {
        path: "/listings/:id",
        name: "listing-details",
        component: Listing,
        props: true, // указываем, что компонент Discipline.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Объявление"
        }
    },
    {
        path: "/registration",
        name: "register-user",
        component: RegisterUser,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/addCard:id",
        name: "add-card",
        component: AddCard,
        props: true,
        meta: {
            title: "Добавление карточки"
        }
    },
    {
        path: "/listListingsType", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "listings-type", // имя маршрута
        alias: "/listingsType", // указание дополнительного маршрута
        component: ListListingsType, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список объявлений"
        }
    },
    {
        path: "/listListingsSearch", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "listings-Search", // имя маршрута
        alias: "/listingsType", // указание дополнительного маршрута
        component: ListListingsSearch, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список объявлений"
        }
    },
    {
        path: "/listingTypes", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "types", // имя маршрута
        alias: "/types", // указание дополнительного маршрута
        component: ListingTypes, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список типов объявлений"
        }
    },
    {
        path: "/addTypeListing",
        name: "add-type",
        component: AddListingType,
        meta: {
            title: "Новый тип объявления"
        }
    },
    {
        path: "/listingType/:id",
        name: "type-details",
        component: ListingType,
        props: true, // указываем, что компонент Discipline.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Тип объявления"
        }
    },
    {
        path: "/profile/:id",
        name: "profile-details",
        component: Profile,
        props: true, // указываем, что компонент Discipline.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя"
        }
    },


];



const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) =>  {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});    //return next({path: "/login"});
            });
        return next({ path: "/login" });   //return next({ path: "/login" });
    }


    next();
});

export default router;