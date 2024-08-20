
// PRIMER EVENTO: QUE AL CLICKEAR EN "Abrir Carrito", SE DESPLIEGUE EL MISMO (que antes estaba oculto) y que el navegador vaya hacia allí con srcollIntoView

const botonAbrirCarrito = document.querySelector("#verCarrito");
const carrito = document.querySelector("#carrito");
const botonCerrarCarrito = document.querySelector("#CerrarCarrito");

// Llamo a la variable que contiene el botón verCarrito, le asigno como primer parámetro el evento click, y como segunda la función que crearemos a continuación
botonAbrirCarrito.addEventListener("click", abrimosCarrito); 
botonCerrarCarrito.addEventListener("click", cerramosCarrito);

// función de abrir el carrito. Primero verifica si el carrito está oculto (none), si es así, muestra el carrito si está oculto (block) y scrollea hacia allí. SINO (ELSE), si el carrito está abierto (porque el usuario ya dio click), entonces al hacer click nuevamente, este se cierra. 
function abrimosCarrito() {
    if (carrito.style.display === "none") {
        carrito.style.display = "block";
        carrito.scrollIntoView();  
        botonAbrirCarrito.style.visibility = "hidden"; // Ocultamos el botón pero mantiene el espacio;
    } else {
        carrito.style.display = "none";
        botonAbrirCarrito.innerHTML = "Abrir Carrito";
    }
}

function cerramosCarrito() {
        carrito.style.display = "none";
        botonAbrirCarrito.style.visibility = "visible";
}

// nos traemos lo que necesitamos del html para ya tenerlo todo acá: 

const contenedorTodosLosProductos = document.querySelector("#productos"); // section en html

const carritoProductos = document.querySelector(".producto"); // cada div de producto

const carritoVacio = document.querySelector("#carritoVacio"); // 


// ARRAY PRODUCTOS
const productosWeb = [
    {titulo: "Calza deportiva", precio: 1290, img: "1.png"},
    {titulo: "Top deportivo", precio: 690, img: "Top .png"},
    {titulo: "Campera deportiva", precio: 1590, img: "campera.png"},
    {titulo: "Conjunto deportivo", precio: 1890, img: "Conjunto deportivo.png"}
];

// CREAMOS ARRAY INICIALMENTE VACÍO
let carritoArray = [];

const botonesAgregar = document.querySelectorAll('.agregarAlCarrito'); // Traemos todos los botones de "Agregar al Carrito"
const listaCarrito = document.querySelector('#listaCarrito'); // Nos traemos la lista donde mostraremos los productos en el carrito
const totalCarrito = document.querySelector("#totalCarrito");

// -----> Función para actualizar el carrito en la página <---------- Cada vez que actualicemos el carrito, solo se verán los productos que están. Primero, Limpiamos la lista de elementos que ya existen en el carrito (elimina todo lo que esté en <ul>). Segundo, recorremos cada producto que está dentro del array carritoArray (es decir, 4). Tercero, a la lista de cada producto, le agregamos el nombre y precio (que sacamos del array). Cuarto, agregamos el <li> creado por cada producto (elementoLista) al <ul> del HTML (listaCarrito)

function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total =0; // VARIABLE PRECIOS EN 0

    if (carritoArray.length === 0) {
        
        carritoVacio.style.display = 'block'; // mostramos
    } else { 
        
        carritoVacio.style.display = 'none'; // no mostramos
    } 
        carritoArray.forEach(function(producto) { 
        let elementoLista = document.createElement('li'); 
        elementoLista.textContent = producto.titulo + ' - $' + producto.precio; 
        listaCarrito.appendChild(elementoLista); 

        total +=parseFloat(producto.precio);
    });

    totalCarrito.textContent = `$${total}`
    guardarCarrito(); // Guardamos el carrito después de actualizarlo
    
}
// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carritoArray));
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carritoArray = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}


// -------> EVENTOS PARA CADA BOTÓN DE "AGREGAR AL CARRITO" <-------------------
// Usamos forEach para recorrer cada botón que tienen la clase "Agregar al Carrito", y continuamos añadiéndole un evento de click. Usamos getAttribute para obtener el valor de un atributo específico en el HTML. Estamos obteniendo los valores de los atributos data-nombre y data-precio que están en los botones de "Agregar al Carrito". Luego, creamos un objeto que representa un producto, tiene dos propiedades: nombre y precio, este objeto se agregará a carritoArray (que es donde guardamos todos los productos que el usuario selecciona para comprar). 

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        // Obtenemos los datos del producto desde el botón
        let tituloProducto = boton.getAttribute('data-nombre');
        let precioProducto = boton.getAttribute('data-precio');

        // Creamos un objeto producto y lo agregamos al array del carrito
        let producto = {
            titulo: tituloProducto,
            precio: precioProducto
        };
        carritoArray.push(producto); // lo agregamos al array

        actualizarCarrito(); // toma todos los productos que están en el carritoArray y los muestra en la lista inferior de la web.
    });
});

// ------------> EVENTOS BOTÓN "vaciar carrito" <--------------------

// 1) lo llamamos 
const botonVaciarCarrito = document.querySelector("#vaciarCarrito");

// 2) creamos la función, dejando el carrito vacío
function vaciarCarrito() {
    carritoArray = []
    actualizarCarrito(); // Actualizamos la lista del carrito y el total
}


// 3) le agregamos el evento al botón, con la función creada

botonVaciarCarrito.addEventListener("click", vaciarCarrito);


document.addEventListener("DOMContentLoaded", cargarCarrito);
