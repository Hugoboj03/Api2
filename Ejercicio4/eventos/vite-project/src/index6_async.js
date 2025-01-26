"use strict";

const SERVER = 'http://localhost:5001';
let eventos = [];

async function getEventos() {
  try {
      const resp = await fetch(`${SERVER}/eventos`); // promesa fetch
      // si el status no está entre 200 y 299, se produce error
      if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`); 
      // JSON a Objeto
      const json = await resp.json(); // promesa .json()
      console.log(json);
      eventos = json.data;
      replaceEventos();
  } catch (error) {
      console.error("Fallo en la obtención de eventos:", error);
  }
}

async function replaceEventos() {
  let container = document.getElementById("eventsContainer");
  while(container.firstChild) {
      container.removeChild(container.firstChild);
  }
  eventos.forEach(p => {
      appendEvento(p, container);
  });

}

async function appendEvento(evento, contenedor) {
  
      const tarjeta = document.createElement("div");
      tarjeta.className = "card mb-3";

      const img = document.createElement("img");
      img.src = evento.image;
      img.className = "card-img-top";

      const cuerpo = document.createElement("div");
      cuerpo.className = "card-body";

      const titulo = document.createElement("h4");
      titulo.className = "card-title";
      titulo.textContent = evento.name;

      const descripcion = document.createElement("p");
      descripcion.className = "card-text";
      descripcion.textContent = evento.description;

      const pie = document.createElement("div");
      pie.className = "card-footer";

      const fecha = document.createElement("small");
      fecha.className = "text-muted";
      fecha.textContent = new Date(evento.date).toLocaleDateString();

      const precio = document.createElement("span");
      precio.className = "float-right";
      precio.textContent = `${evento.price} €`;

      pie.appendChild(fecha);
      pie.appendChild(precio);
      cuerpo.appendChild(titulo);
      cuerpo.appendChild(descripcion);
      tarjeta.appendChild(img);
      tarjeta.appendChild(cuerpo);
      tarjeta.appendChild(pie);
      contenedor.appendChild(tarjeta);


}
/**
* Gestión Eventos
*/
/*document.addEventListener("DOMContentLoaded", event => {
  getEventos();

  let form = document.getElementById("newEvent");
  

  form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let data = {
          name: form.name.value,
          description: form.desc.value,
          date: new Date(form.date.value).toISOString(),
          price: form.price.value,
          image: document.getElementById("imgPreview").src
      }
      console.log("Enviado: ", data);
      postEvento(data);
  });


  form.image.addEventListener('change', () => {
      let file = form.image.files[0];
      let reader = new FileReader();

      if (file) { // File has been selected (convert to Base64)
          reader.readAsDataURL(file);
      }

      reader.addEventListener("load", () => { //Converted into Base64 event (async)
          document.getElementById("imgPreview").src = reader.result;
      }, false);
  });

  document.getElementById("orderName").addEventListener('click', e => {
      eventos.sort((p1,p2) => p1.name.localeCompare(p2.name));
      replaceEventos();
  });

});

/** 

async function cargarEventos() {
  try {
    const response = await fetch("http://localhost:5001/eventos");

    if (!response.ok) {
      throw new Error("Error al obtener los eventos del servidor.");
    }

    const eventos = await response.json();
    const contenedor = document.getElementById("eventsContainer");
    contenedor.innerHTML = "";

    eventos.forEach(evento => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "card mb-3";

      const img = document.createElement("img");
      img.src = evento.image;
      img.className = "card-img-top";

      const cuerpo = document.createElement("div");
      cuerpo.className = "card-body";

      const titulo = document.createElement("h4");
      titulo.className = "card-title";
      titulo.textContent = evento.name;

      const descripcion = document.createElement("p");
      descripcion.className = "card-text";
      descripcion.textContent = evento.description;

      const pie = document.createElement("div");
      pie.className = "card-footer";

      const fecha = document.createElement("small");
      fecha.className = "text-muted";
      fecha.textContent = new Date(evento.date).toLocaleDateString();

      const precio = document.createElement("span");
      precio.className = "float-right";
      precio.textContent = `${evento.price} €`;

      pie.appendChild(fecha);
      pie.appendChild(precio);
      cuerpo.appendChild(titulo);
      cuerpo.appendChild(descripcion);
      tarjeta.appendChild(img);
      tarjeta.appendChild(cuerpo);
      tarjeta.appendChild(pie);
      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    console.error("Error al cargar los eventos:", error);
    alert("Hubo un error al cargar los eventos. Por favor, inténtalo más tarde.");
  }
}

*/
getEventos();
//document.addEventListener("DOMContentLoaded",);
