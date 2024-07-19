module.exports = (app) => {
    const listingController = require('../controller/Listing.js');

    // Получение всех записей
    app.get('/api/listings', listingController.findAll);

    // Создание новой записи
    app.post('/api/addlistings', listingController.create);

    // Обновление данных записи по ID
    app.post('/api/listings/update/:id', listingController.update);

    // Удаление записи по ID
    app.post('/api/listings/delete/:id', listingController.delete);

    // Получение записи по ID
    app.get('/api/listings/:id', listingController.findById);

    // Получение записей по типу
    app.get('/api/listings/type/:type_id', listingController.findByType);

    // Поиск записей по запросу
    app.post('/api/listings/search', listingController.findBySearchQuery);
};
