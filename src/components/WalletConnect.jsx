// src/components/WalletConnect.jsx
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { MONAD_TESTNET_CONFIG } from "../config";

export default function WalletConnect({ setAccount, account }) {
  const [networkStatus, setNetworkStatus] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert("Please install MetaMask or another Ethereum wallet!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      await switchNetwork();

      setNetworkStatus("");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setNetworkStatus("Error connecting: " + (error.message || error.code));
    }
  };

  const switchNetwork = async () => {
    // تأكد من وجود window.ethereum قبل محاولة الوصول إليه
    if (!window.ethereum) {
        setNetworkStatus("MetaMask is not installed.");
        return;
    }
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== BigInt(MONAD_TESTNET_CONFIG.chainId)) {
        try {
          setNetworkStatus("Switching to Monad Testnet...");
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: MONAD_TESTNET_CONFIG.chainId }],
          });
          setNetworkStatus("Connected to Monad Testnet!");
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              setNetworkStatus("Adding Monad Testnet to wallet...");
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: MONAD_TESTNET_CONFIG.chainId,
                    chainName: MONAD_TESTNET_CONFIG.chainName,
                    rpcUrls: MONAD_TESTNET_CONFIG.rpcUrls,
                    blockExplorerUrls: MONAD_TESTNET_CONFIG.blockExplorerUrls,
                    nativeCurrency: MONAD_TESTNET_CONFIG.nativeCurrency,
                  },
                ],
              });
              setNetworkStatus("Connected to Monad Testnet!");
            } catch (addError) {
              console.error("Failed to add Monad network:", addError);
              setNetworkStatus("Failed to add Monad Testnet.");
            }
          } else {
            console.error("Failed to switch to Monad network:", switchError);
            setNetworkStatus("Failed to switch to Monad Testnet.");
          }
        }
      } else {
        setNetworkStatus("Connected to Monad Testnet!");
      }
    } catch (err) {
        console.error("Error getting network details or provider:", err);
        setNetworkStatus("Error checking network.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      // تحقق من الاتصال الأولي عند التحميل
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            switchNetwork();
          } else {
            setAccount(null); // لا توجد حسابات متصلة
          }
        })
        .catch(console.error);

      // استمع لتغييرات الحسابات
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0] || null);
        if (accounts[0]) {
            switchNetwork();
        } else {
            setNetworkStatus("Wallet disconnected.");
        }
      };

      // استمع لتغييرات الشبكة
      const handleChainChanged = (chainId) => {
        // إعادة تحميل الصفحة لتحديث Provider والحالات بشكل صحيح
        window.location.reload(); 
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      // تنظيف المستمعين عند إلغاء تحميل المكون
      return () => {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
        window.ethereum.off("chainChanged", handleChainChanged);
      };
    } else {
        setNetworkStatus("MetaMask not detected.");
    }
  }, [setAccount]); // إضافة setAccount إلى dependencies لمنع التحذيرات، رغم أنها مستقرة

  return (
    <div className="absolute top-4 right-6 flex items-center space-x-2">
      {networkStatus && <span className="text-xs text-gray-400">{networkStatus}</span>}
      {account ? (
        <span className="text-sm text-[#00FFA3] border border-[#00FFA3] px-3 py-1 rounded-full bg-[#00FFA3]/10">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        <button
          onClick={connectWallet}
          className="border border-[#00FFA3] px-4 py-1 rounded-full hover:bg-[#00FFA3] hover:text-black transition duration-200"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
  }
