module.exports = (app) => {
    const userController = require('../controller/User.js');

    // Получение всех пользователей
    app.get('/api/users', userController.findAll);

    // Получение пользователя по ID
    app.get('/api/users/:id', userController.findById);

    // Получение пользователя по электронной почте
    app.get('/api/users/email/:email', userController.findByEmail);

    // Создание нового пользователя
    app.post('/api/users', userController.create);

    // Обновление данных пользователя по ID
    app.post('/api/users/update/:id', userController.update);

    // Удаление пользователя по ID
    app.post('/api/users/delete/:id', userController.delete);
};
