import React, { useState } from 'react';
import { Calculator as CalcIcon, History, Delete } from 'lucide-react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleBtn = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      return;
    }
    if (val === '=') {
      try {
        // eslint-disable-next-line no-eval
        const res = Function(`"use strict"; return (${display.replace('×', '*').replace('÷', '/')})`)();
        const formatted = String(res);
        setHistory(prev => [`${display} = ${formatted}`, ...prev]);
        setDisplay(formatted);
      } catch {
        setDisplay('Error');
      }
      return;
    }
    if (val === '±') {
      if (display.startsWith('-')) setDisplay(display.substring(1));
      else if (display !== '0') setDisplay(`-${display}`);
      return;
    }
    if (val === '%') {
      try {
        const res = String(Number(display) / 100);
        setDisplay(res);
      } catch {
        setDisplay('Error');
      }
      return;
    }

    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="h-full flex flex-col bg-[#FF597B] text-black font-sans select-none p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b-3 border-black">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-black text-white border-2 border-black rounded-xl">
            <CalcIcon className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-xs text-white">Calculator</span>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="p-1.5 bg-white border-2 border-black rounded-xl neo-shadow-sm font-bold text-xs flex items-center space-x-1"
        >
          <History className="w-3.5 h-3.5" />
        </button>
      </div>

      {showHistory ? (
        <div className="flex-1 bg-white border-3 border-black rounded-2xl p-3 overflow-auto space-y-1 text-xs font-mono">
          <div className="font-bold text-gray-500 mb-2 border-b-2 border-black pb-1">Calculation Log</div>
          {history.length === 0 ? (
            <div className="text-gray-400 italic">No history yet</div>
          ) : (
            history.map((h, i) => <div key={i} className="p-1 bg-yellow-100 border border-black rounded-lg">{h}</div>)
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between space-y-3">
          {/* Display */}
          <div className="p-4 bg-white border-4 border-black rounded-3xl neo-shadow text-right font-mono font-black text-3xl overflow-x-auto">
            {display}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2 flex-1">
            {buttons.map((row, rIdx) =>
              row.map((btn, cIdx) => {
                const isOp = ['÷', '×', '-', '+', '='].includes(btn);
                const isSpecial = ['C', '±', '%'].includes(btn);
                const isZero = btn === '0';

                return (
                  <button
                    key={`${rIdx}_${cIdx}`}
                    onClick={() => handleBtn(btn)}
                    className={`font-black text-lg border-3 border-black rounded-2xl neo-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                      isZero ? 'col-span-2' : ''
                    } ${
                      isOp
                        ? 'bg-[#FFE600] text-black'
                        : isSpecial
                        ? 'bg-gray-200 text-black'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {btn}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
