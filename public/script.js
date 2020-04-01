var APIKey = "bpulodvrh5rdgi0uf2ug";
var queryURL = "https://finnhub.io/api/v1" + "" + "&token=" + APIKey;
var searchSymbol; //for search bar, when user imputs stock symbol
var stockSymbolSearch = "/stock/symbol?exchange=US"; //so user can search for symbol with stock name
var stockTrends = "/stock/recommendation?symbol=" + stockSymbol; //stock recommendations to buy/sell, etc.
var stockSymbol = "AAPL"
var globalStocklist;

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
      var stockName = data[0,1,2].displaySymbol;
      globalStocklist = data;
      console.log(stockName);
      
      },  
      fail: function(error) {
        console.log(error);
      } 
    });
    };

    function searchForStock() {
      var userInput = document.getElementById("searchBar").value;
      userInput = userInput.toLowerCase();
      var newList = []
      globalStocklist.map(stock => {
        stock.description = stock.description.toLowerCase();
        console.log("input",userInput);
        //console.log("stock",stock);
        if (stock.description.includes(userInput)) {
        console.log("stock",stock);
          newList.push(stock)
          //return stock.symbol;
        }
        //console.log("input",userInput);
        //console.log("stock",stock);

      })
      console.log("new",newList);

      //call for dropdown display
      displaySearchResults(newList);
    }

    function displaySearchResults(newList) {
      
      newList.forEach(stock => {
        var div = $('<div>');
        div.text(`${stock.description} -- ${stock.symbol}`)
        $("#searchResults").append(div);
      })
    }

    document.getElementById("searchButton").addEventListener("click", function(event) {
      event.preventDefault();
      searchForStock();
    });

    function getRecommendations(){
        console.log("rec");
        $.ajax({
          type: "GET",
          data: {
              apikey:"bpulodvrh5rdgi0uf2ug",
              format:"json",
          },
        
          url: "https://finnhub.io/api/v1/stock/recommendation?symbol=" + stockSymbol + "&token=" + APIKey,
          dataType: "json",
          contentType: 'application/json',
          success: function(data) {
              console.log(data);
          var currentRec = data[0];
          console.log(currentRec);
          
          },  
          fail: function(error) {
            console.log(error);
          } 
        });
      };

    getSymbol();
    getRecommendations();