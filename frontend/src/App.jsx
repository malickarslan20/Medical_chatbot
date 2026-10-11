
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ChatbotPanel from "./components/ChatbotPanel";

export default function App() {
  return (
    <div className="min-h-screen bg-[#eef4f1] bg-[radial-gradient(circle_at_92%_8%,rgba(47,161,90,0.14),transparent_40%),radial-gradient(circle_at_4%_96%,rgba(47,161,90,0.12),transparent_38%)]">
      <Navbar />
      <main className="relative mx-auto max-w-4xl px-6 pb-16 pt-10">
        <Hero />
        <ChatbotPanel />
      </main>
    </div>
  );
}