import React, { useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import ReactDOM from "react-dom";
import { WithoutSSR } from "lib/ssr";
import { TrashIcon } from "@heroicons/react/solid";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const VariableEditor = ({
  name,
  min,
  max,
  uniformSample,
  onChange,
  onRemove,
}) => {
  return (
    <WithoutSSR>
      <Popover
        Opener={React.forwardRef((props, ref) => (
          <button
            {...props}
            ref={ref}
            className={`relative ml-2 mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
              !!name
                ? "text-gray-700 bg-white"
                : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
            } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {!!name ? (
              <>
                <span>{name}</span>
                <span className="ml-1 text-sm text-gray-400">
                  ({min}, {max})
                </span>
              </>
            ) : (
              <>Undefined</>
            )}
          </button>
        ))}
      >
        {() => (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 space-y-4 w-[400px]">
              <div>
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="line_angle"
                    onChange={(e) => onChange({ name: e.target.value })}
                    value={name || ""}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500" id="name-description">
                  You can reference the name in code directly.
                </p>
              </div>
              <div>
                <label
                  htmlFor="min"
                  className="block text-sm font-medium text-gray-700"
                >
                  Minimum
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="min"
                    id="min"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                    onChange={(e) => onChange({ min: e.target.value })}
                    value={min || ""}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500" id="min-description">
                  We'll evaluate this expression at runtime.
                </p>
              </div>
              <div>
                <label
                  htmlFor="max"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="max"
                    id="max"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="8 * Math.PI"
                    onChange={(e) => onChange({ max: e.target.value })}
                    value={max || ""}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500" id="max-description">
                  We'll evaluate this expression at runtime.
                </p>
              </div>
              <Switch.Group
                as="div"
                className="flex items-center justify-between"
              >
                <span className="flex-grow flex flex-col">
                  <Switch.Label
                    as="span"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Unfiform Sample
                  </Switch.Label>
                  <Switch.Description
                    as="span"
                    className="text-sm text-gray-500"
                  >
                    Select samples at 1/12 stops in the range.
                  </Switch.Description>
                </span>
                <Switch
                  checked={uniformSample}
                  onChange={() => onChange({ uniformSample: !uniformSample })}
                  className={classNames(
                    uniformSample ? "bg-indigo-600" : "bg-gray-200",
                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      uniformSample ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>

              <button
                onClick={onRemove}
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon
                  className="mr-2 -ml-0.5 h-4 w-4"
                  aria-hidden="true"
                />
                Remove Variable
              </button>
            </div>
          </div>
        )}
      </Popover>
    </WithoutSSR>
  );
};

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
