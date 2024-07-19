var jwt = require("jsonwebtoken");
var config = require("../config/auth.config.js");
var db = require('../config/db.config.js');
var UserRole = db.user_role;

exports.verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(403).send({
            message: "Токен не предоставлен"
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.secret);

        // Предположим, что информация о роли хранится в базе данных в таблице userRole
        const userRole = await UserRole.findByPk(decoded.roleId);

        if (!userRole) {
            res.status(403).send({
                message: "Роль пользователя не найдена"
            });
            return;
        }

        req.userId = decoded.id;
        req.userRole = userRole.name; 

        next();
    } catch (err) {
        res.status(401).send({
            message: "Неверно введенный логин и/или пароль"
        });
    }
};
exports.adminOnlyRoute = (req, res, next) => {
    if (req.userRole !== 'Администратор') {
        res.status(403).send({
            message: "Доступ запрещен. Требуется роль 'Администратор'"
        });
        return;
    }

    // Если пользователь - администратор, предоставить доступ
    next();
};