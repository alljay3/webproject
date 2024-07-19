const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('listing_image', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'listing',
        key: 'id'
      }
    },
    link: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    mime_type: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'listing_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "listing_id",
        using: "BTREE",
        fields: [
          { name: "listing_id" },
        ]
      },
    ]
  });
};
