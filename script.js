function registrar() {
    let nombre = document.getElementById("nombre").value;
    let sis = document.getElementById("sistolica").value;
    let dia = document.getElementById("diastolica").value;

    let estado = "";
    let clase = "";

    if (sis >= 140 || dia >= 90) {
        estado = "Alta";
        clase = "alta";
    } else if (sis < 90 || dia < 60) {
        estado = "Baja";
        clase = "baja";
    } else {
        estado = "Normal";
        clase = "normal";
    }

    let fila = `
        <tr>
            <td>${nombre}</td>
            <td>${sis}/${dia}</td>
            <td class="${clase}">${estado}</td>
        </tr>
    `;

    document.getElementById("tabla").innerHTML += fila;
}