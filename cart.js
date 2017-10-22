/********* Cart Constructor ****/

var cartObject = {"bun-types": null, "bun-count":null}
// var cart = JSON.parse(localStorage.getItem("cartObject"));
var hasSavedCart = false;


/********* Basic Functions ****/

//swaps product img on select dropdown change
function swapImgs(){
  var img = document.getElementById("single_bun_img");
  if (this.value == "6"){
    img.src = "./imgs/maple_apple_pecan_halfdozen.png";
    localStorage.setItem("cartObject", this.value);
  }
  else if (this.value == "13") {
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


/********* Document Load ****/

$(document).ready(function() {

  // Swap images on dropdown change
  swapImgs();
  document.getElementById("quantity_select").onchange = swapImgs;
  console.log("This is inside the jQuery ready func");

  $("#cart_menu_txt").text("Cart (" + localStorage.cartObject + ")");

  // var hasCartObject = false;
  getLSCart();

  // On Add to Click Button
  $("#cart_button").click(function() {
    butt = document.getElementById("quantity_select");
    if (butt.value == 13) {
      console.log("Value =" + butt.value);
      localStorage.setItem("cartObject", butt.value);
    } else if (butt.value == 6) {
      console.log("Value =" + butt.value);
      localStorage.setItem("cartObject", butt.value);
    } else{
      console.log("Value =" + butt.value);
      localStorage.setItem("cartObject", butt.value);
    };

    // Add items number to Cart(i) in Menu
    if (localStorage != "undefined"){
      $("#cart_menu_txt").text("Your Cart (" + localStorage.cartObject + ")");
    }
  });
});


