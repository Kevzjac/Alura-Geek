/*Función para tomar datos de un producto del servidor de DB.JSON*/
async function listaProductos(){
    const conexion = await fetch("http://localhost:3002/cards",{
        method:"GET",
        headers:{
            "Content-type":"application/json",
        }
    });

    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}

/*Función para enviar datos de un porducto al servidor DB.JSON */
async function crearProducto(nombre,precio,imagen){
    const conexion = await fetch("http://localhost:3002/cards",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
        },
        body:JSON.stringify({
            nombre:nombre,
            precio:precio,
            imagen:imagen
        })
    })
    const conexionConvertida = await conexion.json();

    if(!conexion.ok){
        throw new Error("Ha ocurrido un error al enviar la información");
    }
    return conexionConvertida;
}

/*Función para eliminar datos de un producto del servidor DB.JSON */
async function eliminarProductos(id){
    try{
        const conexion = await fetch(`http://localhost:3002/cards/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
            },
        });
        if(!conexion.ok) throw new Error("Error al intentar eliminar");
        return "Producto eliminado";
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

/*Exportar funciones */
export const conexionAPI = {
    listaProductos, crearProducto, eliminarProductos
}