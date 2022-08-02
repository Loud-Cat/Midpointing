
var pointOne, pointTwo, pointThree, go, notice;
var points = null; var mids = null;

function setup() {
  let s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  angleMode(DEGREES);
  rectMode(CENTER);

  pointOne = createInput();
  pointTwo = createInput();
  pointThree = createInput();
  go = createButton("GO");
  go.style("height", "30px");
  go.style("width", "10%");
  go.mousePressed(processPoints);
  
  createElement("br");
  createP("Enter the midpoints as 'x y' and calculate the vertices.");

  notice = createP("Results will appear here.");
}

function draw() {
  background(50);

  if (points != null) {
    let xmin = min( ...points.map(a => a[0]) );
    let xmax = max( ...points.map(a => a[0]) );

    let ymin = min( ...points.map(a => a[1]) );
    let ymax = max( ...points.map(a => a[1]) );

    stroke(255);
    strokeWeight(6);
    fill(0);
    beginShape();
    for (let p of points) {
      let x = map(p[0], xmin, xmax, 25, width - 25);
      let y = map(p[1], ymin, ymax, height - 25, 25);
      vertex(x, y);
    }
    endShape(CLOSE);

    stroke(255, 200, 0);
    strokeWeight(16);
    noFill();

    for (let p of mids) {
      let x = map(p[0], xmin, xmax, 25, width - 25);
      let y = map(p[1], ymin, ymax, height - 25, 25);
      point(x, y);
    }
  }

}

function processPoints() {
  let [mx1, my1] = nums(pointOne);
  let [mx2, my2] = nums(pointTwo);
  let [mx3, my3] = nums(pointThree);
  // M = ( (x1 + x2)/2, (y1 + y2)/2 )

  // 2(x1 + x2 + x3) = 2(mx1 + mx2 + mx3)
  // x1 + x2 + x3 = mx1 + mx2 + mx3

  let sum = mx1 + mx2 + mx3;
  // x1 + (2 * mx1) = sum
  let x1 = sum - (2 * mx1);

  // mx2 + (2 * mx2) = sum
  let x2 = sum - (2 * mx2);

  // (2 * mx3) + x3 = sun
  let x3 = sum - (2 * mx3);

  sum = my1 + my2 + my3
  // y1 + (2 * my1) = sum
  let y1 = sum - (2 * my1);

  // my2 + (2 * my2) = sum
  let y2 = sum - (2 * my2);

  // (2 * my3) + y3 = sum
  let y3 = sum - (2 * my3);
  
  mids = [
    [mx1, my1],
    [mx2, my2],
    [mx3, my3]
  ];
  
  points = [
    [x1, y1],
    [x2, y2],
    [x3, y3]
  ];
  
  notice.html( "Vertices: " + points. join("\t") );
}

function nums(p) {
  return p.value().split(" ").map(Number);
}
