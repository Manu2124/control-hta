let total = 0;
let normales = 0;
let altos = 0;
let bajos = 0;

let pacientes = [];
let pacienteActual = null;

// =============================
// REGISTRAR PACIENTES
// =============================

function registrar() {

let nombre = document.getElementById("nombre").value.trim();

let sis = Number(document.getElementById("sistolica").value);

let dia = Number(document.getElementById("diastolica").value);

// VALIDACIONES

if (nombre === "" || isNaN(sis) || isNaN(dia)) {

alert("Complete todos los campos");
return;

}

if (sis <= 0 || dia <= 0) {

alert("Valores inválidos");
return;

}

// CLASIFICACIÓN

let estado = "";
let clase = "";
let mensaje = "";

if (sis >= 140 || dia >= 90) {

estado = "Hipertensión";
clase = "alta";
mensaje = "⚠ Paciente en riesgo hipertensivo";
altos++;

} else if (sis < 90 || dia < 60) {

estado = "Presión Baja";
clase = "baja";
mensaje = "🟠 Paciente con presión baja";
bajos++;

} else {

estado = "Normal";
clase = "normal";
mensaje = "✅ Presión arterial estable";
normales++;

}

total++;

// ACTUALIZAR CONTADORES

document.getElementById("totalPacientes").innerText = total;
document.getElementById("normales").innerText = normales;
document.getElementById("altos").innerText = altos;
document.getElementById("bajos").innerText = bajos;

document.getElementById("alerta").innerHTML = mensaje;

// FECHA

let fecha = new Date().toLocaleString();

// OBJETO PACIENTE

let paciente = {

id: Date.now(),
nombre,
sis,
dia,
estado,
mensaje,
fecha

};

pacientes.push(paciente);

// FILA TABLA

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

<button class="btn-hc"
onclick="abrirHC(${paciente.id})">

📋 HC

</button>

</td>

</tr>

`;

// INSERTAR FILA

document.getElementById("tabla")
.insertAdjacentHTML("beforeend", fila);

// LIMPIAR CAMPOS

document.getElementById("nombre").value = "";
document.getElementById("sistolica").value = "";
document.getElementById("diastolica").value = "";

}

// =============================
// DESCARGAR PDF REPORTE
// =============================

function descargarPDF(id) {

const paciente = pacientes.find(p => p.id === id);

if (!paciente) {

alert("Paciente no encontrado");
return;

}

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// HEADER

doc.setFillColor(0, 91, 187);

doc.rect(0, 0, 220, 30, 'F');

doc.setTextColor(255, 255, 255);

doc.setFontSize(22);

doc.text("ControlHTA Comunitario", 20, 18);

doc.setFontSize(11);

doc.text("Reporte de Monitoreo de Presión Arterial", 20, 25);

// BODY

doc.setTextColor(0, 0, 0);

doc.setFontSize(15);

doc.text("Información del Paciente", 20, 50);

doc.line(20, 53, 190, 53);

doc.setFontSize(12);

doc.text(`Paciente: ${paciente.nombre}`, 20, 70);

doc.text(`Presión Arterial: ${paciente.sis}/${paciente.dia}`, 20, 85);

doc.text(`Estado Clínico: ${paciente.estado}`, 20, 100);

doc.text(

doc.splitTextToSize(
`Resultado: ${paciente.mensaje}`,
160
),

20,
115

);

doc.text(`Fecha: ${paciente.fecha}`, 20, 140);

// FOOTER

doc.setFillColor(31, 41, 55);

doc.rect(0, 270, 220, 30, 'F');

// DESCARGAR

doc.save(`Reporte_${paciente.nombre}.pdf`);

}

// =============================
// ABRIR HISTORIA CLÍNICA
// =============================

function abrirHC(id) {

let paciente = pacientes.find(p => p.id === id);

if (!paciente) {

alert("Paciente no encontrado");
return;

}

pacienteActual = paciente;

// ABRIR MODAL

const modal = document.getElementById("modalHC");

if (modal) {

modal.style.display = "block";

}

// DATOS AUTOMÁTICOS

document.getElementById("hcNombre").value =
`Paciente: ${paciente.nombre}`;

document.getElementById("hcPresion").value =
`Presión: ${paciente.sis}/${paciente.dia}`;

document.getElementById("hcEstado").value =
`Estado: ${paciente.estado}`;

// LIMPIAR FORMULARIO

document.getElementById("edad").value = "";

document.getElementById("sexo").value = "";

document.getElementById("peso").value = "";

document.getElementById("talla").value = "";

document.getElementById("antecedentes").value = "";

document.getElementById("sintomas").value = "";

document.getElementById("observaciones").value = "";

document.getElementById("recomendaciones").value = "";

}

// =============================
// CERRAR MODAL
// =============================

function cerrarModal() {

const modal = document.getElementById("modalHC");

if (modal) {

modal.style.display = "none";

}

}

// =============================
// GUARDAR HC PDF
// =============================

function guardarHC() {

if (!pacienteActual) {

alert("No hay paciente seleccionado");
return;

}

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// DATOS FORMULARIO

let edad =
document.getElementById("edad").value;

let sexo =
document.getElementById("sexo").value;

let peso =
document.getElementById("peso").value;

let talla =
document.getElementById("talla").value;

let antecedentes =
document.getElementById("antecedentes").value;

let sintomas =
document.getElementById("sintomas").value;

let observaciones =
document.getElementById("observaciones").value;

let recomendaciones =
document.getElementById("recomendaciones").value;

// HEADER

doc.setFillColor(0, 91, 187);

doc.rect(0, 0, 220, 30, 'F');

doc.setTextColor(255, 255, 255);

doc.setFontSize(22);

doc.text("Historia Clínica Digital", 20, 18);

// BODY

doc.setTextColor(0, 0, 0);

doc.setFontSize(13);

doc.text(`Paciente: ${pacienteActual.nombre}`, 20, 50);

doc.text(
`Presión: ${pacienteActual.sis}/${pacienteActual.dia}`,
20,
62
);

doc.text(
`Estado Clínico: ${pacienteActual.estado}`,
20,
74
);

doc.text(`Edad: ${edad}`, 20, 90);

doc.text(`Sexo: ${sexo}`, 20, 102);

doc.text(`Peso: ${peso}`, 20, 114);

doc.text(`Talla: ${talla}`, 20, 126);

// TEXTOS LARGOS

doc.text("Antecedentes:", 20, 145);

doc.text(
doc.splitTextToSize(antecedentes || "-", 160),
20,
155
);

doc.text("Síntomas:", 20, 185);

doc.text(
doc.splitTextToSize(sintomas || "-", 160),
20,
195
);

doc.text("Observaciones:", 20, 225);

doc.text(
doc.splitTextToSize(observaciones || "-", 160),
20,
235
);

// FOOTER

doc.setFillColor(31, 41, 55);

doc.rect(0, 270, 220, 30, 'F');

// DESCARGAR

doc.save(`HC_${pacienteActual.nombre}.pdf`);

}
