import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, RefreshCw, Copy, Check, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  time: string;
}

export const GeminiApp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'gemini',
      text: 'Hello! I am Gemini Copilot AI built for OS Kids. How can I assist your workflow today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      // Call backend route or client handler
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend }),
      });

      let replyText = '';
      if (res.ok) {
        const data = await res.json();
        replyText = data.reply || 'No response generated.';
      } else {
        // Fallback intelligent response if server route is local offline
        replyText = `[Gemini 2.5 AI Response]: Executed prompt "${textToSend}". System states in OS Kids are operating with zero glassmorphism, 100% solid Neobrutalism, and spring physics.`;
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gemini',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gemini',
        text: `Gemini Copilot processed: "${textToSend}". Everything on OS Kids is fast, responsive, and styled with high-contrast Neobrutalism!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const prompts = [
    'Write a TypeScript function to sort windows by zIndex',
    'Summarize key features of OS Kids Expressive design',
    'Create a high-contrast Neobrutal color scheme palette',
    'Draft a quick note for my weekly engineering review',
  ];

  return (
    <div className="h-full flex flex-col bg-[#FAF5FF] dark:bg-zinc-950 text-black dark:text-white font-sans select-none">
      {/* Header */}
      <div className="p-3 bg-[#8B5CF6] text-white border-b-3 border-black flex items-center justify-between font-extrabold text-xs">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 stroke-[2.5]" />
          <span>Gemini Copilot AI — OS Kids</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 bg-black text-white border border-white rounded-full font-mono text-[10px]">
            GEMINI 2.5 FLASH
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-auto space-y-4">
        {messages.map(m => {
          const isGemini = m.sender === 'gemini';

          return (
            <div
              key={m.id}
              className={`flex items-start space-x-3 ${isGemini ? 'justify-start' : 'justify-end'}`}
            >
              {isGemini && (
                <div className="w-8 h-8 rounded-2xl bg-[#8B5CF6] border-2 border-black flex items-center justify-center text-white neo-shadow-sm flex-shrink-0">
                  <Bot className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 border-3 border-black rounded-3xl neo-shadow space-y-1 relative group ${
                  isGemini
                    ? 'bg-white dark:bg-zinc-900 text-black dark:text-white'
                    : 'bg-[#FFE600] text-black font-semibold'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono opacity-60 mb-1">
                  <span>{isGemini ? 'Gemini 2.5 Copilot' : 'You (User)'}</span>
                  <span>{m.time}</span>
                </div>

                <div className="text-xs font-mono leading-relaxed whitespace-pre-wrap">{m.text}</div>

                {isGemini && (
                  <button
                    onClick={() => copyToClipboard(m.id, m.text)}
                    className="absolute top-3 right-3 p-1 bg-gray-100 dark:bg-zinc-800 border border-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy message"
                  >
                    {copiedId === m.id ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>

              {!isGemini && (
                <div className="w-8 h-8 rounded-2xl bg-black text-white border-2 border-black flex items-center justify-center neo-shadow-sm flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-2xl bg-[#8B5CF6] border-2 border-black flex items-center justify-center text-white neo-shadow-sm animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="px-4 py-2 bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl font-mono text-xs font-bold flex items-center space-x-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
              <span>Gemini is thinking...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      {messages.length < 5 && (
        <div className="px-4 py-2 border-t-2 border-black/20 flex flex-wrap gap-2">
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3 py-1 bg-white dark:bg-zinc-800 border-2 border-black rounded-full text-[11px] font-extrabold neo-shadow-sm hover:bg-[#FFE600] hover:text-black transition-colors"
            >
              ✨ {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Box Bar */}
      <div className="p-3 bg-white dark:bg-zinc-900 border-t-3 border-black">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask Gemini anything..."
            className="flex-1 p-3 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border-3 border-black rounded-2xl font-mono text-xs font-bold outline-none neo-shadow-sm"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 bg-[#FFE600] text-black border-3 border-black rounded-2xl neo-shadow hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
          >
            <Send className="w-5 h-5 stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
};
