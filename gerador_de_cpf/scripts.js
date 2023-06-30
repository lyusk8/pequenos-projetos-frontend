const cpf = document.querySelector("#cpf");
const buttonGerar = document.querySelector("#gerar-cpf");
const buttonCopiar = document.querySelector("#copiar-cpf");

buttonGerar.addEventListener("click", preencheCpf);
buttonCopiar.addEventListener("click", copiarCpf);

function preencheCpf(){
    let n = Math.floor(Math.random()*999999999) +1;    
    let nStr = n.toString().padStart(9, "0");
    let dv1 = calcularDV(nStr, 10);
    let dv2 = calcularDV(nStr + dv1, 11);

    cpf.innerText = formatarCPF(nStr + dv1 + dv2);
}

function calcularDV(numero, peso){
    let total = 0;
    for(let i = 0; i < numero.length; i++){
        total += parseInt(numero.charAt(i)) * peso--;
    }
    let resto = total % 11;
    return resto < 2 ? o : 11 - resto;
}

function formatarCPF(cpf){
    const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpf.replace(regex, "$1.$2.$3-$4")
}


function copiarCpf(){
    const cpfcopy = cpf.innerText;
    if(cpfcopy === "") {
        alert("CPF inválido")
    } else {
        navigator.clipboard.writeText(cpfcopy).then(() =>{
            alert(`CPF ${cpfcopy} copiado para a área de transfer`)
        }, err => {
            console.log("Erro ao copiar CPF.");
        })
    }
}