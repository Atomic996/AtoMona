import { Menu, Sparkles } from "lucide-react";

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="w-16 bg-[#1A1A1A] text-white flex flex-col items-center py-6 space-y-6 shadow-xl">
      <Menu size={28} className="text-[#00FFA3]" />
      <button onClick={() => onNavigate("swap")}><Sparkles /> </button>
      <button onClick={() => onNavigate("nfts")}><span className="text-xs">NFTs</span></button>
    </aside>
  );
}
