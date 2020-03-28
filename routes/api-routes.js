var db = require("../models");

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

};