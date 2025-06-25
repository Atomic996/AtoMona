import { useEffect, useState } from "react";

export default function WalletConnect() {
  const [account, setAccount] = useState(null);

  const connect = async () => {
    if (!window.ethereum) return;
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return (
    <div className="absolute top-4 right-6">
      {account ? (
        <span className="text-sm text-[#00FFA3]">{account.slice(0, 6)}...{account.slice(-4)}</span>
      ) : (
        <button
          onClick={connect}
          className="border border-[#00FFA3] px-4 py-1 rounded hover:bg-[#00FFA3] hover:text-black"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
