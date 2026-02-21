const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
const respuestaTxt = document.getElementById('respuesta-pro');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.7;

// Esto asegura que detecte el toque tanto en PC como en Celular
document.addEventListener('click', () => {
    mostrarSorpresa();
});

// Opcional: También para pantallas táctiles específicamente
document.addEventListener('touchstart', () => {
    mostrarSorpresa();
});

const frases = [
    "🔥 Un beso largo que nos deje sin aliento...",
    "😏 Uno de esos que terminan en la cama.",
    "🫦 Morderte el labio hasta que pidas más.",
    "❤️ Las dos cosas: Besarte lento y hacerte el amor.",
    "🥵 Un beso mojado y travieso...",
    "✨ Que me hagas lo que quieras, tú mandas hoy."
];

function drawTree(startX, startY, len, angle, branchWidth) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "#4a2c2a";
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len < 10) {
        ctx.fillStyle = "#ff4d6d";
        ctx.font = "15px Arial";
        ctx.fillText("❤️", 0, -len);
        ctx.restore();
        return;
    }

    drawTree(0, -len, len * 0.8, angle - 15, branchWidth * 0.7);
    drawTree(0, -len, len * 0.8, angle + 15, branchWidth * 0.7);
    ctx.restore();
}

// Función para cuando ella toque el árbol
function mostrarSorpresa() {
    // Cambiar frase aleatoria
    const randomFrase = frases[Math.floor(Math.random() * frases.length)];
    respuestaTxt.innerText = randomFrase;
    respuestaTxt.style.background = "#d63384";

    // Crear lluvia de corazones
    for(let i=0; i<10; i++) {
        crearPetalo();
    }
}

function crearPetalo() {
    const p = document.createElement('div');
    p.innerHTML = "❤️";
    p.className = 'heart-petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = Math.random() * 20 + 10 + 'px';
    p.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 5000);
}

drawTree(canvas.width / 2, canvas.height, 100, 0, 8);