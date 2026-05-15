let total = 0;
let normales = 0;
let altos = 0;
let bajos = 0;

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

let fila = `
<tr>
<td>${nombre}</td>
<td>${sis}/${dia}</td>
<td class="${clase}">${estado}</td>
<td>${fecha}</td>
</tr>
`;

document.getElementById("tabla").innerHTML += fila;

document.getElementById("nombre").value = "";
document.getElementById("sistolica").value = "";
document.getElementById("diastolica").value = "";

}
