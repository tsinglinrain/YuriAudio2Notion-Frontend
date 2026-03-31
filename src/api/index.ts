/**
 * API 配置和调用
 */

import type { HealthResponse } from '../types';

/**
 * API 基础 URL
 * 开发环境使用 Vite 代理，生产环境直接访问
 */
export const API_BASE_URL = import.meta.env.PROD ? '' : '';

const API_KEY = encodeURIComponent(import.meta.env.VITE_API_KEY || '');

/**
 * 获取健康状态
 */
export async function fetchHealth(): Promise<HealthResponse> {
  const url = API_KEY
    ? `${API_BASE_URL}/health?api_key=${API_KEY}`
    : `${API_BASE_URL}/health`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

/**
 * 获取 SSE 日志流 URL
 */
export function getLogStreamUrl(): string {
  const base = `${API_BASE_URL}/logs/stream`;
  return API_KEY ? `${base}?api_key=${API_KEY}` : base;
}
