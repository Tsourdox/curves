function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 10);
}

function draw() {
  clear();
  const s1 =  createVector(200, 200);
  
  const a2 =  createVector(290, 180);
  const a3 =  createVector(680, 250);
  const a4 =  createVector(800, 230);

  const b2 =  createVector(700, 400);
  const b3 =  createVector(800, 600);
  const b4 =  createVector(800, 800);
  
  const c2 =  createVector(700, 800);
  const c3 =  createVector(300, 700);
  const c4 =  createVector(200, 750);
  
  const d2 =  createVector(200, 600);
  const d3 =  createVector(170, 300);
  const d4 =  createVector(200, 200);

  fill('pink');
  stroke('red');
  strokeWeight(4);

  beginShape();
  vertex(s1.x, s1.y);
  bezierVertex(a2.x, a2.y, a3.x, a3.y, a4.x, a4.y);
  bezierVertex(b2.x, b2.y, b3.x, b3.y, b4.x, b4.y);
  bezierVertex(c2.x, c2.y, c3.x, c3.y, c4.x, c4.y);
  bezierVertex(d2.x, d2.y, d3.x, d3.y, d4.x, d4.y);
  endShape(CLOSE);
  
  strokeWeight(30);
  stroke('black');
  point(s1.x, s1.y);
  
  strokeWeight(20);
  stroke('purple');
  point(a2.x, a2.y);
  point(a3.x, a3.y);
  point(a4.x, a4.y);
  
  stroke('green');
  point(b2.x, b2.y);
  point(b3.x, b3.y);
  point(b4.x, b4.y);
  
  stroke('blue');
  point(c2.x, c2.y);
  point(c3.x, c3.y);
  point(c4.x, c4.y);
  
  stroke('orange');
  point(d2.x, d2.y);
  point(d3.x, d3.y);
  point(d4.x, d4.y);
}
