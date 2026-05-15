let total = 0;
let normales = 0;
let altos = 0;
let bajos = 0;

let pacientes = [];

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
mensaje = "⚠ Paciente en riesgo hipertensivo";
altos++;

}else if(sis < 90 || dia < 60){

estado = "Presión Baja";
clase = "baja";
mensaje = "🟠 Paciente con presión baja";
bajos++;

}else{

estado = "Normal";
clase = "normal";
mensaje = "✅ Presión arterial estable";
normales++;

}

total++;

document.getElementById("totalPacientes").innerText = total;
document.getElementById("normales").innerText = normales;
document.getElementById("altos").innerText = altos;
document.getElementById("bajos").innerText = bajos;

document.getElementById("alerta").innerHTML = mensaje;

let fecha = new Date().toLocaleString();

let paciente = {
id: pacientes.length,
nombre,
sis,
dia,
estado,
mensaje,
fecha
};

pacientes.push(paciente);

let fila = `
<tr>
<td>${nombre}</td>
<td>${sis}/${dia}</td>
<td class="${clase}">${estado}</td>
<td>${fecha}</td>

<td>
<button class="btn-pdf-tabla"
onclick="descargarPDF(${paciente.id})">
📄 PDF
</button>
</td>

<td>
<button class="btn-hc"
onclick="abrirHistoria(${paciente.id})">
🩺 Historia
</button>
</td>

</tr>
`;

document.getElementById("tabla").innerHTML += fila;

document.getElementById("nombre").value = "";
document.getElementById("sistolica").value = "";
document.getElementById("diastolica").value = "";

}

function descargarPDF(id){

const paciente = pacientes[id];

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// HEADER

doc.setFillColor(0,91,187);
doc.rect(0,0,220,30,'F');

doc.setTextColor(255,255,255);
doc.setFontSize(22);

doc.text("ControlHTA Comunitario", 20, 18);

doc.setFontSize(11);

doc.text("Reporte de Monitoreo de Presión Arterial", 20, 25);

// BODY

doc.setTextColor(0,0,0);

doc.setFontSize(15);

doc.text("Información del Paciente", 20, 50);

doc.line(20,53,190,53);

doc.setFontSize(12);

doc.text(`Paciente: ${paciente.nombre}`, 20, 70);

doc.text(`Presión Arterial: ${paciente.sis}/${paciente.dia}`, 20, 85);

doc.text(`Estado Clínico: ${paciente.estado}`, 20, 100);

doc.text(`Resultado: ${paciente.mensaje}`, 20, 115);

doc.text(`Fecha: ${paciente.fecha}`, 20, 130);

// MENSAJE

doc.setFontSize(11);

doc.text("Este reporte fue generado por el sistema ControlHTA Comunitario 2026", 20, 170);

doc.text("Proyecto académico de innovación en salud - UNAD", 20, 180);


// FOOTER

doc.setFillColor(31,41,55);

doc.rect(0,270,220,30,'F');

// GUARDAR

doc.save(`Reporte_${paciente.nombre}.pdf`);

}

function abrirHistoria(id){

const paciente = pacientes[id];

document.getElementById("modalHC").style.display = "block";

document.getElementById("datosPaciente").innerHTML = `

<p><strong>Paciente:</strong> ${paciente.nombre}</p>

<p><strong>Presión Arterial:</strong> ${paciente.sis}/${paciente.dia}</p>

<p><strong>Estado:</strong> ${paciente.estado}</p>

<p><strong>Fecha:</strong> ${paciente.fecha}</p>

<hr><br>

`;

}

function cerrarModal(){

document.getElementById("modalHC").style.display = "none";

}
