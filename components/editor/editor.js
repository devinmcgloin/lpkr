import { WithoutSSR } from "lib/ssr";
import Editor from "@monaco-editor/react";

const MonacoEditor = ({ height = "h-full", program, handleProgramChange }) => {
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
            lineNumbers: "on",
            horizontal: "hidden",
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
