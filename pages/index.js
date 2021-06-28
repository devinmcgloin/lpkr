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
    // Parameters for this artwork
    const settings = {
      dimensions: 'a4',
      pixelsPerInch: 300,
      units: 'in'
    };

    // Artwork function
    const sketch = () => {
      return ({ context, width, height }) => {
        // Margin in inches
        const margin = 1 / 4;

        // Off-white background
        context.fillStyle = 'hsl(0, 0%, 98%)';
        context.fillRect(0, 0, width, height);

        // Gradient foreground
        const fill = context.createLinearGradient(0, 0, width, height);
        fill.addColorStop(0, 'cyan');
        fill.addColorStop(1, 'orange');

        // Fill rectangle
        context.fillStyle = fill;
        context.fillRect(margin, margin, width - margin * 2, height - margin * 2);
      };
    };`);

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
