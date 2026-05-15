let total = 0;
let normales = 0;
let altos = 0;
let bajos = 0;

let ultimoPaciente = {};

function registrar(){

let nombre = document.getElementById("nombre").value;
let sis = parseInt(document.getElementById("sistolica").value);
let dia = parseInt(document.getElementById("diastolica").value);

if(nombre === "" || isNaN(sis) || isNaN(dia)){
alert("Complete todos los campos");
return;
}

let estado = "";
let clase = "";
let mensaje = "";

if(sis >= 140 || dia >= 90){

estado = "Hipertensión";
clase = "alta";
mensaje = "Paciente en riesgo hipertensivo";
altos++;

}else if(sis < 90 || dia < 60){

estado = "Presión Baja";
clase = "baja";
mensaje = "Paciente con presión baja";
bajos++;

}else{

estado = "Normal";
clase = "normal";
mensaje = "Presión arterial estable";
normales++;

}

total++;

document.getElementById("totalPacientes").innerText = total;
document.getElementById("normales").innerText = normales;
document.getElementById("altos").innerText = altos;
document.getElementById("bajos").innerText = bajos;

document.getElementById("alerta").innerHTML = mensaje;

let fecha = new Date().toLocaleString();

let fila = `
<tr>
<td>${nombre}</td>
<td>${sis}/${dia}</td>
<td class="${clase}">${estado}</td>
<td>${fecha}</td>
</tr>
`;

document.getElementById("tabla").innerHTML += fila;

ultimoPaciente = {
nombre,
sis,
dia,
estado,
mensaje,
fecha
};

document.getElementById("nombre").value = "";
document.getElementById("sistolica").value = "";
document.getElementById("diastolica").value = "";

}

function descargarPDF(){

if(!ultimoPaciente.nombre){
alert("Primero registre un paciente");
return;
}

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// ENCABEZADO

doc.setFillColor(0,91,187);
doc.rect(0,0,220,30,'F');

// TITULO

doc.setTextColor(255,255,255);
doc.setFontSize(22);
doc.text("ControlHTA Comunitario", 20, 18);

// SUBTITULO

doc.setFontSize(11);
doc.text("Reporte de Monitoreo de Presión Arterial", 20, 25);

// CUERPO

doc.setTextColor(0,0,0);

doc.setFontSize(14);
doc.text("Datos del Paciente", 20, 50);

// LINEAS

doc.line(20,53,190,53);

// INFORMACION

doc.setFontSize(12);

doc.text(`Paciente: ${ultimoPaciente.nombre}`, 20, 70);
doc.text(`Presión Arterial: ${ultimoPaciente.sis}/${ultimoPaciente.dia}`, 20, 85);
doc.text(`Estado Clínico: ${ultimoPaciente.estado}`, 20, 100);
doc.text(`Resultado: ${ultimoPaciente.mensaje}`, 20, 115);
doc.text(`Fecha: ${ultimoPaciente.fecha}`, 20, 130);

// MENSAJE FINAL

doc.setFontSize(11);
doc.text("Este reporte fue generado por el sistema ControlHTA Comunitario.", 20, 170);

doc.text("Proyecto académico de innovación en salud - UNAD", 20, 180);

// FOOTER

doc.setFillColor(31,41,55);
doc.rect(0,270,220,30,'F');

// GUARDAR

doc.save(`Reporte_${ultimoPaciente.nombre}.pdf`);

}
