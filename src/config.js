// src/config.js

// عنوان عقد المقايضة الخاص بك
export const SWAP_CONTRACT_ADDRESS = "0x51f5c6779Aa3756892A03211f85954faF33df1EA";

// إعدادات شبكة Monad Testnet
export const MONAD_TESTNET_CONFIG = {
  chainId: '0x17D', // 445 in decimal
  chainName: 'Monad Testnet',
  rpcUrls: ['https://rpc.monad.xyz/'], // تأكد من صحة رابط RPC
  blockExplorerUrls: ['https://explorer.monad.xyz/'], // تأكد من صحة رابط المستكشف
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
};

// عناوين رموز ERC20 (مثل رمز ATO)
// يرجى استبدال "0x..." بعنوان عقد رمز ATO الفعلي
export const TOKEN_ADDRESSES = {
  ATO: "0xbce8cc7e580a4b3063b979d273acad0bc7c32a78", // !!! استبدل هذا بعنوان عقد ATO الفعلي !!!
};

// ABI لعقد المقايضة (ATOMON_SWAP_ABI)
// يجب أن تضع مصفوفة ABI الكاملة لعقد ATOMON Swap هنا
export const ATOMON_SWAP_ABI = [
  // مثال (يرجى استبدال هذا بـ ABI الحقيقي لعقدك)
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "atoFeePercent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "monFlatFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "swap",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];


// ABI لرمز ERC20 (ERC20_ABI)
// هذه ABI أساسية لرموز ERC20 (وظائف balanceOf و decimals)
export const ERC20_ABI = [
  // مثال (يرجى استبدال هذا بـ ABI الحقيقي إذا كان لديك واحد محدد لـ ATO)
  {
    "constant": true,
    "inputs": [{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  {
    "constant": true,
    "inputs": [],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];
