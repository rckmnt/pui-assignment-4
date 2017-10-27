// test.js

console.log("hleoo0");

  $("input").click(function() {
    console.log("TARD");
    // find which index you clicked

    var ID = $(this).attr("id");
    var clickGuid = ID.split('_')[1];

    console.log("Clicked ID:" + clickGuid);
    removeItemfromCart(clickGuid);
    updateMenuCart();
    updateCartTable();

  });
