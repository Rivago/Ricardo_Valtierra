 function calcularTemperaturas() {
    let temperaturas = new Array(7);
    var suma = 0;

    for(let i=0; i<7; i++) {
        var dato = document.getElementById("dia" + i).value;

        if(dato == "") {
            alert("Captura las 7 temperaturas");
            
        }

        temperaturas[i] = parseFloat(dato);
        suma += temperaturas[i];
    }

    var maxima = temperaturas[0];
    var minima = temperaturas[0];

    for(let i=0; i<7; i++) {
        if(temperaturas[i] > maxima) {
            maxima = temperaturas[i];
        }

        if(temperaturas[i] < minima) {
            minima = temperaturas[i];
        }
    }

    var promedio = suma / 7;

    document.getElementById("resultadoTemperaturas").innerHTML =
        "<h3>Resultados de la semana</h3>" +
        "<p>Temperatura promedio: " + promedio + " C</p>" +
        "<p>Temperatura máxima: " + maxima + " C</p>" +
        "<p>Temperatura mínima: " + minima + " C</p>";
}


// EJERCICIO 3 - ARREGLO BIDIMENSIONAL

function imprimir8() {

    let matriz = [
        ["s", "s", "s", "s", "s"],
        ["s", "", "", "", "s"],
        ["s", "s", "s", "s", "s"],
        ["s", "", "", "", "s"],
        ["s", "s", "s", "s", "s"]
    ];

    var cadena = "";

    for (var i = 0; i < 5; i++) {
        cadena += "<tr>";

        for (var j = 0; j < 5; j++) {

            if (matriz[i][j] == "s") {
                cadena += '<td class="bg-info text-yellow" style="width:40px;height:40px;">R</td>';
            } else {
                cadena += "<td></td>";
            }

        }

        cadena += "</tr>";
    }

    document.getElementById("resultado8").innerHTML = cadena;
}



// Arreglo de alumnos
var alumnos = [
    ["Ana López", "ana@gmail.com", 9],
    ["Luis García", "luis@gmail.com", 8],
    ["Sofía Martínez", "sofia@gmail.com", 10],
    ["Diego Pérez", "diego@gmail.com", 7]
];

// Mostrar alumnos
function mostrar() {

    var cadena = "";

    for (var i = 0; i < alumnos.length; i++) {

        if (i in alumnos) {

            cadena += "<tr>";
            cadena += "<td>" + i + "</td>";
            cadena += "<td>" + alumnos[i][0] + "</td>";
            cadena += "<td>" + alumnos[i][1] + "</td>";
            cadena += "<td>" + alumnos[i][2] + "</td>";

            cadena += '<td>';
            cadena += '<button class="btn btn-danger btn-sm m-1" onclick="eliminar(' + i + ')">Eliminar</button>';
            cadena += '<button class="btn btn-warning btn-sm m-1" onclick="vaciar(' + i + ')">Vaciar</button>';
            cadena += '</td>';

            cadena += "</tr>";

        } else {

            cadena += "<tr>";
            cadena += "<td>" + i + "</td>";
            cadena += '<td colspan="4">Espacio vacío</td>';
            cadena += "</tr>";

        }
    }

    document.getElementById("tabla").innerHTML = cadena;
}


// Agregar alumno
function agregar() {

    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var calificacion = document.getElementById("calificacion").value;

    if (nombre == "" || correo == "" || calificacion == "") {
        alert("Completa todos los datos");
    }

    if (Number(calificacion) < 0 || Number(calificacion) > 10) {
        alert("La calificación debe estar entre 0 y 10");
    }

    var alumno = [nombre, correo, Number(calificacion)];

    // Buscar una posición vacía
    for (var i = 0; i < alumnos.length; i++) {
        if (!(i in alumnos)) {
            alumnos[i] = alumno;
            mostrar();
        }
    }

    if (alumnos.length < 10) {
        alumnos.push(alumno);
    } else {
        alert("Máximo 10 alumnos");
        return;
    }

    mostrar();

    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("calificacion").value = "";
}


// Eliminar con splice
function eliminar(indice) {

    alumnos.splice(indice, 1);
    mostrar();

}


// Dejar posición vacía con delete
function vaciar(indice) {

    delete alumnos[indice];
    mostrar();

}
