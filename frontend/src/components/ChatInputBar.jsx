import React, { useState } from "react";
import { Plus, Mic, Send } from "lucide-react";

export default function ChatInputBar({ onSend, disabled = false }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    setValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSend();
  };

  return (
    <div className="mx-auto flex max-w-xl items-center gap-3 rounded-full border border-gray-200 bg-white py-2.5 pl-5 pr-3">
      <button
        type="button"
        aria-label="Add attachment"
        className="grid place-items-center text-slate-400"
      >
        <Plus size={20} strokeWidth={2} />
      </button>

      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about your health"
        aria-label="Ask anything about your health"
        className="flex-1 border-none bg-transparent text-sm outline-none"
      />

      <button
        type="button"
        aria-label="Voice input"
        className="grid place-items-center text-slate-400"
      >
        <Mic size={20} strokeWidth={2} />
      </button>

      <button
        type="button"
        onClick={handleSend}
        disabled={disabled}
        className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        <Send size={16} strokeWidth={2} />
        Send
      </button>
    </div>
  );
}