$(function() {

  // initialize jQuery plugin
  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );

  let order = []; // array of line item objects
  let lineItem = {} // {item: val, price: val}
  let subtotal = 0;
  let tax = 0;
  let total = 0;
  // let toastMessage = ""; // may use later

  $('.add-to-order').click(function() {

    let item = $(this).prev().children('.item-name').text();
    let price = $(this).prev().children('.item-price').text().substr(1) * 1; // remove currency indicator and cast as number
    lineItem = {
      item: item,
      price: price
    }
    order.push(lineItem);

    // add line item to the table
    $('tbody').append('<tr><td>' + item + '</td><td class="right-align">' + price + '</td></tr>')

    // update the order totals
    subtotal = 0;
    order.forEach(lineItem => {
      subtotal += lineItem.price;
    });

    tax = subtotal * 0.09;
    total = subtotal + tax;

    // upadate table totals
    $('#subtotal').text('$' + subtotal.toFixed(2));
    $('#tax').text('$' + tax.toFixed(2));
    $('#total').text('$' + total.toFixed(2));

  });


  $("#delivery-form").on("submit", function() {

    var name = $('#name').val();
    var phone = $('#phone').val();
    var address = $('#address').val();
    if (order.length > 0 && name.length > 0 && phone.length > 0 && address.length > 0) {
      Materialize.toast('Success! Thank you for your order!', 5000);
    } else {
      Materialize.toast("Unfortunately, we could not complete your order.", 5000);
    }
    return false;
  });


  // $('.card-action').first().click();
  // $('.card-action').last().click();


});
