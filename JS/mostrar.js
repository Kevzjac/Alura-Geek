/*Importar funciones desde archivo conexion.js*/
import { conexionAPI } from "./conexion.js";

/*Tomando datos del servidor*/
const lista = document.querySelector("[data-lista]");

/*Función para presentar los productos*/
function construyeProducto (nombre,precio,imagen,id){
    const producto = document.createElement("li");
    producto.className = "producto__item";

    producto.innerHTML = 
    `
    <li class="card__container">
        <div class="card__container--interno">
            <img src="${imagen}" alt="imagen producto" />
            <p>${nombre}</p>
            <div class="card__inferior">
                <p><b>$${precio}</b></p>
                <button type="button" class="eliminar__boton" data-id="${id}">
                    <img src="../Images/borrar (1).png" alt="boton borar" />
                </button>
            </div>
        </div>
    </li>                       
    `
    return producto;
}

/*Función para eliminar los productos*/
async function eliminarProductos(id){
    try{
        await conexionAPI.eliminarProductos(id);
        alert("Producto eliminado con éxito");
        actualizarLista();
    }catch(error){
        alert("Error al eliminar el producto");
        console.error(error.message);
    }
}

/*Función para actualizar la lista de productos en el servidor*/
async function actualizarLista(){
    lista.innerHTML="";
    await listaProductos();
}

/*Función para desplegar la lista de productos en el servidor*/
async function listaProductos(){
    try{
        const listaAPI = await conexionAPI.listaProductos();
        listaAPI.forEach(elemento => lista.appendChild(
            construyeProducto(
                elemento.nombre, 
                elemento.precio, 
                elemento.imagen
                ,
                elemento.id
            ))
        );
        const botonesEliminar = document.querySelectorAll(".eliminar__boton");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", (event) =>{
                const id = event.target.closest(".eliminar__boton").dataset.id;
                eliminarProductos(id);
            })
        })
    }
    catch{
        lista.innerHTML = `<h2 class="mensaje">Ha ocurrido un problema con la conexión</h2>`;
    }
}

listaProductos();