import { HTMLAttributes } from "react";

export default function Card({children}: HTMLAttributes<HTMLParagraphElement>) {
    return <div className="w-full bg-white flex justify-center items-center">
        {children}
    </div>
    
}