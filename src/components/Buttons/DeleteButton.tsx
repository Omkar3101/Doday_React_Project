import type React from 'react';
import Delete from '../../assets/delete.png'


interface DeleteProps{
  onclick?: ()=> void;
}

const DeleteButton:React.FC<DeleteProps> = (props) => {
  return (
    <div className='delete-btn' onClick={props.onclick} >
      <img src={Delete} alt="delete.png"  />
    </div>
  )
}

export default DeleteButton
