import Button from "@mui/material/Button";
import { useBoardTasks } from "../hooks/useBoardTasks";
import { useSelector } from "react-redux";
import AddCardMenu from "../features/Views/AddCardMenu";

function AddCardButton({ position }) {
  const { setDropDownAction } = useBoardTasks();
  const dropDownAction = useSelector((state) => state.board.dropDownAction);
  return (
    <div className="relative">
      <Button
        variant="contained"
        sx={{ marginRight: "auto" }}
        onClick={() => setDropDownAction("addcard")}
      >
        + Add
      </Button>
      {dropDownAction === "addcard" && <AddCardMenu position={position} />}
    </div>
  );
}

export default AddCardButton;
