import { Controlled as CodeMirror } from 'react-codemirror2';
import { WithoutSSR } from 'lib/ssr';
import 'codemirror/mode/javascript/javascript';
import Editor from '@monaco-editor/react';

const CodeMirrorEditor = ({ program, handleProgramChange }) => {
  return (
    <WithoutSSR>
      <div className="overflow-y-scroll h-full">
        <CodeMirror
          value={program}
          options={{
            mode: 'javascript',
            theme: 'neat',
            lineNumbers: true,
            viewportMargin: Infinity,
            autoCursor: false,
          }}
          onBeforeChange={(editor, data, value) => {
            handleProgramChange(value);
          }}
          onChange={(editor, data, value) => {
            handleProgramChange(value);
          }}
        />
      </div>
    </WithoutSSR>
  );
};

const MonacoEditor = ({ height = 'h-full', program, handleProgramChange }) => {
  return (
    <WithoutSSR>
      <div className={height}>
        <Editor
          language="javascript"
          value={program}
          onChange={(value, event) => {
            handleProgramChange(value);
          }}
          options={{
            scrollBeyondLastLine: false,
            lineNumbers: 'off',
            horizontal: 'hidden',
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </WithoutSSR>
  );
};

export { MonacoEditor, CodeMirrorEditor };
export default MonacoEditor;
