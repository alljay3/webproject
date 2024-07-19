// Импортируем необходимые модули
var db = require('../config/db.config.js');
var UserRole = db.user_role; // Обратите внимание на название модели
var globalFunctions = require('../config/global.functions.js');

// Определение контроллеров
exports.findAll = (req, res) => {
    UserRole.findAll()
        .then(roles => {
            globalFunctions.sendResult(res, roles);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.findById = (req, res) => {
    UserRole.findByPk(req.params.id)
        .then(role => {
            globalFunctions.sendResult(res, role);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.create = (req, res) => {
    UserRole.create({
        name: req.body.name
    }).then(role => {
        globalFunctions.sendResult(res, role);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.update = (req, res) => {
    UserRole.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then(role => {
        globalFunctions.sendResult(res, role);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    UserRole.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Роль пользователя удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
