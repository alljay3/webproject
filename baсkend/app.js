var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4201', // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false}); // force обозначает автоматическое создание таблиц в базе данных при запуске проекта

app.listen(3001);    

var user = require('./app/route/user');
var listingImage = require('./app/route/listingImage'); 
var userData = require('./app/route/userData');
var listing = require('./app/route/listing');
var listingType = require('./app/route/listingType');
var userRole = require('./app/route/userRole');

var auth = require('./app/route/auth.js');
auth(app);

listingImage(app);
userData(app);
listing(app);
listingType(app);
userRole(app);
user(app);