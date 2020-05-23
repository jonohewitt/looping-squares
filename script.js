const container = document.querySelector("section");

const params = {
  width: 500,
  height: 500
};

const two = new Two(params);
two.appendTo(container);

// config
const loopDuration = 60 * 4;
const numberOfShapes = 40;
const shapeIncr = 20;
const aDelay = 1 / 120;
const shapes = [];

// make shapes
for (let i = 0; i < numberOfShapes; i++) {
  const size = (numberOfShapes - i) * shapeIncr;
  const shape = two.makeRectangle(
    params.width / 2,
    params.height / 2,
    size,
    size
  );
  if (i % 2 == 0) {
    shape.fill = "#f9d2cd";
  } else {
    shape.fill = "#f55745";
  }
  shape.noStroke();
  shapes.push(shape);
}
// draw
two.bind("update", function(frameCount) {

  const currentFrame = frameCount % loopDuration;
  const t = currentFrame / loopDuration;

  shapes.forEach((shape, i) => {
    const aStart = aDelay * (numberOfShapes - i);
    const aEnd = aDelay * i;
    const u = mapAndClamp(t, aStart, 1 - aEnd, 0, 1);
    shape.rotation = easeInOutCubic(u) * Math.PI;
  });
});

two.play();
