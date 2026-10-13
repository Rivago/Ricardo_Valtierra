// Datos de ejemplo. Se guardan solo en este navegador.
const parametros = new URLSearchParams(location.search);
const modulo = parametros.get("modulo") || "todos";
let publicaciones = JSON.parse(localStorage.getItem("encuentrapp"));

if (publicaciones === null) {
  publicaciones = [
    { id: 1, titulo: "Cartera café", tipo: "Encontrado", categoria: "objeto", ubicacion: "Ciudad Universitaria, CDMX", fecha: "2026-10-09", foto: "img/cartera.jpg", descripcion: "Se encontró una cartera café cerca de la biblioteca. Describe su contenido para identificarla." },
    { id: 2, titulo: "Llaves con llavero", tipo: "Encontrado", categoria: "objeto", ubicacion: "Av. Tecnológico", fecha: "2026-10-08", foto: "img/llaves.jpg", descripcion: "Llaves con un aro metálico. Se encontraron cerca de la entrada principal." },
    { id: 3, titulo: "Mochila negra", tipo: "Perdido", categoria: "objeto", ubicacion: "Edificio de aulas", fecha: "2026-10-07", foto: "img/mochila.jpg", descripcion: "Perdí una mochila negra. Si la encontraste, puedes contactarme." },
    { id: 4, titulo: "Perro dorado", tipo: "Perdido", categoria: "mascota", ubicacion: "Parque central", fecha: "2026-10-09", foto: "img/mascota.jpg", descripcion: "Se busca un perro de pelaje dorado visto por última vez cerca del parque." },
    { id: 5, titulo: "Pasaporte azul", tipo: "Encontrado", categoria: "documento", ubicacion: "Biblioteca", fecha: "2026-10-09", foto: "img/documento.jpg", descripcion: "Documento encontrado. Describe sus datos por mensaje para identificarlo." }
  ];
  guardar();
}

function guardar() {
  localStorage.setItem("encuentrapp", JSON.stringify(publicaciones));
}

const elegido = publicaciones.find(function(p) {
  return p.id === Number(parametros.get("id"));
});

const nombres = {
  todos: "Mis publicaciones",
  perdidos: "Objetos perdidos",
  encontrados: "Objetos encontrados",
  mascotas: "Mascotas",
  documentos: "Documentos"
};

function pertenece(p) {
  if (modulo === "perdidos") return p.categoria === "objeto" && p.tipo === "Perdido";
  if (modulo === "encontrados") return p.categoria === "objeto" && p.tipo === "Encontrado";
  if (modulo === "mascotas") return p.categoria === "mascota";
  if (modulo === "documentos") return p.categoria === "documento";
  return true;
}

// Inicio: tarjetas con los datos actuales.
const tarjetas = document.getElementById("tarjetas");

if (tarjetas) {
  let cantidad = 0;
  for (const p of publicaciones) {
    if (p.categoria !== "objeto" || p.tipo !== "Encontrado" || cantidad === 2) continue;
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = '<img><section><h2><a></a></h2><p></p><small></small></section>';
    tarjeta.querySelector("img").src = p.foto;
    tarjeta.querySelector("img").alt = p.titulo;
    tarjeta.querySelector("a").textContent = p.titulo;
    tarjeta.querySelector("a").href = "detalle.html?id=" + p.id;
    tarjeta.querySelector("p").textContent = p.ubicacion;
    tarjeta.querySelector("small").textContent = p.tipo;
    tarjetas.appendChild(tarjeta);
    cantidad++;
  }
  if (cantidad === 0) tarjetas.textContent = "Todavía no hay objetos encontrados.";
}

// Sub-home: buscar, listar y borrar con confirmación Bootstrap.
const tabla = document.getElementById("datos");
let idBorrar = 0;

function listar() {
  tabla.innerHTML = "";
  const busqueda = (parametros.get("q") || "").toLowerCase();

  for (const p of publicaciones) {
    if (!pertenece(p) || !(p.titulo + " " + p.ubicacion).toLowerCase().includes(busqueda)) continue;

    const fila = tabla.insertRow();
    const enlace = document.createElement("a");
    enlace.textContent = p.titulo;
    enlace.href = "detalle.html?id=" + p.id;
    fila.insertCell().appendChild(enlace);
    fila.insertCell().textContent = p.tipo;
    fila.insertCell().textContent = p.ubicacion;

    const acciones = fila.insertCell();
    const editar = document.createElement("a");
    editar.className = "btn btn-outline-success btn-sm";
    editar.textContent = "Actualizar";
    editar.href = "actualizar.html?id=" + p.id;

    const borrar = document.createElement("button");
    borrar.className = "btn btn-outline-danger btn-sm";
    borrar.textContent = "Borrar";
    borrar.setAttribute("data-bs-toggle", "modal");
    borrar.setAttribute("data-bs-target", "#borrar");
    borrar.onclick = function() { idBorrar = p.id; };

    acciones.appendChild(editar);
    acciones.appendChild(borrar);
  }

  document.getElementById("sin-datos").textContent =
    tabla.rows.length === 0 ? "No hay publicaciones que coincidan." : "";
}

if (tabla) {
  document.getElementById("nombre-modulo").textContent = nombres[modulo] || nombres.todos;
  document.getElementById("nueva").href = "publicar.html?modulo=" + modulo;
  listar();

  document.getElementById("confirmar").onclick = function() {
    publicaciones = publicaciones.filter(function(p) { return p.id !== idBorrar; });
    guardar();
    listar();
  };
}

// Formularios compartidos para insertar y actualizar.
const formulario = document.getElementById("formulario");
const campos = ["titulo", "tipo", "categoria", "ubicacion", "fecha", "foto", "descripcion"];

if (formulario) {
  if (modulo === "perdidos") document.getElementById("tipo").value = "Perdido";

  if (modulo === "mascotas") {
    document.getElementById("categoria").value = "mascota";
    document.getElementById("foto").value = "img/mascota.jpg";
  }

  if (modulo === "documentos") {
    document.getElementById("categoria").value = "documento";
    document.getElementById("foto").value = "img/documento.jpg";
  }

  if (formulario.dataset.editar === "si") {
    if (!elegido) {
      formulario.hidden = true;
      document.querySelector("main h1").textContent = "Publicación no encontrada";
    } else {
      for (const campo of campos) document.getElementById(campo).value = elegido[campo];
    }
  }

  formulario.onsubmit = function(evento) {
    evento.preventDefault();
    const p = { id: Date.now() };
    for (const campo of campos) p[campo] = document.getElementById(campo).value;

    if (formulario.dataset.editar === "si") {
      p.id = elegido.id;
      publicaciones[publicaciones.indexOf(elegido)] = p;
    } else {
      publicaciones.push(p);
    }

    guardar();
    location.href = "exito.html?id=" + p.id;
  };
}

// Detalle y confirmación de publicación.
const contenido = document.getElementById("contenido");

if (contenido) {
  if (!elegido) {
    contenido.hidden = true;
    document.getElementById("no-encontrada").textContent = "Esta publicación no existe o fue borrada.";
  } else {
    for (const campo of ["titulo", "tipo", "ubicacion", "fecha", "descripcion"]) {
      document.getElementById("detalle-" + campo).textContent = elegido[campo];
    }
    document.getElementById("detalle-foto").src = elegido.foto;
    document.getElementById("detalle-foto").alt = elegido.titulo;
    if (!elegido.fecha) document.getElementById("detalle-fecha").textContent = "Sin fecha";
  }
}

const ver = document.getElementById("ver-publicacion");

if (ver) {
  if (elegido) {
    ver.href = "detalle.html?id=" + elegido.id;
  } else {
    ver.hidden = true;
    document.getElementById("exito-titulo").textContent = "Publicación no encontrada";
    document.getElementById("exito-texto").textContent = "Vuelve al módulo para revisar tus publicaciones.";
  }
}

// Chat de demostración.
const chat = document.getElementById("chat-form");

if (chat) chat.onsubmit = function(evento) {
  evento.preventDefault();
  const mensaje = document.createElement("p");
  mensaje.className = "burbuja propia";
  mensaje.textContent = document.getElementById("mensaje").value;
  document.getElementById("mensajes").appendChild(mensaje);
  chat.reset();
};

// Revisar que las contraseñas coincidan.
const registro = document.getElementById("registro-form");

if (registro) {
  const repetir = document.getElementById("repetir");
  repetir.oninput = function() { repetir.setCustomValidity(""); };
  document.getElementById("clave").oninput = repetir.oninput;

  registro.onsubmit = function(evento) {
    if (document.getElementById("clave").value !== repetir.value) {
      evento.preventDefault();
      repetir.setCustomValidity("Las contraseñas deben coincidir.");
      repetir.reportValidity();
    }
  };
}