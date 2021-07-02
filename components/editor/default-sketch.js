const defaultSketch = `const p2c = (r, theta) => [r * Math.cos(theta), r * Math.sin(theta), 0];
const { background, palette } = randomPalette();

const ringCount = palette.length;

context.fillStyle = background;
context.fillRect(0, 0, width, height);

context.translate(width / 2, height / 2);

let points = [];

for (let index = 0; index < 2 * Math.PI; index += Math.PI / 1000)
  points.push(p2c(h(0.2), index));

for (var index = ringCount; index > 0; index -= 1) {
  context.fillStyle = palette[index];
  context.strokeStyle = palette[index];
  context.lineWidth = 2;

  context.beginPath();
  points.forEach((point, index) => {
    let offset = random.noise2D(point[0], point[1], variables.scale, variables.flow);
    const xDelta = Math.sin(offset) * variables.stepSize,
      yDelta = Math.cos(offset) * variables.stepSize;
    context.lineTo(point[0] + xDelta, point[1] + yDelta);
    points[index] = [point[0] + xDelta, point[1] + yDelta];
  });
  context.stroke();
}
`;
export default defaultSketch;
