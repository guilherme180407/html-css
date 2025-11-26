// Lista de resíduos e lixeira correta (agora com orgânico e eletrônico)
const items = [
  { text:"Cacos de garrafa de vidro", bin:"vidro" },
  { text:"Folha de caderno", bin:"papel" },
  { text:"Lata de refrigerante", bin:"metal" },
  { text:"Garrafa PET", bin:"plastico" },
  { text:"Jornal velho", bin:"papel" },
  { text:"Pote de iogurte", bin:"plastico" },
  { text:"Tampa de garrafa metálica", bin:"metal" },
  { text:"Copo descartável", bin:"plastico" },
  { text:"Caixa de papelão", bin:"papel" },
  { text:"Vidro de perfume", bin:"vidro" },
  { text:"Latinha de atum", bin:"metal" },
  { text:"Embalagem de biscoito", bin:"plastico" },
  { text:"Revista", bin:"papel" },
  { text:"Frasco de remédio de vidro", bin:"vidro" },
  { text:"Papel de presente", bin:"papel" },
  // Novos para orgânico
  { text:"Restos de comida", bin:"organico" },
  { text:"Casca de banana", bin:"organico" },
  { text:"Filtro de café usado", bin:"organico" },
  // Novos para eletrônico
  { text:"Pilhas usadas", bin:"eletronico" },
  { text:"Celular velho", bin:"eletronico" },
  { text:"Carregador quebrado", bin:"eletronico" }
];

// Embaralha os cards
function shuffle(array) {
  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
}

let dropped = {}; // itemIndex -> bin
let finished = false;

function renderGame() {
  shuffle(items);
  dropped = {};
  finished = false;
  document.getElementById('result').innerHTML = '';
  document.getElementById('restartBtn').style.display = 'none';
  
  // Render cards
  const cardsDiv = document.getElementById('cards');
  cardsDiv.innerHTML = '';
  items.forEach((item,i)=>{
    const card = document.createElement('div');
    card.className = 'card-draggable';
    card.textContent = item.text;
    card.setAttribute('draggable', true);
    card.setAttribute('data-idx', i);
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
    cardsDiv.appendChild(card);
  });

  // Bins
  document.querySelectorAll('.bin').forEach(bin=>{
    bin.classList.remove('over');
    bin.ondragover = e => {
      e.preventDefault();
      bin.classList.add('over');
    };
    bin.ondragleave = () => bin.classList.remove('over');
    bin.ondrop = function(e){
      e.preventDefault();
      bin.classList.remove('over');
      if(finished) return;
      const idx = e.dataTransfer.getData('text/plain');
      if(idx === null) return;
      dropped[idx] = bin.dataset.bin;
      // Marca como dropado
      const card = document.querySelector(`.card-draggable[data-idx="${idx}"]`);
      if(card) card.classList.add('dropped');
    };
  });
}

function dragStart(e) {
  if(finished) return;
  this.classList.add('dragging');
  e.dataTransfer.setData('text/plain', this.dataset.idx);
}
function dragEnd() {
  this.classList.remove('dragging');
}

function finishGame() {
  if(finished) return;
  finished = true;
  let acertos = 0;
  let erros = [];
  items.forEach((item,i)=>{
    if(dropped[i] === item.bin) acertos++;
    else erros.push({item:item.text, certo:item.bin, jogou:dropped[i]});
  });
  
  let html = `<p><strong>Você acertou ${acertos} de ${items.length}!</strong></p>`;
  
  if(erros.length > 0) {
    html += `<p style='margin-top:12px;'>Veja onde errou:</p><ul>`;
    erros.forEach(e=>{
      html += `<li><b>${e.item}</b>: era <span style='color:#16a34a'>${capitalize(e.certo)}</span>${e.jogou ? `, você colocou em <span style='color:#dc2626'>${capitalize(e.jogou)}</span>` : ', não foi colocado em nenhuma lixeira'}</li>`;
    });
    html += `</ul>`;
  } else {
    html += `<p style='color:#16a34a;font-weight:bold;'>Parabéns! Você acertou tudo!</p>`;
  }
  
  document.getElementById('result').innerHTML = html;
  document.getElementById('restartBtn').style.display = 'block';
}

function restartGame() {
  renderGame();
}

// Utilitário
function capitalize(str) {
  if(!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("fadeOut");
  setTimeout(() => loader.style.display = "none",800);
});

// Botão voltar ao topo
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if(window.scrollY >300) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});
backToTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

// Modo noturno
const darkModeBtn = document.getElementById('darkModeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function setDarkMode(on){
  if(on) document.body.classList.add('dark-mode');
  else document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', on ? 'on' : 'off');
  darkModeBtn.innerHTML = on ? '☀️' : '🌙';
}
(function(){
  const saved = localStorage.getItem('darkMode');
  if(saved==='on' || (saved===null && prefersDark)) setDarkMode(true);
  else setDarkMode(false);
})();
darkModeBtn.addEventListener('click',()=>setDarkMode(!document.body.classList.contains('dark-mode')));

// Inicializa
window.onload = renderGame;