// Импортируем необходимые модули
var db = require('../config/db.config.js');
var ListingType = db.listing_type; // Обратите внимание на название модели
var globalFunctions = require('../config/global.functions.js');
const { Op } = require("sequelize");

// Определение контроллеров
exports.findAll = (req, res) => {
    ListingType.findAll()
        .then(types => {
            globalFunctions.sendResult(res, types);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.findById = (req, res) => {
    ListingType.findByPk(req.params.id)
        .then(type => {
            globalFunctions.sendResult(res, type);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.findByName = (req, res) => {
    ListingType.findOne({
        where: {
            name: req.params.name
        }
    }).then(type => {
        globalFunctions.sendResult(res, type);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findByNameLike = (req, res) => {
    ListingType.findAll({
        where: {
            name: {
                [Op.like]: `%${req.params.name}%`
            }
        }
    }).then(types => {
        globalFunctions.sendResult(res, types);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.create = (req, res) => {
    ListingType.create({
        name: req.body.name
    }).then(type => {
        globalFunctions.sendResult(res, type);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.update = (req, res) => {
    ListingType.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then(type => {
        globalFunctions.sendResult(res, type);
    }).catch(err => {
        console.log(e);
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    ListingType.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Тип записи удален');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
