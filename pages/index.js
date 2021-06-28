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
    dimensions: [24, 24],
    bleed: 1,
    orientation: "landscape",
  };

  const sketch = () => {
    let seed = Math.random();

    return ({
      context,
      width,
      height,
      bleed,
      trimWidth,
      trimHeight,
      exporting,
    }) => {
      random.setSeed(seed);

      const { background, palette } = randomPalette();

      const ringCount = random.rangeFloor(6, palette.length);
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      if (!exporting && bleed > 0) {
        context.strokeStyle = "red";
        context.lineWidth = 0.0075;
        context.strokeRect(bleed, bleed, trimWidth, trimHeight);
      }

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
        drawRing(index * 1.3);
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
