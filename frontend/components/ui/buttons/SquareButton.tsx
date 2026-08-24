import React, { ReactNode } from 'react'

export default function SquareButton({onClickFun, icon, text} : {onClickFun:() => void, icon:ReactNode, text:string}) {
    return (
        <button
            className="
            p-2 rounded-xl
            bg-[#7e4eb4] hover:bg-[#432166] transition
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
