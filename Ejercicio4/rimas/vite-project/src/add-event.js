"use strict";

// Diccionario de Rimas
let DiccionarioDeRimas = new Map();

// Botones y contenedor
let botonAgregar = document.getElementById("agregarRima");
let botonObtener = document.getElementById("obtenerRimas");
let botonEliminarRima = document.getElementById("eliminarRima");
let botonEliminarPalabra = document.getElementById("eliminarPalabra");
let botonVer = document.getElementById("verDiccionario");
let botonRimaRepetida = document.getElementById("rimaRepetida");
let contenedor = document.getElementById("contenedor");

// Función para agregar una palabra y su rima
botonAgregar.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let form = crearFormulario([
        { label: "Palabra", name: "palabra", type: "text" },
        { label: "Rima", name: "rima", type: "text" },
    ]);

    // Botón Guardar
    let botonGuardar = document.createElement("button");
    botonGuardar.type = "button";
    botonGuardar.textContent = "Guardar";
    botonGuardar.addEventListener("click", () => {
        let palabra = form["palabra"].value.trim();
        let rima = form["rima"].value.trim();

        if (palabra && rima && isNaN(palabra) && isNaN(rima)) {
            if (!DiccionarioDeRimas.has(palabra)) {
                DiccionarioDeRimas.set(palabra, []);
            }
            DiccionarioDeRimas.get(palabra).push(rima);
            alert(`Se agregó la rima "${rima}" a la palabra "${palabra}".`);
            form.reset();
        } else {
            alert("Introduce valores válidos (no números).");
        }
    });

    form.appendChild(botonGuardar);
    contenedor.appendChild(form);
});

// Función para obtener rimas de una palabra
botonObtener.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let form = crearFormulario([{ label: "Palabra", name: "palabra", type: "text" }]);

    let botonBuscar = document.createElement("button");
    botonBuscar.type = "button";
    botonBuscar.textContent = "Buscar";

    let resultado = document.createElement("p");

    botonBuscar.addEventListener("click", () => {
        let palabra = form["palabra"].value.trim();

        if (palabra && isNaN(palabra)) {
            if (DiccionarioDeRimas.has(palabra)) {
                resultado.textContent = `Rimas para "${palabra}": ${DiccionarioDeRimas
                    .get(palabra)
                    .join(", ")}`;
            } else {
                resultado.textContent = `La palabra "${palabra}" no tiene rimas.`;
            }
        } else {
            alert("Introduce una palabra válida.");
        }
    });

    form.appendChild(botonBuscar);
    contenedor.appendChild(form);
    contenedor.appendChild(resultado);
});

// Función para eliminar una rima de una palabra
botonEliminarRima.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let form = crearFormulario([
        { label: "Palabra", name: "palabra", type: "text" },
        { label: "Rima", name: "rima", type: "text" },
    ]);

    let botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", () => {
        let palabra = form["palabra"].value.trim();
        let rima = form["rima"].value.trim();

        if (palabra && rima && isNaN(palabra) && isNaN(rima)) {
            if (DiccionarioDeRimas.has(palabra)) {
                let rimas = DiccionarioDeRimas.get(palabra);
                let index = rimas.indexOf(rima);
                if (index !== -1) {
                    rimas.splice(index, 1);
                    if (rimas.length === 0) DiccionarioDeRimas.delete(palabra);
                    alert(`Rima "${rima}" eliminada de la palabra "${palabra}".`);
                } else {
                    alert(`La rima "${rima}" no existe en "${palabra}".`);
                }
            } else {
                alert(`La palabra "${palabra}" no está en el diccionario.`);
            }
        } else {
            alert("Introduce valores válidos.");
        }
    });

    form.appendChild(botonEliminar);
    contenedor.appendChild(form);
});

// Función para eliminar una palabra completa
botonEliminarPalabra.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let form = crearFormulario([{ label: "Palabra", name: "palabra", type: "text" }]);

    let botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", () => {
        let palabra = form["palabra"].value.trim();

        if (palabra && isNaN(palabra)) {
            if (DiccionarioDeRimas.delete(palabra)) {
                alert(`Palabra "${palabra}" eliminada del diccionario.`);
            } else {
                alert(`La palabra "${palabra}" no está en el diccionario.`);
            }
        } else {
            alert("Introduce una palabra válida.");
        }
    });

    form.appendChild(botonEliminar);
    contenedor.appendChild(form);
});

// Función para mostrar todo el diccionario
botonVer.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let tabla = document.createElement("table");
    tabla.style.width = "100%";
    tabla.style.borderCollapse = "collapse";

    let encabezado = tabla.insertRow();
    encabezado.innerHTML = "<th>Palabra</th><th>Rimas</th>";

    DiccionarioDeRimas.forEach((rimas, palabra) => {
        let fila = tabla.insertRow();
        fila.innerHTML = `<td>${palabra}</td><td>${rimas.join(", ")}</td>`;
    });

    contenedor.appendChild(tabla);
});

// Función para buscar palabras que comparten una rima
botonRimaRepetida.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpiar contenedor
    let form = crearFormulario([{ label: "Rima", name: "rima", type: "text" }]);

    let botonBuscar = document.createElement("button");
    botonBuscar.type = "button";
    botonBuscar.textContent = "Buscar";

    let resultado = document.createElement("p");

    botonBuscar.addEventListener("click", () => {
        let rima = form["rima"].value.trim();

        if (rima && isNaN(rima)) {
            let palabras = Array.from(DiccionarioDeRimas.entries())
                .filter(([_, rimas]) => rimas.includes(rima))
                .map(([palabra]) => palabra);

            resultado.textContent =
                palabras.length > 0
                    ? `La rima "${rima}" aparece en: ${palabras.join(", ")}`
                    : `No hay palabras con la rima "${rima}".`;
        } else {
            alert("Introduce una rima válida.");
        }
    });

    form.appendChild(botonBuscar);
    contenedor.appendChild(form);
    contenedor.appendChild(resultado);
});

// Función para crear formularios dinámicos
function crearFormulario(campos) {
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
    return form;
}