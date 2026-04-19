/*Para hacer que las secciones se oculten y aparezacan al hacer click*/
const hangarEnl = document.getElementById("hangarEnl");
const pilotosEnl = document.getElementById("pilotosEnl");
const misionesEnl = document.getElementById("misionesEnl");
const dashboardEnl = document.getElementById("dashboardEnl");
const hangar = document.getElementById("hangar");
const pilotos = document.getElementById("pilotos");
const misiones = document.getElementById("misiones");
const dashboard = document.getElementById("dashboard");
//Array de los pilotos
let pilotosArray = [];
/* Cargar pilotos guardados al iniciar */
//si existe algo guardado como pilotos entre y 
//convierte el texto con .parse en un array otra vez
if (localStorage.getItem("pilotos")) {
    pilotosArray = JSON.parse(localStorage.getItem("pilotos"));
}
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


//PARTE DE LA SECCION 2
/*Para crear el formulario de los pilotos*/
let nombre = document.getElementById("nombrePil");
let rango = document.getElementById("rangoPil");
let nave = document.getElementById("select");
let victorias = document.getElementById("victoriasPil");
let estado = document.getElementById("Estado");
let lista = document.getElementById("lista");

document.getElementById("agregar").addEventListener("click", function(){
    
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
    if(rango.value.trim() ==""){
         alert("El rango no puede estar vacío");
        return;
    }
    // Crea los pilotos
        let piloto = {
            id: Date.now(),//le agrega un id unico a cada piloto
            nombre: nombre.value,//son las propiedades del piloto y su nombre
            rango: rango.value,
            nave: nave.value,
            victorias: victorias.value,
            estado: estado.value
        }

        //Se guarda en el array
        pilotosArray.push(piloto);

        //se usa la funcion para mostar los pilotos
        anadidosLista();
        //Se llama a la funcion para que aparezcan las nuevos pilotos
        recogerPilotos();
        /*El formulario se limpiara para poder escribir un nuevo piploto*/
        nombre.value = "";
        rango.value = "";
        victorias.value = "";
});

// Con esta funcion mostramos los pilotos
function anadidosLista() {
    lista.innerHTML = ""; //Borra todo lo que hay en la lista para que no se dupliquen

    for (let i = 0; i < pilotosArray.length; i++) {//Se recorre el array por pilotos
        let li = document.createElement("li");
        //Muestra los datos del array
        //crea span dentro y mete la listas
        li.innerHTML = `
            <span class="listaNombre">${pilotosArray[i].nombre}</span> 
            <span class="listaRango">${pilotosArray[i].rango}</span>
            <span class="listaNave">${pilotosArray[i].nave}</span>
            <span class="listaVictorias">${pilotosArray[i].victorias}</span>
            <span class="listaEstado">${pilotosArray[i].estado}</span>
            <span class="acciones"></span>`;

        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function(){
            //Muestra la ventana emergente
            if(confirm("¿Seguro que quiere borrar?")){
                //Guarda en esta variable la posiscion exacta del piloto
                let index = i;
                //Borra el piloto del array y si no lo encuentra dara -1 por lo que no borrara nada
                if(index !== -1){
                    pilotosArray.splice(index, 1);//Borra elementos del array especificando posicion
                }
                li.remove();//quita el li de la pantalla
                anadidosLista();
            }
        });

        let botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", function(){
            //manda a rellenar los datos otra vez al formulario
            //con los datos antiguos ya puesto
            nombre.value = pilotosArray[i].nombre;
            rango.value = pilotosArray[i].rango;
            nave.value = pilotosArray[i].nave;
            victorias.value = pilotosArray[i].victorias;
            estado.value = pilotosArray[i].estado;

            //Elimina un piloto sin editar del array de la posicion en la que este i
            pilotosArray.splice(i, 1);

            //se usa la funcion para mostar los pilotos
            anadidosLista();
            //Se llama a la funcion para que actualice las opciones de piloto
            recogerPilotos();
        });        

        //añade los botones de eliminar y editar al li 
        // metiendose dentro del piloto por lo que aparece al lado
        let contenedorBotones = li.querySelector(".acciones");//busca dentro del span
        contenedorBotones.appendChild(botonEditar);//mete los botones dentro del span
        contenedorBotones.appendChild(botonEliminar);
        lista.appendChild(li);//Añade el li recien creado a la lista
        
    }
    // Guardar siempre que se repinta
    //setItem guarda cosas en el localStorage
    //el localStorage solo puede guardar texto 
    //JSON.stringify() convierte el array en JSON para poder guardar el texto
    localStorage.setItem("pilotos", JSON.stringify(pilotosArray));
}
/*Se hara un inner html donde se modificar las opciones y luego seleccionarlas con un switch*/
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
        console.log("activa");
        break;

    case "Herido":
        console.log("herida");
        break;

    case "KIA":
        console.log("fallecida");
        break;
}
//Se pone para que al recargar los pilotos reaparezacan
anadidosLista();

//PARTE DE LA SECCION 3
let nombreMin = document.getElementById("nombreMin");
let selectPil = document.getElementById("selectPil");
let selectDi = document.getElementById("selectDi");
let fechaMision = document.getElementById("fechaMision");
let descripcionMin = document.getElementById("descripcionMin");
let crearMision = document.getElementById("crearMision");
let filtroDificultad = document.getElementById("filtroDificultad");
//Array de las misiones
let misionesArray = [];
//si existe algo guardado como pilotos entre y 
//convierte el texto con .parse en un array otra vez
if (localStorage.getItem("misiones")) {
    misionesArray = JSON.parse(localStorage.getItem("misiones"));
}
recogerPilotos();
misionesActivas();
//--------Formulario
//Selct dificultad
let dificiltades = ["Facil", "Media", "Dificil", "Suicida"];
//Se crea la opcion predeterminada siendo primero un texto que se mete dentro del select
let opcionesDi = "<option value=''>Selecciona la dificultad</option>";

//Un for que recorre todo el array para que aparezcan todas lo de dentro como opciones
for(let i = 0; i < dificiltades.length; i++){
    //Las opciones se van acumalando para que no se sobreescriba
    //lo demas crea la etiqueta option y con el [i] accede a cada elemeto del array
    opcionesDi += "<option value='" + dificiltades[i] + "'>" + dificiltades[i] + "</option>";
}


//inserta todo toda las opciones en el select
selectDi.innerHTML = opcionesDi;

//select de pilotos
function recogerPilotos(){
    let opcionesPil = "<option value=''>Selecciona piloto</option>";

    for(let i = 0; i < pilotosArray.length; i++){
        //Si el piloto esta activo aparecera como opcion
        if(pilotosArray[i].estado === "Activo"){
            opcionesPil += "<option value='" + pilotosArray[i].id + "'>" + pilotosArray[i].nombre + "</option>";
        }
}
//Mete en el select las opciones
selectPil.innerHTML = opcionesPil;
}

//Hacer funcionar el boton de crear mision
crearMision.addEventListener("click", function(){
    //Comprobacion de de campos vacios
    if(nombreMin.value.trim() === "" || selectPil.value === "" || selectDi.value === "" || fechaMision.value === "" || descripcionMin.value.trim() === ""){
        //aviso que esta mal
        alert("Es necesario rellenar todos los campas")
        //termina
        return;
    }

    let mision = {
        id: Date.now(),//Le da un id unico a cada mision
        nombre: nombreMin.value,
        pilotoId: Number(selectPil.value),//Guarda el id del piloto y lo convierte a texto
        dificultad: selectDi.value,
        fecha: fechaMision.value,
        descripcion: descripcionMin.value,
        estado: "Pendiente"//todas las misiones empezaran en pendiente
    };
    //Se añaden las misiones al array
    misionesArray.push(mision);
    //se convierte el array a texto y se guarda en el navegador
    localStorage.setItem("misiones", JSON.stringify(misionesArray));
    //Se muestran las misiones
    misionesActivas();
    //Se limpia el formulario
    nombreMin.value = "";
    selectPil.value = "";
    selectDi.value = "";
    fechaMision.value = "";
    descripcionMin.value = "";
});

//Se llama a la funcion para que aparezcan las opciones
recogerPilotos();

let listaMisiones = document.getElementById("listaMisiones");
function misionesActivas() {
    listaMisiones.innerHTML = "";
    let filtro = filtroDificultad.value;

    for (let i = 0; i < misionesArray.length; i++) {
        if (filtro !== "" && misionesArray[i].dificultad !== filtro) {
            continue; //salta esa mision
        }

        let li = document.createElement("li");

        li.innerHTML = 
            `<span>${misionesArray[i].nombre}</span>
            <span>${misionesArray[i].dificultad}</span>
            <span>${misionesArray[i].fecha}</span>
            <span>${misionesArray[i].estado}</span>
            <span class="acciones"></span>`;

        let contenedorBotones = li.querySelector(".acciones");

        //Boton de eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function () {
            if (confirm("¿Seguro que quieres eliminar esta misión?")) {
                //borrar del array
                misionesArray.splice(i, 1);
                //actualizar localStorage
                localStorage.setItem("misiones", JSON.stringify(misionesArray));
                //se muestra la lista
                misionesActivas();
                //actualiza el numero de misiones
                numeroMin();
            }
        });

        //Boton para mover de columna
        let botonAvanzar = document.createElement("button");
        botonAvanzar.textContent = "avanzar";

        botonAvanzar.addEventListener("click", function () {

            if (misionesArray[i].estado === "Pendiente") {
                misionesArray[i].estado = "En curso";
            } 
            else if (misionesArray[i].estado === "En curso") {
                misionesArray[i].estado = "Completada";
            }

            localStorage.setItem("misiones", JSON.stringify(misionesArray));
            misionesActivas();
            numeroMin();
        });

        //se mete el boton de eliminar en acciones
        contenedorBotones.appendChild(botonAvanzar);
        contenedorBotones.appendChild(botonEliminar);

        //se añade a la lista
        listaMisiones.appendChild(li);
    }
}

//filtro
filtroDificultad.addEventListener("change", function () {
    misionesActivas(); //se vuelve a poner todo con el filtro
});

//contador de cuantas misiones hay
function numeroMin() {
    let pen = 0;
    let cur = 0;
    let com = 0;

    for (let i = 0; i < misionesArray.length; i++) {
        if (misionesArray[i].estado === "Pendiente") {
            pen++;
        } 
        else if (misionesArray[i].estado === "En curso") {
            cur++;
        } 
        else if (misionesArray[i].estado === "Completada") {
            com++;
        }
    }

    document.getElementById("contadorPen").textContent = pen;
    document.getElementById("contadorCur").textContent = cur;
    document.getElementById("contadorCom").textContent = com;
}
misionesActivas();
numeroMin();