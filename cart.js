// cart.js

/*** Variables ***/
// var cartItems = [];


/*** Functions ***/
// on button + or - click change cart

function addToCart(argument) {
    // when adding on page, add to cart
}

function updateNavCart(){
    // blar
}

var cart = JSON.parse(localStorage.getItem("cartObject"));

function newCart(){

}

// swaps product img on select dropdown change
function swapImgs(){
  var img = document.getElementById("single_bun_img");
  if (this.value == "6"){
    img.src = "./imgs/maple_apple_pecan_halfdozen.png";
  }
  else if (this.value == "13") {
    img.src = "./imgs/maple_apple_pecan_dozen.png";
  }
  else{
    img.src = "./imgs/maple_apple_pecan.png";
  }
  return false;
}


/*** Document Load ****/

$(document).ready(function() {
  // Swap images on dropdown change
  swapImgs();
  document.getElementById("quantity_select").onchange = swapImgs;
  console.log("This is inside the jQuery ready func");

  // get Cart from localStorage
  var cart = JSON.parse(localStorage.getItem("cartObject"));

  // var hasCartObject = false;

  // if (cart === null) {
  //   $("#button-storage").text("Save cart");
  //   cart = generateRandomcart();
  // } else {
  //   $("#button-storage").text("Clear cart");
  //   hascartObject = true;
  // }

  $("#cart_button").click(function() {
    if (document.getElementById("quantity_select").value == 13) {
      console.log("Value =" + this.value);
    } else if (document.getElementById("quantity_select").value == 6) {
      console.log("Value =" + this.value);
    } else{
      console.log("Value =" + this.value);
    }

  // // update the page based on the animal properties
  // $("#animal-name").text(animal.name + " the " + animal.type);
  // $("#animal-img").attr("src", animal.image);


  // $("#button-storage").click(function() {
  //   if (hasSavedAnimal) {
  //     // clear the animal from the browser
  //     localStorage.removeItem("savedAnimal");
  //     // if this button was clicked, hide button and show feedback
  //     $("#button-storage").css("display", "none");
  //     $("#button-action-text").text("Cleared!");
  //     $("#button-action-text").css("display", "block");
  //   } else {
  //     // save the animal to the browser
  //     localStorage.setItem("savedAnimal", JSON.stringify(animal));
  //     // if this button was clicked, hide button and show feedback
  //     $("#button-storage").css("display", "none");
  //     $("#button-action-text").text("Saved!");
  //     $("#button-action-text").css("display", "block");
  //   }
  // });

});


