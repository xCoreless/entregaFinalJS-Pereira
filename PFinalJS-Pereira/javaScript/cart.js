function renderCart() {
    const getCartLS = () => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }
    const cart = getCartLS();
    let content = "";

    if (totalQProducts() || 0) {
        content = `<table class="">
        <tbody>
        <tr>
        <td colspan='4' class="text-end"><button class="btn btn-sm" onclick="eliminarCarrito()" title="Eliminar Carrito">Eliminar Carrito [X]</button></td>
        </tr>`;

        for (const product of cart) {
            content += `<tr class="">
            <td class="text-start"><img src="${product.image}" alt="${product.name}" width="64" /></td>
            <td class="text-start">${product.name}</td>
            <td class="text-start"><b>$${product.price}</b></td>
            <td class="text-end"><button class="btn btn-sm" onclick="eliminarProductoCarrito(${product.id})" title="Quitar Producto"><img src="img/trash.svg" alt="Eliminar Producto" width="16" /></button></td>
            </tr>`;
        }

        content += `<tr>
        <td class="text-center" colspan='2'>Total a Pagar</td>
        <td><b>$${totalsumProducts()}</b></td>
        <td class="text-end"><button class="btn btn-sm" onclick="finalizarCompra()" title="Finalizar Compra"><b>Finalizar Compra</b></button></td>
        </tr>
        </tbody>
        </table>`;
    } else {
        content = `<h1 class="colorFuente my-5 p-5 text-center">No se encontraron Productos en el Carrito!</h1>`;
    }

    document.getElementById("products").innerHTML = content;
}

onload()
renderCart(),
renderCartBtn();

 


