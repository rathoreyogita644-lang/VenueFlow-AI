import { useState } from 'react';
import { MessageCircle, Send, Mic, Bot } from 'lucide-react';

export function AIChat({ waitTimes, location }) {
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      text: "Hello! I'm your stadium assistant. Ask about wait times, directions, food, or parking!", 
      avatar: '🤖'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = { role: 'user', text: input.trim(), avatar: '👤' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Smart AI Responses
    setTimeout(() => {
      let response = "";
      
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('food') || lowerInput.includes('hot dog') || lowerInput.includes('burger')) {
        response = `🍔 Food at Gate 7: ${waitTimes.food}min wait. 180m from Section 112. Turn LEFT at concession stand.`;
      } else if (lowerInput.includes('bathroom') || lowerInput.includes('restroom') || lowerInput.includes('toilet')) {
        response = `🚻 Restrooms at Gate 3: ${waitTimes.restroom}min. Closest option - 90m straight ahead.`;
      } else if (lowerInput.includes('beer') || lowerInput.includes('drink') || lowerInput.includes('concession')) {
        response = `🍺 Beer at Section 12: ${waitTimes.concessions}min. Take elevator to Level 2 (220m).`;
      } else if (lowerInput.includes('gate') || lowerInput.includes('entry') || lowerInput.includes('ticket')) {
        response = `🚪 Entry Gate wait: ${waitTimes.entry}min. Use mobile ticket. Fastest: Gate 7.`;
      } else if (lowerInput.includes('park') || lowerInput.includes('car')) {
        response = `🚗 Parking Lot B: 5min walk. Follow green signs from Section 112. Valet available.`;
      } else if (lowerInput.includes('seat') || lowerInput.includes('section')) {
        response = `🎫 You're in Section 112. Seat map: Aisle 5. Half-time show at Center Court.`;
      } else {
        response = `I can help with navigation, wait times (${waitTimes.food}min food), seating, parking, or food recommendations! What do you need?`;
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: response, avatar: '🤖' }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="ai-chat" style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '380px',
      maxWidth: '90vw',
      zIndex: 1000
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(30px)',
        borderRadius: '28px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.3)',
        overflow: 'hidden',
        maxHeight: '500px'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Bot style={{width: '28px', height: '28px', color: 'white'}} />
          <div style={{color: 'white', fontWeight: '700', fontSize: '1.1rem'}}>
            AI Assistant
          </div>
        </div>

        {/* Messages */}
        <div style={{
          height: '320px',
          overflowY: 'auto',
          padding: '24px',
          background: 'rgba(248,250,252,0.7)'
        }}>
          {messages.map((msg, i) => (
            <div 
              key={i} 
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                justifyContent: msg.role === 'ai' ? 'flex-start' : 'flex-end'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: msg.role === 'ai' ? '#6366f1' : '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0
              }}>
                {msg.avatar}
              </div>
              <div style={{
                maxWidth: '280px',
                padding: '16px 20px',
                borderRadius: '22px',
                background: msg.role === 'ai' ? 
                  'linear-gradient(135deg, #f8fafc, #e2e8f0)' : 
                  'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: msg.role === 'ai' ? '#1e293b' : 'white',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                boxShadow: msg.role === 'ai' ? 
                  '0 4px 12px rgba(0,0,0,0.1)' : 
                  '0 6px 20px rgba(59,130,246,0.4)',
                wordBreak: 'break-word'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-start'}}>
              <div style={{
                width: '40px', height: '40px',
                borderRadius: '50%', background: '#6366f1',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                🤖
              </div>
              <div style={{
                padding: '16px 20px', borderRadius: '22px',
                background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                color: '#64748b', fontSize: '0.95rem'
              }}>
                <div style={{width: '60px', height: '4px', background: '#cbd5e1', borderRadius: '2px', animation: 'typing 1.5s infinite'}}>
                  <div style={{width: '30px', height: '4px', background: '#6366f1', borderRadius: '2px'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          background: 'rgba(255,255,255,0.5)'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '25px',
            padding: '12px 20px',
            border: '2px solid rgba(0,0,0,0.1)'
          }}>
            <Mic style={{width: '20px', height: '20px', color: '#64748b', opacity: 0.6}} />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about wait times, directions, food..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '0.95rem',
                background: 'transparent',
                color: '#1e293b'
              }}
              maxLength={200}
            />
            <Send 
              style={{width: '22px', height: '22px', color: input ? '#6366f1' : '#cbd5e1', cursor: input ? 'pointer' : 'default'}}
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes typing {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  );
}
