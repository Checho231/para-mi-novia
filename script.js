const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

function drawTree(startX, startY, len, angle, branchWidth) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "#4a2c2a"; // Color del tronco
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len < 10) {
        // Dibujar corazones en las puntas
        drawHeart(0, -len);
        ctx.restore();
        return;
    }

    drawTree(0, -len, len * 0.75, angle - 15, branchWidth * 0.7);
    drawTree(0, -len, len * 0.75, angle + 15, branchWidth * 0.7);

    ctx.restore();
}

function drawHeart(x, y) {
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - 3, x - 5, y - 3, x - 5, y);
    ctx.bezierCurveTo(x - 5, y + 3, x, y + 5, x, y + 7);
    ctx.bezierCurveTo(x, y + 5, x + 5, y + 3, x + 5, y);
    ctx.bezierCurveTo(x + 5, y - 3, x, y - 3, x, y);
    ctx.fill();
}

// Iniciar animación
setTimeout(() => {
    drawTree(canvas.width / 2, canvas.height, 120, 0, 10);
}, 500);