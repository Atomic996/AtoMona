import { useState } from "react";
import { SWAP_CONTRACT_ADDRESS } from "../config";
import { ethers } from "ethers";
import { motion } from "framer-motion";

export default function SwapCard() {
  const [amount, setAmount] = useState("0.01");
  const [status, setStatus] = useState("");

  const swap = async () => {
    try {
      setStatus("⏳ Processing...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: SWAP_CONTRACT_ADDRESS,
        value: ethers.parseEther(amount)
      });
      await tx.wait();
      setStatus("✅ Swap completed!");
    } catch (err) {
      setStatus("❌ " + err.message);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-[#1C1C1C] p-6 rounded-2xl shadow-2xl w-full max-w-md mx-auto mt-10 text-center border border-[#00FFA3]"
    >
      <h2 className="text-2xl font-bold mb-4">Swap MON → ATO</h2>
      <input
        className="p-2 w-full text-black rounded mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
      />
      <button
        onClick={swap}
        className="bg-[#00FFA3] text-black px-6 py-2 rounded-xl hover:scale-105 transition"
      >
        Swap
      </button>
      <p className="mt-4 text-sm">{status}</p>
    </motion.div>
  );
}
