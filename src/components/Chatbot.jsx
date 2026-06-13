import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import './Chatbot.css';

const CHAT_RESP = {
  hi: "Hi! 👋 I'm Aman's assistant. Ask about his skills, experience, or contact!",
  hello: "Hello! Welcome to Aman's portfolio. How can I help you today?",
  skills: "Aman is skilled in Java, Spring Boot, ReactJS, Next.js, TypeScript, MySQL, Docker, Git and more! 🚀",
  experience: "Aman has 3+ years as a Software Engineer at PCS (2023–2026) and is currently a Lecturer at Reliance College (2026–present).",
  education: "Aman holds a BCA from Reliance College (TU) 2022, +2 from Global College, and SLC from KIS.",
  contact: "Email: developer.amanregmi@gmail.com · Phone: +977 9843804997 · Location: Kathmandu, Nepal 📍",
  java: "Aman is highly proficient in Java — Spring Boot, Spring MVC, Spring Security, JPA, OOP, Multithreading, and REST APIs.",
  react: "Yes! Aman works with ReactJS, Next.js, TypeScript, Tailwind CSS, Bootstrap, and PrimeReact.",
  hire: "Aman is open to opportunities! Message him via the Contact section or email developer.amanregmi@gmail.com directly. 📩",
  rotaract: "Aman was the President of the Rotaract Club of Reliance College (2021–22), leading 110+ members and organizing 26+ community projects! 🌟",
  default: "Great question! Check the sections on this page or contact Aman at developer.amanregmi@gmail.com 😊",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const initChat = () => {
    if (messages.length === 0) {
      setMessages([
        { sender: 'bot', text: "👋 Hi! I'm Aman's virtual assistant. How can I help you today?" },
        { sender: 'bot', text: "Ask about skills, experience, education, or how to contact Aman!" }
      ]);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      initChat();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputValue('');

    // Generate response with small delay
    setTimeout(() => {
      const responseText = getResponse(text);
      setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
    }, 450);
  };

  const getResponse = (input) => {
    const k = input.toLowerCase();
    
    // Keyword match
    if (k.includes('skill') || k.includes('stack') || k.includes('technolog')) return CHAT_RESP.skills;
    if (k.includes('exp') || k.includes('work') || k.includes('job') || k.includes('career')) return CHAT_RESP.experience;
    if (k.includes('edu') || k.includes('college') || k.includes('school') || k.includes('degree')) return CHAT_RESP.education;
    if (k.includes('contact') || k.includes('phone') || k.includes('email') || k.includes('call') || k.includes('address')) return CHAT_RESP.contact;
    if (k.includes('java') || k.includes('spring') || k.includes('boot') || k.includes('backend')) return CHAT_RESP.java;
    if (k.includes('react') || k.includes('next') || k.includes('frontend') || k.includes('html') || k.includes('css')) return CHAT_RESP.react;
    if (k.includes('hire') || k.includes('job') || k.includes('recruit') || k.includes('opportunity')) return CHAT_RESP.hire;
    if (k.includes('rotaract') || k.includes('volunteer') || k.includes('leader')) return CHAT_RESP.rotaract;
    if (k.includes('hi') || k.includes('hello') || k.includes('hey')) return CHAT_RESP.hello;

    return CHAT_RESP.default;
  };

  const suggestions = ['skills', 'experience', 'contact', 'hire me'];

  return (
    <>
      {/* Pulse button */}
      <button 
        className="chat-toggle interactive" 
        onClick={handleToggle}
        aria-label="Toggle virtual assistant chat"
      >
        <span className="chat-pulse"></span>
        <MessageSquare size={22} style={{ color: '#fff' }} />
      </button>

      {/* Chat window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-hdr">
          <div className="chat-av">AR</div>
          <div className="chat-inf">
            <h4>Aman's Assistant</h4>
            <p>Online</p>
          </div>
          <div className="chat-online"></div>
          <button 
            className="chat-close-btn interactive" 
            onClick={handleToggle}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        <div className="chat-msgs">
          {messages.map((msg, i) => (
            <div key={i} className={`cmsg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-sugs">
          {suggestions.map((sug) => (
            <button 
              key={sug} 
              className="csug interactive"
              onClick={() => handleSend(sug)}
            >
              {sug}
            </button>
          ))}
        </div>

        <div className="chat-inp-row">
          <input 
            type="text" 
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="interactive"
          />
          <button className="chat-send-btn interactive" onClick={() => handleSend()} aria-label="Send message">
            <Send size={15} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
