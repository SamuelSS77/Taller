//variables
let nombreCompleto = "Juan el Caballo Loco";
let edad = 18;
let tipoDeDocumento = "CC";
let numeroDocumento = "1011099440";

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

//Inputs Conectados
const inputNombre = document.getElementById("nombreCompleto");
const inputEdad = document.getElementById("edad");
const inputTipoDoc = document.getElementById("tipoDeDocumento");
const inputNumeroDoc = document.getElementById("numeroDocumento");


const inputSalario = document.getElementById("salario");
const inputComisiones = document.getElementById("comisiones");
const inputHorasExtra = document.getElementById("totalHorasExtras");
const inputNivelDeRiesgo = document.getElementById("nivelRiesgo");


function validar(edad) {
    if (edad < 18) {
        alert("No cumples con la edad minima para avanzar");
        return;
    } else if (18 <= edad && edad< 25) {
         alert("Usuario beneficiario por cotizante");
        esUsuarioBenerficiarioPorCotizante();
    } else if (edad >= 60) {
        alert("Se calculara solo el pago por pension");
        pension();
    } else {
        salarioCalculo();
    }
}

let ibc = (salario + comisiones + totalHorasExtras) * 0.7
let calculoAuxilioTransporte = salario < 2 * salarioMinimo? auxilioTransporte : 0
let calculoSalud = ibc * porcentajeSalud
let calculoFondoSolidaridad = ibc * porcentajeFondoSolidaridad
let calculoPension = ibc >= 4 * salarioMinimo? ibc * porcentajePension + calculoFondoSolidaridad : ibc * porcentajePension
let calculoArl = ibc * riesgos[parseInt(nivelRiesgo) - 1];


function calcularPorcentaje(base, porcentaje) {
    let resultado = base * porcentaje;
    return resultado;
}
