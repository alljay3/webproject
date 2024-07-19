module.exports = (app) => {

    var { authJwt } = require("../middleware");
    const listingTypeController = require('../controller/ListingType.js');

    // Получение всех типов объявлений
    app.get('/api/listingTypes', listingTypeController.findAll);

    // Получение типа объявления по ID
    app.get('/api/listingTypes/:id', listingTypeController.findById);

    // Создание нового типа объявления
    app.post('/api/listingTypes', listingTypeController.create);

    // Обновление данных типа объявления по ID
    app.post('/api/listingTypes/:id', listingTypeController.update);
 
    // Удаление типа объявления по ID
    app.post('/api/listingTypes/delete/:id', listingTypeController.delete);
}; 
