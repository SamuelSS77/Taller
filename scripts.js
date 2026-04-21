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


function validar(edad) {
    if (edad < 18) {
        stop();
    } else if (18 <= edad && edad< 25) {
        esUsuarioBenerficiarioPorCotizante();
    } else if (edad >= 60) {
        pension();
    } else {
        salaraioCalculo();
    }
}

