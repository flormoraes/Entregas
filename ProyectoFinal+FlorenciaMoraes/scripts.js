// TRAEMOS EL ARRAY DE PRODUCTOS DESDE JSON A JS

let arrayProductos = [];

fetch("productos.json")
    .then((resp) => resp.json())
    .then((data) => {
        arrayProductos = data;
        mostrarProductos(arrayProductos); // Mostrar todos los productos inicialmente
    });

// Primero seleccionamos la parte del HTML donde irán los productos
const contenedorProductos = document.querySelector("#productos");

function mostrarProductos(productos) {
    contenedorProductos.innerHTML = ''; // Limpiamos el contenedor antes de mostrar nuevos productos

    productos.forEach(producto => { // Recorremos el array y generamos HTML dinámicamente para cada producto
        const productoDiv = document.createElement("div"); // Creamos un contenedor (div) para cada producto
        productoDiv.classList.add("producto"); // Le damos la clase "producto"
        productoDiv.setAttribute("data-id", producto.id); // Añadimos el id como atributo

        // Escribimos el HTML dentro del div usando las propiedades del objeto producto
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.alt}"/>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button class="agregarAlCarrito" data-nombre="${producto.nombreBoton}" data-precio="${producto.precio}">
                Agregar al Carrito
            </button>
        `;

        // Añadimos el div del producto al contenedor de productos en el DOM
        contenedorProductos.appendChild(productoDiv);
    });

    // Seleccionamos los botones de agregar al carrito que acabamos de generar dinámicamente
    const botonesAgregar = document.querySelectorAll('.agregarAlCarrito');

    // -------> EVENTOS PARA EL BOTÓN "AGREGAR AL CARRITO" <-------------------
    // Usamos forEach para recorrer cada botón que tiene la clase "Agregar al Carrito", y continuamos añadiéndole un evento de click.
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            // Obtenemos los datos del producto desde el botón usando getAttribute
            let tituloProducto = boton.getAttribute('data-nombre');
            let precioProducto = boton.getAttribute('data-precio');

            // Creamos un objeto producto con las propiedades nombre y precio
            let producto = {
                titulo: tituloProducto,
                precio: precioProducto
            };

            Toastify({
                text: "Agregado al Carrito",
                duration: 1500,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "rgb(212, 164, 224)",
                  color: "white"
                },
                onClick: function(){} // Callback after click
              }).showToast();

            // Agregamos el objeto producto al array del carrito
            carritoArray.push(producto);
            actualizarCarrito(); // Llamamos a la función para actualizar el carrito en la página
        });
    });
}

// -------> EVENTOS PARA CADA BOTÓN DE FILTROS <-----------------

function filtrarProductos(acaPonemosElFiltro) {
    const productosFiltrados = arrayProductos.filter(producto => producto.alt === acaPonemosElFiltro);

    // Limpiar productos anteriores
    contenedorProductos.innerHTML = '';

    // Muestra mensaje si no hay productos, o mostrar productos si hay
    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = '<p> Ops! No se encontraron productos 😔 </p>';
    } else {
        mostrarProductos(productosFiltrados);
    }
}

// 1) Filtro para "Ver Todo"
const botonVerTodo = document.querySelector("#botonFiltroTodo");
botonVerTodo.addEventListener("click", () => {
    mostrarProductos(arrayProductos); // Mostramos todos los productos
});

// 2) Filtro para "Calzas"
const botonCalzas = document.querySelector("#botonFiltroCalzas");
botonCalzas.addEventListener("click", () => {
    filtrarProductos("Calza deportiva");
});

// 3) Filtro para "Tops"
const botonTops = document.querySelector("#botonFiltroTops");
botonTops.addEventListener("click", () => {
    filtrarProductos("Top deportivo");
});

// 4) Filtro para "Conjuntos"
const botonConjuntos = document.querySelector("#botonFiltroConjuntos");
botonConjuntos.addEventListener("click", () => {
    filtrarProductos("Conjunto Deportivo");
});

// 5) Filtro para "Camperas"
const botonCamperas = document.querySelector("#botonFiltroCamperas");
botonCamperas.addEventListener("click", () => {
    filtrarProductos("Campera Deportiva");
})

// 6) Filtro para "Remeras y Buzos"
const botonRemerasyBuzos = document.querySelector("#botonFiltroRemeras");
botonRemerasyBuzos.addEventListener("click", () => {
    const productosFiltrados = arrayProductos.filter(producto => producto.alt === "Remera" || producto.alt === "Buzo");
    mostrarProductos(productosFiltrados);
});

// 7) Filtro para "Accesorios"
const botonAccesorios = document.querySelector("#botonFiltroAccesorios");
botonAccesorios.addEventListener("click", () => {
    filtrarProductos("Accesorios");
})

// ----------------- CARRITO DE COMPRAS Y BOTÓN AGREGAR AL CARRITO -------------

// 1) creamos array de carrito inicialmente vacío

let carritoArray = [];

// 2) creamos función para actualizar el carrito en la página 
const carritoVacio = document.querySelector("#carritoVacio"); // mensaje de carrito vacío

function actualizarCarrito() {
    const listaCarrito = document.querySelector('#listaCarrito'); // Elemento <ul> del HTML, aquí crearemos los <li>
    listaCarrito.innerHTML = ''; // Limpiamos la lista de elementos que ya existen en el carrito
    let total = 0; // Inicializamos el total en 0

    if (carritoArray.length === 0) {
        carritoVacio.style.display = 'block'; // Si el carrito está vacío, mostramos el mensaje
        botonFinalizarCompra.style.visibility = 'hidden';
        botonVaciarCarrito.style.visibility = 'hidden';
    } else {
        carritoVacio.style.display = 'none'; // Si no está vacío, ocultamos el mensaje
        botonFinalizarCompra.style.visibility = 'visible';
        botonVaciarCarrito.style.visibility = 'visible';
    } 

    // Recorremos cada producto que está dentro del array carritoArray
    carritoArray.forEach(function(producto) { 
        let elementoLista = document.createElement('li'); // Creamos un nuevo elemento de lista
        elementoLista.textContent = `${producto.titulo} - $${producto.precio}`; // Le ponemos el nombre y precio del producto
        listaCarrito.appendChild(elementoLista); // Agregamos el <li> recién creado al <ul> del HTML

        total += parseFloat(producto.precio); // Sumamos el precio del producto al total
    });

    const totalCarrito = document.querySelector("#totalCarrito"); // Elemento para mostrar el total del carrito
    totalCarrito.textContent = `$${total}`; // Mostramos el total en la página
    guardarCarrito(); // Guardamos el carrito después de actualizarlo
}

// ---------------------- BOTONES ABRIR Y CERRAR CARRITO ------------------------

// Seleccionamos los botones y el contenedor del carrito
const botonAbrirCarrito = document.querySelector("#verCarrito");
const carrito = document.querySelector("#carrito");
const botonCerrarCarrito = document.querySelector("#CerrarCarrito");

// Llamo a la variable que contiene el botón verCarrito, le asigno como primer parámetro el evento click, y como segunda la función que crearemos a continuación
botonAbrirCarrito.addEventListener("click", abrimosCarrito); 
botonCerrarCarrito.addEventListener("click", cerramosCarrito);

// Función de abrir el carrito. Operador ternario ? true, : false (sería como un else)
function abrimosCarrito() {
    carrito.style.display === "none" 
        ? (carrito.style.display = "block", carrito.scrollIntoView(), botonAbrirCarrito.style.visibility = "hidden") 
        : (carrito.style.display = "none", botonAbrirCarrito.innerHTML = "Abrir Carrito");
}

// Función para cerrar el carrito y volver a mostrar el botón de abrir carrito
function cerramosCarrito() {
    carrito.style.display = "none";
    botonAbrirCarrito.style.visibility = "visible";
}

// EVENTOS BOTÓN "vaciar carrito"
// 1) lo llamamos 
const botonVaciarCarrito = document.querySelector("#vaciarCarrito");

botonVaciarCarrito.addEventListener("click", vaciarCarrito);

// 2) creamos la función, dejando el carrito vacío
function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Luego tendrás que agregar todos los artículos nuevamente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61cb69",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          carritoArray = [];
          actualizarCarrito();
          Swal.fire({
            title: "Eliminado!",
            text: "Tu carrito se encuentra vacío",
            icon: "success"
          });
        }
      });
}

// ----------- BOTÓN FINALIZAR COMPRA ------------------
const botonFinalizarCompra = document.querySelector("#botonFinalizarCompra");

botonFinalizarCompra.addEventListener('click', () => {
    
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Al finalizar, te pediremos algunos datos 😊",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61cb69",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, finalizar compra",
        cancelButtonText: "No, me faltó algo"
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "¡Pedido realizado!",
                input: "email",
                inputLabel: "Nos contactaremos contigo vía mail para continuar con la compra 😊",
                inputPlaceholder: "Ingresa tu correo electrónico"
              });
          
        }
      });
})

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carritoArray));
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carritoArray = JSON.parse(carritoGuardado); // Si hay algo guardado, lo cargamos en el carritoArray
        actualizarCarrito(); // Llamamos a la función para mostrarlo en la página
    }
}

// Cargamos el carrito desde localStorage cuando la página se carga
document.addEventListener("DOMContentLoaded", cargarCarrito);
