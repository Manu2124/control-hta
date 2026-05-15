let total = 0;

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
