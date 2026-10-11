
import { Menu } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-6 text-center">
      {/* <button
        type="button"
        aria-label="Open menu"
        className="absolute right-0 top-2 text-slate-900"
      >
        <Menu size={22} strokeWidth={2} />
      </button> */}

      <h1 className="mb-6 text-[34px] font-bold leading-tight text-slate-900">
        Pak&apos;s Unique
        <br />
        Healthcare Platform
      </h1>

      <button
        type="button"
        className="rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        New Chat
      </button>
    </section>
  );
}