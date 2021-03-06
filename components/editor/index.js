import { useReducer, useState } from 'react';
import Renderer from 'components/editor/renderer';
import dynamic from 'next/dynamic';
import defaultSketch from './default-sketch';
import {
  PlayIcon,
  LockOpenIcon,
  LockClosedIcon,
  DownloadIcon,
  ViewBoardsIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid';
import useLocalStorage from 'hooks/local-storage';
import VariableEditor from './variable-manager';
import HelpModal from 'components/editor/help-modal';
import { trackGoal } from 'fathom-client';
import Documentation from 'components/editor/documentation';

const EditorWithoutSSR = dynamic(() => import('components/editor/editor'), {
  ssr: false,
});

const ConsoleWithoutSSR = dynamic(() => import('components/editor/console'), {
  ssr: false,
});

const settingsReducer = (state, action) => {
  return { ...state, [action.type]: action.value };
};

export default function Editor() {
  const [program, setProgram] = useLocalStorage(
    'sketch-program',
    defaultSketch
  );
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [logs, setLogs] = useState([]);
  const [seeds, setSeeds] = useState(
    Array.from(Array(12)).map(() => Math.random())
  );
  const [fixedSeed, setFixedSeed] = useState(false);
  const [multiEditorCount, setMultiEditorCount] = useState(12);
  const [settings, dispatchSettings] = useReducer(settingsReducer, {
    dimensions: [300, 300],
    pixelsPerInch: 300,
  });
  const [variables, setVariables] = useLocalStorage('sketch-variables', [
    { name: 'flow', min: '1', max: '2', linearInterpolate: false },
    { name: 'scale', min: '0', max: '0.01', linearInterpolate: true },
    { name: 'stepSize', min: '5', max: '8' },
  ]);
  const [showHelpModal, setShowHelpModal] = useLocalStorage('help-modal', true);
  const [showDocumentation, setShowDocumentation] = useState(false);

  const handleVariableUpdate = (index) => {
    return (variable) => {
      let newVariables = [...variables];
      newVariables.splice(index, 1, {
        ...newVariables[index],
        ...variable,
      });
      setVariables(newVariables);
    };
  };

  const handleVariableDelete = (index) => {
    return () => {
      let newVariables = [...variables];
      newVariables.splice(index, 1);
      setVariables(newVariables);
    };
  };

  const multiMode = multiEditorCount > 1;

  const download = () => {
    if (multiMode) return;
    var canvases = document.getElementsByTagName('canvas');
    let seedIndex = 0;
    for (let index = 0; index < canvases.length; index++) {
      let canvas = canvases[index];
      if (canvas.id != 'sketch') continue;

      var image = canvas.toDataURL('image/png');
      var link = document.createElement('a');
      link.download = `${seeds[seedIndex]}.png`;
      link.href = image;
      link.click();
      seedIndex += 1;
    }
  };

  return (
    <div className="flex h-screen w-screen border-t overscroll-none overflow-y-hidden">
      <div className="flex flex-none flex-col w-[40rem] h-full border-r-2 bg-white">
        <div className="border-b flex items-center justify-between px-2 py-2">
          <button
            onClick={() => {
              if (!shouldRefresh) {
                trackGoal('GUPSDDRC', 0);
                setLogs([]);
                setShouldRefresh(true);
                if (!fixedSeed)
                  setSeeds(
                    Array.from(Array(multiEditorCount)).map(() => Math.random())
                  );
              }
            }}
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {shouldRefresh ? (
              <>
                <svg
                  className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                <PlayIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              </>
            )}{' '}
            Run
          </button>
          <div className="flex items-center px-2 space-x-2">
            {!multiMode && (
              <button
                onClick={download}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                  type: 'dimensions',
                  value: multiMode ? [1000, 1000] : [300, 300],
                });
              }}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ViewBoardsIcon className="m-0.5 h-4 w-4" aria-hidden="true" />
            </button>

            <button
              onClick={() => {
                setShowDocumentation((prev) => !prev);
              }}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <QuestionMarkCircleIcon
                className="m-0.5 h-4 w-4"
                aria-hidden="true"
              />
            </button>
            <HelpModal open={showHelpModal} setOpen={setShowHelpModal} />
          </div>
        </div>
        <div className="border-b flex items-center flex-wrap pb-2">
          <button
            onClick={() => {
              setFixedSeed((prev) => !prev);
            }}
            type="button"
            className="inline-flex items-center ml-2 mt-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {fixedSeed ? (
              <>
                <LockClosedIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                {!multiMode ? seeds[0] : 'All Seeds Locked'}
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
          {variables.map((variable, index) => (
            <VariableEditor
              {...variable}
              key={index}
              onChange={handleVariableUpdate(index)}
              onRemove={handleVariableDelete(index)}
            />
          ))}
          <button
            onClick={() => {
              setVariables((prev) => [
                ...prev,
                { name: null, min: null, max: null },
              ]);
            }}
            type="button"
            className="ml-2 mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircleIcon className="m-0.5 h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <EditorWithoutSSR
          height={'flex-1'}
          program={program}
          handleProgramChange={(program) => setProgram(program)}
        />
        <ConsoleWithoutSSR height={'h-32'} logs={logs} setLogs={setLogs} />
      </div>
      {!multiMode ? (
        <div className="flex w-full h-full items-center justify-around bg-[#FAF9F6] ">
          <Renderer
            index={0}
            settings={settings}
            seed={seeds[0]}
            variables={variables}
            program={program}
            shouldRefresh={shouldRefresh}
            onRefresh={() => setShouldRefresh(false)}
          />
        </div>
      ) : (
        <div className="h-full w-full grid bg-[#FAF9F6] overflow-x-auto">
          <div className="grid grid-cols-2 2xl:grid-cols-3 w-full gap-7 p-7">
            {Array.from(Array(multiEditorCount)).map((id, index) => (
              <Renderer
                settings={settings}
                key={index}
                index={index}
                seed={seeds[index]}
                program={program}
                variables={variables}
                shouldRefresh={shouldRefresh}
                onRefresh={() => setShouldRefresh(false)}
              />
            ))}
          </div>
        </div>
      )}
      <Documentation setOpen={setShowDocumentation} open={showDocumentation} />
    </div>
  );
}
