import { useState } from 'react';
import { Send } from 'lucide-react';

export function AIChat({ waitTimes }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(`F${waitTimes.food} R${waitTimes.restroom}`);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const query = input.toLowerCase().trim();
    let reply = `F${waitTimes.food}`;
    
    if (query.includes('f') || query.includes('food')) reply = `Gate7:${waitTimes.food}m`;
    if (query.includes('r') || query.includes('rest')) reply = `Gate3:${waitTimes.restroom}m`;
    
    setResponse(reply);
    setInput('');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '12px',
      right: '12px',
      width: '140px',   // ← HALF SIZE!
      height: '160px',  // ← HALF SIZE!
      zIndex: 100
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.4)',
        height: '100%',
        overflow: 'hidden',
        fontSize: '0.7rem',  // ← Tiny text
        fontFamily: '-apple-system, sans-serif'
      }}>
        {/* Nano Header */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          padding: '6px 10px',
          color: 'white',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.75rem'
        }}>
          AI
        </div>

        {/* Single Line Response */}
        <div style={{
          height: '80px',   // ← Tiny!
          padding: '8px',
          background: '#f9fafb',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          fontWeight: '600',
          lineHeight: '1.2',
          color: '#1f2937'
        }}>
          {response}
        </div>

        {/* Nano Input */}
        <div style={{
          padding: '8px',
          borderTop: '1px solid #e5e7eb',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0,20))}  // 20 char!
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask.."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: '#f3f4f6',
              borderRadius: '8px',
              padding: '4px 8px',
              fontSize: '0.7rem',
              color: '#374151'
            }}
          />
          <Send 
            style={{width: '14px', height: '14px', color: input ? '#6366f1' : '#d1d5db'}}
            onClick={sendMessage}
            cursor={input ? 'pointer' : 'default'}
          />
        </div>
      </div>
    </div>
  );
}
