import { HTMLAttributes, ReactElement, ReactHTMLElement } from "react"

// interface IInputLabelPair{
//     children: ReactHTMLElement<T>,
    
// }
export default function InputLabelPair({children}: HTMLAttributes<HTMLParagraphElement>){
    return(
        <div className="flex p-2 gap-x-2 bg-slate-200">
            {children}
        </div>
    )
}