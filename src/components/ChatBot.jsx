import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm the GAIRL assistant. Ask me anything about the lab.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    // Add user message
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      // ─── Placeholder reply ────────────────────────────────
      // Replace this block with a real API call later.
      // E.g. const reply = await callYourChatbot(text);
      await new Promise((res) => setTimeout(res, 800));
      const reply =
        "Thanks for your message! The real chatbot isn't connected yet — " +
        "this is just a preview of the chat interface.";
      // ──────────────────────────────────────────────────────

      setMessages((m) => [...m, { from: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Connection issue. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        className="call-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <i
          className={`fas ${open ? "fa-times" : "fa-comment-dots"}`}
          aria-hidden="true"
        />
        <span>{open ? "Close" : "Chat"}</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat">
          <header className="chat-panel-hd">
            <span className="chat-panel-dot" />
            <div className="chat-panel-hd-text">
              <strong>GAIRL Assistant</strong>
              <small>Typically replies instantly</small>
            </div>
            <button
              type="button"
              className="chat-panel-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <i className="fas fa-times" />
            </button>
          </header>

          <div className="chat-panel-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg--${m.from}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg chat-msg--bot chat-msg--typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <form className="chat-panel-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              disabled={loading}
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={loading || !input.trim()}
            >
              <i className="fas fa-paper-plane" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
