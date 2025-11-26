// Perguntas do jogo
const vfQuestions = [
    {
        q:"Reciclar papel economiza água e energia.",
        a:true
    },
    {
        q:"Lâmpadas fluorescentes podem ser jogadas no lixo comum.",
        a:false
    },
    {
        q:"O plástico demora centenas de anos para se decompor na natureza.",
        a:true
    },
    {
        q:"Desligar aparelhos da tomada quando não estão em uso ajuda a economizar energia.",
        a:true
    },
    {
        q:"Restos de comida devem ser descartados na lixeira de recicláveis.",
        a:false
    },
    {
        q:"O óleo de cozinha pode ser jogado na pia sem problemas.",
        a:false
    }
];

let vfCurrent = 0;
let vfScore = [];
let finished = false;

function renderVF() {
    finished = false;
    vfCurrent = 0;
    vfScore = [];
    document.getElementById('vf-result').innerHTML = '';
    document.getElementById('vf-restartBtn').style.display = 'none';
    showVFQuestion();
}

function showVFQuestion() {
    const gameDiv = document.getElementById('vf-game');
    if (vfCurrent >= vfQuestions.length) {
        showVFResult();
        return;
    }
    const q = vfQuestions[vfCurrent];
    gameDiv.innerHTML = `
      <div class="vf-question">${q.q}</div>
      <div class="vf-btns">
        <button class="vf-btn" onclick="answerVF(true)">Verdadeiro</button>
        <button class="vf-btn" onclick="answerVF(false)">Falso</button>
      </div>
      <div style="margin-top:18px;">Pergunta ${vfCurrent+1} de ${vfQuestions.length}</div>
    `;
}

function answerVF(ans) {
    if (finished) return;
    vfScore.push(ans === vfQuestions[vfCurrent].a);
    vfCurrent++;
    showVFQuestion();
}

function showVFResult() {
    finished = true;
    const acertos = vfScore.filter(x=>x).length;
    let html = `<p><strong>Você acertou ${acertos} de ${vfQuestions.length}!</strong></p>`;
    if (acertos === vfQuestions.length) {
        html += `<p style='color:#16a34a;font-weight:bold;'>Parabéns! Você acertou tudo!</p>`;
    } else if (acertos === 0) {
        html += `<p style='color:#dc2626;font-weight:bold;'>Ops! Tente novamente para aprender mais!</p>`;
    } else {
        html += `<ul style='margin-top:12px;'>`;
        vfQuestions.forEach((q,i)=>{
            if (!vfScore[i]) {
                html += `<li><b>${q.q}</b><br><span style='color:#16a34a'>Resposta correta:</span> ${q.a ? "Verdadeiro" : "Falso"}</li>`;
            }
        });
        html += `</ul>`;
    }
    document.getElementById('vf-result').innerHTML = html;
    document.getElementById('vf-restartBtn').style.display = 'block';
}

function restartVF() {
    renderVF();
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

// Inicializa o jogo
window.onload = renderVF;