import { ReactNode } from "react";
export default function GlassCard({children, className=""}:{children: ReactNode, className?:string}){
  return (
    <div className={`rounded-2xl p-6 bg-white/70 backdrop-blur-md shadow-lg border border-white/60 ${className}`}>
      {children}
    </div>
  )
}
