
const filasPorPagina = 4;

// Genera dinámicamente los botones de paginación
var numFilas = document.querySelectorAll(".tablePrec tbody tr").length;
var numPaginas = Math.ceil(numFilas / filasPorPagina);

var paginationButtons = document.getElementById("paginationButtons");

// Agrega los botones de páginas
for (var i = 0; i < numPaginas; i++) {
    var li = document.createElement("li");
    li.innerHTML =
        i === 0
            ? '<a type="button" onclick="mostrarFilas(' +
            i +
            ')">' +
            (i + 1) +
            "</a>"
            : '<a type="button" onclick="mostrarFilas(' +
            i +
            ')">' +
            (i + 1) +
            "</a>";
    paginationButtons.appendChild(li);
}

function mostrarFilas(pagina) {
    // Oculta todas las filas
    document
        .querySelectorAll(".tablePrec tbody tr")
        .forEach(function (fila) {
            fila.style.display = "none";
        });

    // Calcula el rango de filas que se mostrarán
    var inicio = pagina * filasPorPagina;
    var fin = inicio + filasPorPagina;

    // Muestra las filas correspondientes
    document
        .querySelectorAll(".tablePrec tbody tr")
        .forEach(function (fila, indice) {
            if (indice >= inicio && indice < fin) {
                fila.style.display = "";
            }
        });

    // Actualiza el estado activo del botón de paginación
    document.querySelectorAll("ul li").forEach(function (item) {
        item.classList.remove("active");
    });

    document
        .querySelector("ul li:nth-child(" + (pagina + 1) + ")")
        .classList.add("active");
}

// Muestra las primeras filas al cargar la página
mostrarFilas(0);
