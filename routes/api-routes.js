var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  // GET Route for getting all of the wishlist stocks for a user 
  app.get("/api/stocks-wishlist/:userid", function(req, res) {
    db.StocksWishlist.findAll({
      where: {
        UserId: req.params.userid
      }
    }).then(function(dbStocksWishlist) {
      res.json(dbStocksWishlist);
    });
  });

  // POST route for saving a stock in user's wishlist
  app.post("/api/stocks-wishlist/:userid", function(req, res) {
    console.log(req.body);
    db.StocksWishlist.create({
      "stock_symbol": req.body.stockSymbol,
      UserId: req.params.userid
    })
    .then(function(dbStock) {
        console.log(dbStock);
        res.json(dbStock)
    })
    .catch(function(err) {
      res.json(err);
    });
  });

  // DELETE route for deleting a stock from user's wishlist
  app.delete("/api/stocks-wishlist/:userid/:stockid", function(req, res) {
    db.StocksWishlist.destroy({
      where: {
        UserId: req.params.userid,
        id: req.params.stockid
      } 
    })
    .then(function(dbStockWishlist) {
      console.log(dbStockWishlist);
      res.json(dbStockWishlist);
    })
    .catch(function(err) {
      console.log(err);  
      res.json(err);
    });
  });


// GET Route for getting all of the stocks owned by a user 
app.get("/api/stocks-owned/:userid", function(req, res) {
    db.StocksOwned.findAll({
      where: {
        UserId: req.params.userid
      }
    }).then(function(dbStocksOwned) {
      res.json(dbStocksOwned);
    });
  });

  // POST route for saving a stock in user's stockes owned list
  app.post("/api/stocks-owned/:userid", function(req, res) {
    db.StocksOwned.create({
      "stock_symbol": req.body.stockSymbol,
      UserId: req.params.userid
    })
    .then(function(dbStock) {
        console.log(dbStock);
        res.json(dbStock)
    })
    .catch(function(err) {
      res.json(err);
    });
  });

  // DELETE route for deleting a stock from a user's stocks owned list
  app.delete("/api/stocks-owned/:userid/:stockid", function(req, res) {
    db.StocksOwned.destroy({
      where: {
        UserId: req.params.userid,
        id: req.params.stockid
      } 
    })
    .then(function(dbStockOwned) {
      console.log(dbStockOwned);
      res.json(dbStockOwned);
    })
    .catch(function(err) {
      console.log(err);  
      res.json(err);
    });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });  

};