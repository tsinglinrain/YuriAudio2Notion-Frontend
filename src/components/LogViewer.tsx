/**
 * 日志查看器组件（终端风格）
 */

import { useEffect, useRef } from 'react';
import { Play, Square, Trash2, Circle } from 'lucide-react';
import type { LogEntry, ConnectionStatus } from '../types';

type LogViewerProps = {
  logs: LogEntry[];
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  onClear: () => void;
};

const levelColors: Record<string, string> = {
  DEBUG: 'text-gray-400',
  INFO: 'text-blue-400',
  WARNING: 'text-yellow-400',
  ERROR: 'text-red-400',
  CRITICAL: 'text-red-600 font-bold',
};

const statusColors: Record<ConnectionStatus, string> = {
  disconnected: 'text-gray-400',
  connecting: 'text-yellow-400',
  connected: 'text-green-400',
  error: 'text-red-400',
};

const statusLabels: Record<ConnectionStatus, string> = {
  disconnected: 'Disconnected',
  connecting: 'Connecting...',
  connected: 'Connected',
  error: 'Error',
};

export function LogViewer({ logs, status, onConnect, onDisconnect, onClear }: LogViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef(true);

  // 检测是否在底部
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      autoScrollRef.current = scrollHeight - scrollTop - clientHeight < 50;
    }
  };

  // 自动滚动到底部
  useEffect(() => {
    if (autoScrollRef.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  return (
    <div className="bg-white-900/30 flex flex-col rounded-lg border border-white/10 shadow-lg backdrop-blur-md">
      {/* 工具栏 */}
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-medium text-gray-300">Log Stream</span>
          <div className="flex items-baseline gap-1">
            <Circle
              size={8}
              className={`${statusColors[status]} ${isConnecting ? 'animate-pulse' : ''}`}
              fill="currentColor"
            />
            <span className={`text-xs ${statusColors[status]}`}>{statusLabels[status]}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{logs.length} entries</span>

          <button
            onClick={onClear}
            className="rounded p-1 text-gray-400 transition hover:bg-gray-800 hover:text-gray-200"
            title="Clear logs"
          >
            <Trash2 size={16} />
          </button>

          {isConnected ? (
            <button
              onClick={onDisconnect}
              className="flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs text-white transition hover:bg-red-700"
            >
              <Square size={12} />
              Stop
            </button>
          ) : (
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className="flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs text-white transition hover:bg-green-700 disabled:opacity-50"
            >
              <Play size={12} />
              Connect
            </button>
          )}
        </div>
      </div>

      {/* 日志内容 */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-64 overflow-auto p-3 font-mono text-xs leading-relaxed"
      >
        {logs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            {isConnected ? 'Waiting for logs...' : 'Click Connect to start streaming logs'}
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="flex gap-1 bg-white/3 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <span className="shrink-0 text-gray-600">{log.timestamp}</span>
              <span className={`w-10 shrink-0 ${levelColors[log.level] || 'text-gray-400'}`}>
                [{log.level}]
              </span>
              <span className="shrink-0 text-purple-400">{log.logger}</span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
