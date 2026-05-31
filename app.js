/* ==========================================================================
   BANCO DE DATOS ACADÉMICOS DE LOS 6 ENFOQUES OBLIGATORIOS
   ========================================================================== */
const ENFOQUES_DATA = {
    reduccionista: {
        title: "Enfoque Reduccionista",
        content: `<p><strong>Definición:</strong> Enfoque metodológico clásico de la ciencia que busca subdividir los fenómenos complejos en sus partes más fundamentales para analizarlas de forma aislada.</p>
                  <p><strong>Características:</strong> Linealidad causa-efecto, aislamiento de variables y determinismo absoluto.</p>
                  <p><strong>Ventajas:</strong> Permite un altísimo grado de especialización en ciencias básicas como la física nuclear o la biología molecular elemental.</p>
                  <p><strong>Desventajas:</strong> Pierde de vista las relaciones sinérgicas; es incapaz de explicar las propiedades emergentes.</p>
                  <p><strong>Aplicación:</strong> El diagnóstico tradicional de fallas mecánicas aisladas en un motor.</p>`
    },
    holistico: {
        title: "Enfoque Holístico",
        content: `<p><strong>Definición:</strong> Paradigma opuesto al reduccionismo que establece que un sistema debe ser aprendido en su totalidad global, asumiendo que el todo es cualitativamente diferente a la suma de sus partes.</p>
                  <p><strong>Características:</strong> Macro-focalización, valoración de propiedades integrales, prioridad del contexto sistémico.</p>
                  <p><strong>Ventajas:</strong> Captura dinámicas globales complejas y previene intervenciones locales que causen daños colaterales.</p>
                  <p><strong>Desventajas:</strong> Puede carecer de rigor operativo o precisión detallada si no se formaliza metodológicamente.</p>
                  <p><strong>Caso Real:</strong> El estudio de la biósfera terrestre como un macro-organismo integrado.</p>`
    },
    sistemico: {
        title: "Enfoque Sistémico",
        content: `<p><strong>Definición:</strong> Marco conceptual amplio enfocado en las interrelaciones, dependencias mutuas, estructuras organizacionales y procesos de transformación de los elementos.</p>
                  <p><strong>Características:</strong> Énfasis en los límites, entradas (inputs), salidas (outputs), procesos y flujos relacionales.</p>
                  <p><strong>Aplicaciones:</strong> Reingeniería de procesos organizacionales corporativos y arquitectura de software orientada a servicios (SOA).</p>`
    },
    cyber: {
        title: "Enfoque Cibernético",
        content: `<p><strong>Definición:</strong> Campo de estudio centrado en los procesos de comunicación y de control tanto en seres vivos como en máquinas tecnológicas artificiales.</p>
                  <p><strong>Conceptos Clave:</strong>
                    <br>• <em>Retroalimentación (Feedback):</em> Reintroducción de las salidas para modificar las entradas futuras.
                    <br>• <em>Homeostasis:</em> Capacidad de sostener un equilibrio dinámico e interno frente a variaciones externas.</p>`
    },
    complejidad: {
        title: "Enfoque de Complejidad",
        content: `<p><strong>Definición:</strong> Epistemología impulsada por pensadores como Edgar Morin para decodificar sistemas donde el orden, el caos y la incertidumbre coexisten en dinámicas no lineales.</p>
                  <p><strong>Pilares fundamentales:</strong>
                    <br>• <em>Emergencia:</em> Aparición espontánea de patrones macro a partir de interacciones micro.
                    <br>• <em>Autoorganización:</em> Capacidad de un sistema de configurar su propia estructura interna de forma autónoma.</p>`
    },
    inter: {
        title: "Enfoque Interdisciplinario",
        content: `<p><strong>Definición:</strong> Integración metodológica y conceptual cruzada entre distintas disciplinas científicas tradicionales para generar herramientas unificadas.</p>
                  <p><strong>Aplicaciones Modernas:</strong> La Bioinformática médica y la Ciencia de Datos aplicada a dinámicas sociodemográficas avanzadas.</p>`
    }
};

/* ==========================================================================
   SISTEMA DE NAVEGACIÓN SPA (Single Page Application)
   ========================================================================== */
function navigateTo(sectionId) {
    document.querySelectorAll('.app-section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }

    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active-nav');
        if (btn.getAttribute('onclick').includes(sectionId)) {
            btn.classList.add('active-nav');
        }
    });

    window.scrollTo(0, 0);

    if (sectionId === 'juegos') {
        initMemoryGame();
        initWordSearch();
        initHangmanGame();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#theme-toggle i');
    icon.className = document.body.classList.contains('dark-mode') ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

function openEnfoqueDetail(key) {
    const data = ENFOQUES_DATA[key];
    const modal = document.getElementById('modalTarget');
    modal.innerHTML = `
        <button class="close-modal" onclick="closeEnfoqueDetail()">&times;</button>
        <h3 style="font-size: 2rem; margin-bottom: 1.5rem; color: var(--primary);">${data.title}</h3>
        <div style="display:flex; flex-direction:column; gap:1.25rem; line-height:1.7;">
            ${data.content}
        </div>
    `;
    document.getElementById('detailOverlay').style.display = 'flex';
}

function closeEnfoqueDetail() {
    document.getElementById('detailOverlay').style.display = 'none';
}

document.getElementById('detailOverlay').addEventListener('click', function(e) {
    if(e.target === this) closeEnfoqueDetail();
});

/* ==========================================================================
   LOGICA DE JUEGOS - INTERRUPTORES
   ========================================================================== */
function switchGame(gameNum) {
    document.querySelectorAll('.game-container').forEach(gc => gc.classList.remove('active-game'));
    document.querySelectorAll('.games-hub-tabs .tab-btn').forEach(tb => tb.classList.remove('active-tab'));
    
    document.getElementById(`tab-game${gameNum}`).classList.add('active-tab');
    if(gameNum === 1) document.getElementById('game-memoria').classList.add('active-game');
    if(gameNum === 2) document.getElementById('game-sopa').classList.add('active-game');
    if(gameNum === 3) document.getElementById('game-ahorcado').classList.add('active-game');
}

/* JUEGO 1: MEMORIA DE ALTA INTEGRACIÓN (MATRIZ REQUISITO EXACTO 4X4) */
let memoryCardsArr = [
    { id: 1, val: "Holismo", desc: "El todo es mayor que la suma de sus partes." },
    { id: 2, val: "Holismo", desc: "El todo es mayor que la suma de sus partes." },
    { id: 3, val: "Reduccionismo", desc: "Análisis basado en aislar las partes elementales." },
    { id: 4, val: "Reduccionismo", desc: "Análisis basado en aislar las partes elementales." },
    { id: 5, val: "Homeostasis", desc: "Equilibrio dinámico interno autoajustable." },
    { id: 6, val: "Homeostasis", desc: "Equilibrio dinámico interno autoajustable." },
    { id: 7, val: "Feedback", desc: "Bucles de regulación y retroalimentación informativa." },
    { id: 8, val: "Feedback", desc: "Bucles de regulación y retroalimentación informativa." },
    { id: 9, val: "Sinergia", desc: "Acción coordinada donde la suma supera los componentes independientes." },
    { id: 10, val: "Sinergia", desc: "Acción coordinada donde la suma supera los componentes independientes." },
    { id: 11, val: "Entropía", desc: "Tendencia natural de los sistemas hacia el desorden y desgaste." },
    { id: 12, val: "Entropía", desc: "Tendencia natural de los sistemas hacia el desorden y desgaste." },
    { id: 13, val: "Emergencia", desc: "Propiedades globales nuevas no presentes en los elementos micro." },
    { id: 14, val: "Emergencia", desc: "Propiedades globales nuevas no presentes en los elementos micro." },
    { id: 15, val: "Wiener", desc: "Científico creador de los fundamentos matemáticos de la Cibernética." },
    { id: 16, val: "Wiener", desc: "Científico creador de los fundamentos matemáticos de la Cibernética." }
];

let chosenCards = []; let chosenCardsIds = []; let cardsWon = [];
let memMoves = 0; let memScore = 0; let memTimer = null; let memSeconds = 0;

function initMemoryGame() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    document.getElementById('memory-feedback').innerText = '';
    chosenCards = []; chosenCardsIds = []; cardsWon = [];
    memMoves = 0; memScore = 0; memSeconds = 0;
    document.getElementById('mem-moves').innerText = memMoves;
    document.getElementById('mem-score').innerText = memScore;
    
    memoryCardsArr.sort(() => 0.5 - Math.random());
    clearInterval(memTimer);
    memTimer = setInterval(() => {
        memSeconds++;
        let mins = Math.floor(memSeconds / 60).toString().padStart(2, '0');
        let secs = (memSeconds % 60).toString().padStart(2, '0');
        document.getElementById('mem-time').innerText = `${mins}:${secs}`;
    }, 1000);

    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.setAttribute('data-id', i);
        card.innerHTML = `
            <div class="card-back">TGS</div>
            <div class="card-front">${memoryCardsArr[i].val}</div>
        `;
        card.addEventListener('click', flipMemoryCard);
        board.appendChild(card);
    }
}

function flipMemoryCard() {
    let cardId = this.getAttribute('data-id');
    if (chosenCardsIds.length < 2 && !chosenCardsIds.includes(cardId) && !cardsWon.includes(cardId)) {
        this.classList.add('flipped');
        chosenCards.push(memoryCardsArr[cardId].val);
        chosenCardsIds.push(cardId);

        if (chosenCards.length === 2) {
            memMoves++;
            document.getElementById('mem-moves').innerText = memMoves;
            setTimeout(checkForMatch, 600);
        }
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.memory-card');
    const id1 = chosenCardsIds[0]; const id2 = chosenCardsIds[1];

    if (chosenCards[0] === chosenCards[1]) {
        cardsWon.push(id1); cardsWon.push(id2);
        memScore += 10;
        document.getElementById('memory-feedback').innerText = `¡Correcto!: ${memoryCardsArr[id1].desc}`;
    } else {
        cards[id1].classList.remove('flipped');
        cards[id2].classList.remove('flipped');
        if(memScore > 1) memScore -= 1;
    }
    document.getElementById('mem-score').innerText = memScore;
    chosenCards = []; chosenCardsIds = [];

    if (cardsWon.length === memoryCardsArr.length) {
        clearInterval(memTimer);
        document.getElementById('memory-feedback').innerText = "¡Enhorabuena! Has resuelto la matriz de conceptos de la TGS.";
    }
}

/* JUEGO 2: SOPA DE LETRAS MATRIZ REQUISITO 15X15 MULTIDIRECCIONAL */
const WS_WORDS = ["HOLISMO", "REDUCCIONISMO", "CIBERNETICA", "COMPLEJIDAD", "SISTEMAS", "ENTROPIA", "SINERGIA", "HOMEOSTASIS", "EMERGENCIA", "ADAPTACION", "MODELOS", "ORGANIZACION", "TOTALIDAD"];
let wsGridSize = 15; let wsMatrix = []; let wsFoundWords = []; let wsScore = 0;
let isSelectingWS = false; let selectedCellsWS = [];

function initWordSearch() {
    wsFoundWords = []; wsScore = 0; selectedCellsWS = [];
    document.getElementById('ws-score').innerText = wsScore;
    document.getElementById('ws-found-count').innerText = "0";

    wsMatrix = Array(wsGridSize).fill(null).map(() => Array(wsGridSize).fill('-'));

    WS_WORDS.forEach(word => {
        let placed = false; let attempts = 0;
        while(!placed && attempts < 200) {
            let dirX = Math.floor(Math.random() * 3) - 1;
            let dirY = Math.floor(Math.random() * 3) - 1;
            if(dirX === 0 && dirY === 0) dirY = 1;

            let startX = Math.floor(Math.random() * wsGridSize);
            let startY = Math.floor(Math.random() * wsGridSize);

            let endX = startX + dirX * (word.length - 1);
            let endY = startY + dirY * (word.length - 1);

            if(endX >= 0 && endX < wsGridSize && endY >= 0 && endY < wsGridSize) {
                let colision = false;
                for(let i=0; i<word.length; i++) {
                    let currX = startX + dirX * i;
                    let currY = startY + dirY * i;
                    if(wsMatrix[currY][currX] !== '-' && wsMatrix[currY][currX] !== word[i]) {
                        colision = true; break;
                    }
                }
                if(!colision) {
                    for(let i=0; i<word.length; i++) {
                        wsMatrix[startY + dirY * i][startX + dirX * i] = word[i];
                    }
                    placed = true;
                }
            }
            attempts++;
        }
    });

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let r=0; r<wsGridSize; r++){
        for(let c=0; c<wsGridSize; c++){
            if(wsMatrix[r][c] === '-') {
                wsMatrix[r][c] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }
    renderWordSearchUI();
}

function renderWordSearchUI() {
    const board = document.getElementById('wordsearch-board');
    board.innerHTML = '';
    for(let r=0; r<wsGridSize; r++){
        for(let c=0; c<wsGridSize; c++){
            const cell = document.createElement('div');
            cell.classList.add('ws-cell');
            cell.innerText = wsMatrix[r][c];
            
            cell.addEventListener('mousedown', startWSSelection);
            cell.addEventListener('mouseenter', enterWSCell);
            cell.addEventListener('mouseup', endWSSelection);
            board.appendChild(cell);
        }
    }

    const listContainer = document.getElementById('wordsearch-list-container');
    listContainer.innerHTML = '';
    WS_WORDS.forEach(w => {
        const item = document.createElement('div');
        item.classList.add('word-item');
        item.id = `ws-list-${w}`;
        item.innerText = w;
        listContainer.appendChild(item);
    });
}

function startWSSelection() { isSelectingWS = true; selectedCellsWS = [this]; this.classList.add('ws-selected'); }
function enterWSCell() { if(isSelectingWS && !selectedCellsWS.includes(this)) { selectedCellsWS.push(this); this.classList.add('ws-selected'); } }
function endWSSelection() {
    if(!isSelectingWS) return;
    isSelectingWS = false;

    let wordBuilt = selectedCellsWS.map(c => c.innerText).join('');
    let wordReversed = wordBuilt.split('').reverse().join('');
    let finalMatch = "";

    if(WS_WORDS.includes(wordBuilt) && !wsFoundWords.includes(wordBuilt)) finalMatch = wordBuilt;
    else if(WS_WORDS.includes(wordReversed) && !wsFoundWords.includes(wordReversed)) finalMatch = wordReversed;

    if(finalMatch !== "") {
        wsFoundWords.push(finalMatch);
        wsScore += 40;
        document.getElementById('ws-score').innerText = wsScore;
        document.getElementById('ws-found-count').innerText = wsFoundWords.length;
        document.getElementById(`ws-list-${finalMatch}`).classList.add('found');
        selectedCellsWS.forEach(c => { c.classList.remove('ws-selected'); c.classList.add('ws-found'); });
    } else {
        selectedCellsWS.forEach(c => c.classList.remove('ws-selected'));
    }
    selectedCellsWS = [];
}

/* JUEGO 3: AHORCADO SISTÉMICO */
const HANGMAN_POOL = [
    { w: "BERTALANFFY", p: "Apellido del biólogo fundador de la Teoría General de Sistemas." },
    { w: "HOMEOSTASIS", p: "Mecanismo que mantiene el equilibrio dinámico interno del sistema." },
    { w: "CIBERNETICA", p: "Ciencia que estudia los flujos de control y comunicación mediante feedback." },
    { w: "REDUCCIONISMO", p: "Enfoque analítico que fragmenta un fenómeno en partes separadas." },
    { w: "EMERGENCIA", p: "Surgimiento espontáneo de propiedades globales complejas." }
];
let hangCurrentIdx = 0; let hangWord = ""; let hangHint = "";
let hangGuessedLetters = []; let hangLives = 6; let hangScore = 0;

function initHangmanGame() {
    hangWord = HANGMAN_POOL[hangCurrentIdx].w;
    hangHint = HANGMAN_POOL[hangCurrentIdx].p;
    hangGuessedLetters = []; hangLives = 6;
    document.getElementById('hang-lives').innerText = hangLives;
    document.getElementById('hang-hint-area').innerText = `Pista: ${hangHint}`;
    document.getElementById('hang-score').innerText = hangScore;

    const parts = ["hang-head", "hang-body", "hang-larm", "hang-rarm", "hang-lleg", "hang-rleg"];
    parts.forEach(id => document.getElementById(id).style.display = 'none');

    renderHangmanWordDisplay();
    renderHangmanKeyboard();
}

function renderHangmanWordDisplay() {
    const display = document.getElementById('hangman-word-display');
    display.innerHTML = '';
    hangWord.split('').forEach(l => {
        display.innerHTML += hangGuessedLetters.includes(l) ? `${l} ` : `_ `;
    });
}

function renderHangmanKeyboard() {
    const kb = document.getElementById('hangman-keyboard');
    kb.innerHTML = '';
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(l => {
        const btn = document.createElement('button');
        btn.classList.add('key-btn');
        btn.innerText = l;
        btn.addEventListener('click', () => checkHangmanLetter(l, btn));
        kb.appendChild(btn);
    });
}

function checkHangmanLetter(letter, btn) {
    btn.disabled = true;
    if(hangWord.includes(letter)) {
        hangGuessedLetters.push(letter);
        renderHangmanWordDisplay();
        if(hangWord.split('').every(l => hangGuessedLetters.includes(l))) {
            hangScore += 100;
            hangCurrentIdx = (hangCurrentIdx + 1) % HANGMAN_POOL.length;
            alert("¡Excelente! Concepto identificado.");
            initHangmanGame();
        }
    } else {
        hangLives--;
        document.getElementById('hang-lives').innerText = hangLives;
        const parts = ["hang-head", "hang-body", "hang-larm", "hang-rarm", "hang-lleg", "hang-rleg"];
        let partToShow = parts[6 - hangLives - 1];
        if(partToShow) document.getElementById(partToShow).style.display = 'block';
        
        if(hangLives === 0) {
            alert(`Intentos agotados. La palabra era: ${hangWord}`);
            hangCurrentIdx = 0; hangScore = 0; initHangmanGame();
        }
    }
}

/* ==========================================================================
   COMPONENTE DE EVALUACIÓN FINAL (20 PREGUNTAS ESTRUCTURADAS)
   ========================================================================== */
const QUIZ_QUESTIONS = [
    { type: "single", q: "¿Quién formuló la Teoría General de Sistemas en el siglo XX?", o: ["Norbert Wiener", "Ludwig von Bertalanffy", "Edgar Morin", "Peter Checkland"], a: 1 },
    { type: "single", q: "¿Qué enfoque sostiene que 'el todo es más que la suma de sus partes'?", o: ["Enfoque Reduccionista", "Enfoque Cibernético", "Enfoque Holístico", "Enfoque Lineal"], a: 2 },
    { type: "tf", q: "El enfoque reduccionista busca dividir los fenómenos para estudiar sus elementos de forma aislada.", a: true },
    { type: "single", q: "El concepto de 'Homeostasis' se refiere a:", o: ["La tendencia natural al desorden", "El mantenimiento de un equilibrio dinámico interno", "La descomposición atómica de un elemento", "La comunicación externa unidireccional"], a: 1 },
    { type: "single", q: "¿Qué pensador es considerado el padre de la Cibernética?", o: ["Russell Ackoff", "Edgar Morin", "Norbert Wiener", "Karl Marx"], a: 2 },
    { type: "tf", q: "La retroalimentación negativa tiende a romper el equilibrio del sistema.", a: false },
    { type: "single", q: "La propiedad por la cual aparecen nuevas características en los macro-niveles de un sistema es:", o: ["Entropía", "Emergencia", "Sinergia Negativa", "Reducción"], a: 1 },
    { type: "single", q: "¿Qué autor propuso la Metodología de Sistemas Blandos (SSM)?", o: ["Jay Forrester", "Peter Checkland", "Donella Meadows", "Ludwig von Bertalanffy"], a: 1 },
    { type: "tf", q: "El enfoque de complejidad plantea la coexistencia entre el orden y el desorden.", a: true },
    { type: "single", q: "La tendencia inevitable de los sistemas cerrados hacia el caos y el desgaste es:", o: ["Homeostasis", "Sinergia", "Entropía", "Equifinalidad"], a: 2 },
    { type: "single", q: "El enfoque interdisciplinario se caracteriza por:", o: ["Evitar la combinación de saberes", "Cruzar fronteras disciplinares para construir un lenguaje y herramientas comunes", "Focalizarse en una sola especialidad", "Reemplazar los sistemas por herramientas informáticas"], a: 1 },
    { type: "tf", q: "Un sistema abierto intercambia activamente materia, energía e información con su entorno.", a: true },
    { type: "single", q: "La propiedad de alcanzar el mismo estado final a partir de condiciones iniciales distintas se llama:", o: ["Equifinalidad", "Multifinalidad", "Homeostasis", "Autoorganización"], a: 0 },
    { type: "tf", q: "Edgar Morin es un referente principal en el estudio del Pensamiento Complejo.", a: true },
    { type: "single", q: "¿Qué enfoque es el más óptimo para estudiar elementos químicos aislados de un material?", o: ["Enfoque de Complejidad", "Enfoque Reduccionista", "Enfoque Holístico", "Enfoque Cibernético"], a: 1 },
    { type: "single", q: "La retroalimentación positiva tiene la función operativa de:", o: ["Estabilizar el sistema", "Provocar cambios drásticos o crecimiento exponencial", "Ocultar la información externa", "Disminuir el consumo energético"], a: 1 },
    { type: "tf", q: "Russell Ackoff aplicó el pensamiento sistémico a la gestión y la administración empresarial.", a: true },
    { type: "single", q: "Los sistemas que configuran su propia estructura de forma autónoma son:", o: ["Mecanicistas", "Autoorganizados", "Lineales", "Puramente cerrados"], a: 1 },
    { type: "tf", q: "Donella Meadows aplicó modelos sistémicos avanzados al análisis de límites de crecimiento globales.", a: true },
    { type: "single", q: "La Teoría General de Sistemas se considera una meta-teoría porque:", o: ["No se puede aplicar a la realidad", "Es un modelo aplicable a diferentes disciplinas de manera transversal", "Se enfoca solo en la informática", "Es una teoría de alcance exclusivamente biológico"], a: 1 }
];

let quizCurrentIdx = 0; let userAnswers = Array(20).fill(null);

function renderQuiz() {
    const container = document.getElementById('quiz-cards-container');
    container.innerHTML = '';

    QUIZ_QUESTIONS.forEach((q, idx) => {
        const card = document.createElement('div');
        card.classList.add('quiz-card');
        if(idx === 0) card.classList.add('active-question');
        card.id = `q-card-${idx}`;

        let optionsHTML = '';
        if(q.type === 'single') {
            q.o.forEach((opt, oIdx) => {
                let selClass = userAnswers[idx] === oIdx ? 'selected' : '';
                optionsHTML += `<div class="option-item ${selClass}" onclick="selectQuizOption(${idx}, ${oIdx})">
                    <i class="fa-regular ${userAnswers[idx] === oIdx ? 'fa-circle-dot':'fa-circle'}"></i> ${opt}
                </div>`;
            });
        } else if(q.type === 'tf') {
            let selTrue = userAnswers[idx] === true ? 'selected' : '';
            let selFalse = userAnswers[idx] === false ? 'selected' : '';
            optionsHTML += `
                <div class="option-item ${selTrue}" onclick="selectQuizOption(${idx}, true)">Verdadero</div>
                <div class="option-item ${selFalse}" onclick="selectQuizOption(${idx}, false)">Falso</div>
            `;
        }

        card.innerHTML = `
            <h3 style="font-size:1rem; color:var(--text-muted); margin-bottom:0.5rem;">Pregunta ${idx+1} de 20</h3>
            <p style="font-size:1.1rem; font-weight:600; margin-bottom:1.5rem;">${q.q}</p>
            <div class="options-list">${optionsHTML}</div>
        `;
        container.appendChild(card);
    });
    updateQuizProgress();
}

function selectQuizOption(qIdx, val) { userAnswers[qIdx] = val; renderQuiz(); }

function changeQuestion(dir) {
    if(dir === 1 && quizCurrentIdx === QUIZ_QUESTIONS.length - 1) {
        evaluateFinalQuizResult(); return;
    }

    document.getElementById(`q-card-${quizCurrentIdx}`).classList.remove('active-question');
    quizCurrentIdx += dir;
    document.getElementById(`q-card-${quizCurrentIdx}`).classList.add('active-question');

    document.getElementById('quiz-prev-btn').disabled = (quizCurrentIdx === 0);
    document.getElementById('quiz-next-btn').innerHTML = (quizCurrentIdx === QUIZ_QUESTIONS.length - 1) ? 
        `Finalizar y Evaluar <i class="fa-solid fa-square-poll-vertical"></i>` : `Siguiente Pregunta <i class="fa-solid fa-chevron-right"></i>`;
    
    updateQuizProgress();
}

function updateQuizProgress() {
    let pct = ((quizCurrentIdx + 1) / QUIZ_QUESTIONS.length) * 100;
    document.getElementById('quiz-progress').style.width = `${pct}%`;
}

function evaluateFinalQuizResult() {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
        if(userAnswers[idx] === q.a) correctCount++;
    });

    let scorePct = (correctCount / QUIZ_QUESTIONS.length) * 100;
    document.getElementById('quiz-cards-container').style.display = 'none';
    document.getElementById('quiz-navigation-footer').style.display = 'none';
    
    const resultsBox = document.getElementById('quiz-results');
    resultsBox.style.display = 'block';
    document.getElementById('quiz-score-text').innerText = `Usted obtuvo ${correctCount} de 20 aciertos posibles (${scorePct}%)`;

    let feedback = scorePct >= 80 ? "Nivel Avanzado Sobresaliente. Dominio sistémico impecable." :
                   scorePct >= 60 ? "Aprobado. Se aconseja revisar los apartados analíticos y cibernéticos." : 
                                    "Calificación Insuficiente. Repase los contenidos multimedia y vuelva a intentarlo.";
    document.getElementById('quiz-performance-feedback').innerText = feedback;
}

function restartQuiz() {
    quizCurrentIdx = 0; userAnswers = Array(20).fill(null);
    document.getElementById('quiz-cards-container').style.display = 'block';
    document.getElementById('quiz-navigation-footer').style.display = 'flex';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-prev-btn').disabled = true;
    document.getElementById('quiz-next-btn').innerHTML = `Siguiente Pregunta <i class="fa-solid fa-chevron-right"></i>`;
    renderQuiz();
}

// Inicialización Automática al cargar la ventana
window.onload = function() {
    renderQuiz();
};