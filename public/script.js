var APIKey = "bpulodvrh5rdgi0uf2ug";
var queryURL = "https://finnhub.io/api/v1" + "" + "&token=" + APIKey;
var searchSymbol; //for search bar, when user imputs stock symbol
var stockSymbolSearch = "/stock/symbol?exchange=US"; //so user can search for symbol with stock name
var stockTrends = "/stock/recommendation?symbol=" + stockSymbol; //stock recommendations to buy/sell, etc.
var stockSymbol;

//search for symbol
function getSymbol(){
  var stockSearch = document.getElementById("searchBar").value;
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
      var stockName = data[0,1,2].displaySymbol;
      console.log(stockName);
      
      },  
      fail: function(error) {
        console.log(error);
      } 
    });
    };

    function getRecommendations(){
        console.log("rec");
        $.ajax({
          type: "GET",
          data: {
              apikey:"bpulodvrh5rdgi0uf2ug",
              format:"json",
          },
        
          url: "https://finnhub.io/api/v1/" + stockTrends + "&token=" + APIKey;
          dataType: "json",
          contentType: 'application/json',
          success: function(data) {
              console.log(data);
          //var stockName = data.message.body.displaySymbol[0,1,2];
          //console.log(stockName);
          
          },  
          fail: function(error) {
            console.log(error);
          } 
        });
      };

    getSymbol();