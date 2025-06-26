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
    <div className="flex min-h-screen bg-[#0F0F0F] text-white">
      <Sidebar onNavigate={setPage} currentPage={page} />
      <main className="flex-1 p-6 relative flex flex-col items-center justify-center">
        <WalletConnect setAccount={setAccount} account={account} />
        {page === "swap" && <SwapCard account={account} />}
        {page === "nfts" && <NFTs />}
      </main>
    </div>
  );
}
