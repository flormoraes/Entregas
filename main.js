let nombreCompleto;  // VARIABLE GLOBAL

function solicitarNombre() {
    nombreCompleto = prompt("Ingresar nombre y apellido");

    // Verificamos si el nombre completo no es un número
    if (isNaN(nombreCompleto)) {
        alert("Un gusto saludarte " + nombreCompleto + ". " + "¡Serás redirigido al catálogo de compra!");
    } else {
        alert("Por favor, ingresa sólo letras.");
        solicitarNombre();
    }
}

solicitarNombre(); 

// AHORA CREAREMOS UN ARRAY PRODUCTOS, DONDE ESTARÁN TODOS LOS PRODUCTOS DISPONIBLES A ELEGIR

const productosDisponibles = [
    { nombre: "Top deportivo", precio: 690 },
    { nombre: "Calza deportiva", precio: 1290 },
    { nombre: "Campera", precio: 1590 },
    { nombre: "Medias", precio: 290 },
    { nombre: "Botella", precio: 490 }
];


 let articulosAgregados= 0
 const totalPrecio=[];
 const productosAgregados = [];
 let cantidad = 5;
 let agregarProductos;

 function CarritoDeCompras() {
    do {
        agregarProductos = prompt("Agregá productos al carrito:\n\n" +
            "0. Top deportivo\n" +
            "1. Calza deportiva\n" +
            "2. Campera\n" +
            "3. Medias\n" +
            "4. Botella\n" +
            "5. Cerrar carrito\n\n" +
            "Selecciona una opción del 0 al 4 para agregar el producto al carrito.\n\n" +
            "SI QUERES SABER EL PRECIO DE ALGO, INGRESA EL NOMBRE, por ejemplo: Medias");
            
            if (!isNaN(agregarProductos) && agregarProductos.trim() !== "") {
                agregarProductos = parseInt(agregarProductos); // Convertir a número

    switch (agregarProductos) {
                case 0:
                alert("Agregaste Top deportivo al carrito, ¿quieres sumar algo más?");
                articulosAgregados++;
                productosAgregados.push(productosDisponibles[0].nombre);
                totalPrecio.push(productosDisponibles[0].precio);
                break;
        
                case 1:
                alert("Agregaste Calza deportiva al carrito, ¿quieres sumar algo más?");
                articulosAgregados++;
                productosAgregados.push(productosDisponibles[1].nombre);
                totalPrecio.push(productosDisponibles[1].precio);
                break;

                case 2:
                    alert("Agregaste Campera al carrito, ¿quieres sumar algo más?");
                    articulosAgregados++;
                    productosAgregados.push(productosDisponibles[2].nombre);
                    totalPrecio.push(productosDisponibles[2].precio);
                    break;

                case 3:
                    alert ("Agregaste Medias al carrito, ¿quieres sumar algo más?");
                    articulosAgregados++;
                    productosAgregados.push(productosDisponibles[3].nombre);
                    totalPrecio.push(productosDisponibles[3].precio);
                    break;
                
                case 4:
                    alert("Agregaste Botella al carrito, ¿quieres sumar algo más?");
                    articulosAgregados++;
                    productosAgregados.push(productosDisponibles[4].nombre);
                    totalPrecio.push(productosDisponibles[4].precio);
                    break;

                case 5:
                    alert("Cerrando carrito... " + nombreCompleto + " seleccionaste un total de " + articulosAgregados + " artículos");
                    break;
                    
            
                default:
                alert("Opción inválida. Por favor, selecciona una opción del 0 al 5.");
                break;
        }
    } else {
        // BUSCAMOS SI LA ENTRADA ES EL NOMBRE DEL PRODUCTO
        const productoEncontrado = productosDisponibles.find(producto => producto.nombre.toLowerCase() === agregarProductos.trim().toLowerCase()); // Esta línea busca si el nombre ingresado por el usuario coincide con el nombre de algún producto en el array productosDisponibles.
        
        if (productoEncontrado) {
            alert("El precio de " + productoEncontrado.nombre + " es $" + productoEncontrado.precio);
        } else {
            alert("Producto no encontrado. Intenta con otro nombre o selecciona una opción del 0 al 5.");
        }
    }
    

   } while (agregarProductos !== 5) // El ciclo se repetirá siempre y cuando el usuario no ingrese el número 5, si lo ingresa, se cierra y se muestra en consola luego el Array construido

// Calcular el total de los precios en el carrito
const total = totalPrecio.reduce((acumulado, precio) => acumulado + precio, 0);

   console.log("Productos agregados:", productosAgregados);
   console.log("Cantidad de artículos agregados:", articulosAgregados);
   console.log("El total de lo agregado al carrito es $" + total);
}


CarritoDeCompras();

