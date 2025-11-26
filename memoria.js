// Pares de cartas (imagem ou texto). Troque as imagens/textos como quiser!
const cardsData = [
    // Pares de texto
    { type:'text', value:'Reciclar' },
    { type:'text', value:'Reciclar' },
    { type:'text', value:'Economizar Água' },
    { type:'text', value:'Economizar Água' },
    { type:'text', value:'Painel Solar' },
    { type:'text', value:'Painel Solar' },
    { type:'text', value:'Coleta Seletiva' },
    { type:'text', value:'Coleta Seletiva' },
    { type:'text', value:'Reutilizar' },
    { type:'text', value:'Reutilizar' },
    { type:'text', value:'Energia Eólica' },
    { type:'text', value:'Energia Eólica' },
];

// Embaralha as cartas
function shuffle(array) {
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}

let firstCard=null, secondCard=null, lock=false, matches=0;

function renderGame() {
    const game = document.getElementById('memory-game');
    let deck = [...cardsData];
    shuffle(deck);
    game.innerHTML = '';
    deck.forEach((card,i)=>{
        game.innerHTML += `
        <div class="memory-card" data-idx="${i}" data-type="${card.type}" data-value="${card.value}">
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    ${card.type==='img'
                        ? `<img src="${card.value}" alt="${card.alt||''}" style="max-width:60px;">`
                        : `<span>${card.value}</span>`
                    }
                </div>
            </div>
        </div>`;
    });
    // Adiciona eventos
    document.querySelectorAll('.memory-card').forEach(card=>{
        card.addEventListener('click',()=>flipCard(card));
        card.classList.remove('flipped','matched');
    });
    firstCard=secondCard=null;
    lock=false;
    matches=0;
    document.getElementById('memory-status').textContent='';
}

function flipCard(card) {
    if(lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    if(!firstCard){
        firstCard=card;
        return;
    }
    secondCard=card;
    lock=true;

    // Checa se é par
    if(
        firstCard.dataset.type===secondCard.dataset.type &&
        firstCard.dataset.value===secondCard.dataset.value &&
        firstCard!==secondCard
      ){
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches++;
        if(matches===cardsData.length/2){
            document.getElementById('memory-status').textContent='Parabéns! Você encontrou todos os pares!';
        }
        resetTurn();
    }else{
        setTimeout(()=>{
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetTurn();
        },900);
    }
}

function resetTurn(){
    [firstCard,secondCard]=[null,null];
    lock=false;
}

function restartGame(){
    renderGame();
}

window.onload = renderGame;