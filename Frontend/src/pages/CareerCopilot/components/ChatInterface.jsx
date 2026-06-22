import { useState } from 'react'
import { Card, Input, Button } from '../../../components'
import { Send } from 'lucide-react'

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi — I’m your Career Copilot. How can I help today?' },
  ])
  const [text, setText] = useState('')

  function send() {
    if (!text.trim()) return
    setMessages((m) => [...m, { from: 'user', text }])
    setText('')
    setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: 'Here are a few suggestions based on that.' }]), 600)
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="h-60 overflow-y-auto rounded-md border border-white/[0.04] bg-[#071024]/30 p-4">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 max-w-[80%] ${m.from === 'bot' ? 'text-slate-300' : 'ml-auto text-white'}`}>
              <div className="rounded-lg bg-white/3 p-3 text-sm">{m.text}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask Copilot about resumes, interviews, roadmaps..." />
          <Button onClick={send} leftIcon={Send}>Send</Button>
        </div>
      </div>
    </Card>
  )
}
