import Edit from '../../assets/edit.png';

interface Editprops{
  onclick: ()=> void;
}

const EditButton:React.FC<Editprops> = ({onclick}) => {
  return (
    <div className='edit-btn' onClick={onclick}>
        <img src={Edit} alt="edit.png" />
    </div>
  )
}

export default EditButton
