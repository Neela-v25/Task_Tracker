import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";

function NavBar() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(boardActions.toggleDialog(true))
  }
  return (
    <div className="flex justify-between items-center p-6 ml-50">
      <div className="flex items-center w-5/6 gap-4">
        <input type="text" className="w-2/4 h-8 border border-black outline-none p-3"/>
        <Button variant="contained" className="relative" onClick={handleClick}>Create</Button>
      </div>
    </div>
  );
}

export default NavBar;
