var DataTypes = require("sequelize").DataTypes;
var _listing = require("./listing");
var _listing_image = require("./listing_image");
var _listing_type = require("./listing_type");
var _user = require("./user");
var _user_data = require("./user_data");
var _user_role = require("./user_role");

function initModels(sequelize) {
  var listing = _listing(sequelize, DataTypes);
  var listing_image = _listing_image(sequelize, DataTypes);
  var listing_type = _listing_type(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_data = _user_data(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);

  listing.hasMany(listing_image, {  foreignKey: "listing_id", onDelete: "CASCADE"});
  user_role.hasMany(user, {foreignKey: "role_id", onDelete: "CASCADE"});
  user.hasMany(listing, {  foreignKey: "user_id", onDelete: "CASCADE"});
  listing_type.hasMany(listing, { foreignKey: "type_id", onDelete: "CASCADE"});
  
  user.hasOne(user_data, {foreignKey: "id"});
  
  listing.belongsTo(user, {  foreignKey: "user_id"});
  user_data.belongsTo(user, {  foreignKey: "id"});
  user.belongsTo(user_role, { foreignKey: "role_id"});
  listing.belongsTo(listing_type, {  foreignKey: "type_id"});
  listing_image.belongsTo(listing, { foreignKey: "listing_id"});
  return {
    listing,
    listing_image,
    listing_type,
    user,
    user_data,
    user_role,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
