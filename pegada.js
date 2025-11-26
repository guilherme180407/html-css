// Perguntas e fatores de emissão (valores aproximados para fins educativos)
const questions = [
    {
        label:"Quantos km você anda de carro por semana?",
        name:"carro",
        type:"number",
        min:"0",
        placeholder:"Exemplo: 50",
        factor:0.192 // kg CO2 por km (carro médio)
    },
    {
        label:"Quantos km você anda de ônibus por semana?",
        name:"onibus",
        type:"number",
        min:"0",
        placeholder:"Exemplo: 20",
        factor:0.105 // kg CO2 por km (ônibus urbano)
    },
    {
        label:"Quantos banhos quentes (chuveiro elétrico) você toma por semana?",
        name:"banho",
        type:"number",
        min:"0",
        placeholder:"Exemplo: 14",
        factor:1.2 // kg CO2 por banho (~10min)
    },
    {
        label:"Quantas refeições com carne vermelha você faz por semana?",
        name:"carne",
        type:"number",
        min:"0",
        placeholder:"Exemplo: 7",
        factor:2.5 // kg CO2 por refeição
    },
    {
        label:"Quantas garrafas plásticas (500ml) você consome por semana?",
        name:"plastico",
        type:"number",
        min:"0",
        placeholder:"Exemplo: 5",
        factor:0.08 // kg CO2 por garrafa
    }
];

// Renderiza o formulário
function renderForm() {
    const form = document.getElementById('carbonForm');
    let html = '';
    questions.forEach(q => {
        html += `
            <label for="${q.name}">${q.label}</label>
            <input type="${q.type}" id="${q.name}" name="${q.name}" min="${q.min}" placeholder="${q.placeholder}" required>
        `;
    });
    html += `<button type="submit">Calcular Pegada</button>`;
    form.innerHTML = html;
    document.getElementById('carbonResult').innerHTML = '';
    document.getElementById('restartBtn').style.display = 'none';
}
renderForm();

// Calcula a pegada ao enviar
document.getElementById('carbonForm').onsubmit = function(e){
    e.preventDefault();
    let total = 0;
    let detalhes = [];
    questions.forEach(q => {
        const val = Number(document.getElementById(q.name).value) || 0;
        const emissao = val * q.factor;
        total += emissao;
        detalhes.push(`<li>${q.label} <strong>${val}</strong> → ${emissao.toFixed(2)} kg CO₂/semana</li>`);
    });
    let mensagem = '';
    if(total <=10) mensagem = "Excelente! Sua pegada está bem baixa 👏";
    else if(total <=25) mensagem = "Muito bom! Mas sempre dá para melhorar 🌱";
    else if(total <=40) mensagem = "Atenção! Que tal rever alguns hábitos?";
    else mensagem = "Sua pegada está alta! Repense seus hábitos para ajudar o planeta 🌎";

    document.getElementById('carbonResult').innerHTML =
      `<p><strong>Sua estimativa semanal:</strong> <span style='font-size:1.3em;'>${total.toFixed(2)} kg CO₂</span></p>
       <ul style='text-align:left;margin-top:18px;'>${detalhes.join('')}</ul>
       <p style='margin-top:18px;font-weight:bold;'>${mensagem}</p>`;
    document.getElementById('restartBtn').style.display = 'block';
};

// Reinicia o formulário
function restartCarbon(){
    renderForm();
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