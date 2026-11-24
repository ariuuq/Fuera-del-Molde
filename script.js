
/* =========================================
   FUERA DEL MOLDE — FUNCIONES GENERALES
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  menuToggle.textContent = mainNav.classList.contains("open") ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

/* =========================================
   PESTAÑAS DE EXPLORACIÓN
========================================= */

const exploreTabs = document.querySelectorAll(".explore-tab");
const explorePanels = document.querySelectorAll(".explore-panel");

exploreTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    exploreTabs.forEach(item => item.classList.remove("active"));
    explorePanels.forEach(panel => panel.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(`tab-${target}`).classList.add("active");
  });
});

/* =========================================
   QUIZ DE DERECHOS
========================================= */

const questions = [
  {
    question: "¿Qué significa que los derechos humanos sean universales?",
    options: [
      "Que solo se aplican en algunos países.",
      "Que pertenecen a todas las personas.",
      "Que dependen de la edad y la popularidad."
    ],
    answer: 1,
    explanation: "¡Exacto! Son universales porque corresponden a todas las personas, sin distinción. No necesitas cumplir una condición para tener dignidad y derechos."
  },
  {
    question: "Una estudiante es excluida de un grupo por su apariencia. ¿Qué problema se presenta?",
    options: [
      "Una forma de discriminación y exclusión.",
      "Una decisión que nunca afecta derechos.",
      "Una simple diferencia de gustos."
    ],
    answer: 0,
    explanation: "Excluir a alguien por su apariencia puede constituir discriminación. Las diferencias personales no justifican un trato que humille o limite la participación."
  },
  {
    question: "¿Qué reconoce la Convención sobre los Derechos del Niño?",
    options: [
      "Que solo los adultos pueden opinar.",
      "Que los adolescentes no tienen derechos propios.",
      "Que niñas, niños y adolescentes tienen derechos y deben ser escuchados."
    ],
    answer: 2,
    explanation: "La Convención reconoce a las personas menores de 18 años como titulares de derechos, incluido el derecho a expresar su opinión en asuntos que les afectan."
  },
  {
    question: "¿Cuál es un ejemplo de igualdad de oportunidades?",
    options: [
      "Permitir que solo los estudiantes populares lideren.",
      "Asegurar que todos puedan participar sin barreras injustas.",
      "Asignar actividades según estereotipos."
    ],
    answer: 1,
    explanation: "La igualdad de oportunidades busca que todas las personas puedan participar y desarrollar sus capacidades, sin obstáculos discriminatorios."
  },
  {
    question: "¿Qué deberías hacer si presencias una situación de acoso escolar?",
    options: [
      "Compartirla en redes para que todos se enteren.",
      "Ignorarla siempre.",
      "Buscar apoyo de una persona adulta de confianza y comunicar lo ocurrido."
    ],
    answer: 2,
    explanation: "Pedir ayuda es una acción responsable. No tienes que resolver una situación de violencia por tu cuenta ni exponerte a un riesgo."
  },
  {
    question: "¿Por qué es importante la participación adolescente?",
    options: [
      "Porque permite expresar opiniones e influir en decisiones que les afectan.",
      "Porque todas las opiniones deben ser idénticas.",
      "Porque elimina la necesidad de escuchar a otras personas."
    ],
    answer: 0,
    explanation: "Participar permite que las decisiones consideren las experiencias y necesidades de los adolescentes. Escuchar distintas voces mejora la convivencia."
  }
];

let currentQuestion = 0;
let quizScore = 0;
let answered = false;

const quizCounter = document.getElementById("quizCounter");
const quizProgress = document.getElementById("quizProgress");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizNext = document.getElementById("quizNext");

function renderQuestion() {
  const question = questions[currentQuestion];
  answered = false;

  quizCounter.textContent =
    `PREGUNTA ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

  quizProgress.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  quizQuestion.textContent = question.question;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizNext.disabled = true;
  quizNext.textContent = "Siguiente pregunta →";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => selectAnswer(index));

    quizOptions.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const options = [...quizOptions.children];

  options.forEach((button, i) => {
    button.disabled = true;

    if (i === question.answer) {
      button.classList.add("correct");
    }

    if (i === index && i !== question.answer) {
      button.classList.add("wrong");
    }
  });

  if (index === question.answer) {
    quizScore++;
    quizFeedback.textContent = "✓ ¡Correcto! " + question.explanation;
  } else {
    quizFeedback.textContent = "No exactamente. " + question.explanation;
  }

  quizNext.disabled = false;

  if (currentQuestion === questions.length - 1) {
    quizNext.textContent = "Ver resultado →";
  }
}

quizNext.addEventListener("click", () => {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showQuizResult();
  }
});

function showQuizResult() {
  quizProgress.style.width = "100%";
  quizCounter.textContent = "QUIZ COMPLETADO";
  quizQuestion.textContent = `¡Terminaste! ${quizScore} de ${questions.length} respuestas correctas.`;

  quizOptions.innerHTML = "";
  quizFeedback.textContent =
    quizScore === questions.length
      ? "¡Excelente! Reconoces muy bien los principios fundamentales de los derechos."
      : "Cada respuesta es una oportunidad para aprender. Puedes volver a intentarlo y revisar las explicaciones.";

  quizNext.disabled = false;
  quizNext.textContent = "Volver a comenzar ↻";

  quizNext.onclick = () => {
    currentQuestion = 0;
    quizScore = 0;
    quizNext.onclick = null;
    renderQuestion();
  };
}

renderQuestion();

/* =========================================
   VIDEOJUEGO: PROGRESO Y MISIONES
========================================= */

const missions = [
  {
    title: "El precio de encajar",
    label: "MISIÓN 01 · EXCLUSIÓN Y RESPETO",
    story: "En tu salón están organizando una actividad. Un grupo decide que una compañera no debería participar porque, según ellos, no tiene la apariencia adecuada para representar al curso. Algunas personas se ríen. Otras prefieren no intervenir. ¿Qué harías?",
    choices: [
      {
        text: "A. No intervenir. Si nadie dice nada, probablemente no sea tan importante.",
        feedback: "El silencio puede hacer que la exclusión continúe. No eres responsable de las decisiones de los demás, pero sí puedes buscar una forma segura de no normalizar el trato injusto.",
        xp: 15
      },
      {
        text: "B. Burlarte también para evitar quedar fuera del grupo.",
        feedback: "Adaptarse a la presión del grupo puede reforzar el problema. La aceptación no debería depender de participar en una humillación.",
        xp: 5
      },
      {
        text: "C. Señalar que la apariencia no debería determinar quién puede participar y proponer criterios justos.",
        feedback: "Buena decisión. Cuestionas el prejuicio y propones una alternativa concreta. También puedes apoyar a la compañera y buscar ayuda si la exclusión continúa.",
        xp: 30
      }
    ]
  },
  {
    title: "Lo que no se cuenta",
    label: "MISIÓN 02 · INVESTIGACIÓN Y PERSPECTIVA",
    story: "Un estudiante deja de participar en clase y suele quedarse solo. En un chat circula el rumor de que es antipático y que no quiere relacionarse con nadie. Sin embargo, una compañera cuenta que últimamente recibe comentarios ofensivos y que lo han excluido de varios grupos. ¿Qué conclusión es más responsable?",
    choices: [
      {
        text: "A. Creer el rumor porque muchas personas lo están repitiendo.",
        feedback: "Que una afirmación se repita no la convierte en verdadera. Los rumores pueden ocultar situaciones de exclusión y aumentar el daño.",
        xp: 5
      },
      {
        text: "B. Escuchar con respeto, no difundir rumores y buscar apoyo para conocer la situación.",
        feedback: "Correcto. Escuchar distintas perspectivas, evitar conclusiones apresuradas y buscar apoyo permite responder con mayor responsabilidad.",
        xp: 30
      },
      {
        text: "C. Publicar el caso en redes para obligar a todos a hablar del tema.",
        feedback: "Difundir una situación personal sin permiso puede vulnerar la privacidad. Es mejor buscar apoyo por canales adecuados y proteger a la persona afectada.",
        xp: 15
      }
    ]
  },
  {
    title: "Cambiar las reglas",
    label: "MISIÓN 03 · PARTICIPACIÓN Y SOLUCIONES",
    story: "En tu institución, las decisiones sobre actividades estudiantiles suelen tomarlas siempre las mismas personas. Muchos estudiantes sienten que sus propuestas nunca son escuchadas. Quieres cambiar esta situación. ¿Qué plan tendría mayor impacto?",
    choices: [
      {
        text: "A. Organizar una actividad donde se escuchen propuestas de distintos grados y se establezcan acuerdos para evaluarlas.",
        feedback: "¡Muy bien! Creas un espacio de participación, recoges distintas perspectivas y estableces un proceso para que las ideas puedan convertirse en acciones.",
        xp: 30
      },
      {
        text: "B. Elegir a un grupo pequeño para que decida por todos sin consultar.",
        feedback: "Cambiar quién decide no garantiza una participación más justa. Es importante que las personas afectadas tengan oportunidades reales de expresar sus opiniones.",
        xp: 10
      },
      {
        text: "C. Hacer una campaña con frases motivadoras, pero sin proponer acciones concretas.",
        feedback: "La sensibilización puede ayudar, pero necesita acompañarse de mecanismos para escuchar propuestas, tomar decisiones y evaluar resultados.",
        xp: 15
      }
    ]
  }
];

let completedMissions = [];
let totalXP = 0;
let activeMission = null;
let selectedChoice = null;

const playerLevel = document.getElementById("playerLevel");
const xpValue = document.getElementById("xpValue");
const xpBar = document.getElementById("xpBar");
const missionCount = document.getElementById("missionCount");
const gameStatus = document.getElementById("gameStatus");
const gameModal = document.getElementById("gameModal");
const closeGame = document.getElementById("closeGame");
const missionLabel = document.getElementById("missionLabel");
const missionTitle = document.getElementById("missionTitle");
const missionStory = document.getElementById("missionStory");
const missionChoices = document.getElementById("missionChoices");
const missionFeedback = document.getElementById("missionFeedback");
const missionContinue = document.getElementById("missionContinue");
const gameEnding = document.getElementById("gameEnding");

function updateGameProgress() {
  playerLevel.textContent = String(
    Math.min(3, Math.floor(totalXP / 30) + 1)
  ).padStart(2, "0");

  xpValue.textContent = `${totalXP} XP`;
  xpBar.style.width = `${Math.min(100, (totalXP / 90) * 100)}%`;

  missionCount.textContent = `${completedMissions.length} / 3`;

  gameStatus.textContent =
    completedMissions.length === 3
      ? "TODAS LAS MISIONES COMPLETADAS"
      : `MISIÓN ${String(completedMissions.length + 1).padStart(2, "0")} DISPONIBLE`;

  document.querySelectorAll(".mission-card").forEach((card, index) => {
    const done = completedMissions.includes(index);
    const locked = index > completedMissions.length && !done;

    card.disabled = locked || done;

    if (done) {
      card.querySelector("b").textContent = "COMPLETADA ✓";
    } else if (locked) {
      card.querySelector("b").textContent = "BLOQUEADA";
    } else {
      card.querySelector("b").textContent = "INICIAR ↗";
    }
  });
}

function openMission(index) {
  if (completedMissions.includes(index)) return;
  if (index > completedMissions.length) return;

  activeMission = index;
  selectedChoice = null;

  const mission = missions[index];

  missionLabel.textContent = mission.label;
  missionTitle.textContent = mission.title;
  missionStory.textContent = mission.story;
  missionChoices.innerHTML = "";
  missionFeedback.textContent = "";
  missionContinue.disabled = true;

  mission.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.className = "mission-choice";
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      chooseMissionOption(choiceIndex);
    });

    missionChoices.appendChild(button);
  });

  gameModal.classList.add("show");
  gameModal.setAttribute("aria-hidden", "false");
}

function chooseMissionOption(choiceIndex) {
  if (selectedChoice !== null) return;

  selectedChoice = choiceIndex;

  const mission = missions[activeMission];
  const choice = mission.choices[choiceIndex];

  [...missionChoices.children].forEach((button, index) => {
    button.disabled = true;

    if (index === choiceIndex) {
      button.classList.add("selected");
    }
  });

  missionFeedback.textContent = choice.feedback;
  missionContinue.disabled = false;
  missionContinue.textContent = "Completar misión →";
}

document.querySelectorAll("[data-mission]").forEach(button => {
  button.addEventListener("click", () => {
    openMission(Number(button.dataset.mission));
  });
});

missionContinue.addEventListener("click", () => {
  if (activeMission === null || selectedChoice === null) return;

  const choice = missions[activeMission].choices[selectedChoice];

  totalXP += choice.xp;
  completedMissions.push(activeMission);

  updateGameProgress();

  gameModal.classList.remove("show");
  gameModal.setAttribute("aria-hidden", "true");

  activeMission = null;
  selectedChoice = null;

  if (completedMissions.length === missions.length) {
    showGameEnding();
  }
});

function showGameEnding() {
  gameEnding.classList.add("show");
  document.getElementById("finalScore").textContent = `${totalXP} XP`;

  gameEnding.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

closeGame.addEventListener("click", () => {
  gameModal.classList.remove("show");
  gameModal.setAttribute("aria-hidden", "true");
});

gameModal.addEventListener("click", event => {
  if (event.target === gameModal) {
    gameModal.classList.remove("show");
    gameModal.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    gameModal.classList.remove("show");
    gameModal.setAttribute("aria-hidden", "true");
  }
});

document.getElementById("restartGame").addEventListener("click", () => {
  completedMissions = [];
  totalXP = 0;
  activeMission = null;
  selectedChoice = null;

  gameEnding.classList.remove("show");
  updateGameProgress();

  document.getElementById("juego").scrollIntoView({
    behavior: "smooth"
  });
});

updateGameProgress();

/* =========================================
   ANIMACIÓN SUAVE AL APARECER LAS SECCIONES
========================================= */

const revealElements = document.querySelectorAll(
  ".right-card, .stat-card, .issue-item, .school-card, .glossary-grid article"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}
