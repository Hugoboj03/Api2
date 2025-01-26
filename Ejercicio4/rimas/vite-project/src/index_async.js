"use strict";

const SERVER = 'http://localhost:3000'; // Cambia esto si tu servidor está en otra URL

// Elementos de la interfaz
let contenedor = document.getElementById("contenedor");
let botonAgregarRima = document.getElementById("agregarRima");
let botonVerDiccionario = document.getElementById("verDiccionario");
let botonEliminarRima = document.getElementById("eliminarRima");
let botonEliminarPalabra = document.getElementById("eliminarPalabra");
let botonRimaRepetida = document.getElementById("rimaRepetida");

// Función para obtener las rimas de una palabra desde la API
async function obtenerRimas(palabra) {
    try {
        const resp = await fetch(`${SERVER}/rimas/${palabra}`);
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        const json = await resp.json();
        return json.rimas || [];
    } catch (error) {
        console.error("Error al obtener las rimas:", error);
        return [];
    }
}

// Función para agregar una palabra y su rima a través de la API
async function agregarRima(palabra, rima) {
    try {
        const response = await fetch(`${SERVER}/rimas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ palabra, rima })
        });

        if (!response.ok) throw new Error(`Error al agregar la rima: ${response.statusText}`);

        const result = await response.json();
        alert(`Rima "${rima}" agregada a la palabra "${palabra}".`);
    } catch (error) {
        console.error("Error al agregar rima:", error);
        alert("Hubo un problema al agregar la rima.");
    }
}

// Función para eliminar una rima de una palabra
async function eliminarRima(palabra, rima) {
    try {
        const response = await fetch(`${SERVER}/rimas/${palabra}/${rima}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Error al eliminar la rima: ${response.statusText}`);

        const result = await response.json();
        alert(`Rima "${rima}" eliminada de la palabra "${palabra}".`);
    } catch (error) {
        console.error("Error al eliminar rima:", error);
        alert("Hubo un problema al eliminar la rima.");
    }
}

// Función para eliminar una palabra completa (y sus rimas)
async function eliminarPalabra(palabra) {
    try {
        const response = await fetch(`${SERVER}/rimas/${palabra}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Error al eliminar la palabra: ${response.statusText}`);

        const result = await response.json();
        alert(`Palabra "${palabra}" eliminada del diccionario.`);
    } catch (error) {
        console.error("Error al eliminar palabra:", error);
        alert("Hubo un problema al eliminar la palabra.");
    }
}

// Función para obtener todas las rimas del diccionario
async function obtenerDiccionario() {
    try {
        const resp = await fetch(`${SERVER}/rimas`);
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        const json = await resp.json();
        return json.rimas || [];
    } catch (error) {
        console.error("Error al obtener el diccionario:", error);
        return [];
    }
}

// Función para mostrar todo el diccionario de rimas
botonVerDiccionario.addEventListener("click", async () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    const rimas = await obtenerDiccionario();

    let tabla = document.createElement("table");
    tabla.style.width = "100%";
    tabla.style.borderCollapse = "collapse";

    let encabezado = tabla.insertRow();
    encabezado.innerHTML = "<th>Palabra</th><th>Rimas</th>";

    rimas.forEach(({ palabra, rimas }) => {
        let fila = tabla.insertRow();
        fila.innerHTML = `<td>${palabra}</td><td>${rimas.join(", ")}</td>`;
    });

    contenedor.appendChild(tabla);
});

// Función para agregar una rima (con formulario)
botonAgregarRima.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let form = crearFormulario(
        [
            { label: "Palabra", name: "palabra", type: "text" },
            { label: "Rima", name: "rima", type: "text" }
        ],
        {
            text: "Guardar",
            callback: async () => {
                let palabra = form["palabra"].value.trim();
                let rima = form["rima"].value.trim();

                if (palabra && rima && isNaN(palabra) && isNaN(rima)) {
                    await agregarRima(palabra, rima);
                    form.reset();
                } else {
                    alert("Introduce valores válidos (no números).");
                }
            }
        }
    );
    contenedor.appendChild(form);
});

// Función para eliminar una rima (con formulario)
botonEliminarRima.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let form = crearFormulario(
        [
            { label: "Palabra", name: "palabra", type: "text" },
            { label: "Rima", name: "rima", type: "text" }
        ],
        {
            text: "Eliminar",
            callback: async () => {
                let palabra = form["palabra"].value.trim();
                let rima = form["rima"].value.trim();

                if (palabra && rima && isNaN(palabra) && isNaN(rima)) {
                    await eliminarRima(palabra, rima);
                    form.reset();
                } else {
                    alert("Introduce valores válidos.");
                }
            }
        }
    );
    contenedor.appendChild(form);
});

// Función para eliminar una palabra completa (con formulario)
botonEliminarPalabra.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let form = crearFormulario(
        [
            { label: "Palabra", name: "palabra", type: "text" }
        ],
        {
            text: "Eliminar",
            callback: async () => {
                let palabra = form["palabra"].value.trim();

                if (palabra && isNaN(palabra)) {
                    await eliminarPalabra(palabra);
                    form.reset();
                } else {
                    alert("Introduce una palabra válida.");
                }
            }
        }
    );
    contenedor.appendChild(form);
});

// Función para crear formularios dinámicos
function crearFormulario(campos, accion = null) {
    let form = document.createElement("form");

    campos.forEach(({ label, name, type }) => {
        let labelElem = document.createElement("label");
        labelElem.textContent = label + ": ";
        let input = document.createElement("input");
        input.type = type;
        input.name = name;
        form.appendChild(labelElem);
        form.appendChild(input);
    });

    if (accion) {
        let botonAccion = document.createElement("button");
        botonAccion.type = "button";
        botonAccion.textContent = accion.text;
        botonAccion.addEventListener("click", accion.callback);
        form.appendChild(botonAccion);
    }

    return form;
}

