import Sidebar from "./components/Sidebar";
import SwapCard from "./components/SwapCard";
import NFTs from "./components/NFTs";
import WalletConnect from "./components/WalletConnect";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("swap");
  return (
    <div className="flex min-h-screen">
      <Sidebar onNavigate={setPage} />
      <main className="flex-1 p-6 bg-[#0F0F0F] relative">
        <WalletConnect />
        {page === "swap" && <SwapCard />}
        {page === "nfts" && <NFTs />}
      </main>
    </div>
  );
}
