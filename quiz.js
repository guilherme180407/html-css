const quizData = [
  {
    question: "Qual destas ações mais contribui para a redução do lixo plástico?",
    options: [
      "Usar sacolas plásticas descartáveis",
      "Reciclar e reutilizar embalagens",
      "Jogar lixo no rio",
      "Queimar resíduos em casa"
    ],
    answer: 1
  },
  {
    question: "O que é energia renovável?",
    options: [
      "Energia que nunca acaba e não polui",
      "Energia gerada apenas por combustíveis fósseis",
      "Energia que só pode ser usada uma vez",
      "Energia que vem do petróleo"
    ],
    answer: 0
  },
  {
    question: "O que significa reciclar?",
    options: [
      "Jogar lixo em qualquer lugar",
      "Transformar resíduos em novos produtos",
      "Queimar lixo para sumir rápido",
      "Guardar lixo em casa"
    ],
    answer: 1
  },
  {
    question: "Qual é o principal gás responsável pelo efeito estufa?",
    options: [
      "Oxigênio (O₂)",
      "Hidrogênio (H₂)",
      "Nitrogênio (N₂)",
      "Dióxido de carbono (CO₂)"
    ],
    answer: 3
  },
    
  // ...demais perguntas
];

let current = 0, score = 0, answered = false;

function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (current < quizData.length) {
    const q = quizData[current];
    container.innerHTML = `
      <div class="quiz-question">${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button data-idx="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-progress">Pergunta ${current + 1} de ${quizData.length}</div>
      <div id="feedback" class="quiz-feedback"></div>
    `;
    // Adiciona o event listener nos botões após renderizar
    document.querySelectorAll('.quiz-options button').forEach(btn => {
      btn.addEventListener('click', function () {
        selectOption(Number(this.getAttribute('data-idx')), this);
      });
    });
    answered = false; // Reset aqui, após renderizar!
  } else {
    container.innerHTML = `
      <div class="quiz-result">Você acertou ${score} de ${quizData.length} perguntas!<br>${score >= 4 ? 'Parabéns! 🎉' : 'Tente novamente para melhorar!'}</div>
      <button class="quiz-restart-btn" onclick="restartQuiz()">Reiniciar Quiz</button>
    `;
  }
}

function selectOption(idx, btn) {
  if (answered) return;
  answered = true;
  const q = quizData[current];
  const buttons = document.querySelectorAll('.quiz-options button');
  buttons.forEach(b => b.disabled = true);
  if (idx === q.answer) {
    btn.classList.add('selected');
    document.getElementById('feedback').innerHTML = "✅ Resposta correta!";
    score++;
  } else {
    btn.classList.add('selected');
    buttons[q.answer].classList.add('selected');
    document.getElementById('feedback').innerHTML = "❌ Resposta incorreta!";
  }
  setTimeout(() => {
    current++;
    renderQuiz();
  }, 1200);
}

function restartQuiz() {
  current = 0;
  score = 0;
  answered = false;
  renderQuiz();
}

// Inicializa o quiz ao carregar a página
window.onload = renderQuiz;
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

// Inicializa o quiz ao carregar a página
window.onload = renderQuiz;