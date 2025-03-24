let productos = JSON.parse(localStorage.getItem("productos")) || [];

function agregarProducto() {
    let nombre = document.getElementById("nombre").value;
    let precioUnidad = document.getElementById("precioUnidad").value;
    let precioMayor = document.getElementById("precioMayor").value;
    let stock = document.getElementById("stock").value;

    if (nombre && precioUnidad && precioMayor && stock) {
        productos.push({ nombre, precioUnidad, precioMayor, stock });
        guardarEnLocalStorage();
        actualizarLista();
        limpiarCampos();
    } else {
        alert("Completa todos los campos");
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function actualizarLista() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    productos.forEach((prod, index) => {
        let fila = `<tr>
            <td>${prod.nombre}</td>
            <td>$${prod.precioUnidad}</td>
            <td>$${prod.precioMayor}</td>
            <td>${prod.stock}</td>
            <td><button onclick="eliminarProducto(${index})">❌</button></td>
        </tr>`;
        lista.innerHTML += fila;
    });
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    guardarEnLocalStorage();
    actualizarLista();
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("precioUnidad").value = "";
    document.getElementById("precioMayor").value = "";
    document.getElementById("stock").value = "";
}

function buscarProducto() {
    let filtro = document.getElementById("buscar").value.toLowerCase();
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    productos
        .filter((prod) => prod.nombre.toLowerCase().includes(filtro))
        .forEach((prod, index) => {
            let fila = `<tr>
                <td>S/{prod.nombre}</td>
                <td>S/{prod.precioUnidad}</td>
                <td>S/{prod.precioMayor}</td>
                <td>S/{prod.stock}</td>
                <td><button onclick="eliminarProducto(S/{index})">❌</button></td>
            </tr>`;
            lista.innerHTML += fila;
        });
}

// Cargar productos al abrir la página
window.onload = actualizarLista;
