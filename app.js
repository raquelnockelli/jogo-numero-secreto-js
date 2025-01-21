let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //função para falar o texto, o rate é a velocidade da fala
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha o número secreto entre 1 e 100');
}

exibirMensagemInicial();

//função sem retorno
function verificarChute(){
    let chute = document.querySelector('input').value;//pega so o valor do input
    if (chute == numeroSecreto){
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas == 1 ? "tentativa" : "tentativas";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");     
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela("p", "Errou! O número secreto é menor");
        }else{
            exibirTextoNaTela("p", "Errou! O número secreto é maior");
        }
         tentativas++;
         limparCampo();
}
}

//função com retorno
function gerarNumeroAleatorio(){
    //gera o numero aleatorio transformando o numero em inteiro
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   
   //limpa a lista quando chegar a 10 elementos
   let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosDaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

   //se o numeto ja foi escolhido, chama a função novamente
   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
       return gerarNumeroAleatorio();
   }else{
    //.push adiciona um elemento ao final do array
       listaDeNumerosSorteados.push(numeroEscolhido);
       console.log(listaDeNumerosSorteados);
       return numeroEscolhido;
   }
}

function limparCampo(){
    let chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}