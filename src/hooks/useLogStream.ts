/**
 * SSE 日志流连接管理 Hook
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { LogEntry, ConnectionStatus } from '../types';
import { getLogStreamUrl } from '../api';

const MAX_LOGS = 500;

type UseLogStreamResult = {
  logs: LogEntry[];
  status: ConnectionStatus;
  connect: () => void;
  disconnect: () => void;
  clearLogs: () => void;
};

export function useLogStream(): UseLogStreamResult {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const eventSourceRef = useRef<EventSource | null>(null);
  const statusRef = useRef<ConnectionStatus>(status);
  const connectRef = useRef<(() => void) | undefined>(undefined);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      return;
    }

    setStatus('connecting');

    const eventSource = new EventSource(getLogStreamUrl());
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setStatus('connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const entry: LogEntry = JSON.parse(event.data);
        setLogs((prev) => {
          const newLogs = [...prev, entry];
          if (newLogs.length > MAX_LOGS) {
            return newLogs.slice(-MAX_LOGS);
          }
          return newLogs;
        });
      } catch {
        console.error('Failed to parse log entry:', event.data);
      }
    };

    eventSource.onerror = () => {
      setStatus('error');
      eventSource.close();
      eventSourceRef.current = null;

      // 自动重连（3秒后）
      setTimeout(() => {
        if (statusRef.current !== 'disconnected') {
          connectRef.current?.();
        }
      }, 3000);
    };
  }, []);

  useEffect(() => {
    statusRef.current = status;
    connectRef.current = connect;
  }, [status, connect]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setStatus('disconnected');
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // 组件卸载时断开连接
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  return {
    logs,
    status,
    connect,
    disconnect,
    clearLogs,
  };
}
