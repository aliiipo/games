let jugadores = [];
let categoriaSeleccionada = "divertido";

function addPlayer() {
  const input = document.getElementById("playerName");
  const name = input.value.trim();

  if (!name) {
    alert("Por favor, introduce un nombre válido.");
    return;
  }

  if (jugadores.includes(name)) {
    alert("Ese nombre ya está en la lista.");
    return;
  }

  jugadores.push(name);
  input.value = "";
  renderPlayerList();
}

function removePlayer(nombre) {
  jugadores = jugadores.filter(j => j !== nombre);
  renderPlayerList();
}

function renderPlayerList() {
  const lista = document.getElementById("playerList");
  lista.innerHTML = "";

  jugadores.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = nombre;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "✖";
    btnEliminar.onclick = () => removePlayer(nombre);
    btnEliminar.className = "remove";

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

function startGame() {
  if (jugadores.length < 2) {
    alert("Introduce al menos 2 jugadores.");
    return;
  }
  categoriaSeleccionada = document.getElementById("categorySelect").value;
  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";
  nextChallenge();
}

function exitToMenu() {
  document.getElementById("game").style.display = "none";
  document.getElementById("setup").style.display = "block";
}

function nextChallenge() {
  const lista = retos[categoriaSeleccionada];
  const reto = lista[Math.floor(Math.random() * lista.length)];
  const nombres = [...jugadores];

  const reemplazos = {};
  reto.match(/\{jugador\d\}/g)?.forEach((placeholder) => {
    if (!reemplazos[placeholder]) {
      const i = Math.floor(Math.random() * nombres.length);
      reemplazos[placeholder] = nombres.splice(i, 1)[0];
    }
  });

  let textoFinal = reto;
  for (const [placeholder, nombre] of Object.entries(reemplazos)) {
    textoFinal = textoFinal.replaceAll(placeholder, nombre);
  }

  const challengeText = document.getElementById("challengeText");
  challengeText.innerHTML = "";

  // animación explosiva con anime.js sobre el contenedor
  anime({
    targets: "#challengeBox",
    opacity: [0, 1],
    duration: 400,
    easing: "easeInOutQuad"
  });

  // aparición letra por letra
  const spanTexto = textoFinal.split("").map(letra => {
    const span = document.createElement("span");
    span.textContent = letra;
    span.style.opacity = 0;
    challengeText.appendChild(span);
    return span;
  });

  anime({
    targets: spanTexto,
    opacity: [0, 1],
    translateY: [10, 0],
    delay: anime.stagger(30),
    duration: 600,
    easing: "easeOutQuad"
  });

  // cambio dinámico de fondo
  const backgrounds = {
    divertido: "linear-gradient(135deg, #ffeaa7, #fab1a0)",
    picante: "linear-gradient(135deg, #ff7675, #d63031)",
    incómodo: "linear-gradient(135deg, #dfe6e9, #b2bec3)"
  };

  document.body.style.background = backgrounds[categoriaSeleccionada] || "#fff";
  anime({
    targets: "body",
    opacity: [0.9, 1],
    duration: 300,
    easing: "easeInOutQuad"
  });
}
  // Mostrar el logo de introducción y luego revelar la app
  window.addEventListener("load", () => {
    const logo = document.getElementById("intro-logo");
    const container = document.querySelector(".container");

    container.style.opacity = 0;

    setTimeout(() => {
      logo.style.display = "none";
      container.style.opacity = 1;

      anime({
        targets: ".container",
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: "easeOutExpo"
      });
    }, 2500); // sincronizado con fadeOutIntro del CSS
  });
