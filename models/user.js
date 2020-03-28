module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // checks for email format  
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    // Associating User with WishlistStocks
    // When a User is deleted, also delete any associated wishlist stocks
    User.hasMany(models.StocksWishlist, {
      onDelete: "cascade"
    });
  }; 
  
  User.associate = function(models) {
    // Associating User with WishlistStocks
    // When a User is deleted, also delete any associated wishlist stocks
    User.hasMany(models.StocksOwned, {
      onDelete: "cascade"
    });
  };   
  return User;
};