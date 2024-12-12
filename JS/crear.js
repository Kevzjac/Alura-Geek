/*Importar funciones de archivo conexion.js */
import { conexionAPI } from "./conexion.js";

/*Tomando datos del fromulario en servidor*/
const formulario = document.querySelector("[data-formulario]");

/*Función para crear un producto nuevo*/
async function crearProducto(evento){
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    

    try{
        await conexionAPI.crearProducto(nombre,precio,imagen);

    }
    catch(e){
        alert(e)
    }
}

/*Accionamiento del botón para crear un producto nuevo*/
formulario.addEventListener("submit",evento => crearProducto(evento));

/*Accionamiento de botón para limpiar el formulario*/
document.getElementById('borrar').addEventListener('click', function() {
    document.getElementById('formulario').reset();
    alert('Formulario borrado');
});