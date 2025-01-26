"use strict";

const SERVER = 'http://localhost:5001';

function getEventos() {
    // 1. Creamos la instancia del objeto
    const xhr = new XMLHttpRequest();
    // 2. Establecemos la comunicación con el servidor 
    //    Método GET:
    xhr.open('GET', `${SERVER}/eventos`, true);
    // 3. Enviamos la petición al servidor
    xhr.send();
    // 4. Ponemos una escucha al objeto
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.responseText); // JSON a Objeto -- CALLBACK
                console.log(json);
            } else {
                console.error("Fallo en la obtención de eventos:", xhr.statusText);
            }
        }
    };
}

function handlePostEvento() {
    const evento = {
        name: 'Producto index.html XHR Hugo',
        description: 'Producto de prueba XHR Hugo',
        photo: "data:image/png;base64,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"
    };

    postProducto(evento);

    document.getElementById("texto").textContent = "Producto XHR insertado. Mira la consola!";
}

/** 

function cargarEventos(){
    const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/eventos", true);
        xhr.onload = function(){
            if(xhr.status == 200){

                const eventos = JSON.parse(xhr.responseText);

                const contenedor = document.getElementById("eventosContainer");
                contenedor.innerHTML = "";

                eventos.forEach((evento) => {
                    const card = document.createElement("div");
                    card.className = "card mb-3";

                    const img = document.createElement("img");
                    img.src = evento.image;
                    img.className = "card-img-top";

                    const cardBody = document.createElement("div");
                    cardBody.className = "card-body";

                    const cardTitle = document.createElement("h4");
                    cardTitle.className = "card-title";
                    cardTitle.textContent = evento.name;

                    const cardText = document.createElement("p");
                    cardText.className = "card-text";
                    cardText.textContent = evento.description;

                    const cardFooter = document.createElement("div");
                    cardFooter.className = "card-footer";

                    const fecha = document.createElement("small");
                    fecha.className = "text-muted";
                    fecha.textContent = new Date(evento.date).toLocaleDateString();

                    const precio = document.createElement("span");
                    precio.className = "float-right";
                    precio.textContent = `${evento.price} €`;

                    cardFooter.appendChild(fecha);
                    cardFooter.appendChild(precio);

                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardText);

                    card.appendChild(img);
                    card.appendChild(cardBody);
                    card.appendChild(cardFooter);

                    contenedor.appendChild(card);
                });
            }else{
                console.error("Error al cargar los eventos:", xhr.statusText);
                alert("Error al cargar los eventos");
            }
    };

    xhr.onerror = function(){
        console.error("Error de conexion con el server");
        alert("Error de conexion con el server");
    };

    xhr.send();
    
}

*/

//document.addEventListener("DOMContentLoaded", cargarEventos);

//document.getElementById("añadirBoton").addEventListener("click", handlePostEvento);
document.querySelector("#añadirBoton").addEventListener("click", handlePostEvento);

getProductos();