document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const proceedBtn=document.querySelector(".proceed-btn")
    const productPricediv = document.getElementById('product-price');
    const totalPricediv = document.getElementById('total-price');
    const shippingCharge=10;


    // Function to display cart items
    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = ''; 
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }

        cart.forEach(product => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'row', 'mb-3');
            cartItem.innerHTML = `
                <div class="col-3">
                    <img src="${product.image}" alt="${product.title}" class=" cartItem-img">
                </div>
                <div class="col-5 ">
                    <h5 class="cartItem-title">${product.title}</h5>
                    <p class="cartItem-price">Price: $${product.price}</p>
                    <div>
                        <label class="quantity-class" for="quantity-${product.id}">Quantity:</label>
                        <input type="number" id="quantity-${product.id}" value="${product.quantity}" min="1" class="quantity-input ">
                    </div>
                </div>
                <div class="col-2">
                    <p class="item-total-price">$${(product.price * product.quantity)}</p>
                </div>
                <div class="col-2">
                    <button class=" delete-btn" data-id="${product.id}"><i class="bi bi-trash text-dark large-icon" ></i></button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        calculateTotalPrice();
        setupEventListeners();
    }

    // Function to calculate total price
    function calculateTotalPrice() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let productsPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
        productPricediv .textContent = `$${productsPrice.toFixed(2)}`;
        let totalprice=shippingCharge+productsPrice;
        totalPricediv.textContent=totalprice;

        localStorage.setItem('productsPrice', productsPrice.toFixed(2));
        localStorage.setItem('totalPrice', totalprice.toFixed(2));
        

    }
    

    // Function to set up event listeners for quantity changes and product deletion
    function setupEventListeners() {
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                let productId = parseInt(e.target.id.split('-')[1]);
                let product = cart.find(item => item.id === productId);
                
                if (product) {
                    product.quantity = parseInt(e.target.value);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    displayCartItems();
                    UpdateCartIconValue();
                    calculateTotalPrice()
                }
            });
        });

       

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                console.log("clicked")
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                let productId = parseInt(e.currentTarget.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                calculateTotalPrice()
                UpdateCartIconValue();
                displayCartItems();
                
                
            });
        });
    }

    
    displayCartItems();
    proceedBtn.addEventListener('click',()=>{
        window.location.href=('checkout.html')

    })
    function UpdateCartIconValue(){
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let IconVal=document.querySelectorAll(".icon-val")
        let totalItems=cart.reduce((total,item)=>total+item.quantity,0)
        IconVal.forEach(cartIcon=>{
            cartIcon.textContent = totalItems;

        })
        
        
    }
    UpdateCartIconValue();
    
});

