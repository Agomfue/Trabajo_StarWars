/*Se hara un inner html donde se modificar las opciones y luego seleccionarlas con un switch*/

/*Para hacer que las secciones se oculten y aparezacan al hacer click*/
const hangarEnl = document.getElementById("hangarEnl");
const pilotosEnl = document.getElementById("pilotosEnl");
const misionesEnl = document.getElementById("misionesEnl");
const dashboardEnl = document.getElementById("dashboardEnl");
const hangar = document.getElementById("hangar");
const pilotos = document.getElementById("pilotos");
const misiones = document.getElementById("misiones");
const dashboard = document.getElementById("dashboard");
let pilotosArray = [];

/*Lo que hace es añadir la clase oculto a los elementos*/
function ocultarTodo() {
    hangar.classList.add("oculto");
    pilotos.classList.add("oculto");
    misiones.classList.add("oculto");
    dashboard.classList.add("oculto");
}

hangarEnl.addEventListener("click", function() {
    ocultarTodo();/*oculta todas las secciones*/
    hangar.classList.remove("oculto");/*Le quita la clase oculto a la seccion*/
});

pilotosEnl.addEventListener("click", function() {
    ocultarTodo();
    pilotos.classList.remove("oculto");
});

misionesEnl.addEventListener("click", function() {
    ocultarTodo();
    misiones.classList.remove("oculto");
});

dashboardEnl.addEventListener("click", function() {
    ocultarTodo();
    dashboard.classList.remove("oculto");
});


/*Para crear el formulario de los pilotos*/
let nombre = document.getElementById("nombrePil");
let rango = document.getElementById("rangoPil");
let nave = document.getElementById("select");
let victorias = document.getElementById("victoriasPil");
let estado = document.getElementById("Estado");
let lista = document.getElementById("lista");

document.getElementById("agregar").addEventListener("click", function(){
    
    let li = document.createElement("li");
    /* Obliga que los numeros sean positivos ya que los numeros menores de 0
    se tratan de un string y eso impide que entre y da la alerta*/
    if (Number(victorias.value) <= 0) {
        alert("Las victorias deben ser un número positivo");
        return;
    }
    
    if(nombre.value.trim() ==""){
         alert("El nombre no puede estar vacío");
        return;
    }
    else if(rango.value.trim() ==""){
         alert("El rango no puede estar vacío");
        return;
    }
    else if(victorias.value.trim() ==""){
         alert("Las victorias no pueden estar vacias");
        return;
    }
    // Crea los pilotos
        let piloto = {
            nombre: nombre.value,
            rango: rango.value,
            nave: nave.value,
            victorias: victorias.value,
            estado: estado.value
        }

        //Se guarda en el array
        pilotosArray.push(piloto);
        let span = document.createElement("span");/*el span luego podras cambiarlo por input*/
        span.textContent = nombre.value + " - "
                        + rango.value + " - "
                        + nave.value + " - "
                        + victorias.value + " - "
                        + estado.value + " - ";
        let botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";

        botonEditar.addEventListener("click", function(){
            /*cambias el texto por un campo que se puede editar*/
            let input = document.createElement("input");
            input.type = "text";
            input.value = span.textContent;

            /*El span se convierte en un input*/
            li.replaceChild(input, span);
            input.focus();

            botonEditar.textContent = "Guardar";
            /*El texto se cambia y se convierte en el modificado*/
            botonEditar.onclick = function(){
                if(input.value.trim() !== ""){
                    span.textContent = input.value;
                    li.replaceChild(span, input);
                    botonEditar.textContent = "Editar";
                }
            };

        });

        
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function(){
            /*Confirm muestra una ventana para aceptar o rechazar
            si lo hace el piloto se borrara*/
        if(confirm("¿Seguro que quiere borrar?")){
            li.remove();
        }
    });
        /*Se añade todo al li*/
        li.appendChild(span);
        li.appendChild(document.createElement("br"));
        li.appendChild(botonEditar);
        li.appendChild(botonEliminar);

        /*Aqui el piloto se mostrara en pantalla*/
        lista.appendChild(li);
        
        /*El formulario se limpiara para poder escribir un nuevo piploto*/
        nombre.value = "";
        rango.value = "";
        victorias.value = "";
        
        
    
});


/*El select dinamico de naves*/
/*Se necesita el array de naves completo*/
let naves = [
    { nombre: "X-Wing", tipo: "Caza" },
    { nombre: "A-Wing", tipo: "Caza" },
    { nombre: "Halcón Milenario", tipo: "Transporte" }
];

let selectNave = document.getElementById("select");
/*Crea las opciones de dentro del select esto es la opcion de selecciona nave*/
let opciones = "<option value=''>Selecciona nave</option>";

/*El for lo que hace es recorrer el array completo*/
for (let i = 0; i < naves.length; i++) {
    opciones += "<option value='" + naves[i].nombre + "'>" + naves[i].nombre + "</option>";
    /*Para cada nave se añade una nueva opcion*/
}

/*Mete todas las naves dentro del select
El switch solo confirma que se eligio una nave y despues para*/
selectNave.innerHTML = opciones;
switch(nave.value) {
    case "X-Wing":
        console.log("Es un caza rápido");
        break;

    case "A-Wing":
        console.log("Muy maniobrable");
        break;

    case "Halcón Milenario":
        console.log("Transporte legendario");
        break;
}

//Selecct de estado
let estadoOp = [
    {tipo: "Activo"},
    {tipo: "Herido"},
    {tipo: "KIA"}
];

let opcionesEs = "<option value=''>Pon el estado</option>";

for (let i = 0; i < estadoOp.length; i++) {
    opcionesEs += "<option value='" + estadoOp[i].tipo + "'>" + estadoOp[i].tipo + "</option>";
    /*Para cada nave se añade una nueva opcion*/
}

estado.innerHTML = opcionesEs;
switch(estado.value) {
    case "Activo":
        console.log("Es un caza rápido");
        break;

    case "Herido":
        console.log("Muy maniobrable");
        break;

    case "KIA":
        console.log("Transporte legendario");
        break;
}