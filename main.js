/*Se hara un inner html donde se modificar las opciones y luego seleccionarlas con un switch*/

let nombre = document.getElementById("nombrePil");
let rango = document.getElementById("rangoPil");
let nave = document.getElementById("select");
let victorias = document.getElementById("victoriasPil");
let estado = document.getElementById("Estado");
let lista = document.getElementById("lista");

document.getElementById("agregar").addEventListener("click", function(){
    if(nombre.value.trim() !==""){
        let li = document.createElement("li");
        li.textContent = nombre.value + " - "
                        + rango.value + " - "
                        + nave.value + " - "
                        + victorias.value + " - "
                        + estado.value + " - ";
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function(){
        li.remove();
    });

        li.appendChild(botonEliminar);
        lista.appendChild(li);
        
        nombre.value = "";
        rango.value = "";
        victorias.value = "";
        
    }
});