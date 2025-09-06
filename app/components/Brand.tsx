export default function Brand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 shadow-lg" />
      <div className="font-semibold text-lg">Miami Global Investments Group</div>
    </div>
  );
}
