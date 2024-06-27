interface IInputBox{
    type: string,
    name: string,
    id: string
}
export function InputBox({type, name, id} : IInputBox) {
    return <input className="border-solid border-black border-[1px]" type= {type} name={name} id= {id}/>
}