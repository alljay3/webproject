module.exports = (app) => {

    var { authJwt } = require("../middleware");
    const userRoleController = require('../controller/UserRole.js');

    // Получение всех ролей пользователей
    app.get('/api/userRoles', userRoleController.findAll);

    // Получение роли пользователя по ID
    app.get('/api/userRoles/:id', userRoleController.findById);

    // Создание новой роли пользователя
    app.post('/api/userRoles', [authJwt.verifyToken, authJwt.adminOnlyRoute], userRoleController.create);

    // Обновление данных роли пользователя по ID 
    app.post('/api/userRoles/:id', [authJwt.verifyToken, authJwt.adminOnlyRoute], userRoleController.update);

    // Удаление роли пользователя по ID
    app.post('/api/userRoles/delete/:id', [authJwt.verifyToken, authJwt.adminOnlyRoute], userRoleController.delete);
};
