// Импортируем необходимые модули
var db = require('../config/db.config.js');
var UserData = db.user_data; // Обратите внимание на название модели
var globalFunctions = require('../config/global.functions.js');

// Определение контроллеров
exports.findAll = (req, res) => {
    UserData.findAll()
        .then(data => {
            globalFunctions.sendResult(res, data);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.findById = (req, res) => {
    UserData.findByPk(req.params.id)
        .then(data => {
            globalFunctions.sendResult(res, data);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.create = (req, res) => {
    UserData.create({
        birthdate: req.body.birthdate,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address
    }).then(data => {
        globalFunctions.sendResult(res, data);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.update = (req, res) => {
    UserData.update({
        birthdate: req.body.birthdate,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        globalFunctions.sendResult(res, data);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    UserData.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Данные пользователя удалены');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
