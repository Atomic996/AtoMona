// src/App.jsx
import Sidebar from "./components/Sidebar";
import SwapCard from "./components/SwapCard";
import NFTs from "./components/NFTs";
import WalletConnect from "./components/WalletConnect";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("swap");
  const [account, setAccount] = useState(null); // لإدارة حالة الحساب هنا

  return (
    <div className="flex min-h-screen bg-[#0F0F0F] text-white"> {/* تم تطبيق الخلفية الأساسية هنا */}
      <Sidebar onNavigate={setPage} currentPage={page} /> {/* تمرير currentPage */}
      <main className="flex-1 p-6 relative flex flex-col items-center justify-center"> {/* توسيط المحتوى */}
        <WalletConnect setAccount={setAccount} account={account} /> {/* تمرير setAccount و account */}
        {page === "swap" && <SwapCard account={account} />} {/* تمرير account إلى SwapCard */}
        {page === "nfts" && <NFTs />}
      </main>
    </div>
  );
        }
