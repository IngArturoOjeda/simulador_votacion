// ════════════════════════════════════════
// COUNTDOWN — 7 de junio de 2026
// ════════════════════════════════════════
const fechaObjetivo = new Date(2026, 5, 7, 0, 0, 0).getTime();

const cuentaRegresiva = setInterval(() => {
    const ahora     = new Date().getTime();
    const distancia = fechaObjetivo - ahora;

    const dias     = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas    = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos  = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText     = dias.toString().padStart(2, "0");
    document.getElementById("horas").innerText    = horas.toString().padStart(2, "0");
    document.getElementById("minutos").innerText  = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").innerText = segundos.toString().padStart(2, "0");

    if (distancia < 0) {
        clearInterval(cuentaRegresiva);
        document.getElementById("contador").innerHTML =
            "<strong style='color:#2e008b;font-size:1.4rem;'>¡ES HOY!</strong>";
    }
}, 1000);


// ════════════════════════════════════════
// SIMULADOR DE VOTO
// ════════════════════════════════════════
const TOTAL_SLIDES = 19;   // slides 0 al 18
const PASOS_VISIBLES = 17; // pasos 1 al 17 (excluye intro y final)
let pasoActual = 0;

function iniciarSimulador() {
    const landing = document.getElementById("landing");
    const sim     = document.getElementById("simulador");

    landing.style.transition = "opacity 0.35s ease";
    landing.style.opacity    = "0";

    setTimeout(() => {
        landing.style.display = "none";
        sim.style.display     = "flex";
        sim.classList.remove("oculto");
        requestAnimationFrame(() => sim.classList.add("entrando"));
        pasoActual = 0;
        mostrarSlide(0);
    }, 350);
}

function siguientePaso() {
    if (pasoActual < TOTAL_SLIDES - 1) {
        pasoActual++;
        mostrarSlide(pasoActual);
    }
}

function anteriorPaso() {
    if (pasoActual > 0) {
        pasoActual--;
        mostrarSlide(pasoActual);
    }
}

function reiniciarSimulador() {
    pasoActual = 0;
    mostrarSlide(0);
    // Scroll al tope del wrapper
    const wrapper = document.getElementById("simSlides");
    if (wrapper) wrapper.scrollTop = 0;
}

function mostrarSlide(indice) {
    const slides  = document.querySelectorAll(".sim-slide");
    const wrapper = document.getElementById("simSlides");

    slides.forEach(s => s.classList.remove("activo"));
    slides[indice].classList.add("activo");

    // Scroll al tope al cambiar de slide
    if (wrapper) wrapper.scrollTop = 0;

    // Barra de progreso
    document.getElementById("progresoFill").style.width =
        ((indice + 1) / TOTAL_SLIDES * 100) + "%";

    // Etiqueta de paso
    const label = document.getElementById("pasoLabel");
    if (indice === 0 || indice === TOTAL_SLIDES - 1) {
        label.style.visibility = "hidden";
    } else {
        label.style.visibility = "visible";
        label.innerText = "PASO " + indice + " / " + PASOS_VISIBLES;
    }

    // Botón volver
    const btnVolver = document.getElementById("btnVolver");
    if (indice === 0 || indice === TOTAL_SLIDES - 1) {
        btnVolver.classList.add("oculto");
    } else {
        btnVolver.classList.remove("oculto");
    }
}
