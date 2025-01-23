document.addEventListener('DOMContentLoaded', () => {
    const productDetails = document.getElementById('product-details');
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    const productRating = product.rating.rate;
    
    UpdateCartIconValue();

    if (product) {
        productDetails.innerHTML =`
            <div class="product-card">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 selected-card">
                    <img src="${product.image}" alt="" class="img-thumbnail img-fluid ">
                </div>
                 <div class="col-12 col-sm-12 col-md-6 col-lg-6 p-4 product-info">
                  <h1>${product.title}</h1>
                  <div class="star-rating">
                       <span class="star" data-value="1">&#9733;</span>
                       <span class="star" data-value="2">&#9733;</span>
                       <span class="star" data-value="3">&#9733;</span>
                       <span class="star" data-value="4">&#9733;</span>
                       <span class="star" data-value="5">&#9733;</span>
                       <p class="text-dark">(${product.rating.count})</P>
                  </div>

                  <p id="price"><strong>Price:</strong> $<span>${product.price}</span></p>
                  <p>${product.description}</p>
                  <button class="cart-btn">ADD TO CART</button>
                 </div>
  
             </div>
                
            </div>
             
        `;
    } else {
        productDetails.innerHTML = `<p>No product data available.</p>`;
    }



    // function for filling rating stars
    function fillStars(rating) {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= rating) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    }
    fillStars(Math.round(productRating));
    
    let cartBtn=productDetails.querySelector('.cart-btn');
    cartBtn.addEventListener('click',()=>{
        // console.log('add to cart clicked')
        const cartButton = document.querySelector('.cart-btn');
    cartButton.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.find(item => item.id === product.id);
        UpdateCartIconValue();
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
        UpdateCartIconValue();
        console.log('Product added to cart:', product);
    });

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

})


