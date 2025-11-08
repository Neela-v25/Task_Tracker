import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";

function MenuCard({ position, cardTitle, children }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(boardActions.setDropDownAction(null));
  };
  return (
    <div
      className={`absolute ${position} bg-white h-100 w-80 overflow-y-auto p-3 rounded`}
    >
      <div className="flex justify-between items-center">
        <h6 className="text-center mb-2">{cardTitle}</h6>
        <CloseIcon
          onClick={handleClose}
          className="cursor-pointer hover:bg-gray-200 hover:rounded-full"
        />
      </div>
      {children}
    </div>
  );
}

export default MenuCard;  
