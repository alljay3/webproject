const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('listing', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1200),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'listing_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'listing',
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
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
