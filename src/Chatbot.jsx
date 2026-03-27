import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });

const SYSTEM_PROMPT = `あなたはMEDIA ENGINEのAIアシスタントです。
MEDIA ENGINEは、メディア事業とマーケティングソリューション事業を展開する会社です。

主な特徴:
- 全国2,000名以上のエキスパート・インフルエンサー・クリエイターネットワーク
- SEO、AIO、SNSマーケティングの専門知識
- 独自のAIツールを活用したマーケティング支援
- オウンドメディア制作からSNS戦略まで一貫したサポート
- 大手出版社の編集長やWebメディアのグロースハッカーなどプロが在籍

訪問者からの質問に丁寧に答え、サービスに興味を持ってもらえるよう案内してください。
問い合わせが必要な場合は、コンタクトフォームへの誘導もお願いします。
回答は簡潔かつ親切にお願いします。日本語でお答えください。`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: 'こんにちは！MEDIA ENGINEのAIアシスタントです。サービスや事業内容についてご質問があればお気軽にどうぞ。',
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);

    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
      // Gemini のフォーマットに変換（初期挨拶を除き、userから始まるペアのみ渡す）
      const history = newMessages
        .slice(0, -1)
        .filter((_, idx) => idx > 0)
        .map(m => ({
          role: m.role,
          parts: [{ text: m.content }],
        }));

      const chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        config: { systemInstruction: SYSTEM_PROMPT },
        history,
      });

      const stream = await chat.sendMessageStream({ message: userMessage.content });

      for await (const chunk of stream) {
        const delta = chunk.text;
        if (delta) {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'model',
              content: updated[updated.length - 1].content + delta,
            };
            return updated;
          });
        }
      }
    } catch (error) {
      const errorDetails = [
        `[name] ${error?.name ?? 'unknown'}`,
        `[message] ${error?.message ?? String(error)}`,
        `[status] ${error?.status ?? '-'}`,
        `[stack] ${error?.stack ?? '-'}`,
      ].join('\n');
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'model',
          content: `エラーが発生しました。\n\n${errorDetails}`,
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-sm">MEDIA ENGINE AI</p>
                <p className="text-xs text-slate-400">AIアシスタント</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-slate-300 transition-colors"
              aria-label="チャットを閉じる"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-sm'
                }`}>
                  {msg.content || (isStreaming && idx === messages.length - 1 ? (
                    <span className="flex space-x-1 items-center py-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  ) : msg.content)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                id="chatbot-input"
                name="chatbot-input"
                type="text"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力..."
                disabled={isStreaming}
                className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="送信"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-200 flex items-center justify-center text-white hover:bg-blue-500 transition-all hover:scale-110"
        aria-label={isOpen ? 'チャットを閉じる' : 'チャットを開く'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Chatbot;
