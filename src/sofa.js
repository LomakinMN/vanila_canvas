import { ctx } from "./index.js";

let sofa = null;
const sofaImage = new Image();
sofaImage.src = "../images/sofa.png";

const snapDistance = 20; // Расстояние притяжения к стенам

// Размещение дивана в комнате
export function placeSofa(cordX, cordY, roomPoints) {
  sofa = {
    x: cordX - 50,
    y: cordY - 25,
    width: 100, // Ширина дивана
    height: 50, // Высота дивана
    angle: 0, // Угол поворота дивана
  };
  snapSofaToWall(roomPoints);
  drawSofa();
}

// Рисование дивана
export function drawSofa() {
  if (!sofa) return;
  ctx.save();
  ctx.translate(sofa.x + sofa.width / 2, sofa.y + sofa.height / 2);
  ctx.rotate(sofa.angle);
  ctx.drawImage(
    sofaImage,
    -sofa.width / 2,
    -sofa.height / 2,
    sofa.width,
    sofa.height
  );
  ctx.restore();
}

// Прилипание дивана к стене в случае близости его центра к стене менее чем на snapDistance
export function snapSofaToWall(roomPoints) {
  if (!sofa) return;

  for (let i = 0; i < roomPoints.length; i++) {
    const start = roomPoints[i];
    const end = roomPoints[(i + 1) % roomPoints.length];
    const distance = pointToSegmentDistance(
      { x: sofa.x + sofa.width / 2, y: sofa.y + sofa.height / 2 },
      start,
      end
    );

    if (distance < snapDistance) {
      // Вычисление угла стены и поворот дивана на такой же угол
      const wallAngle = Math.atan2(end.y - start.y, end.x - start.x);
      sofa.angle = wallAngle;

      // Перемещение дивана к стене по проекции его центра
      const projection = projectPointOntoSegment(
        { x: sofa.x + sofa.width / 2, y: sofa.y + sofa.height / 2 },
        start,
        end
      );

      sofa.x =
        projection.x - sofa.width / 2 - (sofa.height / 2) * Math.sin(wallAngle);

      sofa.y =
        projection.y -
        sofa.height / 2 +
        (sofa.height / 2) * Math.cos(wallAngle);
    }
  }
}

// Вычисление расстояния от точки до отрезка
function pointToSegmentDistance(point, segmentStart, segmentEnd) {
  const dx = segmentEnd.x - segmentStart.x;
  const dy = segmentEnd.y - segmentStart.y;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared === 0) {
    return Math.hypot(point.x - segmentStart.x, point.y - segmentStart.y);
  }

  let t =
    ((point.x - segmentStart.x) * dx + (point.y - segmentStart.y) * dy) /
    lengthSquared;
  t = Math.max(0, Math.min(1, t));

  const projection = {
    x: segmentStart.x + t * dx,
    y: segmentStart.y + t * dy,
  };

  return Math.hypot(point.x - projection.x, point.y - projection.y);
}

// Проецирование точки на отрезок
function projectPointOntoSegment(point, segmentStart, segmentEnd) {
  const dx = segmentEnd.x - segmentStart.x;
  const dy = segmentEnd.y - segmentStart.y;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared === 0) {
    return { x: segmentStart.x, y: segmentStart.y };
  }

  let t =
    ((point.x - segmentStart.x) * dx + (point.y - segmentStart.y) * dy) /
    lengthSquared;
  t = Math.max(0, Math.min(1, t));

  return {
    x: segmentStart.x + t * dx,
    y: segmentStart.y + t * dy,
  };
}
