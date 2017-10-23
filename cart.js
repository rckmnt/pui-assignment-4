/********* Cart Constructor ****/

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

function updateMenuCart() {
  if (localStorage != "undefined"){
    $("#cart_menu_txt").text("Your Cart (" + JSON.parse(localStorage.cartArray).length + ")");
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

function updateCartTable(){
  //On Cart Page, populate Table with localStorage Values

  if (localStorage.length){
        for (var i = getItemsFromCart().length - 1; i >= 0; i--) {

          // add table row
          $("#cart").find('tbody').append($('<tr class="product-row" id="prod_' + i + '">'));

          cartObject = getItemsFromCart()[i];

          var howmany = cartObject["howmany"];
          var qty = cartObject["qty"];
          var second = cartObject["second"];
          var third = cartObject["third"];

          // innerHTML
          var p_id = "#prod_" + i +"";
          var link = "product_detail.html";
          var img = whichImg(qty);
          var remove_button = $('<input type="button" id="remove" value="[remove]"/>');
          var one_bun = '<td class="product-col"> <a href=' + link + '> Maple Buns (' + whichQty(qty) + ')</a>';
          var two_three_bun = '<td class="product-col"> <a href=' + link + '> Maple Buns (' + whichQty(qty) + ' + alt. '+ second + " + " +  third + " too </a>";


          // add image-col  if 1, 6 or 12, swap img
          $(".img-col").find($(p_id).append($('<td class="image-col"> <a href=' + link + '> <img class="product-image" src="' + img + '"></a>')));
          // add product-col write name of prodct - also add second and third flavors + qty
          if (second == 'None') {
            $(".product-col").find($(p_id).append($(one_bun)));
          }
          else{
             $(".product-col").find($(p_id).append($(two_three_bun)));
          }
          // add edit-col - Remove button
          $(".edit-col").find($(p_id).append($('<td class="edit-col"> ').append(remove_button)));
          // add quant-col - howmany
          $(".quant-col").find($(p_id).append($('<td class="quant-col"> ').text("x " + howmany)));
          // add subtotal-col = howmany * qty * price
          $(".subtotal-col").find($(p_id).append($('<td class="subtotal-col"> ').text("$" + itemSubtotal(i) + ".00")));

          // End of Table
          $("#cart").find('tbody').append($('</tr>'));

          // Table Foot
          $("#cart_qty").text("Total Qty: " + numItemsInCart(cartArray) + " pcs");
          $("#cart_total").text("Total Cost: $" + cartTotal() + ".00");
        }
  }
  else {
      $("#cart").find('tbody').append($('<h2> Nothing in Cart </h2'));
  }

  return getItemsFromCart();
}

function removeItemfromCart(){
  // On remove click
    // table remove
    // entire line
}




/********* Document Load ****/

$(document).ready(function() {

  // menu cart
  updateMenuCart();

  if (page[0] == 'p'){  // if page begins with a 'p' for product...

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

  // var alreadyCarted = JSON.parse(localStorage.getItem("cartArray"));


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
    console.log("cartObject: " + cartObject);
    if (localStorage != null){
      cartArray.push(cartObject);
      localStorage.setItem("cartArray", JSON.stringify(cartArray));
      // alreadyCarted.splice(-1, 0, cartObject);
    }

    // draw Cart Table
    updateCartTable();

  });
});






