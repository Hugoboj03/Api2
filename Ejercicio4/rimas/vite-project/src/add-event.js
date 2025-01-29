"use strict";

document.getElementById("agregarRima").addEventListener("click", function () {
    const contenedor = document.getElementById("contenedor");

    // Limpiamos el contenedor y configuramos el formulario
    contenedor.innerHTML = "";

    let form = document.createElement("form");
    form.id = "formAgregarRima";

    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.id = "inputPalabra";
    inputPalabra.name = "palabra";

    let labelRima = document.createElement("label");
    labelRima.textContent = "Rima: ";
    let inputRima = document.createElement("input");
    inputRima.type = "text";
    inputRima.id = "inputRima";
    inputRima.name = "rima";

    let botonGuardar = document.createElement("button");
    botonGuardar.type = "submit";
    botonGuardar.textContent = "Guardar";

    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(labelRima);
    form.appendChild(inputRima);
    form.appendChild(botonGuardar);

    contenedor.appendChild(form);

    // Evento submit para el formulario
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar comportamiento por defecto

        const palabra = inputPalabra.value.trim();
        const rima = inputRima.value.trim();

        // Validaciones
        if (!palabra || !rima) {
            alert("Por favor, ingrese una palabra y una rima.");
            return;
        }

        if (!isNaN(palabra) || !isNaN(rima)) {
            alert("No se pueden ingresar números en la palabra o la rima.");
            return;
        }

        // Actualizar el diccionario de rimas en el frontend
        if (!DiccionarioDeRimas.has(palabra)) {
            DiccionarioDeRimas.set(palabra, []);
        }

        DiccionarioDeRimas.get(palabra).push(rima);
        alert(`Se ha añadido la rima "${rima}" a la palabra "${palabra}".`);

        console.log(DiccionarioDeRimas); // Verificar en consola

        // Enviar los datos al backend
        try {
            const response = await fetch("http://localhost:3000/diccionario", {
                method: "POST",
                body: JSON.stringify({ palabra, rima }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Rima agregada correctamente en el backend.");
            } else {
                alert("Error al agregar la rima en el backend.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("No se pudo conectar con el servidor.");
        }

        form.reset(); // Limpiar el formulario
    });
});

document.getElementById("eliminarPalabra").addEventListener("click", function () {

    const contenedor = document.getElementById("contenedor");
    // Limpiamos el contenedor y configuramos el formulario
    contenedor.innerHTML = "";
    let form = document.createElement("form");
    form.id = "formEliminarRima";
    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.id = "inputPalabra";
    inputPalabra.name = "palabra";
    let botonEliminar = document.createElement("button");
    botonEliminar.type = "submit";
    botonEliminar.textContent = "Eliminar";
    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(botonEliminar);
    contenedor.appendChild(form);
    // Evento submit para el formulario
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar comportamiento por defecto
        const palabra = inputPalabra.value.trim();
        if (!palabra) {
            alert("Por favor, ingrese una palabra.");
            return;
        }
        // Actualizar el diccionario de rimas en el frontend
        if (!DiccionarioDeRimas.has(palabra)) {
            alert("La palabra no existe en el diccionario.");
            return;
        }
        // Enviar los datos al backend
        try {
            let ruta = "http://localhost:3000/diccionario/palabra/"+palabra;
            const response = await fetch(ruta, {
                method: "DELETE",
                body: JSON.stringify({ palabra }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                alert("Rima eliminada correctamente en el backend.");
                DiccionarioDeRimas.delete(palabra);
                console.log(DiccionarioDeRimas); // Verificar en consola
            } else {
                alert("Error al eliminar la rima en el backend.");

            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });



});