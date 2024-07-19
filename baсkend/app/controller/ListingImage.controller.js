var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var sequelize = db.sequelize;
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');
const listing = require('../model/listing.js');

var ListingImage = db.listing_image;

exports.findAll = (req, res) => {
    ListingImage.findAll({})
    .then(async objects => {
        var result = [];
        await (objects).forEach(async (object) => {
            object = object.dataValues;
            console.log("  /////////////////      " + object.link)
            var contents = fs.readFileSync(object.link, {encoding: 'base64'});
            var data = {
                id: object.id,
                name: object.name,
                file: contents,
                mime_type: object.mime_type,
                listing_id: object.listing_id
            };
            result.push(data);
        });
        globalFunctions.sendResult(res, result);
    })
    .catch(err => {
        console.log(err);
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    ListingImage.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = async (req, res) => {
    // создаём объект для чтения данных, переданных со стороны клиента (передавали объект FormData)
    var form = new multiparty.Form();

    // читаем данные
    await form.parse(req, async (err, fields, files) => {
        if (!err) {
            var mimeType = files.file[0].headers['content-type']; // тип файла указывается так: image/png
            var listingId = fields.listing_id[0];
            expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение
            var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
            var link = './files/' + newName;

            console.log(link)
            console.log(listingId)
            fs.copyFile(files.file[0].path, link, (err) => {
                if (err) {
                    throw err;
                }
            });
            ListingImage.create({
                listing_id: listingId,
                link: link,
                mime_type: mimeType
            }).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                //console.log(err);
                globalFunctions.sendError(res, err);
            })
        }
        else{
            globalFunctions.sendError(res, err);
        }
    });
};

exports.delete = (req, res) => {
    ListingImage.findByPk(req.params.id)
    .then(async (object) => {
        // удаляем файл
        await fs.unlinkSync(object.dataValues.link);
        await ListingImage.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            globalFunctions.sendResult(res, 'Запись удалена');
        }).catch(err => {
            globalFunctions.sendError(res, err);
        });
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findByListingId = (req, res) => {
    const listing_id = req.params.listing_id;

    ListingImage.findAll({
        where: {
            listing_id: listing_id
        }
    })
    .then(async objects => {
        var result = [];
        await (objects).forEach(async (object) => {
            object = object.dataValues;
            console.log("  /////////////////      " + object.link)
            var contents = fs.readFileSync(object.link, {encoding: 'base64'});
            var data = {
                id: object.id,
                name: object.name,
                file: contents,
                mime_type: object.mime_type
            };
            result.push(data);
        });
        globalFunctions.sendResult(res, result);
    })
    .catch(err => {
        console.log(err);
        globalFunctions.sendError(res, err);
    });
};
