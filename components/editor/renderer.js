import { useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import * as rnd from 'canvas-sketch-util/random';
import * as mth from 'canvas-sketch-util/math';
import * as geo from 'canvas-sketch-util/geometry';
import { randomPalette } from 'lib/palette';
import PoissonDiskSampling from 'poisson-disk-sampling';

const Renderer = ({
  index,
  program,
  variables,
  settings,
  seed,
  shouldRefresh,
  onRefresh,
}) => {
  const ref = useRef(null);
  const [topVars, setTopVars] = useState({});

  const clearCanvas = () => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const fullProgram = (program) =>
    `return (seed, variables, random, math, geometry, randomPalette, poisson) => {
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
        const w = (x) => width * x;
        const h = (y) => height * y;
    ` +
    program +
    `}}
    return sketch;
  };`;

  const generateVariables = (variables) => {
    let vars = {};
    variables.forEach((element) => {
      if (element.linearInterpolate) {
        vars[element.name] = mth.lerp(
          (1, eval)(`(${element.min})`),
          (1, eval)(`(${element.max})`),
          index / 11
        );
      } else {
        vars[element.name] = rnd.range(
          (1, eval)(`(${element.min})`),
          (1, eval)(`(${element.max})`)
        );
      }
    });
    return vars;
  };

  const refresh = async () => {
    try {
      clearCanvas();
      rnd.setSeed(seed);
      rnd.permuteNoise();
      let evalVariables = generateVariables(variables);
      setTopVars(evalVariables);

      let sketch = new Function(fullProgram(program))()(
        seed,
        evalVariables,
        rnd,
        mth,
        geo,
        randomPalette,
        PoissonDiskSampling
      );
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
    <div className="flex flex-col items-center justify-around">
      <canvas id="sketch" className="margin block shadow" ref={ref}></canvas>
      <div className="mt-1 mx-auto text-center">
        <ul className=" text-sm text-gray-500">
          {Object.entries(topVars).map(([key, val]) => (
            <li key={key}>
              {key.toLocaleString()}: {val.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Renderer;
