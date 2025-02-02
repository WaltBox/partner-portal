import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';

const CodeBlock = ({ code }) => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const lines = code.split('\n');
  const lineNumbers = lines.map((_, index) => index + 1);

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      {/* VS Code-like window controls */}
      <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-[#3E3E3E]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
      </div>

      <div className="relative">
        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1A1A1A] flex flex-col items-end pr-3 py-4 text-[#6E7681] select-none">
          {lineNumbers.map(num => (
            <div key={num} className="leading-6 text-xs">
              {num}
            </div>
          ))}
        </div>

        {/* Code content */}
        <div className="pl-12 overflow-x-auto">
          <pre className="p-4">
            <code className="language-javascript">
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;