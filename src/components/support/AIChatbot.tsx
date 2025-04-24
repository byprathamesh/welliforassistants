
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot } from "lucide-react";

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

// Initial bot messages
const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'bot',
    text: "Hi there! I'm Welli Assistant. How can I help you today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

// Sample responses for common questions
const botResponses: Record<string, string> = {
  "payment": "Payments are processed weekly, with earnings from the previous week deposited every Monday. You can view your pending and processed payments in the Earnings section.",
  "emergency": "In case of a medical emergency, call 911 immediately. Stay with the patient until emergency services arrive, providing any appropriate first aid within your scope of practice.",
  "visits": "Visits are assigned based on your location, availability, and qualifications. You can also pick up additional visits from the 'Available Visits' section in your dashboard.",
  "equipment": "Each visit will specify the required equipment in the visit details. You should always have basic items like gloves, hand sanitizer, a stethoscope, and a blood pressure monitor.",
  "training": "Complete all required modules in the Learning Hub to receive your certification. Each module includes videos, text lessons, and quizzes.",
  "help": "You can reach our support team through chat, email at support@welli.com, or call +1 (555) 123-4567 during business hours (Mon-Fri, 9am-6pm EST).",
  "pay": "Your pay is calculated based on visit type, distance traveled, and any special requirements. Bonuses are available for urgent visits and excellent patient feedback.",
  "schedule": "You can set your availability in the Settings page. The system will only assign you visits during your available hours.",
  "cancel": "If you need to cancel a visit, please do so at least 4 hours in advance. Last-minute cancellations may affect your reliability score.",
  "patient": "Always introduce yourself upon arrival, verify the patient's identity, and explain the procedures you'll be performing.",
  "feedback": "Patients can rate their experience after each visit. High ratings contribute to your performance score and make you eligible for bonuses.",
  "app": "The Welli app helps you manage your visits, track earnings, complete training, and communicate with support. Make sure to keep it updated for the best experience.",
};

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      // Generate bot response based on keywords in user message
      let botResponse = "I'm not sure I understand. Could you rephrase your question? You can ask me about payments, emergency procedures, visits, required equipment, training, scheduling, cancellations, patient interactions, feedback, or general help.";
      
      const userMessageLower = inputText.toLowerCase();
      
      // Check for keywords and set appropriate response
      if (userMessageLower.includes("payment") || userMessageLower.includes("money") || userMessageLower.includes("paid") || userMessageLower.includes("earn")) {
        botResponse = botResponses.payment;
      } else if (userMessageLower.includes("emergency") || userMessageLower.includes("urgent")) {
        botResponse = botResponses.emergency;
      } else if (userMessageLower.includes("visit") || userMessageLower.includes("assign") || userMessageLower.includes("schedule")) {
        botResponse = botResponses.visits;
      } else if (userMessageLower.includes("equipment") || userMessageLower.includes("tool") || userMessageLower.includes("bring")) {
        botResponse = botResponses.equipment;
      } else if (userMessageLower.includes("train") || userMessageLower.includes("learn") || userMessageLower.includes("module")) {
        botResponse = botResponses.training;
      } else if (userMessageLower.includes("help") || userMessageLower.includes("support") || userMessageLower.includes("contact")) {
        botResponse = botResponses.help;
      } else if (userMessageLower.includes("pay") || userMessageLower.includes("salary") || userMessageLower.includes("wage")) {
        botResponse = botResponses.pay;
      } else if (userMessageLower.includes("schedule") || userMessageLower.includes("availability") || userMessageLower.includes("time")) {
        botResponse = botResponses.schedule;
      } else if (userMessageLower.includes("cancel") || userMessageLower.includes("reschedule")) {
        botResponse = botResponses.cancel;
      } else if (userMessageLower.includes("patient") || userMessageLower.includes("client")) {
        botResponse = botResponses.patient;
      } else if (userMessageLower.includes("feedback") || userMessageLower.includes("rating") || userMessageLower.includes("review")) {
        botResponse = botResponses.feedback;
      } else if (userMessageLower.includes("app") || userMessageLower.includes("application") || userMessageLower.includes("welli")) {
        botResponse = botResponses.app;
      }
      
      // Add bot response
      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-3 border-b">
        <div className="w-8 h-8 rounded-full bg-welli-accent flex items-center justify-center text-white font-bold mr-2">
          W
        </div>
        <div>
          <h3 className="font-medium">Welli Assistant</h3>
          <p className="text-xs text-welli-textSecondary">AI Chatbot</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg flex ${
                message.sender === 'user' 
                  ? 'bg-welli-accent text-white' 
                  : 'bg-gray-100'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-welli-accent flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                  W
                </div>
              )}
              {message.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                  <User className="h-3 w-3 text-gray-700" />
                </div>
              )}
              <div>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' 
                    ? 'text-white/70' 
                    : 'text-welli-textSecondary'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg flex">
              <div className="w-6 h-6 rounded-full bg-welli-accent flex items-center justify-center text-white font-bold mr-2">
                W
              </div>
              <div className="flex space-x-1 items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '200ms'}} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '400ms'}} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t flex gap-2">
        <Input 
          placeholder="Type your question..." 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          className="focus-visible:ring-welli-accent"
        />
        <Button 
          size="icon" 
          onClick={handleSendMessage} 
          disabled={isTyping || !inputText.trim()}
          className="bg-welli-accent hover:bg-welli-accent/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIChatbot;
