// Render del Json más botón
async function renderPosts() {
    const response = await fetch("javaScript/products.json")
    const data = await response.json();
        let content = "";
        for (const product of data) {
            content += `<div class="col-md-3 mb-3">
            <div class="card border-0">
            <img src=${product.image} alt="${product.name}">
            <div class="card-body text-center">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Add To Cart</button>
            </div>
            </div>
            </div>`;
        }

        document.getElementById("result").innerHTML = content;
        
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach(button => {
          button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            
            console.log(`Adding product with ID: ${productId} to cart`);

          });
        });
      }
      
    
renderPosts();

// mover productos del JSON
function saveProductsLS(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

const getProductsLS = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
}

//mover productos en LS
const saveCartLS = (products) => {
    localStorage.setItem("cart", JSON.stringify(products));
}

const getCartLS = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

const getIdProductLS = () => {
    return JSON.parse(localStorage.getItem("product")) || 0;
}


// Conteo de productos y valores
const totalQProducts = () => {
    const cart = getCartLS();

    return cart.length;

}

const totalSumProducts = () => {
    const cart = getCartLS();
    
    return cart.reduce((acumulador, item) => acumulador += item.price, 0);
}


// botones (poner y sacar info de LS)
const deleteCart = () => {
    localStorage.removeItem("cart");
    renderCart();
    renderCartBtn();
    notificacion("Carrito Limpiado!");
}


const addProductCart = () => {
    console.log ("cart data from:", cart)
    const product = seekProduct();
    const cart = getCartLS();
    cart.push(product);
    saveCartLS(cart); // debería mandar a LS
    renderCartBtn();
    notificacion("Agregaste un producto!");
    console.log("cart data from:", cartUpdate)
}

const deleteProductCart = (id) => {
    const cart = getCartLS();
    const cartUpdate = cart.filter(item => item.id != id);
    saveCartLS(cartUpdate);
    renderCart();
    renderCartBtn();
    notificacion("Eliminaste un producto!");
}

const renderCartBtn = () => {
    document.getElementById("totalCart").innerHTML = totalQProducts();
}


function ConfirmSale () {
    Swal.fire({
     position: "top-end",
     title: "Todo listo en el carrito?",
     text: "Después de esto se confirmará la compra. El total a pagar es $" + totalSumProducts(),
     icon: "question",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Porsupollo"
   }).then((result) => {
     if (result.isConfirmed) {
       Swal.fire({
         title: "Compra realizada!",
         text: "Tu compra ya se está procesando",
         imageUrl: "../img/background.png",
         imageWidth: "%50",
         imageHeight: "%50",
         imageAlt: "Frutilla laburando"
       });
       deleteCart();
     }
   });
 } 









