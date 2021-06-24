import { useEffect, useRef } from 'react';

import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import { lerp } from 'canvas-sketch-util/math';

// Parameters for this artwork
const settings = {
  // Choose a paper size
  dimensions: 'A4',
  // Artwork Orientation
  orientation: 'portrait',
  // Print-ready size
  pixelsPerInch: 300,
  // You can work in 'cm', 'in' or 'px'
  units: 'cm',
};

// The sketch function defines the artwork
const sketch = () => {
  // Pad the edges of the artwork
  console.log('evaluating sketch()');
  const margin = 2;
  random.setSeed(Math.random());

  // Produce some randomly sized and placed points
  const pointCount = 100;
  const points = Array.from(new Array(pointCount)).map(() => {
    return {
      position: [random.value(), random.value()],
      size: Math.abs(random.gaussian()),
    };
  });

  // Return a renderer function for your artwork
  return ({ context, width, height }) => {
    console.log('evaluating render()');

    // Fill canvas with a background color
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);

    // All units are in 'cm'
    context.lineWidth = 0.1;

    // Draw each point
    points.forEach(({ position, size }) => {
      const radius = size * width * 0.01;
      const [u, v] = position;

      // Apply margin to UV coordinates
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // Draw our shapes
      context.fillStyle = 'hsl(0, 0%, 15%)';
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.stroke();
    });
  };
};

export default function Home() {
  const ref = useRef(null);
  useEffect(() => {
    let timer = setInterval(
      () => canvasSketch(sketch, { ...settings, canvas: ref.current }),
      5000
    );
    return () => clearInterval(timer);
  });

  return (
    <div className="flex h-screen	w-screen content-center items-center">
      <div
        className="w-[40rem] md:w-[56rem] border-r-2 h-full"
      >
        Editor
      </div>
      <div className="flex-grow	flex w-full h-full content-center items-center">
        <canvas className="margin block shadow mx-auto" ref={ref}></canvas>
      </div>
    </div>
  );
}
