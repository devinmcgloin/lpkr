import { useRef, useState } from 'react';
import Renderer from 'components/renderer';
import dynamic from 'next/dynamic';
const EditorWithoutSSR = dynamic(() => import('components/editor'), {
  ssr: false,
});
const ConsoleWithoutSSR = dynamic(() => import('components/console'), {
  ssr: false,
});

export default function Home() {
  const [program, setProgram] = useState(`
const settings = {
  pixelsPerInch: 300,
  units: "in",
  dimensions: [30, 30],
  bleed: 1,
  orientation: "landscape",
};

const sketch = () => {
  return ({
    context,
    width,
    height,
    bleed,
    trimWidth,
    trimHeight,
    exporting,
  }) => {
    console.log(seed);
    random.setSeed(seed);
    const { background, palette } = randomPalette();

    const flow = random.range(4, 10),
      scale = random.chance(0.8) ? random.range(0.001) : random.range(5, 7),
      sampleSize = random.range(100),
      stepSize = 0.001,
      sideLength = random.range(10, 20);

    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    context.lineWidth = random.value() / 3;

    if (!exporting && bleed > 0) {
      context.strokeStyle = "red";
      context.lineWidth = 0.05;
      context.strokeRect(bleed, bleed, trimWidth, trimHeight);
    }

    context.translate(width / 2, height / 2);

    const stepLine = (startX, startY) => {
      let x = startX,
        y = startY,
        lineLength = random.range(1, 3);
      context.lineWidth = random.range(1 / 16, 1 / 2);

      context.save();
      context.moveTo(x, y);
      context.beginPath();

      for (let j = 0; j < lineLength; j += stepSize) {
        const theta = random.noise2D(x, y, scale, flow);
        const xDelta = Math.sin(theta * 2 * Math.PI) * stepSize,
          yDelta = Math.cos(theta * 2 * Math.PI) * stepSize;
        x = x + xDelta;
        y = y + yDelta;

        context.lineTo(x, y);
      }
      context.stroke();
      context.restore();
    };

    const startEnd = (side) => {
      let offset = sideLength / 2;
      switch (side) {
        case 0:
          return [
            [-1 * offset, -1 * offset],
            [offset, -1 * offset],
          ];
        case 1:
          return [
            [offset, -1 * offset],
            [offset, offset],
          ];
        case 2:
          return [
            [offset, offset],
            [-1 * offset, offset],
          ];
        case 3:
          return [
            [-1 * offset, offset],
            [-1 * offset, -1 * offset],
          ];
      }
    };

    for (let side = 0; side < 4; side++) {
      let [start, end] = startEnd(side);
      console.log(start, end);
      let sideSamples = sampleSize / 4;
      for (var i = 0; i < sideSamples; i++) {
        let offset = i / sideSamples,
          x = math.lerp(start[0], end[0], offset),
          y = math.lerp(start[1], end[1], offset);
        console.log(x, y);
        context.strokeStyle = random.pick(palette);
        context.lineCap = "round";

        stepLine(x, y);
      }
    }
  };
};
`);

  return (
    <div className="flex h-screen	w-screen content-center items-center">
      <div className="w-[40rem] md:w-[56rem] border-r-2 h-screen">
        <div className="flex-grow flex flex-col h-4/5">
          <EditorWithoutSSR
            program={program}
            handleProgramChange={(program) => setProgram(program)}
          />
        </div>
        <ConsoleWithoutSSR height={'h-1/5'} />
      </div>
      <div className="flex-grow	flex w-full h-full content-center items-center">
        <Renderer program={program} />
      </div>
    </div>
  );
}
