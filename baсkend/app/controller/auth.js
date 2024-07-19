var db = require("../config/db.config");
var config = require("../config/auth.config");
var User = db.user;
var UserRole = db.user_role;
var UserData = db.user_data;
var globalFunctions = require('../config/global.functions.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


// Регистрация пользователя (администратора или обычного)
/*
exports.registerUser = async (req, res) => {
    try {
        let roleName = req.body.role || 'Пользователь';

        // Проверяем, существует ли указанная роль
        UserRole.findOrCreate({
            where: {
                name: roleName
            }
        }).then((userRole) => {
            User.create({
                name: req.body.user,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                role_id: userRole[0].dataValues.id
            }).then((user) => {
                globalFunctions.sendResult(res, "Пользователь зарегистрирован");
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        }).catch(err => {
            globalFunctions.sendError(res, err);
        });

    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};*/

exports.registerUser = async (req, res) => {
    try {
        let roleName = req.body.role || 'Пользователь';

        // Проверяем, существует ли указанная роль
        UserRole.findOrCreate({
            where: {
                name: roleName
            }
        }).then((userRole) => {
            // Создаем запись в таблице user_data
            UserData.create({
                birthdate: req.body.birthdate,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address: req.body.address
            }).then((userData) => {
                // Создаем пользователя с полученными данными
                User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    role_id: userRole[0].dataValues.id,
                    profile_id: userData.id
                }).then(() => {
                    globalFunctions.sendResult(res, "Пользователь зарегистрирован");
                }).catch(err => {
                    console.log(err);
                    globalFunctions.sendError(res, err);
                });
            }).catch(err => {
                console.log(err);
                globalFunctions.sendError(res, err);
            });
        }).catch(err => {
            console.log(err);
            globalFunctions.sendError(res, err);
        });
    } catch (err) {
        console.log(err);
        globalFunctions.sendError(res, err);
    }
};
// регистрация администратора
exports.registerAdmin = async (req, res) => {

    // все данные добавляем в транзакции

    try {
        // проверяем, существует ли роль "Администратор"
        UserRole.findOrCreate({
            where: {
                name: 'Администратор'
            }
        })
        .then((userRole) => {
            User.create({
                name: req.body.user,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10), // генерация хеша пароля
                role_id: userRole[0].dataValues.id
            }).then((user) => {
                console.log(user)
                globalFunctions.sendResult(res, "Пользователь зарегистрирован");
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
    }   )

    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};

// проверка данных пользователя
exports.login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: "Неверно введенный логин и/или пароль" });
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Неверно введенный логин и/или пароль"
                });
                return;
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: "1h" // 1 час — время действия токена
            });
            console.log("Токен при авторизации");
            console.log(token);
            var object = {
                id: user.id,
                name: user.name,
                username: user.username,
                accessToken: token
            };
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// обновление токена jwt (когда срок действия текущего истекает)
exports.refreshToken = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                globalFunctions.sendError(res, "Неверно введенный логин и/или пароль");
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: "1h" // 1 час — время действия токена
            });
            console.log("Новый токен");
            console.log(token);
            var object = {
                id: user.id,
                name: user.name,
                username: user.username,
                accessToken: token
            };
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// проверка, что пользователь авторизован
exports.userBoard = (req, res) => {
    globalFunctions.sendResult(res, "Пользователь авторизован");
};