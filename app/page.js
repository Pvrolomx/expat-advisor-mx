'use client'

import Link from 'next/link'

import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! 👋 I\'m your Condo Advisor for Nayarit.\n\nI can help you with:\n• HOA meetings & voting (Asambleas)\n• Quorum requirements\n• Fideicomiso & foreign ownership\n• Maintenance fees (Cuotas)\n• Property manager issues\n\nAsk me anything in English or Spanish!',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || 'Sorry, I encountered an error. Please try again.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Please check your internet and try again.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-[#111b21]">
      {/* Header - WhatsApp style */}
      <header className="flex items-center gap-3 px-4 py-2 bg-[#202c33] border-b border-[#2a3942]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00a884] to-[#075e54] flex items-center justify-center text-xl">
          🏝️
        </div>
        <div className="flex-1">
          <h1 className="text-[#e9edef] font-medium">Condo Advisor</h1>
          <p className="text-xs text-[#8696a0]">Nayarit Condominium Law • Online</p>
        </div>
        <div className="flex gap-4 text-[#aebac1]">
          <Link href="/templates" className="text-xl cursor-pointer hover:text-[#00a884]" title="Templates">📄</Link>
        </div>
      </header>

      {/* Chat area with tropical bg */}
      <main className="flex-1 overflow-y-auto chat-bg p-4 space-y-2">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-appear`}
          >
            <div 
              className={`max-w-[85%] rounded-lg px-3 py-2 shadow ${
                msg.role === 'user' 
                  ? 'bg-[#005c4b] rounded-tr-none' 
                  : 'bg-[#202c33] rounded-tl-none'
              }`}
            >
              <p className="text-[#e9edef] whitespace-pre-wrap text-sm leading-relaxed">
                {msg.content}
              </p>
              <p className="text-[10px] text-[#8696a0] text-right mt-1 flex items-center justify-end gap-1">
                {msg.time}
                {msg.role === 'user' && (
                  <span className="text-[#53bdeb]">✓✓</span>
                )}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start message-appear">
            <div className="bg-[#202c33] rounded-lg rounded-tl-none px-4 py-3 shadow">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#8696a0] rounded-full typing-dot"></span>
                <span className="w-2 h-2 bg-[#8696a0] rounded-full typing-dot"></span>
                <span className="w-2 h-2 bg-[#8696a0] rounded-full typing-dot"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input area */}
      <form onSubmit={sendMessage} className="flex items-center gap-2 p-3 bg-[#202c33]">
        <div className="flex-1 flex items-center bg-[#2a3942] rounded-full px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-[#e9edef] text-sm placeholder-[#8696a0] outline-none"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#06cf9c] transition-colors"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
          </svg>
        </button>
      </form>

      {/* Footer */}
      <footer className="text-center py-1 text-[10px] text-[#8696a0] bg-[#111b21]">
        🐝 Built by duendes.app • Not legal advice
      </footer>

      <style jsx>{`
        .chat-bg {
          background-color: #0b141a;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23075e54' fill-opacity='0.08'%3E%3Cpath d='M20 20c0-5.5 4.5-10 10-10s10 4.5 10 10c0 3.5-1.8 6.6-4.5 8.4C38 30 40 33.3 40 37c0 5.5-4.5 10-10 10s-10-4.5-10-10c0-3.7 2-7 5-8.6C22 26.5 20 23.4 20 20zm30 0c0-5.5 4.5-10 10-10s10 4.5 10 10c0 3.5-1.8 6.6-4.5 8.4C68 30 70 33.3 70 37c0 5.5-4.5 10-10 10s-10-4.5-10-10c0-3.7 2-7 5-8.6C52 26.5 50 23.4 50 20zM5 55c0-5.5 4.5-10 10-10s10 4.5 10 10c0 3.5-1.8 6.6-4.5 8.4C23 65 25 68.3 25 72c0 5.5-4.5 10-10 10S5 77.5 5 72c0-3.7 2-7 5-8.6C7 61.5 5 58.4 5 55zm30 0c0-5.5 4.5-10 10-10s10 4.5 10 10c0 3.5-1.8 6.6-4.5 8.4C53 65 55 68.3 55 72c0 5.5-4.5 10-10 10s-10-4.5-10-10c0-3.7 2-7 5-8.6C37 61.5 35 58.4 35 55zm30 0c0-5.5 4.5-10 10-10s10 4.5 10 10c0 3.5-1.8 6.6-4.5 8.4C83 65 85 68.3 85 72c0 5.5-4.5 10-10 10s-10-4.5-10-10c0-3.7 2-7 5-8.6C67 61.5 65 58.4 65 55z' fill-rule='evenodd'/%3E%3C/g%3E%3C/svg%3E");
        }
        .typing-dot {
          animation: typing 1.4s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        .message-appear {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
