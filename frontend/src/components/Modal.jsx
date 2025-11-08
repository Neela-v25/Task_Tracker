import { useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import CloseIcon from "@mui/icons-material/Close";

function Modal({ modaltTitle, children }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(boardActions.closeDialog());
  };
  return (
    <div className="fixed inset-0 backdrop-blur-xs z-20">
      <dialog
        className="fixed inset-0 m-auto bg-white min-h-fit max-h-10/12 w-2/4 rounded-md shadow-md p-4 flex flex-col gap-6"
        open
      >
        <div className="flex justify-between">
          <h5 className="font-medium">
            {modaltTitle === "task" ? "Task Item" : "Select a board to switch"}
          </h5>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>
        {children}
      </dialog>
    </div>
  );
}

export default Modal;
