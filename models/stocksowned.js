module.exports = function(sequelize, DataTypes) {
    var StocksOwned = sequelize.define("StocksOwned", {
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
  
    StocksOwned.associate = function(models) {
      // StocksOwned belogs to a User
      StocksOwned.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }); 
    };
    return StocksOwned;
  };
  