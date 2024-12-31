var AllData = [];
var main = document.getElementById("product-container");
var currentIndex = 0;

// Fetch products (initially and dynamically based on category)
function products(category = "") {
  var xhr = new XMLHttpRequest();

  var url = category 
    ? `https://fakestoreapi.in/api/products/category?type=${category}`
    : `https://fakestoreapi.in/api/products`

  xhr.open("GET", url, true);
  xhr.send();

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        AllData = JSON.parse(xhr.response); 
        display(); 
        displaySale();
      }
    }
  });
}

products(); 

// Display products in the main container
function display(filteredProducts = null) {
  var data = "";
  var productsToDisplay = filteredProducts || AllData.products.slice(currentIndex, currentIndex + 4);

  productsToDisplay.forEach((product, index) => {
    data +=  `                   
      <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card">
          <img src="${product.image}" height="300px" alt="Product Image">
          <div class="card-body">
            <h3>${product.title.split(" ").splice(0, 4).join(" ")}</h3>
            <h6>Price: ${product.price} $</h6>
            <div class="d-flex">
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <p class="mx-3">(88)</p>
            </div>
            <button class="btn btn-danger show-details" data-index="${index}">Show Details</button>
          </div>
        </div>
      </div> `;
  });

  main.innerHTML = data;

  // Add event listeners to Show Details buttons
  document.querySelectorAll(".show-details").forEach((button) => {
    button.addEventListener("click", function () {
      var productIndex = parseInt(button.getAttribute("data-index"));
      var product = productsToDisplay[productIndex];
      ProductInfo(product); // Call ProductInfo with the selected product
    });
  });
}








// Left and Right Buttons
document.getElementById("prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 4;
    display();
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentIndex + 4 < AllData.products.length) {
    currentIndex += 4;
    display();
  }
});

// Search Functionality in All Products section
document.getElementById("allProductsSearchButton").addEventListener("click", () => {
  var searchTerm = document.getElementById("allProductsSearchInput").value;
  var filteredProducts = AllData.products.filter((product) =>
    product.title.includes(searchTerm)
  );
  display(filteredProducts);
});

// Add an event listener for Enter key in the search input
document.getElementById("allProductsSearchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.getElementById("allProductsSearchButton").click();
  }
});

// Category Buttons
var categoryButtons = document.querySelectorAll(".categoryBtn");
categoryButtons.forEach(button => {
  button.addEventListener("click", function() {
    var category = button.value;
    products(category);
    console.log(category);
  });
});

// Countdown Timer for Sales
var countDownDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

var countdownFunction = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "SALE ENDED";
  }
}, 1000);

// Display sales products
function displaySale(filteredProducts = null) {
  // Ensure AllData.products exists and is an array
  if (!AllData || !Array.isArray(AllData.products)) {
    console.warn("AllData.products is not defined or not an array.");
    return;
  }

  // Use filteredProducts or the next 4 products from AllData.products
  var productsToDisplay = filteredProducts || AllData.products.slice(currentIndex, currentIndex + 4);

  var data = ""; 

  productsToDisplay.forEach((product) => {
    data += `                    
      <div class="col-lg-3 col-md-4 col-sm-6 my-3">
        <div class="card">
          <img src="${product.image}" alt="Product Image">
          <div class="card-body">
            <h3>${product.title.split(" ").splice(0, 4).join(" ")}</h3>
            <h6>
              <span class="line">${product.price}$</span> 
              &nbsp; &nbsp;${(product.price * 60 / 100).toFixed(2)}$
            </h6>
            <div class="d-flex">
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <p class="mx-3">(88)</p>
            </div>
          </div>
        </div>
      </div>`;
  });

  var sale = document.getElementById("sale");
  sale.innerHTML = data;
}


displaySale();




function ProductInfo(product) {
  var title = document.getElementById("title")
  var Brand = document.getElementById("Brand")
  var Model = document.getElementById("Model")
  var Color = document.getElementById("Color")
  var Description = document.getElementById("Description")
  var Price = document.getElementById("Price")
  var img = document.getElementById("prodImg")


  var hiddenDiv = document.getElementById("popup")


  title.innerText = product.title.split(" ").splice(0, 4).join(" ")
  Brand.innerText = product.brand
  Model.innerText = product.model
  Color.innerText = product.color
  Description.innerText = product.description.split(" ").splice(0, 10).join(" ")
  Price.innerText = product.price + " $"
  img.src = product.image;


  hiddenDiv.classList.remove("hidden")

}


function closeInfo(){
  var hiddenDiv = document.getElementById("popup")
  hiddenDiv.classList.add("hidden")

}


// add to locat storage 

// document.getElementById('addToCartBtn').onclick = function() {
//   var title = document.getElementById('title').innerText;
//   var brand = document.getElementById('Brand').innerText;
//   var model = document.getElementById('Model').innerText;
//   var color = document.getElementById('Color').innerText;
//   var description = document.getElementById('Description').innerText;
//   var price = document.getElementById('Price').innerText;

//   var product = {
//       title: title,
//       brand: brand,
//       model: model,
//       color: color,
//       description: description,
//       price: price
//   };

//   var cart = JSON.parse(localStorage.getItem('cart')) || [];
//   cart.push(product);
//   localStorage.setItem('cart', JSON.stringify(cart));

//   alert('Product added to cart!');
// };

document.getElementById('addToCartBtn').onclick = function() {
  var title = document.getElementById('title').innerText;
  var brand = document.getElementById('Brand').innerText;
  var model = document.getElementById('Model').innerText;
  var color = document.getElementById('Color').innerText;
  var description = document.getElementById('Description').innerText;
  var price = parseFloat(document.getElementById('Price').innerText.replace('$', ''));
  var image = document.getElementById('prodImg').src;

  var product = {
      id: Date.now(),
      title: title,
      brand: brand,
      model: model,
      color: color,
      description: description,
      price: price,
      image: image,
      quantity: 1
  };

  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  var existingProduct = cartItems.find(item => item.title === product.title);
  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      cartItems.push(product);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert('Product added to cart!');
};



// document.getElementById('loveBtn').onclick = function() {
  
  

//   var loveItems = JSON.parse(localStorage.getItem('loveItems')) || [];

//   var existingProduct = loveItems.find(item => item.title === product.title);
//   var loveBtn = document.getElementById('loveBtn');

//   if (existingProduct) {
//       // Remove from loveItems
//       loveItems = loveItems.filter(item => item.title !== product.title);
//       loveBtn.classList.remove('loved');
//       loveBtn.innerHTML = '<img src="images/heart.png" alt="Love Icon" class="love-icon"> Love';
//   } else {
//       // Add to loveItems
//       loveItems.push(product);
//       loveBtn.classList.add('loved');
//       loveBtn.innerHTML = '<img src="images/heart.png" alt="Loved Icon" class="love-icon"> Loved';
      
//   }

//   localStorage.setItem('loveItems', JSON.stringify(loveItems));
// };


document.getElementById('loveBtn').onclick = function() {
  var title = document.getElementById('title').innerText;
  var brand = document.getElementById('Brand').innerText;
  var model = document.getElementById('Model').innerText;
  var color = document.getElementById('Color').innerText;
  var description = document.getElementById('Description').innerText;
  var price = parseFloat(document.getElementById('Price').innerText.replace('$', ''));
  var image = document.getElementById('prodImg').src;

  var product = {
      id: Date.now(),
      title: title,
      brand: brand,
      model: model,
      color: color,
      description: description,
      price: price,
      image: image
  };

  var wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  var loveBtn = document.getElementById('loveBtn');

  var existingProduct = wishlistItems.find(item => item.title === product.title);
  if (existingProduct) {
      wishlistItems = wishlistItems.filter(item => item.title !== product.title);
      loveBtn.classList.remove('loved');
      loveBtn.innerHTML = '<img src="images/heart.png" alt="Love Icon" class="love-icon"> Love';
  } else {
      wishlistItems.push(product);
      loveBtn.classList.add('loved');
      loveBtn.innerHTML = '<img src="images/heart.png" alt="Loved Icon" class="love-icon"> Loved';
  }

  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
};



