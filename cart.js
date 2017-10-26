/********* Cart Constructors ****/

var howmany;
var qty;
var second;
var third;

var cartObject = {
  "howmany": null,
  "qty": null,
  "second": null,
  "third": null,
}

var cartArray = [];

var page = location.pathname.split('/').slice(-1)[0];

/********* Basic Product Page Functions ****/


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

function showFlavorOptions(){
  // shows / hides alt flavors idepending on Single or not
  var q = $('#quantity_select option:selected').val()
  if (q == 1){
    $("#alt_flavors").hide();
  }
  else {
    $("#alt_flavors").show();
  }
  return false;
}



/********* Basic Cart Functions ****/


function whichImg(quantity){
  // returns proper img based on qty
  if (quantity == "6"){
    return "./imgs/maple_apple_pecan_halfdozen.png";
  }
  else if (quantity == "12") {
    return "./imgs/maple_apple_pecan_dozen.png";
  }
  else{
    return "./imgs/maple_apple_pecan.png";
  }
}

function whichQty(quantity){
  // returns proper string based on qty selected
  if (quantity == "6"){
    return "Half Dozen";
  }
  else if (quantity == "12") {
    return "Dozen";
  }
  else{
    return "Single";
  }
}

function getLSCart(){
  // parses localStorage cartArray into object
  c = JSON.parse(localStorage.getItem("cartArray"));
  return c;
}

function numItemsInCart() {
  tempTotal = 0;
  c = JSON.parse(localStorage.cartArray);
  if (c != null) {
    for (var i = c.length - 1; i >= 0; i--) {
      tempTotal += parseInt(c[i]["howmany"]);
    }
  }
  return tempTotal;
}
function guid(){
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
function updateMenuCart() {
  if (localStorage.getItem("cartArray")  === null){
    $("#cart_menu_txt").text("Your Cart (0)");
  }
  else{
    $("#cart_menu_txt").text("Your Cart (" + JSON.parse(localStorage.cartArray).length + ")");
  }
  return false;
}

function getItemsFromCart() {
  if (localStorage.getItem("cartArray")  === null) {
    stuff = false
  }
  else{
      stuff = JSON.parse(localStorage.cartArray);
  }
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

function updateCartTable(){
  // On Cart Page, populate Table with localStorage Values

  // Check if Local storage has content...
  if (localStorage.getItem("cartArray")  != null){
        for (var i = getItemsFromCart().length - 1; i >= 0; i--) {

          cartObject = getItemsFromCart()[i];

          // cartObject variables from locaStorage
          var howmany = cartObject["howmany"];
          var qty = cartObject["qty"];
          var second = cartObject["second"];
          var third = cartObject["third"];
          var guid = cartObject["guid"];

          // add table row
          $("#cart").find('tbody').append($('<tr class="product-row" id="prod_' + guid + '">'));


          // innerHTML variables
          var p_id = "#prod_" + guid +"";
          var link = "product_detail.html";
          var img = whichImg(qty);
          var remove_button = $('<input type="button" id="remove" value="remove"/>');
          var one_bun = '<td class="product-col"> <a href=' + link + '> Maple Buns (' + whichQty(qty) + ')</a>';
          var two_three_bun = '<td class="product-col"> <a href=' + link + '> Maple Buns (' + whichQty(qty) + ') + '+ second + " + " +  third + " too </a>";


          // Table building listeners
          // Image column
          $(".img-col").find($(p_id).append($('<td class="image-col"> <a href=' + link + '> <img class="product-image" src="' + img + '"></a>')));
          // Product column
          if (second == 'None') {
            $(".product-col").find($(p_id).append($(one_bun)));
          }
          else{
             $(".product-col").find($(p_id).append($(two_three_bun)));
          }
          // Edit Column - Remove button
          $(".edit-col").find($(p_id).append($('<td class="edit-col"> ').append(remove_button)));
          $(".edit-col").find($(remove_button).attr('id', 'remove_' + guid));
          // Quant column
          $(".quant-col").find($(p_id).append($('<td class="quant-col"> ').text("x " + howmany)));
          // Subtotal Column
          $(".subtotal-col").find($(p_id).append($('<td class="subtotal-col"> ').text("$" + itemSubtotal(i) + ".00")));

          // End of Table
          $("#cart").find('tbody').append($('</tr>'));

          // Table Foot
          $("#cart_qty").text("Total Qty: " + numItemsInCart(cartArray) + " pcs");
          $("#cart_total").text("Total Cost: $" + cartTotal() + ".00");
        }
      }
  return false;
}

function removeItemfromCart(guid){
    // delete from LocalStorage
    var removedCart;
    removedCart = getLSCart();
    console.log("removedCart: " + removedCart);
    var modifiedCart = [];
    modifiedCart = removedCart.splice(guid, 1);
    removedCart.push(cartObject);
    localStorage.setItem("cartArray", JSON.stringify(modifiedCart));

    // remove tr row using index from above
    var id = "#prod_" + guid;
    $("tr#prod_"+id).remove();
    // updateCartTable();
}


function printGUIDs() {
  for (var i = JSON.parse(localStorage.cartArray).length-1; i >= 0; i--) {
    console.log(JSON.parse(localStorage.cartArray)[i]["guid"])
  }
}



/********* Document Load ****/

$(document).ready(function() {

  // menu cart
  updateMenuCart();

  if (page[0] == 'p'){  // if page begins with a 'p' for product... total kludge i know

      // toggleFlavors dropdowns
      $("#alt_flavors").hide();
      $("#quantity_select").click(showFlavorOptions);

      // Swap images on dropdown change
      swapImgs();
      document.getElementById("quantity_select").onchange = swapImgs;
  }

  // print CartArray object from localStorage
  console.log(getLSCart());

  // update full Cart Table
  updateCartTable();
  $("#refresh_button").click(updateCartTable);


  if (localStorage.getItem("cartArray")  === null) {
    $("#cart").hide();
    $("h1").append(' - Empty');
  }

  // On Add to Click Button
  $("#cart_button").click(function() {
      howmany = document.getElementById("howmany_select");
      qty = document.getElementById("quantity_select");
      second = document.getElementById("second_flavor");
      third = document.getElementById("third_flavor");

      var cartObject = {
        "howmany": howmany.value,
        "qty": qty.value,
        "second": second.value,
        "third": third.value,
        "guid": guid(),
      }

      // Puts clicked state into Cart Object / localStorage
      if (localStorage.getItem("cartArray")  != null){
        var oldCart;
        oldCart = getLSCart();
        console.log("oldCart: " + oldCart);
        console.log("cartObject: " + getLSCart());
        oldCart.push(cartObject);
        localStorage.setItem("cartArray", JSON.stringify(oldCart));
      }
      else{
        cartArray.push(cartObject);
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
      }

      // draw Cart Table
      updateCartTable();

      // menu cart
      updateMenuCart();
  });

  // Event listener for REMOVE button
  $("input").click(function(event) {
    // find which index you clicked
    var idClicked = this.id;
    index = idClicked[idClicked.length - 1];

    removeItemfromCart(index);
    updateCartTable();
  });

});

