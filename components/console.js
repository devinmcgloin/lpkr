import { useState, useEffect } from 'react';
import { Hook, Unhook, Console, Decode } from 'console-feed';
import { WithoutSSR } from 'lib/ssr';

export default ({ height }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    Hook(window.console, (log) => {
      setLogs((logs) => [...logs, Decode(log)]);
    });
    return () => Unhook(window.console);
  }, []);

  return (
    <div
      className={`${height} overflow-y-scroll`}
      style={{ backgroundColor: '#242424' }}
    >
      <WithoutSSR>
        <Console logs={logs} variant="dark" />
      </WithoutSSR>
    </div>
  );
};
