import { ReactNode } from "react";
export default function GradientButton({children, onClick, className=""}:{children: ReactNode, onClick?:()=>void, className?:string}){
  return (
    <button onClick={onClick} className={`relative px-5 py-3 rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-95 shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white ${className}`}>
      {children}
    </button>
  )
}
