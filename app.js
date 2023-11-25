// fetch("http://localhost/Negocio/php/consulta.php")
//     .then((response) => response.json())
//     .then((res) => {
//         let clientes = res.datosClientes;
//         let inventario = res.datosInventario;
//         let productos = res.datosPrecio;
//         let pedidos = res.datosPedidos;
//         console.log(clientes);
//         // console.log(inventario);
//         // console.log(productos);
//         // console.log(pedidos);
//     });

let contenedorPrincipal = document.getElementById("contenedorPrincipal");
let btnProductos = document.getElementById("productos");
let btnClientes = document.getElementById("clientes");
let btnPedido = document.getElementById("pedido");
let btnListaPedidos = document.getElementById("listaPedidos");
let valorCantidad = 0;
let carrito = {};

// Funcion CLICK para poder mostrar el contenido de la etiqueta productos----------------------------------
btnProductos.addEventListener("click", ()=>{
    fetch("http://localhost/Negocio/php/consulta.php")
    .then((response) => response.json())
    .then((res) => {
        let clientes = res.datosClientes;
        let inventario = res.datosInventario;
        let productos = res.datosPrecio;
        let pedidos = res.datosPedidos;
        // console.log(clientes);
        // console.log(inventario);
        // console.log(productos);
        // console.log(pedidos);
        contenedorPrincipal.innerHTML ="";
        contenedorPrincipal.className = "";
        contenedorPrincipal.classList.add("producto");
        for(let producto of productos){
            // console.log(producto)
            contenedorPrincipal.innerHTML += `
            <div class="tarjetaProducto">
                <img src="images/${producto.producto}.jpg" alt="${producto.producto}">
                <p>${producto.producto}</p>
                <p><strong>$${producto.precio}</strong></p>
                <div id="conteo">
                    <button id="menos${producto.id}">-</button>
                    <p id="cantidad${producto.id}">${valorCantidad}</p>
                    <button id="mas${producto.id}">+</button>
                </div>
            </div>`
            // carrito[producto.producto] = document.getElementById(`cantidad${producto.id}`).innerText
        }
        // console.log(carrito)
        contenedorPrincipal.removeEventListener("click", mas);
        contenedorPrincipal.removeEventListener("click", menos);

        contenedorPrincipal.addEventListener("click", mas);
        contenedorPrincipal.addEventListener("click", menos);


    });
})

function mas(event){
    if (event.target && event.target.id.startsWith('mas')) {
        const productoId = event.target.id.replace('mas', '');
        let cantidad = document.getElementById(`cantidad${productoId}`);
        let valorCantidad = parseInt(cantidad.innerText);
        valorCantidad++;
        cantidad.innerText = valorCantidad;
        carrito[productoId] = valorCantidad;
        // carrito.push(object);
        // console.log(carrito)
    }
}  
function menos(event){
    if(event.target && event.target.id.startsWith("menos")){
        const productoId = event.target.id.replace("menos", "");
        let cantidad = document.getElementById(`cantidad${productoId}`);
        let valorCantidad = parseInt(cantidad.innerText);
        valorCantidad--;
        cantidad.innerText = valorCantidad > 0 ? valorCantidad : 0;
        carrito[productoId] = valorCantidad;
        // carrito.push(object);
        // console.log(carrito)
    }
}

// Funcion CLICK para poder mostrar el contenido de la etiqueta clientes----------------------------------------
btnClientes.addEventListener("click", ()=>{
    fetch("http://localhost/Negocio/php/consulta.php")
    .then((response) => response.json())
    .then((res) => {
        let clientes = res.datosClientes;
        contenedorPrincipal.className = "";
        contenedorPrincipal.classList.add("clientes");
        contenedorPrincipal.innerHTML = `
        <div id="barraClientes">
            <div id="buscador">
                <input id="buscarCliente" type="text" placeholder="Buscar Cliente"><i class="bi bi-search"></i>
            </div>
            <i id="addCliente" class="bi bi-person-plus"></i>
        </div>
        <div id="listaClientes"></div>`;
        let addCliente = document.getElementById("addCliente");
        addCliente.addEventListener("click", ()=>{
            contenedorPrincipal.innerHTML += `
            <div id="modalCliente" class="modal">
                <div class="contenedorModal">
                    <form id="formularioCliente" method="POST">
                        <label for="celular">Numero Celular *</label>
                        <input type="text" name="celular" minlength="10" maxlength="10" required>

                        <label for="calle">Calle *</label>
                        <input type="text" name="calle" required>

                        <label for="numInt">Numero Interior *</label>
                        <input type="text" name="numInt" required>

                        <label for="numExt">Numero Exterior</label>
                        <input type="text" name="numExt" placeholder="Opcional">

                        <label for="colonia">Colonia *</label>
                        <input type="text" name="colonia">

                        <label for="referencia">Referencia</label>
                        <input type="text" name="referencia" placeholder="Opcional">

                        <label for="nombre">Nombrer</label>
                        <input type="text" name="nombre" placeholder="Opcional">

                        <label for="apellido">Apellido</label>
                        <input type="text" name="apellido" placeholder="Opcional">

                        <input type="submit" value="Guardar">
                    </form>
                </div>
            </div>
            `
            let modalCliente = document.getElementById("modalCliente");
            modalCliente.addEventListener("click", (e)=>{
                if(e.target === modalCliente){
                    modalCliente.remove();
                }
            });
            let formularioCliente = document.getElementById("formularioCliente");
            formularioCliente.addEventListener("submit", (e)=>{
                e.preventDefault;
                let datos = new FormData(formularioCliente);
                fetch("http://localhost/negocio/php/addCliente.php", {
                    method: "POST", 
                    body: datos
                })
                .then((res)=>res.json())
                .then((response)=>{
                    console.log(response)
                })
            })
        })
        // Funcion para mostrar los clientes que coincidan con la busqueda---------------------------------------------
        function mostrarClientesBusqueda(busqueda) {
            let listaClientes = document.getElementById("listaClientes");
            let clientesHTML = '';
            for (let cliente of clientes) {
                let clienteTexto = cliente.numero_celular.toLowerCase() + ' ' + cliente.direccion.toLowerCase();
                if (clienteTexto.includes(busqueda.toLowerCase())) {
                    clientesHTML += `
                        <div class="cliente">
                            <input type="radio" id="opcion${cliente.id}" name="cliente" value="${cliente.id}">
                            <label for="opcion${cliente.id}">${cliente.numero_celular} | ${cliente.direccion}</label>
                            <div id="eliminarEditar">
                                <p id="lapiz">&#9998;</p>
                                <p id="equis">&#10060;</p>
                            </div>
                        </div>
                    `;
                    let lapiz = document.getElementById("lapiz");
                    let equis = document.getElementById("equis");
                    
                }
            }
            listaClientes.innerHTML = clientesHTML;
        }
        let busqueda = document.getElementById("buscarCliente");
        busqueda.addEventListener("input", (event)=>{
            const valorBusqueda = event.target.value;
            mostrarClientesBusqueda(valorBusqueda);
        });
        mostrarClientesBusqueda("");
    });
})

// Funcion CLICK para poder ver el pedido completo -----------------------------------------------------------
btnPedido.addEventListener("click", ()=>{
    fetch("http://localhost/Negocio/php/consulta.php")
    .then((response) => response.json())
    .then((res) => {
        let clientes = res.datosClientes;
        let idCliente = "";
        let inventario = res.datosInventario;
        let productos = res.datosPrecio;
        let pedidos = res.datosPedidos;
        let cliente = document.querySelector(`input[name='cliente']:checked`) !== null ? document.querySelector(`input[name='cliente']:checked`).value : "";
        // console.log(carrito);
        // console.log(cliente);
        // console.log(clientes);
        // console.log(inventario);
        // console.log(productos);
        // console.log(pedidos);
        contenedorPrincipal.innerHTML = "";
        contenedorPrincipal.className = "";
        contenedorPrincipal.classList.add("clientes") 
        let piezas = 0;
        let total = 0;
        let direccion ="";
        let listaProductos = [];
        for(let cl of clientes){
            if(cl.id == cliente){
                idCliente = cl.id;
                direccion = `${cl.direccion} | ${cl.numero_celular}`;
                contenedorPrincipal.innerHTML = `
                <div id="pedidoCliente">
                    <p>${direccion}</p>
                </div>
                <div class="listaPedido">
                    <h3>Producto</h3>
                    <h3>Cantidad</h3>
                    <h3>Precio</h3>
                </div>`;
            }
        }
        for(let elemento in carrito){
            for(let prod of productos){
                if(elemento == prod.id && carrito[elemento]>0){
                    // console.log(carrito[elemento])
                    piezas += carrito[elemento];
                    total += carrito[elemento]*prod.precio;
                    listaProductos.push(prod.producto);
                    contenedorPrincipal.innerHTML += `
                    <div class="listaPedido">
                        <p>${prod.producto}</p>
                        <p>${carrito[elemento]}</p>
                        <p> $ ${carrito[elemento]*prod.precio}</p>
                    </div>
                    `;
                }
            }
        }
        // console.log(piezas, total);
        contenedorPrincipal.innerHTML += `
        <div id="total">
            <h2>Total</h2>
            <p>${piezas} pzs</p>
            <p> $ ${total}</p>
        </div>
        <div id="divBotonComprar">
            <button id="pagar">Pagar</button>
            <button id="credito">Credito</button>
        </div>
        `;
        let btnPagar = document.getElementById("pagar");
        if(total > 0){
            btnPagar.addEventListener("click", ()=>{
                contenedorPrincipal.innerHTML += `
                <div id="modal" class="modal">
                    <div class="contenedorModal">
                        <p> Total a pagar $${total}</p>
                        <label for="recibo">
                            Recibo $ <input id="recibido" type="number" name="recibo">
                        </label>
                        <p id="parrafoCambio">Su Cambio</p>
                        <button id="finalizar">Finalizar</button>
                    </div>
                </div>
                `;
                let modal = document.getElementById("modal");
                modal.addEventListener("click", (e)=>{
                    if(e.target === modal){
                        modal.remove();
                    }
                })
                let recibido = document.getElementById("recibido");
                let parrafoCambio = document.getElementById("parrafoCambio")
                recibido.addEventListener("input", (event)=>{
                    const recibo = event.target.value;
                    let cambio = recibo - total;
                    if(cambio >= 0){
                        parrafoCambio.innerText = `Su cambio $ ${cambio}`;
                    } else {
                        parrafoCambio.innerText = "Incompleto";
                    }
                })
                let btnFinalizar = document.getElementById("finalizar");
                btnFinalizar.addEventListener("click", ()=>{
                    let datos = {
                        id: idCliente,
                        productos: listaProductos.join(", "),
                        total: total,
                        estado: "Pagado"
                    }
                    console.log(datos.id)
                    console.log(datos.productos);
                    console.log(datos.total);
                    console.log(datos.estado);
                    const opciones = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json' // Especificar el tipo de contenido
                        },
                        body: JSON.stringify(datos)// Convertir los datos a formato JSON
                        };    
                        fetch("http://localhost/negocio/php/pedidos.php", opciones)
                            .then(() => {
                                console.log('Datos enviados exitosamente sin necesidad de respuesta.');
                                })
                            .catch(error => {
                                // Hacer algo con la respuesta del servidor
                                console.error('Se produjo un error al enviar los datos:', error);
                                })
                        window.location.href = "http://localhost/negocio/";
                });
            })
        }
        let btnCredito = document.getElementById("credito");
        if(total > 0){
            btnCredito.addEventListener("click", ()=>{
                let datos = {
                    id: idCliente,
                    productos: listaProductos.join(", "),
                    total: total,
                    estado: "Credito"
                }
                console.log(datos.id)
                console.log(datos.productos);
                console.log(datos.total);
                console.log(datos.estado);
                const opciones = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json' // Especificar el tipo de contenido
                        },
                        body: JSON.stringify(datos)// Convertir los datos a formato JSON
                    };    
                    fetch("http://localhost/negocio/php/pedidos.php", opciones)
                            .then(() => {
                                console.log('Datos enviados exitosamente sin necesidad de respuesta.');
                                })
                            .catch(error => {
                                // Hacer algo con la respuesta del servidor
                                console.error('Se produjo un error al enviar los datos:', error);
                                })
                        window.location.href = "http://localhost/negocio/";
            });
        }
    });
});

btnListaPedidos.addEventListener("click", () => {
    fetch("http://localhost/Negocio/php/consulta.php")
    .then((response) => response.json())
    .then((res) => {
        let clientes = res.datosClientes;
        let inventario = res.datosInventario;
        let productos = res.datosPrecio;
        let pedidos = res.datosPedidos;
        // console.log(clientes);
        // console.log(inventario);
        // console.log(productos);
        // console.log(pedidos);
        contenedorPrincipal.innerHTML = `
        <div class="tablaPedidos">
            <p>Fecha</p>
            <p>No. Celular</p>
            <p>Costo</p>
            <p>Estado</p>
        </div>`;
        for(let pedido of pedidos){
            contenedorPrincipal.innerHTML += `
            <div class="pedidos">
                <p>${pedido.fecha}</p>
                <p>${pedido.numero_celular}</p>
                <p>$${pedido.precio}</p>
                <p>${pedido.estado}</p>
            </div>
            `
        }
    });
})