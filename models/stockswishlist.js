module.exports = function(sequelize, DataTypes) {
  var StocksWishlist = sequelize.define("StocksWishlist", {
    stock_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // only allow values >= 1
        min: 1
      }
    }
  },
  {
    // Model tableName will be same as the model name instead of being pluralized
    freezeTableName: true
  }
);

  StocksWishlist.associate = function(models) {
    // StocksWishlist belogs to a User
    StocksWishlist.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    }); 
  };
  return StocksWishlist;
};
