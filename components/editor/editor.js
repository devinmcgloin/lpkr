import { WithoutSSR } from 'lib/ssr';
import Editor from '@monaco-editor/react';
import { trackGoal } from 'fathom-client';

const MonacoEditor = ({ height = 'h-full', program, handleProgramChange }) => {
  return (
    <WithoutSSR>
      <div className={height}>
        <Editor
          language="javascript"
          value={program}
          onChange={(value) => {
            trackGoal('CUJO3NS3', 0);
            handleProgramChange(value);
          }}
          options={{
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            horizontal: 'hidden',
            minimap: {
              enabled: false,
            },
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </WithoutSSR>
  );
};

export { MonacoEditor };
export default MonacoEditor;
