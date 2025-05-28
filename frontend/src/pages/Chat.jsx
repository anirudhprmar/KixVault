import { useState, useEffect, useRef } from "react";
import { useChatBotStore } from '../store/useChatbotStore';
import { BiSend } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {MessageCircleMore, X} from 'lucide-react'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role:"ai",
    content: "Hi! I'm your sneaker expert. Ask me anything about sneakers!"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { aiResponse, response, loading } = useChatBotStore();

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update messages when AI responds
  useEffect(() => {
    if (response && !loading) {
      setMessages(prev => [...prev, { role: "ai", content: response }]);
    }
  }, [response, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Add user message immediately
    setMessages(prev => [...prev, { role: "user", content: input.trim() }]);
    const userInput = input.trim();
    setInput("");

    // Get AI response
    await aiResponse(userInput);
  };

  const [clicked,setClicked] = useState(false)

  return (
    <div>
      <div>
        <button
        onClick={()=>setClicked(!clicked)}
        className= {clicked ? "hidden" : "cursor-pointer block bg-gray-900 rounded-full border border-gray-50 p-2"}
        ><MessageCircleMore className="size-9 text-gray-50"/></button>
      </div>
    {clicked && <div className="fixed bottom-4 right-4 bg-white border border-gray-200 p-4 rounded-xl shadow-lg w-96 max-h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Sneaker Expert</h3>
        {/* <div className="h-2 w-2 rounded-full bg-green-500"></div> */}
        <button
        onClick={()=>setClicked(false)}
        className="cursor-pointer hover:bg-gray-100 p-1 rounded-lg transition-colors"
        ><X/></button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-[300px] max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              m.role === "user"
                ? "bg-blue-500 text-white ml-auto max-w-[80%]"
                : "bg-gray-100 mr-auto max-w-[80%]"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg w-fit">
            <AiOutlineLoading3Quarters className="animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about sneakers..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className={`p-3 rounded-lg ${
            loading || !input.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
        >
          <BiSend size={20} />
        </button>
      </div>
    </div>}
    </div>
  );
}