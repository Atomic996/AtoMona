// src/components/SwapCard.jsx
import { useState, useEffect, useCallback } from "react";
import { SWAP_CONTRACT_ADDRESS, ATOMON_SWAP_ABI, MONAD_TESTNET_CONFIG, TOKEN_ADDRESSES, ERC20_ABI } from "../config";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { RefreshCcw, Settings, ChevronDown, Exchange } from "lucide-react";

export default function SwapCard({ account }) {
  const [monAmount, setMonAmount] = useState("");
  const [atoAmount, setAtoAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [monBalance, setMonBalance] = useState("0");
  const [atoBalance, setAtoBalance] = useState("0");
  const [swapRate, setSwapRate] = useState(0);
  const [atoFeePercent, setAtoFeePercent] = useState(0);
  const [monFlatFee, setMonFlatFee] = useState(0);

  const fetchContractData = useCallback(async () => {
    if (!window.ethereum || !account) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const swapContract = new ethers.Contract(SWAP_CONTRACT_ADDRESS, ATOMON_SWAP_ABI, provider);

      const rate = await swapContract.rate();
      const atoFee = await swapContract.atoFeePercent();
      const monFee = await swapContract.monFlatFee();

      setSwapRate(Number(rate));
      setAtoFeePercent(Number(atoFee));
      setMonFlatFee(Number(ethers.formatEther(monFee)));

    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  }, [account]);


  const fetchBalances = useCallback(async () => {
    if (!window.ethereum || !account) {
      setMonBalance("0");
      setAtoBalance("0");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // رصيد MON (العملة الأصلية)
      const monBal = await provider.getBalance(account);
      setMonBalance(ethers.formatEther(monBal));

      // رصيد ATO (رمز ERC20)
      if (TOKEN_ADDRESSES.ATO && TOKEN_ADDRESSES.ATO !== "0x...") { // تأكد من تحديث العنوان
        const atoContract = new ethers.Contract(TOKEN_ADDRESSES.ATO, ERC20_ABI, provider);
        const atoBal = await atoContract.balanceOf(account);
        // يجب جلب decimals من عقد الرمز المميز إذا لم تكن ثابتة 18
        // هنا نفترض 18 للمثال، ولكن يفضل جلبها من عقد الـ ATO الفعلي:
        // const atoDecimals = await atoContract.decimals(); 
        // setAtoBalance(ethers.formatUnits(atoBal, atoDecimals));
        setAtoBalance(ethers.formatEther(atoBal)); // افتراض أن ATO لديه 18 decimals
      } else {
        setAtoBalance("0");
      }

    } catch (error) {
      console.error("Error fetching balances:", error);
      setMonBalance("0");
      setAtoBalance("0");
    }
  }, [account]);

  useEffect(() => {
    fetchContractData();
    fetchBalances();

    const interval = setInterval(() => {
        fetchBalances();
    }, 10000);
    return () => clearInterval(interval);
  }, [account, fetchContractData, fetchBalances]);

  useEffect(() => {
    if (monAmount && swapRate > 0) {
        const netMon = parseFloat(monAmount) - monFlatFee;
        if (netMon > 0) {
            const potentialAto = netMon * swapRate;
            const fee = (potentialAto * atoFeePercent) / 10000;
            setAtoAmount((potentialAto - fee).toFixed(4));
        } else {
            setAtoAmount("0");
        }
    } else {
      setAtoAmount("");
    }
  }, [monAmount, swapRate, atoFeePercent, monFlatFee]);


  const handleMonInputChange = (e) => {
    const value = e.target.value;
    // السماح فقط بالأرقام والنقطة العشرية
    if (/^\d*\.?\d*$/.test(value)) {
        setMonAmount(value);
    }
  };

  const handleSwap = async () => {
    if (!account) {
      setStatus("Please connect your wallet first!");
      return;
    }
    if (!monAmount || parseFloat(monAmount) <= monFlatFee) {
        setStatus(`Please enter a MON amount greater than the flat fee (${monFlatFee} MON).`);
        return;
    }
    if (parseFloat(monAmount) > parseFloat(monBalance)) {
        setStatus("Insufficient MON balance.");
        return;
    }

    try {
      setIsLoading(true);
      setStatus("⏳ Processing swap...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // التحقق من أن الساينر موجود ومتصل بالشبكة الصحيحة
      const currentNetwork = await provider.getNetwork();
      if (currentNetwork.chainId !== BigInt(MONAD_TESTNET_CONFIG.chainId)) {
        setStatus("❌ Please switch to Monad Testnet in your wallet.");
        setIsLoading(false);
        return;
      }

      const swapContract = new ethers.Contract(SWAP_CONTRACT_ADDRESS, ATOMON_SWAP_ABI, signer);

      const amountInWei = ethers.parseEther(monAmount);

      const tx = await swapContract.swap({ value: amountInWei });
      await tx.wait();

      setStatus("✅ Swap completed successfully!");
      setMonAmount("");
      setAtoAmount("");
      fetchBalances();
    } catch (err) {
      console.error("Swap error:", err);
      // رسائل خطأ أكثر وضوحًا
      let errorMessage = "Swap failed.";
      if (err.reason) {
          errorMessage += " Reason: " + err.reason;
      } else if (err.message) {
          errorMessage += " " + err.message;
      }
      setStatus("❌ " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1C1C1C] p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto border border-[#00FFA3] relative"
    >
      {/* Header and Settings */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Swap</h2>
        <div className="flex space-x-3">
          <button
            onClick={fetchBalances}
            className="text-gray-400 hover:text-[#00FFA3] transition"
            title="Refresh Balances"
            disabled={isLoading}
          >
            <RefreshCcw size={20} />
          </button>
          <button
            className="text-gray-400 hover:text-[#00FFA3] transition"
            title="Settings"
            disabled={isLoading}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Input - From */}
      <div className="bg-[#0F0F0F] rounded-xl p-4 mb-4 border border-[#00FFA3]/30">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="mon-input" className="text-sm text-gray-400">You pay</label>
          <span className="text-sm text-gray-400">Balance: {parseFloat(monBalance).toFixed(4)} MON</span>
        </div>
        <div className="flex items-center">
          <input
            id="mon-input"
            className="flex-1 bg-transparent text-white text-2xl font-bold focus:outline-none placeholder-gray-500"
            value={monAmount}
            onChange={handleMonInputChange}
            type="text" // تغيير إلى text للسماح بالتحكم في المدخلات بشكل أفضل
            inputMode="decimal" // لتحسين لوحة المفاتيح على الجوال
            placeholder="0.0"
            disabled={isLoading}
          />
          <button className="flex items-center bg-[#00FFA3] text-black px-4 py-2 rounded-lg font-bold hover:opacity-90 transition">
            MON <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Swap Arrow / Icon */}
      <div className="flex justify-center -mt-8 mb-4 z-10 relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#1C1C1C] border border-[#00FFA3] rounded-full p-2 text-[#00FFA3] cursor-pointer"
        >
          <Exchange size={24} />
        </motion.div>
      </div>

      {/* Input - To */}
      <div className="bg-[#0F0F0F] rounded-xl p-4 mb-6 border border-[#00FFA3]/30">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="ato-output" className="text-sm text-gray-400">You receive</label>
          <span className="text-sm text-gray-400">Balance: {parseFloat(atoBalance).toFixed(4)} ATO</span>
        </div>
        <div className="flex items-center">
          <input
            id="ato-output"
            className="flex-1 bg-transparent text-white text-2xl font-bold focus:outline-none"
            value={atoAmount}
            type="text"
            readOnly
            placeholder="0.0"
            disabled={isLoading}
          />
          <button className="flex items-center bg-[#FF00C8] text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition">
            ATO <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Swap Details */}
      <div className="text-xs text-gray-400 space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Rate:</span>
          <span>1 MON ≈ {swapRate} ATO</span>
        </div>
        <div className="flex justify-between">
          <span>Flat Fee (MON):</span>
          <span>{monFlatFee} MON</span>
        </div>
        <div className="flex justify-between">
          <span>ATO Fee (%):</span>
          <span>{(atoFeePercent / 100).toFixed(2)}%</span>
        </div>
      </div>


      {/* Swap Button */}
      <button
        onClick={handleSwap}
        className={`w-full py-3 rounded-xl font-bold text-lg transition duration-200
          ${account && !isLoading ? 'bg-[#00FFA3] text-black hover:opacity-90' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
        disabled={isLoading || !account}
      >
        {isLoading ? "Swapping..." : (account ? "Swap" : "Connect Wallet")}
      </button>

      {/* Status Message */}
      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-center text-sm ${status.startsWith("❌") ? "text-red-400" : "text-green-400"}`}
        >
          {status}
        </motion.p>
      )}
    </motion.div>
  );
  }
