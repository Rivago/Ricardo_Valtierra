const figuras = {
    cubo: ["Lado"],
    esfera: ["Radio"],
    prisma: ["Base", "Altura", "Largo"],
    trapecio: ["Base Mayor", "Base Menor", "Altura"],
    hexagono: ["Lado"],
    triangulo: ["Base", "Altura"]
};

let figuraActual = " ";


const titulo = document.getElementById("titulo");
const datos = document.getElementById("datos");
const resultado = document.getElementById("resultado");
const historial = document.getElementById("historial");


function elegir(figura) {
    figuraActual = figura;

    titulo.textContent = "Figura: " + figura;
    datos.innerHTML = " ";
    resultado.textContent = " ";

    let campos = figuras[figura];

   
    for (let i = 0; i < campos.length; i++) {

        let texto = document.createElement("li");
        texto.textContent = campos[i] + ": ";
        texto.htmlFor = "caja" + i;

        let caja = document.createElement("input");
        caja.type = "number";
        caja.step = "any";
        caja.min = "0";
        caja.id = "caja" + i;

        datos.appendChild(texto);
        datos.appendChild(caja);
        datos.appendChild(document.createElement("br"));
    }
}

function calcular() {

    if (figuraActual == " ") {
        alert("Elige una figura");
        return;
    }

  
    let valores = [];
    let campos = figuras[figuraActual];

    for (let i = 0; i < campos.length; i++) {
        let entrada = document.getElementById("caja" + i).value;
        let numero = Number(entrada);

        if (entrada.trim() == "" || !Number.isFinite(numero) || numero <= 0) {
            resultado.textContent = "Ingresa números sin decimales mayores a 0";
            return;
        }

        valores.push(numero);
    }

    let r = 0;
    let texto = " ";

  
    if (figuraActual == "cubo") {
        let lado = valores[0];
        r = lado * lado * lado;
        texto = "Volumen del Cubo: ";

  
    } else if (figuraActual == "esfera") {
        let radio = valores[0];
        r = (4 / 3) * Math.PI * radio * radio * radio;
        texto = "Volumen de la Esfera: ";


    } else if (figuraActual == "prisma") {
        let base = valores[0];
        let altura = valores[1];
        let largo = valores[2];

        r = (base * altura / 2) * largo;
        texto = "Volumen del Prisma: ";

    } else if (figuraActual == "trapecio") {
        let bMayor = valores[0];
        let bMenor = valores[1];
        let altura = valores[2];

        if (bMayor <= bMenor) {
            resultado.textContent = "La base mayor debe ser más grande";
            return;
        }

        r = ((bMayor + bMenor) * altura) / 2;
        texto = "Área del Trapecio: ";

    } else if (figuraActual == "hexagono") {
        let lado = valores[0];

        r = (3 * Math.sqrt(3) / 2) * lado * lado;
        texto = "Área del Hexágono: ";

    
    } else if (figuraActual == "triangulo") {
        let base = valores[0];
        let altura = valores[1];

        r = (base * altura) / 2;
        texto = "Área del Triángulo: ";
    }

    texto = texto + r.toFixed(0);
    resultado.textContent = texto;

    let anterior = localStorage.getItem("historial") || "";
    let nuevo = anterior + texto + "\n";

    localStorage.setItem("historial", nuevo);
    historial.textContent = nuevo;
}


function limpiarHistorial() {
    localStorage.removeItem("historial");
    historial.textContent = "";
}

let guardado = localStorage.getItem("historial");

if (guardado != null) {
    historial.textContent = guardado;
}
