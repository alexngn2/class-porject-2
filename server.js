var express = require("express");
// const WebSocket = require("ws");
// const socket = new WebSocket('wss://ws.finnhub.io?token=');

var PORT = process.env.PORT || 8080;
// var db = require("./models");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//add passport here if decided

require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
// });

// Connection opened -> Subscribe
// socket.addEventListener('open', function (event) {
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// // Unsubscribe
//  var unsubscribe = function(symbol) {
//     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
// }

