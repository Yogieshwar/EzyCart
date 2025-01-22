let orderBtn=document.querySelector('.proceed-btn')
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve stored prices
    const productsPrice = parseFloat(localStorage.getItem('productsPrice')) || 0;
    const totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    // Display the prices (modify the IDs as per your HTML structure)
    const productPriceDiv = document.getElementById('product-price');
    const totalPriceDiv = document.getElementById('total-price');

    if (productPriceDiv) {
        productPriceDiv.textContent = `$${productsPrice.toFixed(2)}`;
    }

    if (totalPriceDiv) {
        totalPriceDiv.textContent = `$${totalPrice.toFixed(2)}`;
    }
    orderBtn.addEventListener('click',()=>{
        window.location.href='orderConformation.html'
    })
});
