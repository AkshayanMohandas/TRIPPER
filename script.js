
//Font Popup Panel
function fontToggle() {
    var fontaction = document.querySelector('.fontaction');
    fontaction.classList.toggle('active')
}

//Go to top
mybutton = document.getElementById("topBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}




//Add to cart
let carts = document.querySelectorAll('.add-to-cart');

let products = [
    {
        name: 'SRI LANKA TOURISM SAFETY PROTOCOLS',
        tag: 'product1',
        price: 1500,
        inCart: 0
    },
    {
        name: 'SRI LANKA TOUR GUIDE',
        tag: 'product2',
        price: 1200,
        inCart: 0
    },
    {
        name: 'YOUR TRAVEL GUIDE TO SRI LANKA',
        tag: 'product3',
        price: 2000,
        inCart: 0
    },
    {
        name: 'THE HISTORY OF ANCIENT SRI LANKA',
        tag: 'product4',
        price: 1600,
        inCart: 0
    },
    {
        name: 'COMPLETE GUIDE TO SIGIRIYA SRI LANKA',
        tag: 'product5',
        price: 1000,
        inCart: 0
    },
    {
        name: 'HOW TO HIKE PIDURANGALA & SIGIRIYA ROCK',
        tag: 'product6',
        price: 1400,
        inCart: 0
    },
    {
        name: 'YALA NATIONAL PARK',
        tag: 'product7',
        price: 1900,
        inCart: 0
    },
    {
        name: 'THINGS TO DO IN MIRISSA',
        tag: 'product8',
        price: 2400,
        inCart: 0
    },
    {
        name: 'KANDYAN DANCE',
        tag: 'product9',
        price: 9500,
        inCart: 0
    },
    {
        name: 'SCRIBBLE DRAWING',
        tag: 'product10',
        price: 4500,
        inCart: 0
    },
    {
        name: 'HUSBAND AND WIFE',
        tag: 'product11',
        price: 6000,
        inCart: 0
    },
    {
        name: 'TEA PLUCKING',
        tag: 'product12',
        price: 8000,
        inCart: 0
    },
    {
        name: 'BHARATANATYAM',
        tag: 'product14',
        price: 12000,
        inCart: 0
    },
    {
        name: 'SUN LOTUS',
        tag: 'product15',
        price: 7000,
        inCart: 0
    },
    {
        name: 'FISHING',
        tag: 'product16',
        price: 6500,
        inCart: 0
    },
    {
        name: 'SURF WELIGAMA',
        tag: 'product17',
        price: 1600,
        inCart: 0
    },
    {
        name: 'GALLE FORT',
        tag: 'product18',
        price: 1600,
        inCart: 0
    },
    {
        name: 'HORTON PLAINS',
        tag: 'product19',
        price: 1600,
        inCart: 0
    },
    {
        name: 'ISLAND LIFE',
        tag: 'product20',
        price: 1600,
        inCart: 0
    },
    {
        name: 'ISLAND VIBES',
        tag: 'product21',
        price: 1600,
        inCart: 0
    }
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNum(products[i]);
        totalCost(products[i]);
    }) 
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers){
        document.querySelector('.shopping-cart span').textContent = productNumbers;
    }
}

function cartNum(products) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        onLoadCartNumbers()
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.shopping-cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.shopping-cart span').textContent = 1;
    }

    setItems(products);   
}

function setItems(products){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	(cartItems);
}

function totalCost(products){
    let cartCost = localStorage.getItem('totalCost');
    
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }
}

function deleteItem(cartItem){
    let cartItems = localStorage.getItem("productsInCart")
    let total = localStorage.getItem("totalCost")
    let cartNumbers = localStorage.getItem("cartNumbers")
    cartItems = JSON.parse(cartItems);

    cartNumbers -= cartItems[cartItem].inCart
    total -= (cartItems[cartItem].price*cartItems[cartItem].inCart)

    delete cartItems[cartItem]

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumbers);
    localStorage.setItem("totalCost", total);
    location.reload();
}

function reduceOneItem(cartItem){
    let cartItems = localStorage.getItem("productsInCart")
    let total = parseFloat(localStorage.getItem("totalCost"))
    let cartNumbers = parseInt(localStorage.getItem("cartNumbers"))
    cartItems = JSON.parse(cartItems);

    if(parseInt(cartItems[cartItem].inCart) === 1) {
        delete cartItems[cartItem]
    } else {
        cartItems[cartItem].inCart -= 1
        cartNumbers -= 1
    }
    total -= parseFloat(cartItems[cartItem].price)

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumbers.toString());
    localStorage.setItem("totalCost", total.toString());
    location.reload();
}


function addOneItem(cartItem){
    let cartItems = localStorage.getItem("productsInCart")
    let total = parseFloat(localStorage.getItem("totalCost"))
    let cartNumbers = parseInt(localStorage.getItem("cartNumbers"))
    cartItems = JSON.parse(cartItems);

    cartNumbers += 1
    cartItems[cartItem].inCart += 1
    total += parseFloat(cartItems[cartItem].price)

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumbers.toString());
    localStorage.setItem("totalCost", total.toString());
    location.reload();
}


function displayCartMain() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    let productContainer = document.querySelector(".cart-products")
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-product-title">
                <div class="product-img">
                <i class="fas fa-trash" onclick="deleteItem('${item.tag}')"></i>
                   
                    
                    <img src ="img/product-images/${item.tag}.png">
                </div>
                <span>${item.name}</span>
            </div>
            <div class="cart-product-price">$${item.price}.00</div>
            <div class="cart-quantity">
                <i class="fas fa-plus-circle" onclick="addOneItem('${item.tag}')"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-minus-circle" onclick="reduceOneItem('${item.tag}')"></i>
            </div>
            <div class="cart-total">
                $${item.inCart * item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h3 class="basketTotalTitle">
                Basket Total
                </h3>
                <h3 class="basketTotal">
                    $${cartCost}.00
                </h3>
            </div>
        `;
    }
}

function displayCartModal() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    let productContainer = document.querySelector(".modal-cart-products")
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-product-title">
                <div class="product-img">
                    <img src ="img/product-images/${item.tag}.png">
                </div>
                <span>${item.name}</span>
            </div>
            <div class="cart-product-price">$${item.price}.00</div>
            <div class="cart-quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="cart-total">
                $${item.inCart * item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h2 class="basketTotalTitle">
                Total Cost
                </h2>
                <h2 class="basketTotal">
                    $${cartCost}.00
                </h2>
            </div>
        `;
    }
}

//Inputs empty validation
function formValidation(){

    var f = document.getElementById('fname').value;
    var l = document.getElementById('lname').value;
    var e = document.getElementById('email').value;
    var m = document.getElementById('mnum').value;
    var a = document.getElementById('address').value;
    var c = document.getElementById('city').value;
    var co = document.getElementById('country').value;
    var zip = document.getElementById('zipcode').value;

    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers == 0 || productNumbers == null){
        alert('Cart Empty, please add one or more items from shop!');
        return false;
    }

    if (f == '' || f == null || l == '' || l == null || e == '' || e == null || m == '' || m == null || a == '' || a == null || c == '' || c == null || co == '' || co == null || zip == '' || zip == null){
        alert('Please fill all the fields to continue!');
        return false;
    } else {
        
        let userName = document.getElementById('fname').value;
            
        if (userName){
            document.querySelector('.userName').textContent = userName; 
        };
        
        if (f){
            document.querySelector('.fname-span').textContent = f; 
        };

        if (l){
            document.querySelector('.lname-span').textContent = l; 
        };

        if (m){
            document.querySelector('.mnum-span').textContent = m; 
        };

        if (e){
            document.querySelector('.email-span').textContent = e; 
        };

        if (a){
            document.querySelector('.address-span').textContent = a; 
        };

        if (c){
            document.querySelector('.city-span').textContent = c; 
        };

        if (co){
            document.querySelector('.country-span').textContent = co; 
        };

        if (zip){
            document.querySelector('.zip-span').textContent = zip; 
        };

        if (true) {
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];

            modal.style.display = "block";

            span.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
        
        return false;  
    }
}

//Show done screen
function paymentDone (){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

    var donemodal = document.getElementById("doneModal");

    donemodal.style.display = "block";

    setTimeout(function(){
        donemodal.style.display = "block";
        window.location.href = 'shop.html';}, 2200);
    localStorage.clear();
    return false;
}

onLoadCartNumbers();
displayCartMain();
displayCartModal();


