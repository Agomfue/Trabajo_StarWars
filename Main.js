// SECCIÓN 1 - HANGAR


// Array de naves completo y actualizado
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
    tiposSinDuplicados.forEach(tipo => {
        opciones += `<option value="${tipo}">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>`;
    });

    filtroTipo.innerHTML = opciones;
}

// Función para mostrar las naves en el HTML
function mostrarNaves() {
    listaNaves.innerHTML = "";

    let texto = buscarNave.value.toLowerCase();
    let tipoSeleccionado = filtroTipo.value;
    let total = 0;

    for (let i = 0; i < navesHangar.length; i++) {
        let nave = navesHangar[i];

        // Filtro por nombre y por tipo
        if (
            nave.nombre.toLowerCase().includes(texto) &&
            (tipoSeleccionado === "" || nave.tipo === tipoSeleccionado)
        ) {
            let div = document.createElement("div");
            div.className = "tarjeta-nave"; // Clase para darle estilo en CSS

            // Si tienes las imágenes en una carpeta, recuerda añadir la ruta: src="img/${nave.imagen}"
            div.innerHTML = `
                <img src="${nave.imagen}" alt="${nave.nombre}" style="width:100px; height:auto; display:block;">
                <h3>${nave.nombre}</h3>
                <p><strong>Tipo:</strong> ${nave.tipo}</p>
                <p><strong>Velocidad:</strong> ${nave.velocidad} MGLT</p>
                <p><strong>Tripulación:</strong> ${nave.tripulacion}</p>
                <p><strong>Estado:</strong> ${nave.estado}</p>
                <hr>
            `;

            listaNaves.appendChild(div);
            total++;
        }
    }

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
