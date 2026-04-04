#!/bin/sh
set -e

# 将构建时的占位符替换为运行时环境变量
if [ -n "$VITE_API_KEY" ]; then
  find /usr/share/nginx/html/assets -name '*.js' -exec \
    sed -i "s|__VITE_API_KEY_PLACEHOLDER__|${VITE_API_KEY}|g" {} +
fi

exec "$@"
