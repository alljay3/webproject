module.exports = (app) => {
    
    const userDataController = require('../controller/UserData.js');

    // Получение всех данных пользователей
    app.get('/api/userData', userDataController.findAll);

    // Получение данных пользователя по ID
    app.get('/api/userData/:id', userDataController.findById);

    // Создание новых данных пользователя
    app.post('/api/userData', userDataController.create);

    // Обновление данных пользователя по ID
    app.post('/api/userData/:id', userDataController.update);

    // Удаление данных пользователя по ID
    app.post('/api/userData/delete/:id', userDataController.delete);
};
