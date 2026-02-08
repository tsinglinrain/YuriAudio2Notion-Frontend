/**
 * 类型定义
 */

/**
 * 健康检查响应
 */
export type HealthResponse = {
  status: 'healthy' | 'unhealthy';
  version: string;
  environment: string;
  uptime: string;
  uptime_seconds: number;
  log_subscribers: number;
};

/**
 * 日志条目
 */
export type LogEntry = {
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  logger: string;
  message: string;
};

/**
 * SSE 连接状态
 */
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
