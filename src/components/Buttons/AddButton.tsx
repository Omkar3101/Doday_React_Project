import React from 'react'
import './index.css'

interface ButtonProps{
    onClick: ()=> void;
    task: number | null;
}

const AddButton:React.FC<ButtonProps> = (props) => {
  return (
    <div className="add-btn" onClick={props.onClick}>
      {props.task ? "Update" : "Add"}
    </div>
  )
}

export default AddButton
