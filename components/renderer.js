import { Component, useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import * as rnd from 'canvas-sketch-util/random';
import * as mth from 'canvas-sketch-util/math';
import * as clr from 'canvas-sketch-util/color';
import * as gmtry from 'canvas-sketch-util/geometry';
import { randomPalette } from 'lib/palette';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    return this.props.children || null;
  }
}

const Renderer = ({ program }) => {
  const ref = useRef(null);

  const clearCanvas = () => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    let func = async () => {
      let seed = Math.random();

      try {
        clearCanvas();
        let func = new Function(
          `return (canvasSketch, seed, random, math, randomPalette) => {` +
            program +
            `\n canvasSketch(sketch, { ...settings, canvas: document.getElementById("sketch") }) };`
        );
        func()(canvasSketch, seed, rnd, mth, randomPalette);
      } catch (error) {
        console.error(error);
      }
    };
    func();
  }, [program]);

  return (
    <canvas
      id="sketch"
      className="margin block shadow mx-auto my-auto"
      ref={ref}
    ></canvas>
  );
};

export default function Runner({ program }) {
  return (
    <ErrorBoundary>
      <Renderer program={program}></Renderer>
    </ErrorBoundary>
  );
}
