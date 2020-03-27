var APIKey = "bpulodvrh5rdgi0uf2ug";
var queryURL = "https://finnhub.io/api/v1" + "" + "&token=" + APIKey;
var stockSearch = "/stock/option-chain?symbol="; //
var searchSymbol; //for search bar, when user imputs stock symbol
var stockSymbolSearch = "/stock/symbol?exchange=US"; //so user can search for symbol with stock name
var stockTrends = "/stock/recommendation?symbol=" + stockSymbol; //stock recommendations to buy/sell, etc.
var stockSymbol;

//search for symbol
function getSymbol(){
    console.log("running");
    $.ajax({
      type: "GET",
      data: {
          apikey:"bpulodvrh5rdgi0uf2ug",
          format:"json",
      },
    
      url: "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bpulodvrh5rdgi0uf2ug",
      dataType: "json",
      contentType: 'application/json',
      success: function(data) {
          console.log(data);
      
      },  
      fail: function(error) {
        console.log(error);
      } 
    });
    };
    getSymbol();