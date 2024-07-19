module.exports = (app) => {
    const listingImageController = require('../controller/ListingImage.controller.js');

    // Получение всех изображений
    app.get('/api/listingImages', listingImageController.findAll);

    // Получение изображения по ID
    app.get('/api/listingImages/:id', listingImageController.findById);

    // Создание нового изображения
    app.post('/api/listingImages', listingImageController.create); 

    // Удаление изображения по ID
    app.post('/api/listingImages/delete/:id', listingImageController.delete);

    // Получение всех изображений по listing_id
    app.get('/api/listingImages/listing/:listing_id', listingImageController.findByListingId);

};
