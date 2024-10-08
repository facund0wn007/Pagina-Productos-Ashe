//abrir y cerrar carrito pe
const btnMostrarCarrito = document.querySelector("#btnMostrarCarrito")
const btnCerrarCarrito = document.querySelector("#btnCerrarCarrito")
const carritoModelo = document.querySelector('.carritoModelo')

btnMostrarCarrito.addEventListener('click',function(){
   carritoModelo.style.display = 'flex';
   document.body.classList.add('no-scroll'); // Añade la clase que bloquea el scroll
})

btnCerrarCarrito.addEventListener('click',function(){
    carritoModelo.style.display = 'none';
    document.body.classList.remove('no-scroll'); // Elimina la clase que bloquea el scroll
}) 
const ProductosComprados = document.querySelector("#ProductosComprados")

const cargarCarrito = (list) => {
    ProductosComprados.innerHTML = '';
    list.forEach( producto => {
        ProductosComprados.innerHTML += // html
            `<tr>
                <td> ${producto.nombre} </td>
                <td id="cantidadCarrito-${producto.id}"> ${producto.cantidad}</td>
                <td> ${producto.precio}</td>
                <td> ${producto.precio*producto.cantidad}</td>
                <td class="BotonEliminar" data-id="${producto.id}"> <button class="EliminarCarrito">  -1  </button></td>
            </tr>`;
    });
    
    const BotonEliminar = document.querySelectorAll('.BotonEliminar');
    BotonEliminar.forEach(boton => {
        boton.addEventListener('click', function () {
            // Obtener el ID del producto y la cantidad
            const id = parseInt(this.dataset.id);
            const cantidad = document.getElementById(`cantidadCarrito-${id}`).innerText;   
            if(cantidad==1){
            carrito = carrito.filter(item => item.id !== id);
            }else{
                carrito = carrito.map(item => {
                    if (item.id === id) {
                        item.cantidad -= 1; 
                    }
                    return item;
                });
            }
            cargarCarrito(carrito);
        });
    });


    const carritoTotal=document.querySelector("#carritoTotal");
    const carritoT = carrito.reduce((total,producto)=>{ return total+(producto.cantidad*producto.precio)  },0)
    carritoTotal.innerText=carritoT
}
