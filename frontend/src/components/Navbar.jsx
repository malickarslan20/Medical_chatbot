export default function Navbar() {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-gray-200 bg-white px-8 py-4">
      <a href="/" className="flex items-center gap-2.5">
        <img
          src="/logo.png"
          alt="Pak's Unique Healthcare Platform logo"
          className="h-9 w-auto"
        />
        <span className="hidden whitespace-nowrap text-[15px] font-semibold text-slate-900 sm:inline">
          Pak&apos;s Unique Healthcare Platform
        </span>
      </a>

      <p className="hidden flex-1 text-center text-sm font-medium tracking-wide text-slate-500 md:block">
        Trusted health guidance, anytime
      </p>

      <button
        type="button"
        className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Login
      </button>
    </header>
  );
}