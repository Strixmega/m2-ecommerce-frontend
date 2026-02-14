// Catálogo y carrito
const catalogo = [
  { id: 1, nombre: 'JavaScript Eloquente', descripcion: 'Una introducción clara y profunda a JavaScript moderno, enfocada en buenas prácticas y programación aplicada a la web.', imagen: 'assets/img/libro1.jpeg', precio: 49000, descuentoAplicado: false },
  { id: 2, nombre: 'Javascript: La guía definitiva', descripcion: 'Referencia completa para desarrolladores que buscan dominar JavaScript, cubriendo el lenguaje y APIs del navegador.', imagen: 'assets/img/libro2.jpeg', precio: 50000, descuentoAplicado: false },
  { id: 3, nombre: 'Aprendiendo Javascript', descripcion: 'Guía práctica para aprender JavaScript desde cero y entender su rol en aplicaciones web dinámicas.', imagen: 'assets/img/libro3.jpeg', precio: 23000, descuentoAplicado: false },
  { id: 4, nombre: 'Java: La novela', descripcion: 'Explicación didáctica de la programación orientada a objetos mediante una narrativa que facilita la comprensión.', imagen: 'assets/img/libro4.webp', precio: 39000, descuentoAplicado: false },
  { id: 5, nombre: 'Programación C++: Curso de iniciación', descripcion: 'Curso introductorio a C++ que enseña fundamentos del lenguaje y lógica de programación.', imagen: 'assets/img/libro5.jpg', precio: 29000, descuentoAplicado: false },
  { id: 6, nombre: 'Python para todos', descripcion: 'Introducción accesible a Python enfocada en programación básica y análisis de datos.', imagen: 'assets/img/libro6.webp', precio: 27000, descuentoAplicado: false }
];

// Exponer catálogo en window para páginas independientes (producto.html)
window.catalogo = catalogo;

let carrito = [];
let descuentoAplicado = false;

const PASSWORD_MAESTRA = '1234';
let usuarioLogueado = false;

function guardarCarrito(){
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('descuentoAplicado', JSON.stringify(descuentoAplicado));
  actualizarContadorCarrito();
}

function cargarCarrito(){
  const raw = localStorage.getItem('carrito');
  const rawDesc = localStorage.getItem('descuentoAplicado');
  if(raw) carrito = JSON.parse(raw);
  if(rawDesc) descuentoAplicado = JSON.parse(rawDesc);
}

function agregarProducto(idProducto){
  const prod = catalogo.find(p => p.id === idProducto);
  if(!prod) return;
  const existente = carrito.find(item => item.id === idProducto);
  if(existente){
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, imagen: prod.imagen, cantidad: 1, descuentoAplicado: false });
  }
  guardarCarrito();
  renderizarCarrito();
}

function agregarYRedirigir(idProducto){
  agregarProducto(idProducto);
  window.location.href = './carrito.html';
}

function vaciarCarrito(){
  const modalBody = document.getElementById('carrito-body');
  const pageBody = document.getElementById('carrito-page-body');
  const duration = 400; // ms, debe coincidir con la transición CSS
  [modalBody, pageBody].forEach(el => { if(el) el.classList.add('fade-out'); });
  setTimeout(() => {
    carrito = [];
    descuentoAplicado = false;
    guardarCarrito();
    renderizarCarrito();
    // Si existe la página dedicada, actualizamos su render también
    if(window.renderPageCarrito) window.renderPageCarrito();
    // limpiar clases después de animación
    [modalBody, pageBody].forEach(el => { if(el) el.classList.remove('fade-out'); });
  }, duration);
}

function quitarProducto(idProducto){
  const idx = carrito.findIndex(item => item.id === idProducto);
  if(idx >= 0){
    if((carrito[idx].cantidad || 1) > 1){
      carrito[idx].cantidad -= 1;
    } else {
      carrito.splice(idx, 1);
    }
  }
  guardarCarrito();
  renderizarCarrito();
}

function aplicarDescuento(codigo){
  const input = document.getElementById('codigo-descuento');
  const codigoReal = typeof codigo === 'string' && codigo.length > 0 ? codigo : (input ? input.value.trim() : '');
  if(codigoReal === 'DESC15'){
    descuentoAplicado = true;
    carrito.forEach(p => p.descuentoAplicado = true);
    guardarCarrito();
    renderizarCarrito();
    return true;
  }
  descuentoAplicado = false;
  guardarCarrito();
  renderizarCarrito();
  return false;
}

function calcularTotal(){
  const total = carrito.reduce((acc, p) => acc + ((p.precio || 0) * (p.cantidad || 1)), 0);
  return Math.round(descuentoAplicado ? total * 0.85 : total);
}

function renderizarCarrito(){
  const contenedor = document.getElementById('carrito-body');
  const totalSpan = document.getElementById('total');
  // Si no existen los elementos, simplemente retornar (no estamos en modal o página carrito)
  if(!contenedor || !totalSpan) return;
  contenedor.innerHTML = '';

  if(!carrito || carrito.length === 0){
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalSpan.textContent = formatearPrecio(0);
    return;
  }

  carrito.forEach((prod, index) => {
    const row = document.createElement('div');
    row.className = 'd-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 border-bottom pb-2';
    row.innerHTML = `
      <div>
        <strong>${prod.nombre}</strong><br>
        <small>Precio unitario: ${formatearPrecio(prod.precio)}</small>
      </div>
      <div class="mt-2 mt-sm-0 d-flex align-items-center gap-2">
        <span class="badge bg-secondary">Cantidad: ${prod.cantidad}</span>
        <small>Total: ${formatearPrecio(prod.precio * prod.cantidad)}</small>
        <button class="btn btn-sm btn-danger" onclick="quitarProducto(${prod.id})">-</button>
        <button class="btn btn-sm btn-success" onclick="agregarProducto(${prod.id})">+</button>
      </div>
    `;
    contenedor.appendChild(row);
  });

  totalSpan.textContent = formatearPrecio(calcularTotal());
  actualizarContadorCarrito();
}

function actualizarContadorCarrito(){
  const contador = document.getElementById('cart-count');
  const contadorSm = document.getElementById('cart-count-sm');
  const totalItems = carrito.reduce((acc, it) => acc + (it.cantidad || 0), 0);
  if(contador) contador.textContent = totalItems;
  if(contadorSm) contadorSm.textContent = totalItems;
}

// Autenticación
function mostrarModal(tipo){
  const modal = new bootstrap.Modal(document.getElementById('modalAuth'));
  const title = document.getElementById('modalAuthLabel');
  title.textContent = tipo === 'registro' ? 'Registro' : 'Iniciar sesión';
  modal.show();
}

function iniciarSesion(usuario, password){
  if(password === PASSWORD_MAESTRA){
    usuarioLogueado = true;
    console.log('Usuario logueado:', usuario);
    const userStatus = document.getElementById('userStatus');
    if(userStatus) userStatus.textContent = `Hola, ${usuario}`;
    const modalEl = document.getElementById('modalAuth');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if(modal) modal.hide();
  } else {
    console.warn('Credenciales inválidas');
    alert('Credenciales inválidas');
  }
}

// Render catálogo en HTML
function renderCatalogo(){
  const render = document.getElementById('renderCatalogo');
  if(!render) return; // Safeguard: only render when element exists (e.g., index.html)
  let producto = '';
  catalogo.forEach((res) => {
    producto += `
    <section class="col-12 col-sm-6 col-md-4 p-2">
      <div class="card mx-auto h-100">
        <img src="${res.imagen}" class="card-img-top" alt="${res.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${res.nombre}</h5>
          <p class="card-text">${res.descripcion}</p>
          <div class="mt-auto">
            <div class="mb-2">Precio: ${formatearPrecio(res.precio)}</div>
            <button class="btn btn-primary me-2" onclick="agregarYRedirigir(${res.id})">Agregar al carrito</button>
            <a href="./producto.html?id=${res.id}" class="btn btn-outline-primary">Ver producto</a>
          </div>
        </div>
      </div>
    </section>
    `;
  });
  render.innerHTML = producto;
}

function abrirCarrito(){
  const modalCarrito = new bootstrap.Modal(document.getElementById('modalCarrito'));
  modalCarrito.show();
}

// Formatear precio a CLP
function formatearPrecio(valor){
  const n = Number(valor) || 0;
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(n);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  cargarCarrito();
  renderCatalogo();
  renderizarCarrito();
});

// Sincronizar cambios del carrito entre pestañas/ventanas en tiempo real
window.addEventListener('storage', (e) => {
  if(!e.key) return;
  if(e.key === 'carrito' || e.key === 'descuentoAplicado'){
    cargarCarrito();
    // actualizar UI en la página/modal
    if(typeof renderizarCarrito === 'function') renderizarCarrito();
    if(typeof window.renderPageCarrito === 'function') window.renderPageCarrito();
  }
});