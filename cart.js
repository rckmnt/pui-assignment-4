/********* Cart Constructor ****/

var cartObject = {
  "howmany": null,
  "qty": null,
  "second": null,
  "third": null,
}

// var cart = JSON.parse(localStorage.getItem("cartObject"));
var hasSavedCart = false;

var cartArray = [];

/********* Basic Functions ****/

//swaps product img on select dropdown change
function swapImgs(){
  var img = document.getElementById("single_bun_img");
  if (this.value == "6"){
    img.src = "./imgs/maple_apple_pecan_halfdozen.png";
    localStorage.setItem("cartObject", this.value);
  }
  else if (this.value == "12") {
    img.src = "./imgs/maple_apple_pecan_dozen.png";
    localStorage.setItem("cartObject", this.value);
  }
  else{
    img.src = "./imgs/maple_apple_pecan.png";
    localStorage.setItem("cartObject", this.value);
  }
  return false;
}

function getLSCart(){
  c = localStorage.getItem("cartObject");
  console.log(c);
}

function itemsInCart(cartArray) {
  tempTotal = 0;
  for (var i = cartArray.length - 1; i >= 0; i--) {
    tempTotal += JSON.parse(cartArray[i]["howmany"])
  }
  return tempTotal
}

JSON.parse(localStorage.cartArray)


/********* Document Load ****/

$(document).ready(function() {

  // Swap images on dropdown change
  swapImgs();
  document.getElementById("quantity_select").onchange = swapImgs;

  // var hasCartObject = false;
  getLSCart();

  // On Add to Click Button
  $("#cart_button").click(function() {
    howmany = document.getElementById("howmany_select");
    qty = document.getElementById("quantity_select");
    second = document.getElementById("second_flavor");
    third = document.getElementById("third_flavor");

    cartObject = {
      "howmany": howmany.value,
      "qty": qty.value,
      "second": second.value,
      "third": third.value,
    }

    // Puts clicked state into Cart Object / localStorage
    console.log(cartObject);
    cartArray.push(cartObject);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));

    // Add items number to Cart(i) in Menu
    if (localStorage != "undefined"){
      $("#cart_menu_txt").text("Your Cart (" + JSON.parse(localStorage.cartArray).length + ")");
    }
  });
});


