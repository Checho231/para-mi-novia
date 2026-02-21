const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
const display = document.getElementById('display-message');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const respuestas = {
    beso: "Llegando te voy a dar uno que te haga olvidar hasta tu nombre... 💋",
    mordida: "Cuidado que muerdo fuerte y no suelto fácil... 🫦",
    todo: "Preparada? Porque hoy no dormimos, hoy nos devoramos. 🔥",
    sorpresa: "Esa te la doy en persona, pero lleva ropa que se pueda quitar rápido... 😏"
};

function accion(tipo) {
    // Mostrar mensaje con efecto
    display.classList.remove('hidden');
    display.innerText = respuestas[tipo];
    
    // Sonido de beso (Opcional si tienes el link)
    new Audio('https://www.myinstants.com/media/sounds/kiss.mp3').play().catch(() => {});

    // Explosión de corazones
    for(let i=0; i<15; i++) {
        crearParticula();
    }
}

function crearParticula() {
    const p = document.createElement('div');
    p.innerHTML = "❤️";
    p.className = 'particle';
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    p.style.setProperty('--x', `${x}px`);
    p.style.setProperty('--y', `${y}px`);
    p.style.left = '50%';
    p.style.top = '50%';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
}

// Dibujamos el árbol de fondo (más sutil)
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

    if (len < 15) {
        ctx.fillStyle = "#ff4d6d";
        ctx.fillText("🌸", 0, -len);
        ctx.restore();
        return;
    }

    drawTree(0, -len, len * 0.75, angle - 20, branchWidth * 0.7);
    drawTree(0, -len, len * 0.75, angle + 20, branchWidth * 0.7);
    ctx.restore();
}

drawTree(canvas.width / 2, canvas.height - 20, 80, 0, 5);