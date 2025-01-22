document.addEventListener('DOMContentLoaded',()=>{
    let loading=document.querySelector('.loading-div')
 let productList=document.querySelector(".productList")

    async function fetchproducts() {
        try{
            loading.style.display='block';
            let products=await fetch('https://fakestoreapi.com/products')//.then(response=>console.log(response.json()))
            let response=await products.json()
            console.log(response)
            loading.style.display='none';
            displayProducts(response)
        }catch(e){
            loading.style.display='none';

        }

        
        
    }
    function displayProducts(response){
        response.forEach(product=>{
            let productCard=document.createElement('div');
            productCard.classList.add('col-12',  'mb-4','card');
            productCard.innerHTML=`
             <div class="card d-flex flex-column justify-content-between">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                
               

                <div class=" m-2 card-foot">
                    <p class="card-title product-title">${product.title}</p>
                    <p text-start><strong>$${product.price}</strong></p>
                </div>
            </div>
           `;
           productCard.addEventListener("click", () => openProductPop(product));
           productList.appendChild(productCard);
        })

    }
    const openProductPop = (product) => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        
        window.location.href = "product.html";
    };
    fetchproducts();
})
// // // <p class="card-text">${product.description}</p>



