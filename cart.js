/********* Cart Constructor ****/

var cartObject = {
  "howmany": null,
  "qty": null,
  "second": null,
  "third": null,
}

var cartArray = [];


/********* Basic Functions ****/


function swapImgs(){
  //swaps product img on select dropdown change
  var img = document.getElementById("single_bun_img");
  if (this.value == "6"){
    img.src = "./imgs/maple_apple_pecan_halfdozen.png";
  }
  else if (this.value == "12") {
    img.src = "./imgs/maple_apple_pecan_dozen.png";
  }
  else{
    img.src = "./imgs/maple_apple_pecan.png";
  }
  return false;
}

function getLSCart(){
  // parses localStorage cartArray into object
  c = JSON.parse(localStorage.getItem("cartArray"));
  return c;
}

function numItemsInCart(cartArray) {
  tempTotal = 0;
  for (var i = cartArray.length - 1; i >= 0; i--) {
    tempTotal += JSON.parse(cartArray[i]["howmany"])
  }
  return tempTotal;
}

function updateMenuCart() {
  if (localStorage != "undefined"){
    $("#cart_menu_txt").text("Your Cart (" + numItemsInCart(JSON.parse(localStorage.cartArray)) + ")");
  }
  return false;
}

function getItemsFromCart() {
  stuff = JSON.parse(localStorage.cartArray);
  return stuff;
}

function cartTotal(){
  var subtotal = 0;
  if (localStorage != "undefined"){
      for (var i = getItemsFromCart().length - 1; i >= 0; i--){
        subtotal += (3 * getItemsFromCart()[i]["howmany"] * getItemsFromCart()[i]["qty"]);
      }
    }
  return subtotal;
}

function itemSubtotal(index){
  var subtotal = 0;
  subtotal = (3 * getItemsFromCart()[index]["howmany"] * getItemsFromCart()[index]["qty"]);
  return subtotal;
}


//On Cart Page, populate Table with localStorage Values
function updateCartTable(){
  if (localStorage != "undefined"){
          for (var i = getItemsFromCart().length - 1; i >= 0; i--) {

            $("#cart").find('tbody').append($('<tr class="product-row" id="prod_' + i + '">'));

            cartObject = getItemsFromCart()[i];

            var howmany = cartObject["howmany"];
            var qty = cartObject["qty"];
            var second = cartObject["second"];
            var third = cartObject["third"];

            $(".img-col").find($("#prod_" + i +"").append($('<td class="image-col"> ').append($('<img> ').attr("src", "./imgs/maple_apple_pecan_halfdozen.png"))));
            $(".product-col").find($("#prod_" + i +"").append($('<td class="product-col"> ').text("Mainly Maple but also " + second + " and " +  third + " too")));
            $(".edit-col").find($("#prod_" + i +"").append($('<td class="edit-col"> ').text("Remove from Cart")));
            $(".quant-col").find($("#prod_" + i +"").append($('<td class="quant-col"> ').text(howmany)));
            $(".subtotal-col").find($("#prod_" + i +"").append($('<td class="subtotal-col"> ').text(itemSubtotal(i))));

            $("#cart").find('tbody').append($('</tr>'));
          }
    }
  return getItemsFromCart();
}



/********* Document Load ****/

$(document).ready(function() {

  // menu cart
  updateMenuCart();

  // print CartArray object from localStorage
  console.log(getLSCart());

  // update full Cart Table
  // updateCartTable();

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

    // Swap images on dropdown change
    swapImgs();
    document.getElementById("quantity_select").onchange = swapImgs;


    // Add items number to Cart(i) in Menu
    updateMenuCart();

  });
});




// JSON.parse(localStorage.cartArray).length

  // add table row
    // add image-col  if 1, 6 or 12, swap img
    // add product-col write name of prodct - also add second and third flavors + qty
    // add edit-col - nothing
    // add quant-col - howmany
    // add subtotal-col = howmany * qty * price

  // On remove click
    // table remove
    // entire line


