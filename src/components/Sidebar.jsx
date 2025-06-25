// src/components/Sidebar.jsx
import { Exchange, Gem } from "lucide-react";

export default function Sidebar({ onNavigate, currentPage }) {
  const navItemClass = (pageName) =>
    `p-2 rounded-lg transition duration-200 ${
      currentPage === pageName ? "bg-[#00FFA3]/20 text-[#00FFA3]" : "text-gray-400 hover:text-white"
    }`;

  return (
    <aside className="w-20 bg-[#1A1A1A] text-white flex flex-col items-center py-8 space-y-8 shadow-xl border-r border-[#00FFA3]/20">
      <div className="text-xl font-bold text-[#00FFA3]">Ato</div>
      
      <button 
        onClick={() => onNavigate("swap")} 
        className={navItemClass("swap")}
        title="Swap"
      >
        <Exchange size={24} />
      </button>

      <button 
        onClick={() => onNavigate("nfts")} 
        className={navItemClass("nfts")}
        title="NFTs"
      >
        <Gem size={24} />
      </button>
    </aside>
  );
}
