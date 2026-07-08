import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface MessageType {
  sender: 'user' | 'agent';
  text: string;
}

const FAQS = [
  { question: "Is one booking valid at any branch?", answer: "Yes, exactly! One booking is valid for 24 hours across ANY branch in India. You can easily transfer your stay from one branch to another (e.g., Delhi to Mumbai) directly via your dashboard!" },
  { question: "How do I extend my stay?", answer: "Extending your stay is incredibly cheap! It costs only ₹49 for another 24 hours, regardless of your bed type. You can extend it easily in your digital pass dashboard." },
  { question: "What are the re-booking charges?", answer: "If you check out and re-book after 24 hours, charges are: ₹69 for Bunk Bed, ₹99 for Triple Sharing, ₹169 for Double Sharing, and ₹299 for a Couple Bed Private room." },
  { question: "Are the stays safe and clean?", answer: "Absolutely. All Humsafar branches feature 24x7 CCTV surveillance, secure personal lockers for every guest, daily professional cleaning/housekeeping, and verified stays." },
  { question: "How can I contact customer care?", answer: "Our customer support team is available 24x7 at +91 99999 00000, or you can speak directly to the Humsafar branch hosts at any check-in counter." }
];

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    { sender: 'agent', text: "Hello! Welcome to Humsafar. I am your virtual booking companion. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      let reply = "I'm glad to help! For booking adjustments or support, you can call us at +91 99999 00000 or talk to your branch desk manager.";
      
      const query = text.toLowerCase();
      if (query.includes('branch') || query.includes('valid') || query.includes('different city')) {
        reply = FAQS[0].answer;
      } else if (query.includes('extend') || query.includes('longer') || query.includes('extra hours')) {
        reply = FAQS[1].answer;
      } else if (query.includes('re-book') || query.includes('rebook') || query.includes('after 24')) {
        reply = FAQS[2].answer;
      } else if (query.includes('safe') || query.includes('cctv') || query.includes('security') || query.includes('clean') || query.includes('hygiene')) {
        reply = FAQS[3].answer;
      } else if (query.includes('contact') || query.includes('phone') || query.includes('support') || query.includes('customer')) {
        reply = FAQS[4].answer;
      }

      setMessages(prev => [...prev, { sender: 'agent', text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="support-widget">
      {!isOpen && (
        <button className="support-trigger" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="support-chat-box">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={18} className="text-gold" />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Humsafar Assistant</h4>
                <p style={{ fontSize: '0.65rem', color: 'var(--color-green)' }}>● 24x7 Live Help</p>
              </div>
            </div>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg agent" style={{ opacity: 0.6 }}>
                Typing response...
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="chat-suggestions">
            {FAQS.slice(0, 3).map((faq, idx) => (
              <span 
                key={idx} 
                className="chat-chip"
                onClick={() => handleSend(faq.question)}
              >
                {faq.question}
              </span>
            ))}
          </div>

          <form 
            className="chat-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
          >
            <input 
              type="text" 
              className="input-field" 
              placeholder="Ask me a question..."
              style={{ padding: '0.5rem 0.8rem', fontSize: '0.8rem' }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button 
              type="submit" 
              className="search-btn"
              style={{ padding: '0.5rem', width: 'auto', flexShrink: 0 }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
