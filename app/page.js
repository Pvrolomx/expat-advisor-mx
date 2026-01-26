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
    subtitle: { en: 'Jalisco • Condominium Law', es: 'Jalisco • Ley de Condominio' }
  }
}

export default function Home() {
  const [estado, setEstado] = useState('jalisco')
  const [lang, setLang] = useState('en')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: WELCOME_MESSAGES.jalisco.en,
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

  const exportToPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default
    
    const disclaimer = lang === 'en' 
      ? 'IMPORTANT: This document is for informational purposes only and does not constitute legal advice. Always consult a licensed attorney and review your condominium bylaws for specific guidance.'
      : 'IMPORTANTE: Este documento es solo informativo y no constituye asesoría legal. Siempre consulta a un abogado y revisa tu reglamento de condominio para orientación específica.'
    
    const content = document.createElement('div')
    content.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 700px; margin: 0 auto; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="/logo_banner.png" style="height: 50px; margin-bottom: 10px;" />
          <h1 style="font-size: 14pt; color: #00a884; margin: 0;">${lang === 'en' ? 'Consultation Report' : 'Reporte de Consulta'}</h1>
          <p style="font-size: 10pt; color: #666; margin: 5px 0;">${estado.charAt(0).toUpperCase() + estado.slice(1)} • ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="border-top: 2px solid #00a884; padding-top: 15px;">
          ${messages.filter((m, i) => i > 0).map(m => `
            <div style="margin-bottom: 15px; padding: 12px; background: ${m.role === 'user' ? '#f8f8f8' : '#ffffff'}; border: 1px solid #e0e0e0; border-radius: 8px;">
              <p style="font-size: 12pt; color: #333; margin: 0; white-space: pre-wrap; line-height: 1.6; ${m.role === 'user' ? 'font-weight: bold;' : 'font-weight: normal;'}">${m.content}</p>
            </div>
          `).join('')}
        </div>
        
        <div style="margin-top: 30px; padding: 12px; background: #fffbf0; border: 1px solid #e6d9a8; border-radius: 8px;">
          <p style="font-size: 10pt; color: #5a4a00; margin: 0; text-align: center;">
            ⚠️ ${disclaimer}
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
          <p style="font-size: 9pt; color: #999;">
            ${lang === 'en' ? 'Made by' : 'Hecho por'} duendes.app © 2026
          </p>
        </div>
      </div>
    `
    
    const opt = {
      margin: 10,
      filename: `condo-advisor-${estado}-${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    html2pdf().set(opt).from(content).save()
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
          {/* PDF Button */}
          <button
            onClick={exportToPDF}
            className="text-lg text-[#8696a0] hover:text-[#00a884] transition-colors"
            title={lang === 'en' ? 'Download PDF' : 'Descargar PDF'}
          >
            📄
          </button>
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
            onClick={() => changeEstado('jalisco')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              estado === 'jalisco'
                ? 'text-[#00a884] border-b-2 border-[#00a884] bg-[#111b21]'
                : 'text-[#8696a0] hover:text-[#e9edef] bg-[#202c33]'
            }`}
          >
            ☀️ Jalisco
          </button>
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
        
        {/* Disclaimer */}
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
