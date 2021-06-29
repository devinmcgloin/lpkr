import { useState } from "react";
import Renderer from "components/editor/renderer";
import dynamic from "next/dynamic";
import defaultSketch from "./default-sketch";
import {
  PlayIcon,
  LockOpenIcon,
  LockClosedIcon,
  DownloadIcon,
} from "@heroicons/react/solid";

const EditorWithoutSSR = dynamic(() => import("components/editor/editor"), {
  ssr: false,
});

const ConsoleWithoutSSR = dynamic(() => import("components/editor/console"), {
  ssr: false,
});

export default function Editor() {
  const [program, setProgram] = useState(defaultSketch);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [logs, setLogs] = useState([]);
  const [seed, setSeed] = useState(Math.random());
  const [fixedSeed, setFixedSeed] = useState(false);

  const download = () => {
    var canvas = document.getElementById("sketch");

    var image = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = `${seed}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-col w-[40rem] md:w-[56rem] h-full border-r-2">
        <div className="h-14 border-b flex items-center px-2 space-x-2">
          <button
            onClick={() => {
              if (!shouldRefresh) {
                setLogs([]);
                setShouldRefresh(true);
                if (!fixedSeed) setSeed(Math.random());
              }
            }}
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlayIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Run
          </button>
          <button
            onClick={() => download()}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DownloadIcon className="m-0.5  h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-[3.5rem] border-b flex items-center px-2">
          <button
            onClick={() => {
              setFixedSeed((prev) => !prev);
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {fixedSeed ? (
              <>
                <LockClosedIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                {seed}
              </>
            ) : (
              <>
                <LockOpenIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Random Seed
              </>
            )}
          </button>
        </div>

        <EditorWithoutSSR
          height={"flex-1"}
          program={program}
          handleProgramChange={(program) => setProgram(program)}
        />
        <ConsoleWithoutSSR height={"h-64"} logs={logs} setLogs={setLogs} />
      </div>
      <div className="flex w-full h-full items-center justify-around bg-[#FAF9F6]">
        <Renderer
          seed={seed}
          program={program}
          shouldRefresh={shouldRefresh}
          onRefresh={() => setShouldRefresh(false)}
        />
      </div>
    </div>
  );
}
