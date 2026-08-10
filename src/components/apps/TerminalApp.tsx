import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { SquareTerminal, CornerDownLeft } from 'lucide-react';

export const TerminalApp: React.FC = () => {
  const { files, addFile, deleteFile, theme, updateTheme } = useOS();
  const [currentPath, setCurrentPath] = useState('desktop');
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: 'neofetch',
      output: `
   /\\_/\   OS Kids 1.0 WebOS (Neobrutalism + M3 Expressive)
  ( o.o )  ----------------------------------------------------
   > ^ <   Host: Mac Studio M3 Max
           Kernel: 25.1.0-kids-webos
           Uptime: 42 mins
           Packages: 12 WebApps (npm)
           Shell: zsh 5.9 (arm64-apple-darwin23)
           Theme: Neobrutal Gold & Zero-Glassmorphism
           Memory: 18.4GB / 64GB
`,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    switch (cmd) {
      case 'help':
        output = `Available commands in OS Kids Terminal:
  neofetch       Display OS Kids system architecture & specs
  ls             List files in current virtual directory
  cd <folder>    Change directory ('desktop', 'documents', 'downloads', 'trash', 'root')
  cat <file>     Display contents of text file
  echo <text>    Print text to output
  mkdir <name>   Create a new folder
  rm <filename>  Delete file or move to trash
  date           Display current date and time
  clear          Clear terminal buffer
  theme          Toggle dark/light mode
  matrix         Run digital rain effect
`;
        break;

      case 'neofetch':
        output = `
   /\\_/\   OS Kids 1.0 WebOS
  ( o.o )  -----------------------------------
   > ^ <   OS: OS Kids Neobrutalism M3 Expressive
           CPU: Apple M3 Max (16-core)
           Memory: 64GB Unified LPDDR5
           Glassmorphism: Strictly Disabled (0%)
           Borders: 3px Solid Black
`;
        break;

      case 'ls': {
        const folderFiles = files.filter(f => f.parentId === currentPath);
        if (folderFiles.length === 0) {
          output = '(directory is empty)';
        } else {
          output = folderFiles.map(f => `${f.type === 'folder' ? '📁' : '📄'} ${f.name}`).join('\n');
        }
        break;
      }

      case 'cd': {
        const target = args[0] ? args[0].toLowerCase() : 'desktop';
        if (target === '..' || target === 'root') {
          setCurrentPath('root');
          output = 'Changed directory to /';
        } else {
          const match = files.find(f => f.type === 'folder' && f.name.toLowerCase().includes(target));
          if (match) {
            setCurrentPath(match.id);
            output = `Changed directory to /${match.name}`;
          } else {
            output = `cd: no such file or directory: ${target}`;
          }
        }
        break;
      }

      case 'cat': {
        const targetName = args.join(' ').toLowerCase();
        const file = files.find(f => f.parentId === currentPath && f.name.toLowerCase().includes(targetName));
        if (file) {
          output = file.content || `(empty file ${file.name})`;
        } else {
          output = `cat: ${args[0] || ''}: No such file`;
        }
        break;
      }

      case 'echo':
        output = args.join(' ');
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'mkdir': {
        const name = args.join('_') || 'New_Folder';
        addFile({
          name,
          type: 'folder',
          parentId: currentPath,
          color: '#FFE600',
        });
        output = `Created directory: ${name}`;
        break;
      }

      case 'rm': {
        const targetName = args.join(' ').toLowerCase();
        const file = files.find(f => f.parentId === currentPath && f.name.toLowerCase().includes(targetName));
        if (file) {
          deleteFile(file.id);
          output = `Removed file: ${file.name}`;
        } else {
          output = `rm: cannot remove '${args[0] || ''}': No such file`;
        }
        break;
      }

      case 'theme':
        updateTheme({ darkMode: !theme.darkMode });
        output = `Dark mode toggled: ${!theme.darkMode}`;
        break;

      case 'matrix':
        output = `01001001 01101110 01101001 01110100 01101001 01100001 01110100 01101001 01101110 01100111 00100000 01010100 01100001 01101000 01101111 01100101 00100000 01001101 01100001 01110100 01110010 01101001 01111000 00101110 00101110 00101110`;
        break;

      default:
        output = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { command: cmdStr, output }]);
    setInputVal('');
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950 text-emerald-400 font-mono text-xs select-none">
      {/* Terminal Title Bar */}
      <div className="px-4 py-2 bg-zinc-900 border-b-2 border-zinc-800 text-zinc-400 flex items-center justify-between font-bold">
        <div className="flex items-center space-x-2">
          <SquareTerminal className="w-4 h-4 text-emerald-400" />
          <span>guest@OS-Kids (~/{currentPath})</span>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded-full">
          zsh
        </span>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 p-4 overflow-auto space-y-3">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center space-x-2 text-yellow-300 font-extrabold">
              <span className="text-emerald-400">guest@OS-Kids</span>
              <span className="text-purple-400">~/{currentPath} %</span>
              <span>{h.command}</span>
            </div>
            <pre className="whitespace-pre-wrap text-zinc-300 leading-relaxed font-mono">{h.output}</pre>
          </div>
        ))}

        {/* Command Input Prompt */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="flex items-center space-x-2 text-yellow-300 font-extrabold"
        >
          <span className="text-emerald-400">guest@OS-Kids</span>
          <span className="text-purple-400">~/{currentPath} %</span>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-emerald-300 outline-none font-mono font-bold"
            autoFocus
          />
          <CornerDownLeft className="w-4 h-4 text-zinc-600" />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
