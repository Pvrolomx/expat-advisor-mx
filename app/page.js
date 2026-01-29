'use client'

import { useState, useRef, useEffect } from 'react'

const WELCOME_MESSAGES = {
  nayarit: {
    en: '¡Hola! 👋 I\'m an **AI information tool** for expats in Riviera Nayarit.\n\nI can provide general information about:\n• Property ownership & fideicomiso\n• Mexican residency overview\n• Condo rules & HOA concepts\n• Practical tips\n\n⚠️ This is NOT legal or tax advice.',
    es: '¡Hola! 👋 Soy una **herramienta de información AI** para expats en Riviera Nayarit.\n\nPuedo proporcionar información general sobre:\n• Propiedad y fideicomiso\n• Panorama de residencia mexicana\n• Conceptos de condominios y HOA\n• Tips prácticos\n\n⚠️ Esto NO es asesoría legal ni fiscal.',
    subtitle: { en: 'Riviera Nayarit • Expat Info', es: 'Riviera Nayarit • Info Expat' }
  },
  jalisco: {
    en: '¡Hola! 👋 I\'m an **AI information tool** for expats in Puerto Vallarta.\n\nI can provide general information about:\n• Property ownership & fideicomiso\n• Mexican residency overview\n• Condo rules & HOA concepts\n• Practical tips\n\n⚠️ This is NOT legal or tax advice.',
    es: '¡Hola! 👋 Soy una **herramienta de información AI** para expats en Puerto Vallarta.\n\nPuedo proporcionar información general sobre:\n• Propiedad y fideicomiso\n• Panorama de residencia mexicana\n• Conceptos de condominios y HOA\n• Tips prácticos\n\n⚠️ Esto NO es asesoría legal ni fiscal.',
    subtitle: { en: 'Puerto Vallarta • Expat Info', es: 'Puerto Vallarta • Info Expat' }
  }
}

const DISCLAIMER_CONTENT = {
  en: {
    title: '⚠️ IMPORTANT: Please Read Before Using',
    subtitle: 'EXPAT ADVISOR MX - AI INFORMATION TOOL',
    sections: [
      {
        icon: '🤖',
        title: 'THIS IS AN AI CHATBOT',
        text: 'This service is powered by artificial intelligence. You are not communicating with a human, lawyer, accountant, or licensed professional.'
      },
      {
        icon: '📋',
        title: 'GENERAL INFORMATION ONLY',
        text: 'This tool provides general information about expat life in Mexico. This is NOT legal advice, tax advice, immigration advice, or professional consultation of any kind.'
      },
      {
        icon: '⚠️',
        title: 'NO PROFESSIONAL RELATIONSHIP',
        text: 'Use of this service does not create any attorney-client or professional relationship. No confidentiality or privilege attaches to communications with this chatbot.'
      },
      {
        icon: '🔄',
        title: 'INFORMATION MAY BE OUTDATED',
        text: 'Immigration fees, tax rates, legal requirements, and regulations change frequently. Information provided may not reflect current laws. ALWAYS verify with official sources.'
      },
      {
        icon: '❌',
        title: 'NO LIABILITY',
        text: 'We accept NO RESPONSIBILITY for any decisions made based on information provided. Any reliance on this information is entirely at your own risk.'
      }
    ],
    acknowledge: 'By clicking "I Understand and Accept", you acknowledge that:',
    points: [
      'This is an AI tool providing general information only',
      'This is not professional advice of any kind',
      'You will verify important information with licensed professionals',
      'You assume all risk for decisions based on this information'
    ],
    acceptBtn: 'I Understand and Accept',
    cancelBtn: 'Cancel'
  },
  es: {
    title: '⚠️ IMPORTANTE: Por Favor Lee Antes de Usar',
    subtitle: 'EXPAT ADVISOR MX - HERRAMIENTA DE INFORMACIÓN AI',
    sections: [
      {
        icon: '🤖',
        title: 'ESTO ES UN CHATBOT DE AI',
        text: 'Este servicio funciona con inteligencia artificial. NO estás comunicándote con un humano, abogado, contador ni profesional licenciado.'
      },
      {
        icon: '📋',
        title: 'SOLO INFORMACIÓN GENERAL',
        text: 'Esta herramienta proporciona información general sobre la vida de expats en México. Esto NO es asesoría legal, fiscal, migratoria ni consulta profesional de ningún tipo.'
      },
      {
        icon: '⚠️',
        title: 'SIN RELACIÓN PROFESIONAL',
        text: 'El uso de este servicio no crea ninguna relación profesional. Ninguna confidencialidad o privilegio aplica a las comunicaciones con este chatbot.'
      },
      {
        icon: '🔄',
        title: 'INFORMACIÓN PUEDE ESTAR DESACTUALIZADA',
        text: 'Tarifas de migración, impuestos, requisitos legales y regulaciones cambian frecuentemente. La información puede no reflejar las leyes actuales. SIEMPRE verifica con fuentes oficiales.'
      },
      {
        icon: '❌',
        title: 'SIN RESPONSABILIDAD',
        text: 'NO aceptamos NINGUNA RESPONSABILIDAD por decisiones tomadas basadas en información proporcionada. Cualquier confianza en esta información es completamente bajo tu propio riesgo.'
      }
    ],
    acknowledge: 'Al hacer clic en "Entiendo y Acepto", reconoces que:',
    points: [
      'Esta es una herramienta de AI que proporciona solo información general',
      'Esto no es asesoría profesional de ningún tipo',
      'Verificarás información importante con profesionales licenciados',
      'Asumes todo el riesgo por decisiones basadas en esta información'
    ],
    acceptBtn: 'Entiendo y Acepto',
    cancelBtn: 'Cancelar'
  }
}

const DAILY_LIMIT = 10
const KOFI_URL = 'https://ko-fi.com/condoadviser'

// Disclaimer Modal Component
function DisclaimerModal({ lang, onAccept, onCancel }) {
  const content = DISCLAIMER_CONTENT[lang]
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#202c33] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#2a3942]">
        {/* Header */}
        <div className="sticky top-0 bg-[#202c33] px-6 py-4 border-b border-[#2a3942]">
          <h2 className="text-lg font-bold text-red-400">{content.title}</h2>
          <p className="text-xs text-[#8696a0] mt-1">{content.subtitle}</p>
        </div>
        
        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {content.sections.map((section, i) => (
            <div key={i} className="bg-[#111b21] rounded-lg p-3">
              <h3 className="text-sm font-semibold text-[#e9edef] flex items-center gap-2">
                <span>{section.icon}</span>
                {section.title}
              </h3>
              <p className="text-xs text-[#8696a0] mt-1 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
        
        {/* Acknowledgment */}
        <div className="px-6 py-4 bg-[#1a2329] border-t border-b border-[#2a3942]">
          <p className="text-sm font-medium text-[#e9edef] mb-2">{content.acknowledge}</p>
          <ul className="space-y-1">
            {content.points.map((point, i) => (
              <li key={i} className="text-xs text-[#8696a0] flex items-start gap-2">
                <span className="text-[#00a884]">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Buttons */}
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-lg text-sm font-medium border border-[#2a3942] text-[#8696a0] hover:bg-[#2a3942] transition-colors"
          >
            {content.cancelBtn}
          </button>
          <button
            onClick={onAccept}
            className="flex-1 py-3 rounded-lg text-sm font-semibold bg-[#00a884] text-white hover:bg-[#02906f] transition-colors"
          >
            {content.acceptBtn}
          </button>
        </div>
      </div>
    </div>
  )
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
  const [dailyCount, setDailyCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const messagesEndRef = useRef(null)

  // Check disclaimer acceptance and daily limit on mount
  useEffect(() => {
    // Check disclaimer
    const accepted = localStorage.getItem('expat_advisor_disclaimer_accepted')
    if (accepted) {
      setDisclaimerAccepted(true)
    } else {
      setShowDisclaimer(true)
    }
    
    // Check daily limit
    const stored = localStorage.getItem('condo_advisor_usage')
    if (stored) {
      const { count, date } = JSON.parse(stored)
      const today = new Date().toDateString()
      if (date === today) {
        setDailyCount(count)
        if (count >= DAILY_LIMIT) setLimitReached(true)
      } else {
        localStorage.setItem('condo_advisor_usage', JSON.stringify({ count: 0, date: today }))
      }
    }
  }, [])

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('expat_advisor_disclaimer_accepted', 'true')
    localStorage.setItem('expat_advisor_disclaimer_date', new Date().toISOString())
    setDisclaimerAccepted(true)
    setShowDisclaimer(false)
  }

  const handleCancelDisclaimer = () => {
    window.location.href = 'https://google.com'
  }

  const hasConsultation = messages.length > 1

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
    if (!hasConsultation) return
    
    const html2pdf = (await import('html2pdf.js')).default
    
    const disclaimer = lang === 'en' 
      ? 'IMPORTANT: This document is for informational purposes only and does not constitute legal, tax, or accounting advice. Always consult a licensed attorney and accountant for specific guidance.'
      : 'IMPORTANTE: Este documento es solo informativo y no constituye asesoría legal, fiscal o contable. Siempre consulta a un abogado y contador para orientación específica.'
    
    const content = document.createElement('div')
    content.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 700px; margin: 0 auto; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="/logo_banner.png" style="height: 50px; margin-bottom: 10px;" />
          <h1 style="font-size: 14pt; color: #00a884; margin: 0;">${lang === 'en' ? 'Information Report' : 'Reporte Informativo'}</h1>
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
      filename: `expat-advisor-${estado}-${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    html2pdf().set(opt).from(content).save()
  }

  const incrementUsage = () => {
    const today = new Date().toDateString()
    const newCount = dailyCount + 1
    setDailyCount(newCount)
    localStorage.setItem('condo_advisor_usage', JSON.stringify({ count: newCount, date: today }))
    if (newCount >= DAILY_LIMIT) {
      setLimitReached(true)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading || limitReached) return

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
      
      incrementUsage()
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
      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <DisclaimerModal 
          lang={lang} 
          onAccept={handleAcceptDisclaimer}
          onCancel={handleCancelDisclaimer}
        />
      )}

      {/* Header */}
      <header className="bg-gradient-to-b from-[#1a2e35] to-[#202c33] shadow-lg">
        {/* Logo Banner */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0d1418] via-[#111b21] to-[#0d1418]">
          {/* PDF Button */}
          <button
            onClick={exportToPDF}
            disabled={!hasConsultation}
            className={`text-lg transition-colors ${hasConsultation ? 'text-[#8696a0] hover:text-[#00a884]' : 'text-[#8696a0] opacity-30 cursor-not-allowed'}`}
            title={lang === 'en' ? 'Download PDF' : 'Descargar PDF'}
          >
            📄
          </button>
          <img 
            src="/logo_banner.png" 
            alt="Expat Advisor MX" 
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
            className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ${
              estado === 'jalisco'
                ? 'text-[#00a884] border-b-2 border-[#00a884] bg-gradient-to-t from-[#0a1a1a] to-transparent shadow-inner'
                : 'text-[#8696a0] hover:text-[#e9edef] hover:bg-[#1a2329] bg-[#202c33]'
            }`}
          >
            🌴 Puerto Vallarta
          </button>
          <button
            onClick={() => changeEstado('nayarit')}
            className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ${
              estado === 'nayarit'
                ? 'text-[#00a884] border-b-2 border-[#00a884] bg-gradient-to-t from-[#0a1a1a] to-transparent shadow-inner'
                : 'text-[#8696a0] hover:text-[#e9edef] hover:bg-[#1a2329] bg-[#202c33]'
            }`}
          >
            🌊 Riviera Nayarit
          </button>
        </div>
        
        {/* Subtitle + Usage Counter */}
        <div className="px-4 py-2 bg-gradient-to-r from-[#111b21] via-[#0d1418] to-[#111b21] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 bg-[#00a884]/20 text-[#00a884] rounded-full font-medium">FREE</span>
            <p className="text-xs text-[#8696a0]">{WELCOME_MESSAGES[estado].subtitle[lang]}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-xs font-medium ${dailyCount >= DAILY_LIMIT ? 'text-red-400' : 'text-[#00a884]'}`}>
              {dailyCount}/{DAILY_LIMIT}
            </span>
            <span className="text-[10px] text-[#667781]">{lang === 'en' ? 'today' : 'hoy'}</span>
          </div>
        </div>
        
        {/* AI Disclosure Banner */}
        <div className="px-4 py-1.5 bg-[#1a1a00] border-t border-b border-[#3a3a00]">
          <p className="text-[10px] text-[#cccc00] text-center font-medium">
            🤖 {lang === 'en' 
              ? 'AI-powered information tool • NOT legal, tax, or professional advice' 
              : 'Herramienta de información con AI • NO es asesoría legal, fiscal ni profesional'}
          </p>
        </div>
        
        {/* State difference note */}
        <div className="px-4 py-1 bg-[#0d1418] border-b border-[#2a3942]">
          <p className="text-[9px] text-[#667781] text-center">
            {lang === 'en' 
              ? '📍 Each tab applies the condo laws of that state (Jalisco vs Nayarit). Federal laws (residency, taxes) are the same.' 
              : '📍 Cada tab aplica las leyes de condominio de ese estado (Jalisco vs Nayarit). Leyes federales (residencia, impuestos) son iguales.'}
          </p>
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
                  ? 'bubble-user rounded-tr-none shadow-lg' 
                  : 'bubble-assistant rounded-tl-none shadow-md'
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
        
        {/* Limit Reached Message */}
        {limitReached && (
          <div className="flex justify-center message-appear">
            <div className="bg-[#2a3942] rounded-lg px-4 py-3 text-center max-w-[90%]">
              <p className="text-[#e9edef] text-sm mb-2">
                {lang === 'en' 
                  ? "You've reached today's free limit (10 questions)." 
                  : 'Alcanzaste el límite gratuito de hoy (10 preguntas).'}
              </p>
              <p className="text-[#8696a0] text-xs mb-3">
                {lang === 'en' 
                  ? 'Come back tomorrow or support us to keep this free!' 
                  : '¡Vuelve mañana o apóyanos para mantener esto gratis!'}
              </p>
              <a 
                href={KOFI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#00a884] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#02906f] transition-colors"
              >
                ☕ {lang === 'en' ? 'Buy us a coffee' : 'Invítanos un café'}
              </a>
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
            placeholder={limitReached 
              ? (lang === 'en' ? 'Daily limit reached...' : 'Límite diario alcanzado...') 
              : (lang === 'en' ? 'Type a message...' : 'Escribe un mensaje...')}
            className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00a884] placeholder-[#8696a0] disabled:opacity-50"
            disabled={isLoading || limitReached}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || limitReached}
            className="bg-[#00a884] text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-[#02906f] hover:shadow-lg hover:shadow-[#00a884]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {lang === 'en' ? 'Send' : 'Enviar'}
          </button>
        </form>
        
        {/* PDF Download Button */}
        <button
          onClick={exportToPDF}
          disabled={!hasConsultation}
          className={`w-full mt-2 py-2 rounded-lg text-xs font-medium transition-colors ${
            hasConsultation 
              ? 'bg-[#2a3942] text-[#00a884] hover:bg-[#3a4952] cursor-pointer' 
              : 'bg-[#2a3942] text-[#8696a0] opacity-50 cursor-not-allowed'
          }`}
        >
          📄 {lang === 'en' ? 'Download as PDF' : 'Descargar en PDF'}
        </button>
        
        {/* Support Button */}
        <a 
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-2 py-2.5 rounded-lg text-xs font-semibold text-center bg-gradient-to-r from-[#ff5e5b] to-[#ff8a5b] text-white hover:shadow-lg hover:shadow-[#ff5e5b]/30 transition-all duration-300"
        >
          ☕ {lang === 'en' ? 'Love it? Support on Ko-fi' : '¿Te gusta? Apoya en Ko-fi'}
        </a>
        
        {/* Disclaimer Footer */}
        <div className="mt-3 p-2 bg-[#1a1a00] rounded-lg border border-[#3a3a00]">
          <p className="text-[10px] text-[#cccc00] text-center leading-relaxed">
            ⚠️ {lang === 'en' 
              ? 'AI-powered information tool. NOT legal, tax, or professional advice. Always consult licensed professionals. Use at your own risk.' 
              : 'Herramienta de información con AI. NO es asesoría legal, fiscal ni profesional. Siempre consulta profesionales licenciados. Uso bajo tu propio riesgo.'}
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
