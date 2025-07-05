import { ReactNode } from "react"

interface Prop{
  children:ReactNode
}

export default function AuthButton({children}:Prop) {
  return (
    <button
    type="submit"
    className="bg-slate-50 transition duration-500 hover:bg-gray-800  text-slate-950  hover:text-slate-50  rounded-lg px-4 py-2 mt-2 font-medium "
  >
    {children}
    <i className="fa-solid fa-check ms-1 text-white p-1 rounded-full bg-black"></i>
  </button>
  )
}
