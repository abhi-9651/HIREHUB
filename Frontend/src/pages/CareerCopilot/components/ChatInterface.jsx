import { useState, useEffect, useRef } from 'react'
import { Card, Input, Button } from '../../../components'
import { Send, Bot } from 'lucide-react'

function MarkdownRenderer({ content }) {
  if (!content) return null

  const lines = content.split('\n')
  const elements = []
  
  let inList = false
  let listItems = []
  let listType = null // 'ul' or 'ol'
  
  let inTable = false
  let tableHeaders = []
  let tableRows = []

  const flushList = (key) => {
    if (listItems.length > 0) {
      const Tag = listType === 'ol' ? 'ol' : 'ul'
      const listClass = listType === 'ol' 
        ? 'list-decimal pl-5 space-y-1 my-2 text-slate-300' 
        : 'list-disc pl-5 space-y-1 my-2 text-slate-300'
      elements.push(
        <Tag key={`list-${key}`} className={listClass}>
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkup(item)}</li>
          ))}
        </Tag>
      )
      listItems = []
      inList = false
      listType = null
    }
  }

  const flushTable = (key) => {
    if (inTable) {
      elements.push(
        <div key={`table-wrapper-${key}`} className="my-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#070b19]/90 shadow-lg">
          <table className="w-full border-collapse text-left text-xs sm:text-sm text-slate-300">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                {tableHeaders.map((header, idx) => (
                  <th key={idx} className="p-3 font-semibold text-slate-200">
                    {renderInlineMarkup(header.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {tableRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-white/[0.01]">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="p-3">
                      {renderInlineMarkup(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      tableHeaders = []
      tableRows = []
      inTable = false
    }
  }

  const renderInlineMarkup = (text) => {
    if (!text) return ''
    const parts = text.split(/\*\*([^*]+)\*\*/g)
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-semibold text-white">{part}</strong>
      }
      
      const subparts = part.split(/`([^`]+)`/g)
      return subparts.map((subpart, subIdx) => {
        if (subIdx % 2 === 1) {
          return <code key={subIdx} className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs font-mono text-[#C4B5FD]">{subpart}</code>
        }
        return subpart
      })
    })
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Table Row
    if (trimmed.startsWith('|')) {
      flushList(i)
      inTable = true
      const cells = trimmed.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1)
      
      // Separator row check
      if (trimmed.includes('---') && !trimmed.match(/[a-zA-Z0-9]/)) {
        continue
      }
      
      if (tableHeaders.length === 0) {
        tableHeaders = cells
      } else {
        tableRows.push(cells)
      }
      continue
    } else {
      flushTable(i)
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      flushList(i)
      elements.push(
        <h1 key={i} className="mt-5 mb-2.5 text-base font-bold text-white border-b border-white/[0.06] pb-1">
          {renderInlineMarkup(trimmed.slice(2))}
        </h1>
      )
      continue
    }

    if (trimmed.startsWith('## ')) {
      flushList(i)
      elements.push(
        <h2 key={i} className="mt-4 mb-2 text-sm font-semibold text-[#A78BFA]">
          {renderInlineMarkup(trimmed.slice(3))}
        </h2>
      )
      continue
    }

    if (trimmed.startsWith('### ')) {
      flushList(i)
      elements.push(
        <h3 key={i} className="mt-3 mb-1 text-xs font-semibold text-slate-200">
          {renderInlineMarkup(trimmed.slice(4))}
        </h3>
      )
      continue
    }

    // Unordered lists
    const ulMatch = trimmed.match(/^[\-\*]\s+(.*)/)
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        flushList(i)
        inList = true
        listType = 'ul'
      }
      listItems.push(ulMatch[1])
      continue
    }

    // Ordered lists
    const olMatch = trimmed.match(/^\d+\.\s+(.*)/)
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        flushList(i)
        inList = true
        listType = 'ol'
      }
      listItems.push(olMatch[1])
      continue
    }

    if (!trimmed) {
      flushList(i)
      continue
    }

    if (inList) {
      if (line.startsWith('  ') || line.startsWith('\t')) {
        listItems[listItems.length - 1] += '\n' + trimmed
        continue
      } else {
        flushList(i)
      }
    }

    elements.push(
      <p key={i} className="text-slate-300 text-sm leading-relaxed mt-1.5">
        {renderInlineMarkup(trimmed)}
      </p>
    )
  }

  flushList(lines.length)
  flushTable(lines.length)

  return <div className="space-y-1.5">{elements}</div>
}

export default function ChatInterface({ messages, onSendMessage, isTyping }) {
  const [text, setText] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  function send() {
    if (!text.trim()) return
    onSendMessage(text)
    setText('')
  }

  return (
    <Card id="copilot-chat">
      <div className="flex flex-col gap-4">
        <div 
          ref={scrollRef} 
          className="h-[480px] overflow-y-auto rounded-xl border border-white/[0.04] bg-[#071024]/30 p-4 scroll-smooth"
        >
          {messages.map((m, i) => (
            <div key={m.id || i} className={`mb-4 w-full flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex items-start gap-2.5 max-w-[90%] ${m.from === 'bot' ? 'w-full' : ''}`}>
                {m.from === 'bot' && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#C4B5FD]">
                    <Bot className="size-4" />
                  </div>
                )}
                <div className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${m.from === 'bot' ? 'bg-white/[0.04] border border-white/[0.03] w-full text-slate-300' : 'bg-[#8B5CF6] text-white ml-auto shadow-md shadow-purple-950/20'}`}>
                  {m.from === 'bot' ? (
                    <MarkdownRenderer content={m.text} />
                  ) : (
                    m.text.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                        {line}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="mb-3 max-w-[85%] text-slate-300">
              <div className="flex items-start gap-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#C4B5FD]">
                  <Bot className="size-4" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/[0.03] px-4 py-3">
                  <span className="size-2 animate-bounce rounded-full bg-[#8B5CF6]" style={{ animationDelay: '0ms' }} />
                  <span className="size-2 animate-bounce rounded-full bg-[#8B5CF6]" style={{ animationDelay: '150ms' }} />
                  <span className="size-2 animate-bounce rounded-full bg-[#8B5CF6]" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Input 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') send()
            }}
            placeholder="Ask Copilot about resumes, interviews, roadmaps..." 
            className="bg-[#0B1224]/50 border-white/10 focus:border-[#8B5CF6]"
          />
          <Button onClick={send} leftIcon={Send} className="px-6">Send</Button>
        </div>
      </div>
    </Card>
  )
}

