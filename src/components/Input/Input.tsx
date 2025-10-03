import type React from "react"
import './index.css'

interface InputProps{
    placeholder:string,
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => void,
    value:string
}

const Input:React.FC<InputProps> = (props) => {

  return (
    <>
    <input type="text" placeholder={props.placeholder} onChange={props.onChange} value={props.value}  />
    </>
  )
}

export default Input
