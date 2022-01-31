let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');
let esquerda = document.querySelector('.d-1-left');

//Variaveis de controle de ambiente
let etapaAtual = 0;
let numero ='';
let votoBranco = false;
let votoNulo = false;
let votos = [];
let candidato = '';

//Função para iniciar votação
function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHtml ='';
    numero = '';
    votoBranco = false;
    votoNulo = false;

    for (let i=0;i<etapa.numeros;i++){
        if (i === 0){
            numeroHtml+= '<div class="numero pisca"></div>';    
        }else{
            numeroHtml+= '<div class="numero"></div>';
        }
      
    }

    seuVotoPara.style.display= 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

//Função para atualizar a tela e trazer o candidato digitado
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    candidato =  etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        }else {
            return false;
        }
    });

    
    // Se encontrar um canditato com o número digitado, exibe os dados
   if(parseInt(candidato.length) > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml +=`<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }else{
                fotosHtml +=`<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
       // Se não encontrar um canditato com o número digitado, exibe VOTO NULO
    }else{
        votoNulo = true;
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--numero"> NUMERO ERRADO</div> <div class="aviso--grande pisca"> VOTO NULO</div>';
        aviso.style.display = 'block';
    }
}

//Função responsável por capturar e manipular os cliques em botões de números
function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface();
        }
        
    }
}

//Função botão BRANCO - seta o voto "Branco" para a etapa atual (permitido apenas se não houver números digitados ainda)
function branco(n){
    if (numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO</div>';
    }else{
        alert('Você só pode votar em branco se não tiver digitado nenhum numero!')
    }
}

// Função botão CORRIGE - limpa dados digitados na etapa atual
function corrige(n){
    comecarEtapa();
}

// Função botão CONFIRMA - confirma voto inserido
function confirma(n){
    let votoConfirmado = false;
    let etapa = etapas[etapaAtual];
    
    //Se votar em branco, adiciona no vetor VOTOS o status BRANCO para a etapa.
    if (votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:'BRANCO'
        });
        //Se votar em NULO, adiciona no vetor VOTOS o status NULO para a etapa.
            }else if (votoNulo === true){
                    votoConfirmado = true;
                    votos.push({
                        etapa: etapas[etapaAtual].titulo,
                        voto: 'NULO'

                });
                //Se votar em VOTO VÁLIDO, adiciona no vetor VOTOS o NOME DO CANTIDATO para a etapa.
                }else if (numero.length === etapa.numeros){
                            votoConfirmado = true;
                            votos.push({
                                etapa: etapas[etapaAtual].titulo,
                                voto:candidato.nome
                });
            }
    
    // SE CONSEGUIR SALVAR O VOTO PARA A ETAPA ATUAL, VERFICA SE HÁ MAIS UMA ETAPA PARA CONTINUAR
    if (votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
         document.querySelector('.tela').innerHTML = '<div class = "aviso--gigante pisca">FIM</div>';
         console.log(votos)
        }
    }
}

//Inicia o programa de votação
comecarEtapa();