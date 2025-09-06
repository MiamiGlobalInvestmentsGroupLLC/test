export default function Stat({label, value}:{label:string, value:string|number}){
  return (
    <div className="rounded-xl p-4 bg-white/70 border border-white/60">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
