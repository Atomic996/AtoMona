// src/config.js
export const SWAP_CONTRACT_ADDRESS = "0x51f5c6779Aa3756892A03211f85954faF33df1EA"; // عنوان عقد AtoMonSwap الخاص بك

// معلومات شبكة موناد التجريبية
export const MONAD_TESTNET_CONFIG = {
    chainId: "0x27a7", // 10143 بالنظام الست عشري
    chainName: "Monad Testnet",
    rpcUrls: ["https://testnet-rpc.monad.xyz/"],
    blockExplorerUrls: ["https://testnet.monadexplorer.com/"],
    nativeCurrency: {
        name: "Monad",
        symbol: "MON",
        decimals: 18,
    },
};

// عناوين الرموز المميزة (Tokens) على شبكة موناد التجريبية
export const TOKEN_ADDRESSES = {
    // MON: "0x...", // عنوان الـ WMON أو الـ MON الملفوف إذا كان سيتم استخدامه كرمز مميز، أو يمكن إهماله إذا كان يتم التعامل مع MON كعملة أصلية فقط.
    ATO: "0xbce8cc7e580a4b3063b979d273acad0bc7c32a78", // !!! عنوان عقد عملة ATO الخاص بك !!!
};

// الـ ABI لعقد AtoMonSwap الخاص بك
export const ATOMON_SWAP_ABI = [
    {
      "inputs": [
        { "internalType": "address", "name": "_ato", "type": "address" },
        { "internalType": "address", "name": "_feeWallet", "type": "address" }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "atoFeePercent",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "atoToken",
      "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
      "name": "canMintNFT",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeWallet",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
      "name": "lastMintTime",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "monFlatFee",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rate",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "swap",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "address", "name": "arg0", "type": "address" }],
      "name": "userSwaps",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    }
];

// الـ ABI القياسي لـ ERC20 (لتحقيق رصيد الرمز المميز)
// هذا ABI أساسي وسيكون كافيًا لمعظم عمليات قراءة الرصيد.
export const ERC20_ABI = [
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
];
