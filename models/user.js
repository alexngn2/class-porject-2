// Requiring bcrypt for password hashing.
var bcrypt = require("bcryptjs");

// Creating User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
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

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.associate = function(models) {
    // Associating User with WishlistStocks
    // When a User is deleted, also delete any associated wishlist stocks
    User.hasMany(models.StocksWishlist, {
      onDelete: "cascade"
    });
  }; 
  
  User.associate = function(models) {
    // Associating User with StocksOwned
    // When a User is deleted, also deletes any associated owned stocks
    User.hasMany(models.StocksOwned, {
      onDelete: "cascade"
    });
  };   
  return User;
};