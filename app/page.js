'use client'

import { useState, useRef, useEffect } from 'react'

const WELCOME_MESSAGES = {
  nayarit: {
    en: '¡Hola! 👋 I\'m your Condo Advisor for **Nayarit**.\n\nI can help you with:\n• HOA meetings & voting (Asambleas)\n• Quorum requirements\n• Fideicomiso & foreign ownership\n• Maintenance fees (Cuotas)\n• Property manager issues\n• Airbnb regulations\n• Buying/selling property\n\nAsk me anything!',
    es: '¡Hola! 👋 Soy tu Asesor de Condominios para **Nayarit**.\n\nPuedo ayudarte con:\n• Asambleas y votaciones\n• Requisitos de quórum\n• Fideicomiso y extranjeros\n• Cuotas de mantenimiento\n• Problemas con administrador\n• Regulaciones de Airbnb\n• Compra/venta de propiedad\n\n¡Pregúntame lo que quieras!',
    subtitle: { en: 'Nayarit • Condominium Law', es: 'Nayarit • Ley de Condominio' }
  },
  jalisco: {
    en: '¡Hola! 👋 I\'m your Condo Advisor for **Jalisco**.\n\nI can help you with:\n• HOA meetings & voting (Asambleas)\n• Quorum requirements\n• Fideicomiso & foreign ownership\n• Maintenance fees (Cuotas)\n• Property manager issues\n• Buying/selling property\n\nAsk me anything!',
    es: '¡Hola! 👋 Soy tu Asesor de Condominios para **Jalisco**.\n\nPuedo ayudarte con:\n• Asambleas y votaciones\n• Requisitos de quórum\n• Fideicomiso y extranjeros\n• Cuotas de mantenimiento\n• Problemas con administrador\n• Compra/venta de propiedad\n\n¡Pregúntame lo que quieras!',
    subtitle: { en: 'Jalisco • Civil Code', es: 'Jalisco • Código Civil' }
  }
}

export default function Home() {
  const [estado, setEstado] = useState('nayarit')
  const [lang, setLang] = useState('en')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: WELCOME_MESSAGES.nayarit.en,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const changeEstado = (newEstado) => {
    if (newEstado !== estado) {
      setEstado(newEstado)
      setMessages([{
        role: 'assistant',
        content: WELCOME_MESSAGES[newEstado][lang],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    }
  }

  const changeLang = (newLang) => {
    if (newLang !== lang) {
      setLang(newLang)
      setMessages([{
        role: 'assistant',
        content: WELCOME_MESSAGES[estado][newLang],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    }
  }

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
          })),
          estado: estado,
          lang: lang
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
      {/* Header */}
      <header className="bg-[#202c33]">
        {/* Logo Banner */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111b21]">
          <div className="w-16"></div>
          <img 
            src="/logo_banner.png" 
            alt="Condo Advisor" 
            className="h-10 md:h-12 w-auto"
          />
          {/* Language Toggle */}
          <div className="flex gap-1">
            <button
              onClick={() => changeLang('en')}
              className={`text-lg px-1 rounded transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              title="English"
            >
              🇺🇸
            </button>
            <button
              onClick={() => changeLang('es')}
              className={`text-lg px-1 rounded transition-opacity ${lang === 'es' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              title="Español"
            >
              🇲🇽
            </button>
          </div>
        </div>
        
        {/* State Tabs */}
        <div className="flex border-b border-[#2a3942]">
          <button
            onClick={() => changeEstado('nayarit')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              estado === 'nayarit'
                ? 'text-[#00a884] border-b-2 border-[#00a884] bg-[#111b21]'
                : 'text-[#8696a0] hover:text-[#e9edef] bg-[#202c33]'
            }`}
          >
            🏝️ Nayarit
          </button>
          <button
            onClick={() => changeEstado('jalisco')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              estado === 'jalisco'
                ? 'text-[#00a884] border-b-2 border-[#00a884] bg-[#111b21]'
                : 'text-[#8696a0] hover:text-[#e9edef] bg-[#202c33]'
            }`}
          >
            ☀️ Jalisco
          </button>
        </div>
        
        {/* Subtitle */}
        <div className="px-4 py-1.5 bg-[#111b21]">
          <p className="text-xs text-[#8696a0] text-center">{WELCOME_MESSAGES[estado].subtitle[lang]}</p>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto chat-bg p-4 space-y-2">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-appear`}
          >
            <div 
              className={`max-w-[85%] rounded-lg px-3 py-2 shadow ${
                msg.role === 'user' 
                  ? 'bubble-user rounded-tr-none' 
                  : 'bubble-assistant rounded-tl-none'
              }`}
            >
              <p className="text-[#e9edef] text-sm whitespace-pre-wrap">{msg.content}</p>
              <p className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start message-appear">
            <div className="bubble-assistant rounded-lg rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Input area */}
      <footer className="bg-[#202c33] px-4 py-3 border-t border-[#2a3942]">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'en' ? 'Type a message...' : 'Escribe un mensaje...'}
            className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00a884] placeholder-[#8696a0]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#00a884] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#02906f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {lang === 'en' ? 'Send' : 'Enviar'}
          </button>
        </form>
        
        {/* Disclaimer - more visible */}
        <div className="mt-3 p-2 bg-[#1a2329] rounded-lg border border-[#2a3942]">
          <p className="text-[11px] text-[#aebac1] text-center leading-relaxed">
            ⚠️ {lang === 'en' 
              ? 'Important: This is informational only, not legal advice. Always consult a licensed attorney and check your condo bylaws.' 
              : 'Importante: Esto es solo informativo, no es asesoría legal. Siempre consulta a un abogado y revisa tu reglamento.'}
          </p>
        </div>
        
        {/* Made by */}
        <p className="text-[10px] text-[#667781] text-center mt-2">
          {lang === 'en' ? 'Made by' : 'Hecho por'} <span className="text-[#00a884]">duendes.app</span> © 2026
        </p>
      </footer>
    </div>
  )
}
