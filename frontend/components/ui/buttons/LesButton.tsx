import React, { ReactNode } from 'react'
import { IconType } from 'react-icons'
import { FaFacebook } from 'react-icons/fa'

type LesButtonProps = {
    text:string,
    icon:ReactNode,
    onClickFun:() => void
}

export default function LesButton({text, icon, onClickFun} : LesButtonProps) {
    return (
        <button
            className="
            h-[50px] px-5 rounded-xl
            bg-[#4C2775] hover:bg-[#432166] transition
            flex items-center gap-3
            secondary-font font-bold text-base shadow-lg
                                    "
        onClick={onClickFun}
        >
            {icon}
            {text}
        </button>
    )
}
