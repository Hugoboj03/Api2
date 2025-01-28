"use strict";

const SERVER = 'http://localhost:3000'; // URL del backend, si es necesario
let DiccionarioDeRimas = new Map(); // Estructura para almacenar las rimas

// Obtener las rimas del backend (si es necesario)
async function getRimas() {
    try {
        const resp = await fetch(`${SERVER}/diccionario`);
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        const json = await resp.json();
        console.log(json);

        DiccionarioDeRimas = new Map(Object.entries(json.data)); // Convertir objeto a Map
        replaceRimas();
    } catch (error) {
        console.error("Error al obtener rimas del servidor:", error);
    }
}


function replaceRimas() {
    const contenedor = document.getElementById("contenedor");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    DiccionarioDeRimas.forEach((rimas, palabra) => {
        appendPalabraRimas(palabra, rimas, contenedor);
    });
}

// Añadir una palabra y sus rimas al contenedor
function appendPalabraRimas(palabra, rimas, contenedor) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card mb-3";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h4");
    titulo.className = "card-title";
    titulo.textContent = palabra;

    const listaRimas = document.createElement("ul");
    listaRimas.className = "list-group list-group-flush";

    rimas.forEach(rima => {
        const item = document.createElement("li");
        item.className = "list-group-item";
        item.textContent = rima;
        listaRimas.appendChild(item);
    });

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(listaRimas);
    tarjeta.appendChild(cuerpo);
    contenedor.appendChild(tarjeta);
}

// Agregar una nueva rima desde el formulario (opcional)
async function agregarRima(palabra, rima) {
    if (!DiccionarioDeRimas.has(palabra)) {
        DiccionarioDeRimas.set(palabra, []);
    }
    DiccionarioDeRimas.get(palabra).push(rima);

    // Actualizar el backend (si es necesario)
    try {
        const response = await fetch(`${SERVER}/diccionario`, {
            method: "POST",
            body: JSON.stringify({ palabra, rima }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            alert("No se pudo agregar la rima en el servidor.");
        }
    } catch (error) {
        console.error("Error al enviar rima al servidor:", error);
    }

    replaceRimas(); // Actualizar la vista
}

async function eliminarRima(palabra, rima) {
    if (!DiccionarioDeRimas.has(palabra)) {
        alert("La palabra no existe en el diccionario.");
        return;
    }

    const rimas = DiccionarioDeRimas.get(palabra);
    const indice = rimas.indexOf(rima);

    if (indice !== -1) {
        rimas.splice(indice, 1); // Eliminar la rima localmente

        // Si no quedan más rimas para la palabra, eliminar la palabra del diccionario
        if (rimas.length === 0) {
            DiccionarioDeRimas.delete(palabra);
        }

        // Actualizar el backend (si es necesario)
        try {
            const response = await fetch(`${SERVER}/diccionario`, {
                method: "DELETE",
                body: JSON.stringify({ palabra, rima }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert("No se pudo eliminar la rima del servidor.");
            }
        } catch (error) {
            console.error("Error al eliminar rima del servidor:", error);
        }

        replaceRimas(); // Actualizar la vista
    }
}

// Inicializar la aplicación
function inicializar() {
    const botonAgregar = document.getElementById("agregarRima");
    botonAgregar.addEventListener("click", () => {
        const palabra = prompt("Ingrese la palabra:");
        const rima = prompt("Ingrese la rima:");

        if (!palabra || !rima) {
            alert("Los campos no pueden estar vacíos.");
            return;
        }

        agregarRima(palabra.trim(), rima.trim());
    });

    // Obtener datos del backend (si corresponde)
    getRimas();
}

inicializar();

