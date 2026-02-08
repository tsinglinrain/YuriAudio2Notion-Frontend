/**
 * Debug 面板组件
 * 组合 HealthStatus 和 LogViewer
 */

import { HealthStatus } from './HealthStatus';
import { LogViewer } from './LogViewer';
import { useLogStream } from '../hooks/useLogStream';

export function DebugPanel() {
  const { logs, status, connect, disconnect, clearLogs } = useLogStream();

  return (
    <div className="space-y-4">
      <HealthStatus />
      <LogViewer
        logs={logs}
        status={status}
        onConnect={connect}
        onDisconnect={disconnect}
        onClear={clearLogs}
      />
    </div>
  );
}
