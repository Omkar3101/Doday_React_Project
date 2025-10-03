import Blankbox from "../../assets/blankbox.svg";
import Tickbox from "../../assets/tickbox.svg";
import './index.css'

interface checkboxProps {
  completed: boolean;
  onClick: () => void;
}

const Checkbox: React.FC<checkboxProps> = (props) => {
  return (
    <div className="checkbox" onClick={props.onClick}>
      {props.completed ? (
        <img src={Tickbox} alt="" />
      ) : (
        <img src={Blankbox} alt="" />
      )}
    </div>
  );
};

export default Checkbox;
