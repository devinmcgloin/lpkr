const VariableEditor = ({ name, min, max, editing, onChange }) => {
  return editing ? (
    <div></div>
  ) : (
    <button
      onClick={() => onChange({ editing: true })}
      className="ml-2 mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {name}
      <span className="ml-1 text-sm text-gray-400">
        ({min}, {max})
      </span>
    </button>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import ReactDOM from "react-dom";

const Breakout = React.forwardRef(
  ({ visible, styles, attributes, children }, ref) =>
    ReactDOM.createPortal(
      <div
        className="z-50"
        ref={ref}
        style={{ ...styles.popper, display: visible ? "flex" : "none" }}
        {...attributes.popper}
      >
        <div style={styles.offset}>{children}</div>
      </div>,
      document.getElementById("__lpkr_popper")
    )
);

export function Popover({
  Opener,
  children,
  placement = "auto",
  offset = [0, 0],
}) {
  const [visible, setVisible] = useState(false);

  const containerRef = useRef();
  const referenceRef = useRef();
  const popperRef = useRef();

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: placement,
      strategy: "absolute",
      modifiers: [
        {
          name: "offset",
          enabled: !!offset,
          options: {
            offset: offset,
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 8,
          },
        },
      ],
    }
  );

  let handleClick = (event) => {
    if (!popperRef.current) return;
    var isClickInsidePortal = popperRef.current.contains(event.target);
    var isClickInsideOpener = containerRef.current.contains(event.target);

    if (!isClickInsidePortal && !isClickInsideOpener) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div>
      <div ref={containerRef} onClick={() => setVisible(true)}>
        <Opener ref={referenceRef} visible={visible} />
      </div>
      <Breakout
        ref={popperRef}
        visible={visible}
        styles={styles}
        attributes={attributes}
      >
        {children({ closeModal: () => setVisible(false) })}
      </Breakout>
    </div>
  );
}

export default VariableEditor;
