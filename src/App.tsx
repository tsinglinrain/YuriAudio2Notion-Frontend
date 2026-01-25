import { useState, useRef } from 'react';
import { Atom, Zap } from 'lucide-react';
import {
  SiGithub,
  SiReact,
  SiVite,
  SiTypescript,
  SiNotion,
  SiTailwindcss,
} from '@icons-pack/react-simple-icons';

function App() {
  const [debugOpen, setDebugOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleSummaryClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止默认展开行为

    const willOpen = !debugOpen;

    // 1. 先禁用滚动
    document.documentElement.style.overflow = 'hidden';

    // 2. 更新 padding 状态
    setDebugOpen(willOpen);

    // 3. 手动设置 details 的 open 属性（在 overflow:hidden 之后）
    if (detailsRef.current) {
      detailsRef.current.open = willOpen;
    }

    // 4. 动画结束后恢复滚动
    setTimeout(() => {
      document.documentElement.style.overflow = '';
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-[#f9f9f9]">
      {/* 带渐变遮罩的网格背景 - fixed 固定不随内容滚动 */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(200,200,200,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.3)_1px,transparent_1px)] bg-size-[40px_40px]"></div>
      {/* 上下渐变遮罩 */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,#f9f9f9_0%,transparent_35%,transparent_65%,#f9f9f9_100%)]"></div>

      {/* 内容层 */}
      <div
        className={`relative z-10 mx-auto flex min-h-screen max-w-xl flex-col px-5 pb-5 text-center transition-all duration-300 ${debugOpen ? 'pt-4' : 'pt-40'}`}
      >
        {/* 主要内容 */}
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-center gap-4">
            <Atom size={96} className="text-blue-500 transition hover:animate-spin" />
            <Zap size={96} className="animate-[pulse_3s_ease-in-out_infinite] text-yellow-500" />
          </div>

          {/* 标题 */}
          <h1 className="mb-4 text-4xl text-gray-800">
            <span className="font-mono text-purple-300">Yuri Audio Drama</span>{' '}
            <span className="font-normal text-black">to</span>{' '}
            <span className="text-right font-semibold">Notion</span>
          </h1>

          {/* 说明 */}
          <p className="mb-5 text-sm font-medium text-zinc-500">
            If you see this page, the YuriAudio2Notion is successfully installed and working.
          </p>

          {/* 按钮组 */}
          <div className="mb-5 flex justify-center gap-4">
            <a
              href="https://yuri.coooo.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border-2 border-solid bg-gray-100 px-6 py-2 text-sm text-gray-700 shadow-md shadow-gray-500/50 transition hover:bg-gray-200"
            >
              <span className="font-bold">Webhook for Notion</span>
            </a>
            <a
              href="https://yuriaudio.notion.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border-2 border-solid bg-gray-100 px-6 py-2 text-sm text-gray-700 shadow-md shadow-gray-500/50 transition hover:bg-gray-200"
            >
              <span className="font-bold">Yuri Audio CV Share | Baihe</span>
            </a>
          </div>

          {/* Debug Info */}
          <details ref={detailsRef} className="mb-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500" onClick={handleSummaryClick}>
              Debug Info
            </summary>
            <pre className="mt-2 max-h-80 overflow-auto rounded-lg bg-gray-100 p-4 text-sm">
              {JSON.stringify(
                {
                  version: '1.0.0',
                  nodeVersion: 'v20.x',
                  test: 'This is a test debug info.',
                  testArray: [1, 2, 3, 4, 5],
                  testObject: { a: 'A', b: 'B', c: 'C' },
                  vers1ion: '1.0.0',
                  node1Version: 'v20.x',
                  te1st: 'This is a test debug info.',
                  te1stArray: [1, 2, 3, 4, 5],
                  tes1tObject: { a: 'A', b: 'B', c: 'C' },
                  startTime: new Date().toISOString(),
                },
                null,
                2,
              )}
            </pre>
          </details>
        </div>

        {/* 页脚 */}
        <footer className="mt-10 leading-relaxed">
          {/* GitHub 链接 */}
          <div className="mb-1 flex justify-center gap-8">
            <a
              href="https://github.com/tsinglinrain/YuriAudio2Notion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 ring-2 ring-gray-500 transition hover:bg-gray-200 hover:ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <span className="font-bold">Repo</span>
              <span className="ml-2 rounded-full bg-blue-400 px-2 py-0.5 text-xs font-semibold text-white">
                Backen
              </span>
            </a>
            <a
              href="https://github.com/tsinglinrain/YuriAudio2Notion-Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 ring-2 ring-gray-500 transition hover:bg-gray-200 hover:ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <span className="font-bold">Repo</span>
              <span className="ml-2 rounded-full bg-orange-600 px-2 py-0.5 text-xs font-semibold text-white">
                Frontend
              </span>
            </a>
          </div>

          <div className="mb-2 flex justify-center gap-5">
            <a href="https://github.com/tsinglinrain" target="_blank" rel="noopener noreferrer">
              <SiGithub size={20} className="transition hover:opacity-70" />
            </a>
          </div>
          <p className="mt-1 text-sm font-black whitespace-nowrap text-blue-950">
            Only for Yuri Audio Drama.
          </p>
          <p className="mt-1 text-sm font-black whitespace-nowrap">
            Made with <code>TypeScript</code>{' '}
            <SiTypescript size={15} className="inline-block align-middle" />, <code>React</code>{' '}
            <SiReact size={15} className="inline-block align-middle" />, <code>Vite</code>{' '}
            <SiVite size={15} className="inline-block align-middle" /> and <code>Tailwind CSS</code>{' '}
            <SiTailwindcss size={15} className="inline-block align-middle" />.
          </p>
          <p className="mt-1 mb-5 text-sm font-black whitespace-nowrap">
            Data is stored in <code>Notion</code>{' '}
            <SiNotion size={15} className="inline-block align-middle" />.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
