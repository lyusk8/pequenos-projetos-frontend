const numeros = document.querySelectorAll(".number");
const botao = document.querySelector("#generate")

botao.addEventListener("click", ()=>{
    const numerosSorteados = [];
    for(let i = 0; i < numeros.length; i++){
        const jogo = Math.floor(Math.random()*60)+1;
        if(numerosSorteados.includes(jogo)){
            i--
            continue
        } else {
            numerosSorteados.push(jogo);
        }

    }
    numeros.forEach((numero, i) => {
        numero.textContent = numerosSorteados[i++];
    })
})