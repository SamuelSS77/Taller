//Samuel Santiago Silva Código: 1011099440

//variables
let nombreCompleto = "";
let edad = 0;
let tipoDeDocumento = "";
let numeroDocumento = "";

let salario = 0;
let comisiones = 0;
let totalHorasExtras = 0;
let nivelRiesgo = "";

//constantes
const salarioMinimo = 1750905;
const salarioMinimoIntegral = 22761765;
const auxilioTransporte = 249095;
const porcentajePension = 0.04;
const porcentajeSalud = 0.04;
const porcentajeFondoSolidaridad = 0.01;
const riesgos = [0.00522, 0.01044, 0.02436, 0.04350, 0.06960];


//DOM
const formDatosGenerales = document.getElementById("datosGenerales");

const erroresDOM = document.getElementById("errores");


//Inputs Conectados
const inputNombre = document.getElementById("nombreCompleto");
const inputEdad = document.getElementById("edad");
const inputTipoDoc = document.getElementById("tipoDeDocumento");
const inputNumeroDoc = document.getElementById("numeroDocumento");


const inputSalario = document.getElementById("salario");
const inputComisiones = document.getElementById("comisiones");
const inputHorasExtra = document.getElementById("totalHorasExtras");
const inputNivelDeRiesgo = document.getElementById("nivelRiesgo");

//Resultados DOM
const resultadoSalario = document.getElementById("resultadoSalario");
const resultadoAuxilio = document.getElementById("resultadoAuxilio");
const resultadoComisiones = document.getElementById("resultadoComisiones");
const resultadoHorasExtras = document.getElementById("resultadoHorasExtras");

const resultadoSalud = document.getElementById("resultadoSalud");
const resultadoFondo = document.getElementById("resultadoFondo");
const resultadoPension = document.getElementById("resultadoPension");
const resultadoArl = document.getElementById("resultadoArl");

const resultadoNivelRiesgo = document.getElementById("resultadoNivelRiesgo");
const resultadoEdad = document.getElementById("resultadoEdad");
const resultadoNombre = document.getElementById("resultadoNombre");
const resultadoTipoDocumento = document.getElementById("resultadoTipoDocumento");
const resultadoNumeroDocumento = document.getElementById("resultadoNumeroDocumento");


// Mensajes para los errores
function mostrarError(mensaje) {
    let li = document.createElement("li");
    li.textContent = mensaje;
    li.style.color = "red";
    erroresDOM.appendChild(li);
}

// Evento
formDatosGenerales.addEventListener("submit", function(event) {
    event.preventDefault();
    erroresDOM.innerHTML = ""; // Limpiar errores previos

    // Captura de datos para validar
    let edadStr = inputEdad.value.trim();
    let numDocStr = inputNumeroDoc.value.trim();
    let salarioStr = inputSalario.value.trim();
    let comisionesStr = inputComisiones.value.trim();
    let horasExtraStr = inputHorasExtra.value.trim();

    let hayErrores = false;

    // Validaciones
    if (edadStr === "" || isNaN(Number(edadStr))) {
        mostrarError("La edad debe ser un valor numérico");
        hayErrores = true;
    }
    
    if (numDocStr.includes(".") || numDocStr.includes(",")) {
        mostrarError("El número de documento debe ingresarse sin puntos ni comas");
        hayErrores = true;
    }

    if (salarioStr.includes(".") || salarioStr.includes(",") || salarioStr.includes("$") || salarioStr.includes("-")) {
        mostrarError("El salario debe ingresarse sin puntos, comas o signos");
        hayErrores = true;
    }

    // Conversión a números
    edad = Number(edadStr);
    salario = Number(salarioStr);
    comisiones = Number(comisionesStr);
    totalHorasExtras = Number(horasExtraStr);
    nivelRiesgo = Number(inputNivelDeRiesgo.value);
    
    nombreCompleto = inputNombre.value;
    tipoDeDocumento = inputTipoDoc.value;
    numeroDocumento = numDocStr;

    // Validación de números negativos
    if (salario < 0 || comisiones < 0 || totalHorasExtras < 0 || edad < 0) {
        mostrarError("El número ingresado debe ser mayor o igual a 0");
        hayErrores = true;
    }

    // Validaciones de edad
    if (edad < 18) {
        mostrarError("No es posible continuar. El usuario es menor de edad.");
        hayErrores = true;
    } else if (edad >= 18 && edad < 25) {
        mostrarError("Usuario clasificado como: Beneficiario por cotizante.");
        hayErrores = true;
    }

    // Detener si hay errores o no cumple perfil
    if (hayErrores) return;

    // Validación mayores de 60 años
    if (edad >= 60) {
        mostrarError("Solo se calculará el pago de la pensión. Ingrese su mesada.");
        calcularPension(salario);
    } else {
        calcularNomina(salario, comisiones, totalHorasExtras, nivelRiesgo);
    }

    mostrarDatosPersonales();
});

function calcularNomina(salario, comisiones, horasExtras, riesgoIndex) {
    
    let totalDevengado = salario + comisiones + horasExtras;
    
    
    let ibc = (salario >= salarioMinimoIntegral) ? totalDevengado * 0.7 : totalDevengado; 
    
    
    let auxilio = (salario <= (salarioMinimo * 2)) ? auxilioTransporte : 0; 
    
    
    let aplicaDeducciones = salario >= (salarioMinimo * 2);

    let deduccionSalud = 0;
    let deduccionPension = 0;
    let deduccionFondo = 0;
    let deduccionArl = 0;

    if (aplicaDeducciones) {
        deduccionSalud = ibc * porcentajeSalud; 
        deduccionPension = ibc * porcentajePension; 
        
        if (ibc >= (salarioMinimo * 4)) {
            deduccionFondo = ibc * porcentajeFondoSolidaridad; 
        }
        deduccionArl = ibc * riesgos[riesgoIndex]; 
    }

    // Impresión en DOM
    resultadoSalario.textContent = `Salario: $${salario.toFixed(2)}`;
    resultadoAuxilio.textContent = `Auxilio Transporte: $${auxilio.toFixed(2)}`;
    resultadoComisiones.textContent = `Comisiones: $${comisiones.toFixed(2)}`;
    resultadoHorasExtras.textContent = `Horas Extra: $${horasExtras.toFixed(2)}`;

    resultadoSalud.textContent = `Salud: $${deduccionSalud.toFixed(2)}`;
    resultadoPension.textContent = `Pensión: $${deduccionPension.toFixed(2)}`;
    resultadoFondo.textContent = `Fondo Solidaridad: $${deduccionFondo.toFixed(2)}`;
    resultadoArl.textContent = `ARL: $${deduccionArl.toFixed(2)}`;
}

function calcularPension(mesada) {
    // Solo se calcula la pensión 
    let deduccionPension = mesada * porcentajePension;

    resultadoSalario.textContent = `Mesada Pensional: $${mesada.toFixed(2)}`;
    resultadoAuxilio.textContent = `Auxilio Transporte: $0.00`;
    resultadoComisiones.textContent = `Comisiones: $0.00`;
    resultadoHorasExtras.textContent = `Horas Extra: $0.00`;

    resultadoSalud.textContent = `Salud: $0.00`;
    resultadoPension.textContent = `Aporte Pensión: $${deduccionPension.toFixed(2)}`;
    resultadoFondo.textContent = `Fondo Solidaridad: $0.00`;
    resultadoArl.textContent = `ARL: $0.00`;
}

function mostrarDatosPersonales() {
    resultadoNombre.textContent = `Nombre: ${nombreCompleto}`;
    resultadoEdad.textContent = `Edad: ${edad}`;
    resultadoTipoDocumento.textContent = `Tipo Documento: ${tipoDeDocumento}`;
    resultadoNumeroDocumento.textContent = `No. Documento: ${numeroDocumento}`;
    resultadoNivelRiesgo.textContent = `Nivel de Riesgo Seleccionado: Nivel ${nivelRiesgo + 1}`;
}