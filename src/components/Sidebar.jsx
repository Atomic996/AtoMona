// src/components/Sidebar.jsx
import { Menu, Sparkles } from "lucide-react"; // استيراد أيقونات Menu و Sparkles فقط

export default function Sidebar({ onNavigate, currentPage }) {
  return (
    <aside className="w-16 bg-[#1A1A1A] text-white flex flex-col items-center py-6 space-y-6 shadow-xl">
      {/* أيقونة القائمة (Menu) */}
      <button
        onClick={() => onNavigate("swap")}
        className={`p-2 rounded-full transition-colors ${
          currentPage === "swap" ? "bg-[#00FFA3] text-black" : "text-gray-400 hover:bg-[#00FFA3]/20"
        }`}
        title="Swap"
      >
        <Menu size={28} /> {/* استخدام أيقونة Menu */}
      </button>

      {/* أيقونة Sparkles (للـ Swap) */}
      <button
        onClick={() => onNavigate("swap")}
        className={`p-2 rounded-full transition-colors ${
          currentPage === "swap" ? "bg-[#00FFA3] text-black" : "text-gray-400 hover:bg-[#00FFA3]/20"
        }`}
        title="Swap"
      >
        <Sparkles size={28} /> {/* استخدام أيقونة Sparkles */}
      </button>

      {/* زر الـ NFTs */}
      <button
        onClick={() => onNavigate("nfts")}
        className={`p-2 rounded-full transition-colors ${
          currentPage === "nfts" ? "bg-[#00FFA3] text-black" : "text-gray-400 hover:bg-[#00FFA3]/20"
        }`}
        title="NFTs"
      >
        <span className="text-xs">NFTs</span>
      </button>
    </aside>
  );
        }
