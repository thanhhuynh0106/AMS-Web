import React, { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
      setInput("");

      try {
        const response = await fetch("http://localhost:8080/chat/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        const botReply = data.reply || "Xin lỗi, tôi không thể trả lời lúc này.";

        setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: "Lỗi kết nối đến máy chủ!", sender: "bot" },
        ]);
      }
    }
  };

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      <button className="chat-toggle-btn" onClick={toggleChat}>
        💬
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">Hỗ trợ khách hàng</div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === "bot" ? (
                  <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
