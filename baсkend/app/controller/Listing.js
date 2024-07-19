var db = require('../config/db.config.js');
var Listing = db.listing; // название модели смотреть в init-models.js
var globalFunctions = require('../config/global.functions.js');
const { Op } = require("sequelize");


exports.findAll = (req, res) => {
    Listing.findAll()
        .then(objects => {
          
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    console.log(req);
    Listing.create({
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date_created: req.body.date_created,
        address: req.body.address,
        type_id: req.body.type_id 
    }).then(object => {
        globalFunctions.sendResult(res, object);
         
    }).catch(err => { 
        globalFunctions.sendError(res, err);
        console.log(err);
    })
};

exports.update = (req, res) => {
    Listing.update({
            user_id: req.body.user_id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            date_created: req.body.date_created,
            address: req.body.address,
            type_id: req.body.type_id 
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.delete = (req, res) => {
    Listing.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    Listing.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
//like         https://sequelize.org/docs/v6/core-concepts/model-querying-basics/     Разобраться с % в LIKE
exports.findByType = (req, res) => {
    Listing.findAll({
        where: {
            type_id: req.params.type_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findBySearchQuery = (req, res) => {
    Listing.findAll({
        where:{
            [Op.or]: [
                {
                    title:{
                        [Op.like]: req.body.search_query
                    }
                },
                {
                    description:{
                        [Op.like]: req.body.search_query
                    }
                }
            ]
        }
    
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
}