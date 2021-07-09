import { useEffect } from 'react';
import { Hook, Unhook, Console } from 'console-feed';
import { WithoutSSR } from 'lib/ssr';

const ConsoleDisplay = ({ height, logs, setLogs }) => {
  useEffect(() => {
    Hook(
      window.console,
      (log) => {
        setLogs((logs) => [...logs, log]);
      },
      false
    );
    return () => Unhook(window.console);
  }, []);

  return (
    <div className={`${height} overflow-y-scroll border-t bg-white`}>
      <WithoutSSR>
        <Console logs={logs} variant="light" />
      </WithoutSSR>
    </div>
  );
};

export default ConsoleDisplay;
