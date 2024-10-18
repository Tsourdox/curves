let prevMouseIsPressed = false;
let points = [];
let selectedIndex;
let rotation = Math.PI;
let drawCurveToCursor = true;

function keyPressed() {
  if (key === " ") {
    drawCurveToCursor = !drawCurveToCursor;
  }

  if (key === "Backspace") {
    points.pop();
    points.pop();
    points.pop();
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 10);
}

function update() {
  if (keyIsPressed) {
    if (key === "q") {
      rotation -= 5 / frameRate();
    }
    if (key === "e") {
      rotation += 5 / frameRate();
    }
  }

  if (selectedIndex !== undefined) {
    const prevIndex = (selectedIndex - 1 + points.length) % points.length;
    const nextIndex = (selectedIndex + 1) % points.length;
    const deltaPrevX = points[prevIndex].x - points[selectedIndex].x;
    const deltaPrevY = points[prevIndex].y - points[selectedIndex].y;
    const deltaNextX = points[nextIndex].x - points[selectedIndex].x;
    const deltaNextY = points[nextIndex].y - points[selectedIndex].y;

    points[selectedIndex] = createVector(mouseX, mouseY);

    if (selectedIndex % 3 === 1) {
      points[prevIndex].x = mouseX + deltaPrevX;
      points[prevIndex].y = mouseY + deltaPrevY;
      points[nextIndex].x = mouseX + deltaNextX;
      points[nextIndex].y = mouseY + deltaNextY;
    }
  }

  if (mouseIsPressed && !prevMouseIsPressed) {
    // Pressed
    selectedIndex = findPointUnderMouse();
    if (drawCurveToCursor && !selectedIndex) {
      points.push(...getMousePoint());
    }
  } else if (!mouseIsPressed && prevMouseIsPressed) {
    // Released
    selectedIndex = undefined;
  }

  prevMouseIsPressed = mouseIsPressed;
}

function findPointUnderMouse() {
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    const dx = mouseX - x;
    const dy = mouseY - y;

    const distance = Math.pow(dx, 2) + Math.pow(dy, 2);
    if (distance < Math.pow(10, 2)) {
      return i;
    }
  }
}

function draw() {
  update();
  clear();
  drawCurve(points);
  drawPoints(points);
}

function getMousePoint() {
  const origin = createVector(mouseX, mouseY);
  const c1 = p5.Vector.add(
    origin,
    createVector(100 * cos(rotation), 100 * sin(rotation))
  );
  const c2 = p5.Vector.add(
    origin,
    createVector(-100 * cos(rotation), -100 * sin(rotation))
  );
  return [c1, origin, c2];
}

function drawCurve(points) {
  if (!points.length) return;
  drawCurveToCursor ? noFill() : fill("pink");
  stroke("red");
  strokeWeight(4);
  beginShape();
  vertex(points[1].x, points[1].y);
  const lastPoints = drawCurveToCursor ? 3 : 0;
  for (let i = 2; i < points.length - lastPoints; i += 3) {
    const a2 = points[i];
    const a3 = points[(i + 1) % points.length];
    const a4 = points[(i + 2) % points.length];
    bezierVertex(a2.x, a2.y, a3.x, a3.y, a4.x, a4.y);
  }

  // Draw curve to mouse position
  if (drawCurveToCursor) {
    const [c1, o] = getMousePoint();
    const pcp = points[points.length - 1];
    bezierVertex(pcp.x, pcp.y, c1.x, c1.y, o.x, o.y);
  }
  endShape();
}

function drawPoints(points) {
  const hsl = (i) => `hsl(${20 + i * 10}, 100%, 70%)`;

  for (let i = 0; i < points.length; i += 3) {
    const c1 = points[(i + points.length) % points.length];
    const o = points[(i + 1) % points.length];
    const c2 = points[(i + 2) % points.length];
    drawBezierPoint(c1, o, c2, hsl(i / 3));
  }

  // Draw curve to mouse position
  if (drawCurveToCursor) {
    const [c1, o, c2] = getMousePoint();
    drawBezierPoint(c1, o, c2, hsl(points.length / 3));
  }
}
function drawBezierPoint(c1, o, c2, color) {
  strokeWeight(30);
  stroke("black");
  point(o.x, o.y);

  strokeWeight(20);
  stroke(color);
  point(o.x, o.y);
  point(c1.x, c1.y);
  point(c2.x, c2.y);

  strokeWeight(2);
  line(o.x, o.y, c1.x, c1.y);
  line(o.x, o.y, c2.x, c2.y);
}
