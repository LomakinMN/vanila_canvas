import { placeSofa } from "./sofa.js";

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");

let isDrawing = false; // Флаг, указывающий, что включен режим рисования
let isPlacing = false; // Флаг, указывающий, что включен режим размещения дивана
let points = []; // Массив фиксированных точек
let cursorPoint = null; // Текущая точка, следующая за курсором

// Обработка кнопки "Начать"
startButton.addEventListener("click", () => {
  isDrawing = true;
  points = [];
  cursorPoint = null;
  clearCanvas();
});

// Обработка движения мыши
canvas.addEventListener("mousemove", (e) => {
  const { offsetX, offsetY } = e;
  cursorPoint = { x: offsetX, y: offsetY };

  if (isDrawing) {
    const snapDistance = 8;
    points.forEach((p) => {
      const a = Math.abs(p.y - offsetY) < snapDistance;
      const b = Math.abs(p.x - offsetX) < snapDistance;
      if (a && b) {
        cursorPoint.y = p.y;
        cursorPoint.x = p.x;
      } else if (a) {
        cursorPoint.y = p.y;
      } else if (b) {
        cursorPoint.x = p.x;
      }
    });
    drawCanvas();
    if (points.length > 0) {
      drawLine(
        points[points.length - 1].x,
        points[points.length - 1].y,
        cursorPoint.x,
        cursorPoint.y
      );
    }
  } else if (isPlacing) {
    drawRoom();
    placeSofa(cursorPoint.x, cursorPoint.y, points);
  } else {
    return;
  }
});

canvas.addEventListener("click", (e) => {
  if (isDrawing) {
    points.push(cursorPoint);
    drawCanvas();
    if (
      points.length > 3 &&
      points[points.length - 1].x === points[0].x &&
      points[points.length - 1].y === points[0].y
    ) {
      isDrawing = false;
      isPlacing = true;
    }
  } else if (isPlacing) {
    drawRoom();
    placeSofa(cursorPoint.x, cursorPoint.y, points);
    isPlacing = false;
  } else {
    return;
  }
});

// Очищение canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Отрисовка точки
function drawPoint(x, y, color = "green") {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x - 3, y - 3, 7, 7);
  ctx.fill();
}

// Отрисовка линии
function drawLine(x1, y1, x2, y2, color = "black") {
  if (!x1 || !y1) return;
  if (x1 === x2 && y1 === y2) return;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Отрисовка canvas
function drawCanvas() {
  clearCanvas();
  points.forEach((point) => drawPoint(point.x, point.y, "green"));

  for (let i = 0; i < points.length - 1; i++) {
    drawLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }

  // Отрисовка "предварительной" точки, если она есть
  if (cursorPoint) {
    drawPoint(cursorPoint.x, cursorPoint.y, "green");
  }
}

// Отрисовка комнаты
function drawRoom() {
  clearCanvas();
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = "#fff";
  ctx.fill();
}
