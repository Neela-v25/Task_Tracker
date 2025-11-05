import SubjectIcon from "@mui/icons-material/Subject";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { MOVE_MENU } from "../utils/menuItems";

function Modal({ selectedTask }) {
  const dispatch = useDispatch();
  const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const descRef = useRef(null);

  const toggleTextArea = (toggle) => {
    setIsTextAreaOpen(toggle);
  };

  const handleClose = () => {
    dispatch(boardActions.toggleDialog(false));
  };

  const onSave = () => {
    toggleTextArea(false);
    dispatch(
      boardActions.updateTask({
        actionId: selectedTask.actionId,
        taskName: selectedTask.taskName,
        taskDesc: descRef.current.value,
        taskId: selectedTask.taskId,
      })
    );
  };

  const moveTask = (selectedTask, toListId) => {
    dispatch(
      boardActions.moveTask({
        task: selectedTask,
        toListId,
      })
    );
  };

  const handleDropdown = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const description =
    descRef.current?.value?.trim() !== undefined &&
    descRef.current?.value.trim() !== ""
      ? descRef.current.value
      : selectedTask.taskDesc || "Click to add description";
  return (
    <div className="fixed inset-0 backdrop-blur-xs z-20">
      <dialog
        className="fixed inset-0 m-auto bg-white min-h-fit max-h-10/12 w-2/4 rounded-md shadow-md p-4 flex flex-col gap-6"
        open
      >
        <div className="flex justify-between items-center">
          <div
            className="border border-gray-300 p-1 w-fit flex justify-between cursor-pointer relative"
            onClick={handleDropdown}
          >
            {selectedTask.actionId}
            <ArrowDropDownIcon />
          </div>
          {isMenuOpen && (
            <DropdownMenu
              menuList={MOVE_MENU}
              position="top-15 left-4"
              menuAction={{ action: moveTask, params: [selectedTask] }}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>
        <div className="flex flex-col w-1/2">
          <input
            type="text"
            value={selectedTask.taskName}
            onChange={() => {}}
            className="rounded p-2 outline-blue-400 mb-6 text-xl border-2 border-gray-300"
          />
          <span className="flex items-center gap-1">
            <DateRangeIcon />
            Due date
          </span>
          <input type="date" className="w-30 ml-6 mt-2" />
          <div>
            <span className="flex items-center gap-1 mt-4">
              <SubjectIcon />
              Description
            </span>
          </div>
          {!isTextAreaOpen && (
            <div
              className={`mt-4 ml-7 ${
                !selectedTask.taskDesc && "font-extralight text-sm"
              } ${descRef.current?.value && "font-normal"}`}
              onClick={() => toggleTextArea(true)}
            >
              {description}
            </div>
          )}
          <textarea
            className={`rounded border-2 border-gray-300 mt-4 h-50 overflow-y-auto p-2 outline-blue-400 resize-none ${
              !isTextAreaOpen && "hidden"
            }`}
            autoFocus
            ref={descRef}
            defaultValue={selectedTask.taskDesc}
          ></textarea>
        </div>
        {isTextAreaOpen && (
          <div className="flex gap-5">
            <Button variant="contained" onClick={onSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => toggleTextArea(false)}>
              Cancel
            </Button>
          </div>
        )}
      </dialog>
    </div>
  );
}

export default Modal;
