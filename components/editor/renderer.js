import { useEffect, useRef } from "react";
import canvasSketch from "canvas-sketch";
import * as rnd from "canvas-sketch-util/random";
import * as mth from "canvas-sketch-util/math";
import { randomPalette } from "lib/palette";

const Renderer = ({ program, seed, shouldRefresh, onRefresh }) => {
  const ref = useRef(null);

  const clearCanvas = () => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const refresh = async () => {
    try {
      clearCanvas();
      let { settings, sketch } = new Function(
        `return (seed, random, math, randomPalette) => {` +
          program +
          `\n return {sketch, settings}; };`
      )()(seed, rnd, mth, randomPalette);
      await canvasSketch(sketch, { ...settings, canvas: ref.current });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => refresh(), []);

  useEffect(() => {
    if (shouldRefresh) {
      refresh();
      onRefresh();
    }
  }, [shouldRefresh]);

  return (
    <canvas id="sketch" className="margin block shadow" ref={ref}></canvas>
  );
};

export default Renderer;
