import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export function AIChat({ waitTimes }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Food:${waitTimes.food}m Rest:${waitTimes.restroom}m` }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev.slice(-1), { role: 'user', text: input.trim() }]);
    setInput('');

    setTimeout(() => {
      const text = input.toLowerCase();
      let response = `Food: ${waitTimes.food}m`;
      
      if (text.includes('food')) response = `Gate 7: ${waitTimes.food}m`;
      if (text.includes('rest')) response = `Gate 3: ${waitTimes.restroom}m`;
      if (text.includes('beer')) response = `Sec12: ${waitTimes.concessions}m`;
      
      setMessages(prev => [...prev.slice(-1), { role: 'ai', text: response }]);
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      width: '280px',    // ← 25% smaller
      height: '320px',   // ← 25% smaller
      zIndex: 100
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.4)',
        height: '100%',
        overflow: 'hidden',
        fontFamily: '-apple-system, sans-serif',
        fontSize: '0.85rem'
      }}>
        {/* Mini Header */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          padding: '12px 16px',
          color: 'white',
          fontWeight: '700',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <MessageCircle style={{width: '16px', height: '16px'}} />
          AI
        </div>

        {/* Tiny Messages */}
        <div style={{
          height: '200px',  // ← Much smaller
          overflowY: 'auto',
          padding: '12px',
          background: '#f9fafb'
        }}>
          {messages.slice(-2).map((msg, i) => (  // ← Only LAST 2 messages!
            <div 
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                gap: '6px',
                marginBottom: '8px',
                fontSize: '0.82rem',
                lineHeight: '1.3'
              }}
            >
              {msg.role === 'ai' && (
                <div style={{
                  width: '22px', height: '22px',
                  borderRadius: '50%', background: '#6366f1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', color: 'white'
                }}>
                  🤖
                </div>
              )}
              <div style={{
                maxWidth: '180px',
                padding: '8px 12px',
                borderRadius: '12px',
                background: msg.role === 'ai' ? '#e5e7eb' : '#3b82f6',
                color: msg.role === 'ai' ? '#374151' : 'white',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Micro Input */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #e5e7eb',
          background: 'white'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            background: '#f3f4f6',
            borderRadius: '16px',
            padding: '8px 12px'
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0,50))}  // 50 char limit
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '0.82rem',
                background: 'transparent',
                color: '#374151',
                padding: '2px 0'
              }}
            />
            <Send 
              style={{width: '16px', height: '16px', color: input ? '#6366f1' : '#d1d5db'}}
              onClick={sendMessage}
              cursor={input ? 'pointer' : 'default'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
