const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const pagarCarritoBtn = document.getElementById('pagar-carrito');
const montoTotal = document.getElementById('monto-total');

// Elementos de Modales
const modalPago = document.getElementById('modal-pago');
const modalExito = document.getElementById('modal-exito');
const cerrarModal = document.querySelector('.cerrar-modal');
const formPago = document.getElementById('form-pago');
const cerrarExitoBtn = document.getElementById('cerrar-exito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    pagarCarritoBtn.addEventListener('click', abrirModalPago);
    cerrarModal.addEventListener('click', () => modalPago.style.display = 'none');
    formPago.addEventListener('submit', procesarPago);
    cerrarExitoBtn.addEventListener('click', () => modalExito.style.display = 'none');
}

function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
    calcularTotal();
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="60">
        </td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        calcularTotal();
    }
}

function vaciarCarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    calcularTotal();
    return false;
}

function calcularTotal() {
    let total = 0;
    const filas = lista.querySelectorAll('tr');
    filas.forEach(fila => {
        const precioTexto = fila.children[2].textContent.replace('$', '').replace(',', '');
        total += parseFloat(precioTexto);
    });
    montoTotal.textContent = `$${total.toLocaleString('en-US')}`;
}

function abrirModalPago(e) {
    e.preventDefault();
    if (lista.children.length === 0) {
        alert('El carrito está vacío. Agrega un producto primero.');
        return;
    }
    modalPago.style.display = 'flex';
}

function procesarPago(e) {
    e.preventDefault();
    modalPago.style.display = 'none';
    modalExito.style.display = 'flex';
    vaciarCarrito();
    formPago.reset();
}