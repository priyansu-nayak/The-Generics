// console.log("Here 2");
//In our html we're loading our script tag inside of the
// head ,this means that our script tag will load
// before all of the content inside of our body

// In general things inside of the head will
// load in the background while the body of your page is
// being loaded but script tags are different in that
// while a script tag is being loaded nothing else
// on the page can continue loading

// In order to get around this
// and make our script tag load in the background we need to add the async
// attribute here which tells our browser in order to download this store.js
// page in the background and continue downloading the
// actual body of our HTML page at the same time.

//16:20
// if the body of our page loads after the
// JavaScript loads our JavaScript will run
// here but there's no body for it to run
// off of which means it wont be able to
// find any of these different elements
// since they havent been generated yet so
// in order to check to see if the page is
// done loading we need to go to the very
// top of our javascript page
// 16:50

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
  //if the specified event happens, load the ready function
} else {
  ready();
}

// hooking up the buttons will automatically work
// even if the page isnt already loaded because
// it'll just wait for this event of the
// DOMContentLoaded before it actually calls
// the ready function

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger"); //it's  an array
  //document is an object that JavaScript gives to
  //your page that essentially says this document object
  //is everything inside of your HTML

  console.log(removeCartItemButtons);

  // to add event listener ,loop thru it

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItems);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");

  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
} //ready() ends

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  //I used src attribute
  console.log(title, price, imageSrc);

  addItemToCart(title, price, imageSrc);
  //Main lesson of the tutorial
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  //   if we run this document create element it's going
  // to create a brand new div it's not going to add it to our HTML yet
  // but we have a div that we can now later add to our HTML

  cartRow.classList.add("cart-row");
  //to add the class to a new created div
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
      //stops the function from further execution and sends back to where it was called
    }
  }

  var cartRowContents = `
          <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${imageSrc}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>

          <span class="cart-price cart-column">${price}</span>

          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>
`;
  // " ` " is called  backtick and  is used to write multiple lines ,instead of quotation marks

  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  //adds cartItems just before </div> of div.cart-items
  // remove button not working on newly created div in addItemToCart
  // bcoz we only added these event listeners as soon as our
  //document loaded and this remove button was not here when
  // the document loaded this was added after we loaded the
  // document

  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItems);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

// Now gonna go to html to remove default items added to cart

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItems(event) {
  //take our function here and this event listener always
  //returns an event object inside of the function that it
  // calls this event
  console.log("clicked");
  // this event object has a property on it called target so

  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  //there's only one cart-items class
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  //there's 3 cart-row classes
  var total = 0;

  for (var i = 1; i < cartRows.length; i++) {
    //I put i=1 bcoz oth index cart-row class contained column names -> items price quantity
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    // console.log(priceElement,quantityElement);
    // var price=priceElement.innerText;
    // to remove $ sign
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    console.log("price=" + price);
    var quantity = quantityElement.value;
    //bcoz input elements dont have Text content also value is an attribute
    console.log("quantity=" + quantity);
    total = total + price * quantity;
    //total is outta this for loop
    console.log("Total =" + total);
  } //loop ends
  total = Math.round(total * 100) / 100;
  // first total is multiplied with 100 to move 2 decimal places
  // towards right ,after that its rounded that means number now
  // doesn't contain any decimal value
  // after again its divided by 100 to move 2 deci places towards left
  // e.g  number= 12.454545
  // step 1- 1245.4545
  // step 2- 1245 or 1246 if(number = 1245.5545)
  // step 3- 1245/100 = 12.45

  var cartTotal = document.getElementsByClassName("cart-total-price")[0];
  cartTotal.innerText = "$" + total;
}

// 18:24
