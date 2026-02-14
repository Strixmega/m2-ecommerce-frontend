# Tienda de Libros de Programación - E-commerce Frontend

## Descripción
Aplicación web de e-commerce desarrollada con HTML5, CSS3 y JavaScript vanilla. Implementa un catálogo de 6 libros de programación, carrito de compras funcional, sistema de descuentos, autenticación básica y persistencia de datos con localStorage.

## Tecnologías Utilizadas
- HTML5 - Estructura semántica
- CSS3 - Estilos responsivos y animaciones
- JavaScript (Vanilla) - Lógica de la aplicación sin frameworks
- Bootstrap 5 - Framework CSS (CDN)
- Font Awesome 5 - Iconografía
- localStorage API - Persistencia de datos

## Estructura del Proyecto
```
m2-ecommerce-frontend/
├── index.html              # Página principal con catálogo
├── producto.html           # Página de detalle de producto
├── carrito.html            # Página de carrito
├── README.MD               # Este archivo
├── Enlaces.txt             # Enlaces de referencia
│
└── assets/
    ├── css/
    │   └── styles.css      # Estilos personalizados
    ├── img/
    │   └── [imágenes]      # Imágenes de productos y recursos
    └── js/
        └── app.js          # Lógica principal de la aplicación
```

## Funcionalidades Principales

### Página Principal (index.html)
- Navbar responsivo con logo y navegación
- Sección hero con llamada a la acción
- Catálogo dinámico de 6 libros de programación
- Cada producto con imagen, descripción, precio y opciones de compra
- Botón "Agregar al carrito" (redirige a carrito.html)
- Botón "Ver producto" (abre página de detalles)
- Footer con suscripción a newsletter
- Indicador de usuario logueado

### Página de Producto (producto.html)
- Carga dinámica de producto mediante query string (?id=X)
- Imagen, descripción y precio del producto
- Cantidad disponible en carrito (badge)
- Botón "Agregar al carrito" con confirmación (toast)
- Botón "Ver carrito" (enlace directo)
- Navegación entre productos (Anterior/Siguiente/Volver)
- Atajos de teclado: Anterior | Siguiente | Esc Volver
- Sincronización en tiempo real con cambios en el carrito

### Página de Carrito (carrito.html)
- Listado de productos agregados
- Cantidad ajustable (+/- botones)
- Precio unitario y subtotal por producto
- Total de compra con descuento aplicado
- Campo para código de descuento ("DESC15" = 15% off)
- Botón "Vaciar carrito" (con animación fade-out)
- Botón "Seguir comprando" (regresa a inicio)

### Autenticación
- Modal de login en la navbar
- Contraseña maestra: 1234
- Mensaje de bienvenida personalizado
- Estado de usuario persistente en la sesión

### Persistencia de Datos
- localStorage para guardar carrito entre sesiones
- Sincronización automática entre pestañas/ventanas
- Descuento aplicado se mantiene al recargar

### Diseño Responsivo
- Diseño mobile-first
- Breakpoints: 576px (sm), 768px (md), 992px (lg)
- Cart icon solo en móvil, botón completo en desktop
- Animaciones deshabilitadas en dispositivos táctiles para mejor UX

### Animaciones y Microinteracciones
- Hover en tarjetas: Elevación con sombra e zoom en imagen
- Click en botones: Escala y sombra suave
- Hover en botones: Transformación de profundidad
- Fade-out: Animación al vaciar carrito
- Transiciones suaves en todas las interacciones

## Cómo Ejecutar

### Opción 1: Abrir directamente (No recomendado)
Abre index.html en el navegador directamente.

Nota: localStorage y algunas funcionalidades pueden no funcionar correctamente sin un servidor local.

### Opción 2: Live Server (VS Code) - Recomendado
1. Instala la extensión Live Server en VS Code
2. Click derecho en index.html y selecciona "Open with Live Server"
3. Se abrirá en http://localhost:5500

### Opción 3: Python HTTP Server
```bash
cd c:\Users\alanb\OneDrive\Escritorio\m2-ecommerce-frontend
python -m http.server 8000
```
Accede a http://localhost:8000

### Opción 4: Node.js http-server
```bash
npm install -g http-server
cd c:\Users\alanb\OneDrive\Escritorio\m2-ecommerce-frontend
http-server
```

## Catálogo de Productos
1. JavaScript Eloquente - $49,000
2. Javascript: La guía definitiva - $50,000
3. Aprendiendo Javascript - $23,000
4. Java: La novela - $39,000
5. Programación C++: Curso de iniciación - $29,000
6. Python para todos - $27,000

## Cómo Usar

### Agregar producto al carrito
1. Click en "Agregar al carrito" en el catálogo o página de producto
2. Se redirige automáticamente al carrito
3. El producto aparece en la lista con cantidad 1
4. Si ya existe, incrementa la cantidad

### Aplicar descuento
1. En página de carrito, ingresa el código: DESC15
2. Click en "Aplicar"
3. El total se reduce un 15%

### Cambiar cantidad
- Click en + para agregar más unidades
- Click en - para quitar unidades
- Al llegar a 0, el producto se elimina

### Vaciar carrito
- Click en "Vaciar carrito"
- Se muestra animación fade-out
- Carrito se reinicia a estado vacío

## Variables de Autenticación
- Usuario: Cualquiera (ej: "admin", "juan", etc.)
- Contraseña: 1234
- Rol: Usuario básico (sin permisos adicionales en esta versión)

## Características Técnicas

### JavaScript (app.js)
- Catálogo almacenado en arreglo de objetos
- Carrito como arreglo con estructura: {id, nombre, precio, imagen, cantidad, descuentoAplicado}
- Funciones puras para cálculos y transformaciones
- Event listeners para DOMContentLoaded, storage, keyboard
- Safeguards en funciones render para evitar errores en diferentes páginas

### CSS (styles.css)
- Variables CSS para colores consistentes
- Animaciones con @keyframes y transition
- Media queries para responsividad
- Disabled hover effects en dispositivos táctiles (max-width: 576px)

### Funciones principales en app.js
```javascript
agregarProducto(id)          // Agregar o incrementar cantidad
quitarProducto(id)           // Decrementar o remover
vaciarCarrito()              // Limpiar carrito con animación
aplicarDescuento(codigo)     // Aplicar código DESC15
calcularTotal()              // Total con descuento
renderizarCarrito()          // Actualizar UI del carrito
renderCatalogo()             // Mostrar catálogo
iniciarSesion(user, pass)    // Autenticación
agregarYRedirigir(id)        // Agregar y redirigir a carrito
```

## Requisitos Cumplidos (Módulo 3)
- Catálogo de productos
- Carrito de compras funcional
- Gestión de cantidades
- Sistema de descuentos
- Autenticación básica
- Persistencia con localStorage
- Diseño responsivo
- Páginas dinámicas
- Animaciones y microinteracciones
- Navegación fluida

## Notas Importantes
- El proyecto no usa base de datos (todo está en memoria + localStorage)
- La autenticación es básica (sin encriptación; solo para validación de contraseña maestra)
- Los datos del carrito se pierden si vacías el localStorage del navegador
- Las imágenes se cargan desde assets/img/

## Próximas Mejoras (Opcional)
- Backend con Node.js/Express
- Base de datos (MongoDB/PostgreSQL)
- Autenticación segura con JWT
- Sistema de pagos real
- Gestión de inventario
- Historial de compras
- Panel de administración

## Licencia
Proyecto educativo para módulo de e-commerce

## Autor
Alan - Febrero 2026