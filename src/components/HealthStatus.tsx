/**
 * 健康状态展示组件
 */

import { useState, useEffect, useCallback } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import type { HealthResponse } from '../types';
import { fetchHealth } from '../api';

export function HealthStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHealth();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch health');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const statusColor = health?.status === 'healthy' ? 'text-green-500' : 'text-red-500';
  const statusBg = health?.status === 'healthy' ? 'bg-green-100' : 'bg-red-100';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={18} className={statusColor} />
          <span className="font-semibold text-gray-700">Backend Status</span>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="rounded p-1 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error ? (
        <div className="rounded bg-red-50 p-2 text-sm text-red-600">{error}</div>
      ) : health ? (
        <div className="grid grid-cols-2 items-start gap-2 text-sm">
          <div className="text-gray-500">Status</div>
          <div className={`font-medium ${statusColor}`}>
            <span className={`inline-block rounded px-2 py-0.5 text-xs ${statusBg}`}>
              {health.status}
            </span>
          </div>

          <div className="text-gray-500">Version</div>
          <div className="font-mono text-gray-700">{health.version}</div>

          <div className="text-gray-500">Environment</div>
          <div className="font-mono text-gray-700">{health.environment}</div>

          <div className="text-gray-500">Uptime</div>
          <div className="font-mono text-gray-700">{health.uptime}</div>

          <div className="text-gray-500">Log Subscribers</div>
          <div className="font-mono text-gray-700">{health.log_subscribers}</div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Loading...</div>
      )}
    </div>
  );
}
