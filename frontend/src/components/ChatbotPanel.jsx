import { useState } from "react";
import CategoryCard from "./CategoryCard";
import ChatInputBar from "./ChatInputBar";
import categories from "../data/categories";
import { sendMessage } from "../api";

const AVATAR_SRC =
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80";

export default function ChatbotPanel({ userName = "Satyam" }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    if (loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const answer = await sendMessage(text);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-10 text-center">
      <div className="mx-auto mb-5 h-[110px] w-[110px] overflow-hidden rounded-full border-4 border-white ring-2 ring-emerald-600">
        <img
          src={AVATAR_SRC}
          alt="Health assistant avatar"
          className="h-full w-full object-cover"
        />
      </div>

      <h2 className="mb-1 text-2xl font-bold text-slate-900">
        Good Morning, {userName}
      </h2>
      <p className="mb-7 text-[15px] text-slate-500">How can I help you with?</p>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            label={category.label}
            image={category.image}
            featured={category.featured}
          />
        ))}
      </div>

      <p className="mb-6 text-sm text-slate-900">
        New to Chatbot AI? check{" "}
        <a href="#how-to-prompt" className="font-semibold text-emerald-600">
          how to prompt
        </a>
      </p>

      {(messages.length > 0 || loading) && (
        <ul
          className="mx-auto mb-5 flex max-w-xl list-none flex-col gap-2 p-0 text-left"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <li
              key={index}
              className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm ${
                message.role === "user"
                  ? "self-end bg-emerald-600 text-white"
                  : "self-start border border-gray-200 bg-white text-slate-900"
              }`}
            >
              {message.text}
            </li>
          ))}
          {loading && (
            <li className="self-start rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-slate-500">
              Thinking...
            </li>
          )}
        </ul>
      )}

      <ChatInputBar onSend={handleSend} disabled={loading} />
    </section>
  );
}