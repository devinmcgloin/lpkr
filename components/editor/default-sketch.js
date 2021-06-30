const defaultSketch = `
const { background, palette } = randomPalette();

const ringCount = random.rangeFloor(6, palette.length);
context.fillStyle = background;
context.fillRect(0, 0, width, height);

context.translate(width / 2, height / 2);

const drawRing = (radius) => {
  const wave = () => {
    let amplitude = random.value() / 20,
      frequency = random.value(),
      phase = random.value();
    return (t) => amplitude * Math.sin(2 * Math.PI * frequency * t + phase);
  };
  context.lineWidth = 0.075;

  let waves = [wave(), wave(), wave()];

  context.beginPath();
  for (let i = 0; i <= Math.PI * 2; i += Math.PI / 100000) {
    const x = radius * Math.cos(i);
    const y = radius * Math.sin(i);

    let offset = waves
      .map((wave) => wave(i))
      .reduce((prev, current) => prev + current);

    context.lineTo(x + x * offset, y + x * offset);
  }

  context.closePath();
  context.fill();
};

for (var index = ringCount; index > 0; index -= 1) {
  context.fillStyle = palette[index];
  context.strokeStyle = palette[index];
  drawRing(index * w(0.05));
}
`;
export default defaultSketch;
