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


//PARTE DE LA SECCION 1
let navesHangar = [
  { nombre: "Halcón Milenario", tipo: "transporte", velocidad: 80, tripulacion: 4, estado: "operativa", imagen: "El-Halcón-Milenario-Star-Wars.jpg" },
  { nombre: "Ala-X", tipo: "caza", velocidad: 100, tripulacion: 1, estado: "operativa", imagen: "Ala-x.jpg" },
  { nombre: "Ala-A", tipo: "caza", velocidad: 120, tripulacion: 1, estado: "en reparación", imagen: "Ala-a.jpg" },
  { nombre: "Ala-B", tipo: "caza", velocidad: 90, tripulacion: 1, estado: "operativa", imagen: "Ala-B.jpg" },
  { nombre: "Ala-Y", tipo: "bombardero", velocidad: 80, tripulacion: 2, estado: "en reparación", imagen: "Ala-y.jpg" },
  { nombre: "El Espíritu", tipo: "transporte", velocidad: 85, tripulacion: 6, estado: "operativa", imagen: "El-espectro.jpg" },
  { nombre: "Flota Alianza Rebelde", tipo: "transporte", velocidad: 60, tripulacion: 5, estado: "operativa", imagen: "Flota-Alianza-Rebelde.jpg" },
  { nombre: "Transporte GR-75", tipo: "transporte", velocidad: 50, tripulacion: 6, estado: "destruida", imagen: "Transporte-Rebelde.jpg" },
  { nombre: "Crucero Mon Calamari", tipo: "crucero", velocidad: 60, tripulacion: 5400, estado: "operativa", imagen: "MCLiberty.jpg" },
  { nombre: "Fragata Nebulon-B", tipo: "fragata", velocidad: 40, tripulacion: 850, estado: "operativa", imagen: "Fragata-Nebulon-B.jpg" },
  { nombre: "Corbeta Corelliana", tipo: "corbeta", velocidad: 70, tripulacion: 165, estado: "operativa", imagen: "Corbeta-Corelliana.jpg" }
];

// Recoger elementos del DOM
let buscarNave = document.getElementById("buscarNave");
let filtroTipo = document.getElementById("filtroTipo");
let ordenarBtn = document.getElementById("ordenarBtn");
let listaNaves = document.getElementById("listaNaves");
let contador = document.getElementById("contador");

let ascendente = true;

// Función para cargar tipos únicos en el select
function cargarTipos() {
    let opciones = "<option value=''>Todos los tipos</option>";
    
    // Creamos un array con solo los tipos y filtramos duplicados
    let tiposSinDuplicados = [];
    navesHangar.forEach(nave => {
        if (!tiposSinDuplicados.includes(nave.tipo)) {
            tiposSinDuplicados.push(nave.tipo);
        }
    });

    // Generamos las opciones del select

    /* Recorre el array de tipos únicos para crear las etiquetas de opción del selector */
    tiposSinDuplicados.forEach(tipo => {
        /* Crea un string HTML <option>. charAt(0).toUpperCase() pone la primera letra en mayúscula para que quede mejor visualmente */
        opciones += `<option value="${tipo}">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>`;
    });
     /* Inserta todas las opciones generadas dentro del elemento HTML del select de filtrado */
    filtroTipo.innerHTML = opciones;
}

/* Función encargada de renderizar las naves en la página según los filtros aplicados */
function mostrarNaves() {
     /* Limpia el contenedor de la lista de naves para que no se dupliquen al filtrar o buscar */
    listaNaves.innerHTML = "";

    /* Obtiene el texto del buscador (en minúsculas para que no importe si el usuario usa Mayúsculas) */
    let texto = buscarNave.value.toLowerCase();
    /* Obtiene el tipo de nave seleccionado en el menú desplegable */
    let tipoSeleccionado = filtroTipo.value;
    /* Variable para llevar la cuenta de cuántas naves cumplen los requisitos del filtro */
    let total = 0;

    /* Bucle que recorre toda la base de datos de naves (array navesHangar) */
    for (let i = 0; i < navesHangar.length; i++) {
         /* Guarda la nave actual en una variable para facilitar el acceso a sus propiedades */
        let nave = navesHangar[i];

        /* Condicional de filtrado: comprueba si el nombre incluye el texto buscado Y si el tipo coincide (o está en 'Todos') */
        if (
            nave.nombre.toLowerCase().includes(texto) &&
            (tipoSeleccionado === "" || nave.tipo === tipoSeleccionado)
        ) {
            /* Crea un nuevo elemento div en memoria para representar la tarjeta de la nave */
            let div = document.createElement("div");

            /* Asigna una clase CSS al div para que tome los estilos definidos en Style.css */
            div.className = "tarjeta-nave"; // Clase para darle estilo en CSS

            /* Define el contenido interno del div usando Template Literals para insertar los datos de la nave */
            div.innerHTML = `
                <img src="${nave.imagen}" alt="${nave.nombre}" style="width:100px; height:auto; display:block;">
                <h3>${nave.nombre}</h3>
                <p><strong>Tipo:</strong> ${nave.tipo}</p>
                <p><strong>Velocidad:</strong> ${nave.velocidad} MGLT</p>
                <p><strong>Tripulación:</strong> ${nave.tripulacion}</p>
                <p><strong>Estado:</strong> ${nave.estado}</p>
                <hr>
            `;

            /* Añade el div recién creado al contenedor principal de la lista en el HTML */
            listaNaves.appendChild(div);

            /* Incrementa el contador de naves visibles */
            total++;
        }
    }

    /* Actualiza el texto del contador en la pantalla para informar al usuario cuántas naves se están mostrando */
    contador.textContent = "Mostrando " + total + " naves";
}

// --- Eventos ---

// Buscador en tiempo real
buscarNave.addEventListener("input", mostrarNaves);

// Filtro por tipo
filtroTipo.addEventListener("change", mostrarNaves);

// Ordenar por velocidad
ordenarBtn.addEventListener("click", function () {
    if (ascendente) {
        navesHangar.sort((a, b) => a.velocidad - b.velocidad);
    } else {
        navesHangar.sort((a, b) => b.velocidad - a.velocidad);
    }

    ascendente = !ascendente; // Invertimos para el próximo clic
    mostrarNaves();
});

// Iniciar hangar
cargarTipos();
mostrarNaves();

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
                let pos = i;
                //Borra el piloto del array y si no lo encuentra dara -1 por lo que no borrara nada
                if(pos !== -1){
                    pilotosArray.splice(pos, 1);//Borra elementos del array especificando posicion
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

let selectNave = document.getElementById("select");
/*Crea las opciones de dentro del select esto es la opcion de selecciona nave*/
let opciones = "<option value=''>Selecciona nave</option>";

/*El for lo que hace es recorrer el array completo*/
for (let i = 0; i < navesHangar.length; i++) {
    opciones += "<option value='" + navesHangar[i].nombre + "'>" + navesHangar[i].nombre + "</option>";
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
let estadoOp = [{tipo: "Activo"}, {tipo: "Herido"},{tipo: "KIA"}];

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
let fechaMision = document.getElementById("fechaMision");
let descripcionMin = document.getElementById("descripcionMin");
let crearMision = document.getElementById("crearMision");
let filtroDificultad = document.getElementById("filtroDificultad");
let selectDi = document.getElementById("selectDi");
let opcionesDi = "<option value=''>Selecciona la dificultad</option>";
//Array de las misiones
let misionesArray = [];
//si existe algo guardado como pilotos entre y 
//convierte el texto con .parse en un array otra vez
if (localStorage.getItem("misiones")) {
    misionesArray = JSON.parse(localStorage.getItem("misiones"));
}
anadidosLista();
//--------Formulario

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

function misionesActivas() {

    //limpiamos las listas
    document.getElementById("listPen").innerHTML = "";
    document.getElementById("lisCur").innerHTML = "";
    document.getElementById("lisCom").innerHTML = "";
    let filtro = filtroDificultad.value;

    for (let i = 0; i < misionesArray.length; i++) {
        if (filtro !== "Todas" && filtro !== "" && misionesArray[i].dificultad !== filtro) {
            continue; //salta esa mision
        }

        let tarjetitas = document.createElement("div");

        //Se insertan valores dentro del array
        tarjetitas.innerHTML = 
            `<span>${misionesArray[i].nombre}</span>
            <span>${misionesArray[i].dificultad}</span>
            <span>${misionesArray[i].fecha}</span>
            <span>${misionesArray[i].estado}</span>
            <div class="acciones"></div>`;

        //busca los elementos de acciones
        let contenedorBotones = tarjetitas.querySelector(".acciones");

        let posicion = i;
        //Boton de eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function () {
            if (confirm("¿Seguro que quieres eliminar esta misión?")) {
                //borrar del array
                misionesArray.splice(posicion, 1);
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

            if (misionesArray[posicion].estado === "Pendiente") {
                misionesArray[posicion].estado = "En curso";
            } 
            else if (misionesArray[posicion].estado === "En curso") {
                misionesArray[posicion].estado = "Completada";
            }

            localStorage.setItem("misiones", JSON.stringify(misionesArray));
            misionesActivas();
            numeroMin();
        });

        //se mete el boton de eliminar en acciones
        contenedorBotones.appendChild(botonAvanzar);
        contenedorBotones.appendChild(botonEliminar);

        //se añade a la lista
        if (misionesArray[i].estado === "Pendiente") {
            document.getElementById("listPen").appendChild(tarjetitas);
        }
        else if (misionesArray[i].estado === "En curso") {
            document.getElementById("lisCur").appendChild(tarjetitas);
        }
        else if (misionesArray[i].estado === "Completada") {
            document.getElementById("lisCom").appendChild(tarjetitas);
        }
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

    //for para aumentar los contadores
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

//Selct dificultad
let dificultades = [
    {tipo: "Facil"}, 
    {tipo: "Media"},
    {tipo: "Dificil"},
    {tipo: "Suicida"}
];
//Se crea la opcion predeterminada siendo primero un texto que se mete dentro del select

//Un for que recorre todo el array para que aparezcan todas lo de dentro como opciones
for (let i = 0; i < dificultades.length; i++) {
    //Las opciones se van acumalando para que no se sobreescriba
    //lo demas crea la etiqueta option y con el [i] accede a cada elemeto del array
    opcionesDi += "<option value='" + dificultades[i].tipo + "'>" + dificultades[i].tipo + "</option>";
}

//inserta todo toda las opciones en el select
selectDi.innerHTML = opcionesDi;

switch(selectDi.value) {
    case "Facil":
        console.log("mision facil");
        break;

    case "Media":
        console.log("mision media");
        break;

    case "Dificil":
        console.log("mision dificil");
        break;

    case "Suicida":
        console.log("mision suicida");
        break;
}

misionesActivas();
numeroMin();


//PARTE DE LA SECCION 4
//* Función que calcula y actualiza todas las estadísticas generales en la interfaz */
function actualizarDashboard() {

    // -------- NAVES --------

    /* Muestra la cantidad total de naves contando el tamaño del array navesHangar */
    document.getElementById("totalNaves").textContent =
        "Total de naves: " + navesHangar.length;

    /* Inicializa contadores para los diferentes estados de las naves */
    let operativas = 0;
    let reparacion = 0;
    let destruidas = 0;

    /* Recorre el array de naves para clasificar cada una según su estado */
    for (let i = 0; i < navesHangar.length; i++) {
        /* Convierte el estado a minúsculas para evitar errores de comparación */
        let estadoActual = navesHangar[i].estado.toLowerCase();

        /* Suma 1 al contador correspondiente según el estado de la nave actual */
        if (navesHangar[i].estado === "operativa") {
            operativas++;
        }
        else if (navesHangar[i].estado === "en reparación") {
            reparacion++;
        }
        else if (navesHangar[i].estado === "destruida") {
            destruidas++;
        }
    }

    /* Imprime el resumen de estados de naves en el elemento HTML correspondiente */
    document.getElementById("estadoNaves").textContent =
        "Operativas: " + operativas +
        " | Reparación: " + reparacion +
        " | Destruidas: " + destruidas;


    // -------- PILOTOS --------

    /* Muestra el total de pilotos registrados en la aplicación */
    document.getElementById("totalPilotos").textContent =
        "Total de pilotos: " + pilotosArray.length;

    /* Inicializa contadores para los estados de salud/disponibilidad de los pilotos */
    let activos = 0;
    let heridos = 0;
    let kia = 0;/*Fallecido*/

    /* Recorre el array de pilotos y aumenta los contadores según su estado */
    for (let i = 0; i < pilotosArray.length; i++) {
        if (pilotosArray[i].estado === "Activo") {
            activos++;
        }
        else if (pilotosArray[i].estado === "Herido") {
            heridos++;
        }
        else if (pilotosArray[i].estado === "KIA") {
            kia++;
        }
    }

    /* Refleja los resultados en el texto del dashboard */
    document.getElementById("estadoPilotos").textContent =
        "Activos: " + activos +
        " | Heridos: " + heridos +
        " | KIA: " + kia;


    // -------- MISIONES --------

    /* Muestra cuántas misiones existen en total en el sistema */
    document.getElementById("totalMisiones").textContent =
        "Total de misiones: " + misionesArray.length;

    /* Inicializa contadores para las fases del tablero Kanban */
    let pendientes = 0;
    let curso = 0;
    let completadas = 0;

    /* Bucle para contar cuántas misiones hay en cada fase del proceso */
    for (let i = 0; i < misionesArray.length; i++) {
        if (misionesArray[i].estado === "Pendiente") {
            pendientes++;
        }
        else if (misionesArray[i].estado === "En curso") {
            curso++;
        }
        else if (misionesArray[i].estado === "Completada") {
            completadas++;
        }
    }

    /* Actualiza la información visual de las misiones */
    document.getElementById("estadoMisiones").textContent =
        "Pendientes: " + pendientes +
        " | En curso: " + curso +
        " | Completadas: " + completadas;


    // -------- MEJOR PILOTO --------

    /* Asume inicialmente que el primer piloto es el mejor para empezar a comparar */
    let mejor = pilotosArray[0];

    /* Compara las victorias de cada piloto con el que consideramos "mejor" hasta el momento */
    for (let i = 1; i < pilotosArray.length; i++) {
        if (
            Number(pilotosArray[i].victorias) >
            Number(mejor.victorias)
        ) {
            /* Si encontramos a alguien con más victorias, actualizamos la variable */
            mejor = pilotosArray[i];
        }
    }

    /* Si el array no estaba vacío, muestra el nombre y victorias del piloto líder */
    if (mejor) {
        document.getElementById("mejorPiloto").textContent =
            mejor.nombre + " - " + mejor.victorias + " victorias";
    }


    // -------- NAVE MÁS RÁPIDA --------

    /* Aplica la misma lógica de comparación pero usando la propiedad 'velocidad' de las naves */
    let rapida = navesHangar[0];

    for (let i = 1; i < navesHangar.length; i++) {
        if (navesHangar[i].velocidad > rapida.velocidad) {
            rapida = navesHangar[i];
        }
    }

    /* Muestra la nave con mayor número de megaluz (MGLT) */
    document.getElementById("naveRapida").textContent =
        rapida.nombre + " - " + rapida.velocidad + " megaluz";


    // -------- BARRA DE PROGRESO --------

    /* Variable para guardar el resultado del cálculo matemático del porcentaje */
    let porcentaje = 0;

    /* Solo calcula el porcentaje si hay misiones, para evitar errores de división por cero */
    if (misionesArray.length > 0) {
        /* Regla de tres: (Misiones completadas * 100) / Total de misiones */
        porcentaje =
            (completadas * 100) / misionesArray.length;
    }

    /* Ajusta el ancho (width) de la barra de progreso en el CSS de forma dinámica */
    document.getElementById("barraProgreso").style.width =
        porcentaje + "%";

    /* Muestra el número redondeado del porcentaje de éxito de la Alianza */
    document.getElementById("porcentajeMisiones").textContent =
        Math.round(porcentaje) + "% completado";
}
/* Ejecuta la función al cargar el script para que el dashboard no aparezca vacío al inicio */
actualizarDashboard();
