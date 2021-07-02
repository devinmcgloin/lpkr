import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

export default function HelpModal({ open, setOpen }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-gray-50 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-gray-50 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div>
                <div className="mx-auto flex items-center justify-center w-20 h-20 shadow-lg rounded-lg">
                  <svg
                    width="806"
                    height="805"
                    viewBox="0 0 806 805"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="805" height="805" rx="120" fill="white" />
                    <path
                      d="M279.227 492.545H255.091V702H279.227V492.545ZM323.435 760.909H347.571V677.864H349.616C354.935 686.455 365.162 705.273 395.435 705.273C434.707 705.273 462.116 673.773 462.116 623.864C462.116 574.364 434.707 542.864 395.026 542.864C364.344 542.864 354.935 561.682 349.616 569.864H346.753V544.909H323.435V760.909ZM347.162 623.455C347.162 588.273 362.707 564.545 392.162 564.545C422.844 564.545 437.98 590.318 437.98 623.455C437.98 657 422.435 683.591 392.162 683.591C363.116 683.591 347.162 659.045 347.162 623.455ZM498.935 702H523.071V643.193L539.946 627.545L598.753 702H629.435L558.151 612L624.526 544.909H594.662L525.935 614.864H523.071V492.545H498.935V702ZM655.591 702H679.727V602.591C679.727 581.318 696.5 565.773 719.409 565.773C725.852 565.773 732.5 567 734.136 567.409V542.864C731.375 542.659 725.034 542.455 721.455 542.455C702.636 542.455 686.273 553.091 680.545 568.636H678.909V544.909H655.591V702Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h1"
                    className="text-xl leading-6 font-medium text-gray-900"
                  >
                    Get your ideas out faster
                  </Dialog.Title>
                  <div className="mt-2 prose prose-sm text-left">
                    <p>
                      lpkr is a generative art tool to help you tune your
                      programs to your preferences. It's designed to help you
                      get a better sense of the range of possible outputs, so
                      your programs can generate consistently good results.
                    </p>

                    <h4>Using lpkr</h4>
                    <p>
                      lpkr is based on{" "}
                      <a
                        href="https://github.com/mattdesl/canvas-sketch"
                        target="_blank"
                      >
                        canvas-sketch
                      </a>
                      , and you'll have access to its <code>random</code>,{" "}
                      <code>geometry</code>, and <code>math</code> libraries.
                      The context provided is a standard{" "}
                      <a
                        target="_blank"
                        href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"
                      >
                        2D Rendering Canvas
                      </a>{" "}
                      object.
                    </p>
                    <p className="diagonal-fractions">
                      You can populate variables by clicking the{" "}
                      <PlusCircleIcon className="w-4 h-4 align-middle inline" />{" "}
                      button. Any parameters can be complex expressions and will
                      be evaluated. You can optionally lock a variable into a
                      linear interpolation at 1/12 increments.
                    </p>

                    <p>
                      You can install this app as a PWA, and your most recent
                      sketch is saved to local storage. We're thinking about
                      better ways to checkpoint your sketches, and letting you
                      branch out into new ideas while being able to return to
                      past checkpoints.
                    </p>
                    <p>
                      Made by{" "}
                      <a href="https://twitter.com/devinmcgloin">
                        Devin McGloin
                      </a>
                      , let me know if you bump into any issues or have any
                      feedback!
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
