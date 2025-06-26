// src/components/NFTs.jsx
import { Lock } from "lucide-react";

export default function NFTs() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Lock size={64} className="text-[#FF00C8] mb-4" />
      <h2 className="text-xl">NFTs تحت الصيانة 🔧</h2>
      <p className="text-sm text-gray-400">سيتم فتحها لاحقًا بعد إتمام الشرط</p>
    </div>
  );
}
