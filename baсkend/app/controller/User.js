var db = require('../config/db.config.js');
var User = db.user; // название модели смотреть в init-models.js
var globalFunctions = require('../config/global.functions.js');
const { Op } = require("sequelize");


exports.findAll = (req, res) => {
    User.findAll()
        .then(objects => {
          
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            globalFunctions.sendResult(res, user);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.findByEmail = (req, res) => {
    User.findOne({
        where: {
            email: req.params.email
        }
    }).then(user => {
        globalFunctions.sendResult(res, user);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.create = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role_id: req.body.role_id,
        profile_id: req.body.profile_id
    }).then(user => {
        globalFunctions.sendResult(res, user);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.update = (req, res) => {
    User.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role_id: req.body.role_id,
        profile_id: req.body.profile_id
    }, {
        where: {
            id: req.params.id
        }
    }).then(user => {
        globalFunctions.sendResult(res, user);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Пользователь удален');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};