import { useReducer, useState } from "react";
import Renderer from "components/editor/renderer";
import dynamic from "next/dynamic";
import defaultSketch from "./default-sketch";
import {
  PlayIcon,
  LockOpenIcon,
  LockClosedIcon,
  DownloadIcon,
  ViewBoardsIcon,
} from "@heroicons/react/solid";
import useLocalStorage from "hooks/local-storage";

const EditorWithoutSSR = dynamic(() => import("components/editor/editor"), {
  ssr: false,
});

const ConsoleWithoutSSR = dynamic(() => import("components/editor/console"), {
  ssr: false,
});

const settingsReducer = (state, action) => {
  return { ...state, [action.type]: action.value };
};

export default function Editor() {
  const [program, setProgram] = useLocalStorage(
    "sketch-program",
    defaultSketch
  );
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [logs, setLogs] = useState([]);
  const [seeds, setSeeds] = useState([Math.random()]);
  const [fixedSeed, setFixedSeed] = useState(false);
  const [multiEditorCount, setMultiEditorCount] = useState(1);
  const [settings, dispatchSettings] = useReducer(settingsReducer, {
    dimensions: [1000, 1000],
    pixelsPerInch: 300,
  });

  const multiMode = multiEditorCount > 1;

  const download = () => {
    var canvases = document.getElementsByTagName("canvas");
    let seedIndex = 0;
    for (let index = 0; index < canvases.length; index++) {
      let canvas = canvases[index];
      if (canvas.id != "sketch") continue;

      var image = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      link.download = `${seeds[seedIndex]}.png`;
      link.href = image;
      link.click();
      seedIndex += 1;
    }
  };

  return (
    <div className="flex h-screen w-screen border-t overscroll-none overflow-y-hidden">
      <div className="flex flex-none flex-col w-[40rem] h-full border-r-2 bg-white">
        <div className="min-h-[3.5rem] border-b flex items-center justify-between px-2">
          <button
            onClick={() => {
              if (!shouldRefresh) {
                setLogs([]);
                setShouldRefresh(true);
                if (!fixedSeed)
                  setSeeds(
                    Array.from(Array(multiEditorCount)).map(() => Math.random())
                  );
              }
            }}
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlayIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Run
          </button>
          <div className="flex items-center px-2 space-x-2">
            {!multiMode && (
              <button
                onClick={() => download()}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <DownloadIcon className="m-0.5  h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              onClick={() => {
                let count = multiMode ? 1 : 12;
                setMultiEditorCount(count);
                setSeeds(Array.from(Array(count)).map(() => Math.random()));
                dispatchSettings({
                  type: "dimensions",
                  value: multiMode ? [1000, 1000] : [300, 300],
                });
              }}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ViewBoardsIcon className="m-0.5  h-4 w-4" aria-hidden="true" />
            </button>
          </div>
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
                {!multiMode ? seeds[0] : "All Seeds Locked"}
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
        <ConsoleWithoutSSR height={"h-32"} logs={logs} setLogs={setLogs} />
      </div>
      {!multiMode ? (
        <div className="flex w-full h-full items-center justify-around bg-[#FAF9F6] ">
          <Renderer
            settings={settings}
            seed={seeds[0]}
            program={program}
            shouldRefresh={shouldRefresh}
            onRefresh={() => setShouldRefresh(false)}
          />
        </div>
      ) : (
        <div className="h-full w-full grid bg-[#FAF9F6] overflow-x-auto">
          <div className="grid grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 w-full gap-7 p-7">
            {Array.from(Array(multiEditorCount)).map((id, index) => (
              <Renderer
                settings={settings}
                key={index}
                seed={seeds[index]}
                program={program}
                shouldRefresh={shouldRefresh}
                onRefresh={() => setShouldRefresh(false)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
