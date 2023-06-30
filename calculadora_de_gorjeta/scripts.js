const valor = document.querySelector("#valor");
const avaliacao = document.querySelector("#avaliacao-servico");
const gorjeta = document.querySelector("#gorjeta");
const valorTotal = document.querySelector("#total");
const btnCalcular = document.querySelector("#calculate-btn");

function calcular(){
    const percentalGorjeta = parseFloat(avaliacao.value);
    const valorInicial = parseFloat(valor.value)
    gorjeta.value = percentalGorjeta * valorInicial;
    valorTotal.value = (percentalGorjeta * valorInicial) + valorInicial;

}

btnCalcular.addEventListener("click", calcular);

