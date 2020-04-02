var APIKey = "bpulodvrh5rdgi0uf2ug";
var queryURL = "https://finnhub.io/api/v1" + "" + "&token=" + APIKey;
var searchSymbol; //for search bar, when user imputs stock symbol
var stockSymbolSearch = "/stock/symbol?exchange=US"; //so user can search for symbol with stock name
var globalStocklist;

let userWishlist = [];

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

    //searchbar function
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

      //call to display list items
      displaySearchResults(newList);
    }

    //append list items to page, so user can click on which ones they wish to add
    function displaySearchResults(newList) {
      
      newList.forEach(stock => {
        var div = $('<button>');
        div.attr("class", "searchRes");
        div.text(`${stock.description}--${stock.symbol}`)
        $("#searchResults").append(div);
      })
    }
   
    //click function so user can add stocks to wishlist
    $(document).on("click", ".searchRes", function() {
      console.log("results", this);
      var clickStock = $(this).text();
      clickStock = clickStock.split("--")[1];
      let stockExists = false;
      userWishlist.forEach(stock => {
        if(stock === clickStock) {
          stockExists = true;
        }
      })
      if(stockExists === false) {
      console.log(clickStock);
      userWishlist.push(clickStock);
      renderWishlist();
      getRecommendations();
    }
    });

    //appends stock symbols to wishlist
    function renderWishlist() {
      if(userWishlist.length !== 0) {
        $("#wishlist").empty();
        userWishlist.forEach(stock => {
          var div = $('<div>');
          div.text(stock);
          console.log("render wishlist", stock);
          $("#wishlist").append(div);
        })
      }
    }

    //search button
    document.getElementById("searchButton").addEventListener("click", function(event) {
      event.preventDefault();
      searchForStock();
    });

    //takes stock symbol parameters from search and add functions, and gets stock recommendations from api
    function getRecommendations(){
        if(userWishlist) {
          userWishlist.forEach(stockSymbol => {
            
          
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
    })
  }
}
getSymbol();
renderWishlist();