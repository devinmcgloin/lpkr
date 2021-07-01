const defaultSketch = `const { background, palette } = randomPalette();

context.fillStyle = background;
context.fillRect(0, 0, width, height);

const fill = context.createLinearGradient(0, 0, width, height);
fill.addColorStop(0, random.pick(palette));
fill.addColorStop(1, random.pick(palette));

// Fill rectangle
context.fillStyle = fill;
random.chance()
  ? context.fillRect(bleed, bleed, trimWidth, trimHeight)
  : context.fillRect(0, 0, width, height);

const hatch = () => {
  const lines = geometry.createHatchLines(
    [
      [0, 0],
      [width, height],
    ],
    random.range(1, 2 * Math.PI),
    random.range(20, 200)
  );

  context.strokeStyle = background;
  context.lineWidth = h(0.2) / lines.length;
  lines.forEach((element) => {
    context.beginPath()
    context.moveTo(element[0][0], element[0][1]);
    context.lineTo(element[1][0], element[1][1]);
    context.stroke();
  });
};

for (let i = random.range(1, 3); i > 0; i--) hatch();
`;
export default defaultSketch;
