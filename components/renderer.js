import { Component, useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';

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

  useEffect(() => {
    let func = async () => {
      let two = 2;
      try {
        const result = (1, eval)(
          `function Render() {` +
            program +
            `\nconsole.log(two); return {sketch, settings}; }; Render()`
        );
        const { settings, sketch } = result;
        await canvasSketch(sketch, { ...settings, canvas: ref.current });
      } catch (error) {
        console.error(error);
      }
    };
    func();
  }, [program]);

  return <canvas className="margin block shadow mx-auto" ref={ref}></canvas>;
};

export default function Runner({ program }) {
  return (
    <ErrorBoundary>
      <Renderer program={program}></Renderer>
    </ErrorBoundary>
  );
}
