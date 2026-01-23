import { useState, useRef } from "react";
import { Atom, Zap } from "lucide-react";
import {
  SiGithub,
  SiReact,
  SiVite,
  SiTypescript,
  SiNotion,
  SiTailwindcss,
} from "@icons-pack/react-simple-icons";

function App() {
  const [debugOpen, setDebugOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleSummaryClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止默认展开行为

    const willOpen = !debugOpen;

    // 1. 先禁用滚动
    document.documentElement.style.overflow = "hidden";

    // 2. 更新 padding 状态
    setDebugOpen(willOpen);

    // 3. 手动设置 details 的 open 属性（在 overflow:hidden 之后）
    if (detailsRef.current) {
      detailsRef.current.open = willOpen;
    }

    // 4. 动画结束后恢复滚动
    setTimeout(() => {
      document.documentElement.style.overflow = "";
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] relative">
      {/* 带渐变遮罩的网格背景 - fixed 固定不随内容滚动 */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(200,200,200,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.3)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>
      {/* 上下渐变遮罩 */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_bottom,#f9f9f9_0%,transparent_35%,transparent_65%,#f9f9f9_100%)] pointer-events-none"></div>

      {/* 内容层 */}
      <div
        className={`relative z-10 max-w-xl mx-auto px-5 pb-5 text-center min-h-screen flex flex-col transition-all duration-300 ${debugOpen ? "pt-4" : "pt-40"}`}
      >
        {/* 主要内容 */}
        <div className="flex-1">
          <div className="flex gap-4 justify-center items-center mb-2">
            <Atom
              size={96}
              className="text-blue-500 hover:animate-spin transition"
            />
            <Zap
              size={96}
              className="text-yellow-500 animate-[pulse_3s_ease-in-out_infinite]"
            />
          </div>

          {/* 标题 */}
          <h1 className="text-4xl text-gray-800 mb-4">
            <span className="text-purple-300 font-mono">Yuri Audio Drama</span>{" "}
            <span className="text-black font-normal">to</span>{" "}
            <span className="text-right font-semibold">Notion</span>
          </h1>

          {/* 说明 */}
          <p className="text-sm font-medium text-zinc-500 mb-5">
            If you see this page, the YuriAudio2Notion is successfully installed
            and working.
          </p>

          {/* 按钮组 */}
          <div className="flex gap-4 justify-center mb-5">
            <a
              href="https://yuri.coooo.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg border-2 border-solid hover:bg-gray-200 transition"
            >
              <span className="font-bold">Webhook for Notion</span>
            </a>
            <a
              href="https://yuriaudio.notion.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg border-2 border-solid hover:bg-gray-200 transition"
            >
              <span className="font-bold">Yuri Audio CV Share | Baihe</span>
            </a>
          </div>

          {/* Debug Info */}
          <details ref={detailsRef} className="text-left mb-8">
            <summary
              className="text-gray-500 text-sm cursor-pointer"
              onClick={handleSummaryClick}
            >
              Debug Info
            </summary>
            <pre className="bg-gray-100 p-4 rounded-lg mt-2 text-sm overflow-auto max-h-80">
              {JSON.stringify(
                {
                  version: "1.0.0",
                  nodeVersion: "v20.x",
                  test: "This is a test debug info.",
                  testArray: [1, 2, 3, 4, 5],
                  testObject: { a: "A", b: "B", c: "C" },
                  vers1ion: "1.0.0",
                  node1Version: "v20.x",
                  te1st: "This is a test debug info.",
                  te1stArray: [1, 2, 3, 4, 5],
                  tes1tObject: { a: "A", b: "B", c: "C" },
                  startTime: new Date().toISOString(),
                },
                null,
                2,
              )}
            </pre>
          </details>
        </div>

        {/* 页脚 */}
        <footer className="leading-relaxed mt-10">
          {/* GitHub 链接 */}
          <div className="flex gap-8 justify-center mb-1">
            <a
              href="https://github.com/tsinglinrain/YuriAudio2Notion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg border-2 border-solid hover:bg-gray-200 transition"
            >
              <span className="font-bold">Repo</span>
              <span className="ml-2 bg-blue-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Backen
              </span>
            </a>
            <a
              href="https://github.com/tsinglinrain/YuriAudio2Notion-Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg border-2 border-solid hover:bg-gray-200 transition"
            >
              <span className="font-bold">Repo</span>
              <span className="ml-2 bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Frontend
              </span>
            </a>
          </div>

          <div className="flex gap-5 justify-center mb-2">
            <a
              href="https://github.com/tsinglinrain"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub size={20} className="hover:opacity-70 transition" />
            </a>
          </div>
          <p className="text-blue-950 mt-1 font-black text-sm whitespace-nowrap">
            Only for Yuri Audio Drama.
          </p>
          <p className="mt-1 font-black text-sm whitespace-nowrap">
            Made with <code>TypeScript</code>{" "}
            <SiTypescript size={15} className="inline-block align-middle" />,{" "}
            <code>React</code>{" "}
            <SiReact size={15} className="inline-block align-middle" />,{" "}
            <code>Vite</code>{" "}
            <SiVite size={15} className="inline-block align-middle" /> and{" "}
            <code>Tailwind CSS</code>{" "}
            <SiTailwindcss size={15} className="inline-block align-middle" />.
          </p>
          <p className="mt-1 font-black text-sm whitespace-nowrap mb-5">
            Data is stored in <code>Notion</code>{" "}
            <SiNotion size={15} className="inline-block align-middle" />.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
