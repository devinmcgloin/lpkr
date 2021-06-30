import { useEffect, useRef } from "react";
import canvasSketch from "canvas-sketch";
import * as rnd from "canvas-sketch-util/random";
import math, * as mth from "canvas-sketch-util/math";
import * as geo from "canvas-sketch-util/geometry";
import { randomPalette } from "lib/palette";
import PoissonDiskSampling from "poisson-disk-sampling";

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
        `return (seed, random, math, geometry, randomPalette, poisson) => {` +
          program +
          `\n return {sketch, settings}; };`
      )()(seed, rnd, mth, geo, randomPalette, PoissonDiskSampling);
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
    <div>
      <canvas id="sketch" className="margin block shadow" ref={ref}></canvas>
      <div className="mt-5 mx-auto text-center">
        <p className=" text-lg text-gray-500">{seed}</p>
      </div>
    </div>
  );
};

export default Renderer;
