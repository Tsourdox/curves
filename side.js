let curve = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  const start = createVector(50, 50);
  const end = createVector(400, 260);
  curve = createCurve(start, end);
}

function draw() {
  clear();
  drawCurve();
  drawPoints();
}

function drawPoints() {
  stroke("black");
  strokeWeight(16);
  for (const vertex of curve) {
    point(vertex.x, vertex.y);
  }
}

function drawCurve() {
  stroke("red");
  strokeWeight(3);
  beginShape();
  vertex(curve[0].x, curve[0].y);
  for (let i = 1; i < curve.length; i += 3) {
    const a2 = curve[i];
    const a3 = curve[(i + 1) % curve.length];
    const a4 = curve[(i + 2) % curve.length];
    bezierVertex(a2.x, a2.y, a3.x, a3.y, a4.x, a4.y);
  }
  endShape();
}

function angleBetween(v0, v1) {
  const dx = v1.x - v0.x;
  const dy = v1.y - v0.y;
  return Math.atan2(dy, dx);
}

function createCurve(v0, v1) {
  const distance = dist(v0.x, v0.y, v1.x, v1.y);
  const angle = angleBetween(v0, v1);

  const mid = createVector(lerp(v0.x, v1.x, 0.5), lerp(v0.y, v1.y, 0.5));

  // Bay or headland?
  const direction = random() > 0.5 ? 1 : -1;

  const farAngle = angle - Math.PI * 0.5 * direction;
  const far = createVector(
    mid.x + Math.cos(farAngle) * distance * 0.3,
    mid.y + Math.sin(farAngle) * distance * 0.3
  );
  const farBezier = createBezierPoint(far, angle + Math.PI, distance * 0.15);

  const b1Angle = farAngle - Math.PI * 0.4 * direction;
  const b1 = createVector(
    mid.x + Math.cos(b1Angle) * distance * 0.1,
    mid.y + Math.sin(b1Angle) * distance * 0.1
  );
  const bezier1 = createBezierPoint(
    b1,
    angle + Math.PI * 0.3 * direction,
    distance * 0.15
  );

  const b2Angle = farAngle + Math.PI * 0.4 * direction;
  const b2 = createVector(
    mid.x + Math.cos(b2Angle) * distance * 0.1,
    mid.y + Math.sin(b2Angle) * distance * 0.1
  );
  const bezier2 = createBezierPoint(
    b2,
    angle - Math.PI * 0.3 * direction,
    distance * 0.15
  );

  const c0 = createVector(lerp(v0.x, v1.x, 0.2), lerp(v0.y, v1.y, 0.2));
  const c1 = createVector(lerp(v0.x, v1.x, 0.8), lerp(v0.y, v1.y, 0.8));

  return [v0, c0, ...bezier1, ...farBezier, ...bezier2, c1, v1];
}

function createBezierPoint(origin, rotation, magnitude) {
  const c1 = createVector(
    origin.x + magnitude * cos(rotation),
    origin.y + magnitude * sin(rotation)
  );
  const c2 = createVector(
    origin.x - magnitude * cos(rotation),
    origin.y - magnitude * sin(rotation)
  );
  return [c1, origin, c2];
}
