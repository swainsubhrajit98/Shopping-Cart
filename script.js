const API_URL =
  "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

const itemQuantity = document.getElementById("itemQuantity");
const itemSubTotal = document.getElementById("itemSubtotal");
const itemTotal = document.getElementById("total");
const subTotal = document.getElementById("subtotal");
var itemPrice;
var inputValue;

// Fetch the API data
fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const item = data.items[0];

    // Set the values in the DOM
    document.getElementById("itemImage").src = item.image;
    document.getElementById("itemTitle").textContent = item.title;
    document.getElementById("itemPrice").textContent = formatToCurrency(
      item.price
    );
    itemPrice = item.price;
    if (localStorage.getItem("itemQuantity") == null) {
      itemQuantity.value = item.quantity;
      itemSubTotal.textContent = formatToCurrency(item.final_price);
      itemTotal.textContent = formatToCurrency(item.final_price);
      subTotal.textContent = formatToCurrency(item.final_price);
    } else {
      inputValue = localStorage.getItem("itemQuantity");
      itemQuantity.value = inputValue;
      itemSubTotal.textContent =
        itemTotal.textContent =
        subTotal.textContent =
          formatToCurrency(itemPrice * inputValue);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

function formatToCurrency(amount) {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return formattedAmount.replace("₹", "Rs. ");
}

function removeQuantity() {
  if (inputValue != 0) {
    debugger;
    inputValue = inputValue - 1;
    itemQuantity.value = inputValue;
    itemSubTotal.textContent =
      itemTotal.textContent =
      subTotal.textContent =
        formatToCurrency(itemPrice * inputValue);
    localStorage.setItem("itemQuantity", inputValue);
  }
}
function updatePrice(event) {
  debugger;
  inputValue = event.target.value;
  itemSubTotal.textContent =
    itemTotal.textContent =
    subTotal.textContent =
      formatToCurrency(inputValue * itemPrice);
  localStorage.setItem("itemQuantity", inputValue);
}
function validateNumber(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}
 // Toggle menu visibility with animation
 function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
}

// Close the menu when clicking outside
document.addEventListener('click', (event) => {
  const menu = document.getElementById('menu');
  const button = document.querySelector('.menu-button');
  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.classList.remove('active');
  }
});
