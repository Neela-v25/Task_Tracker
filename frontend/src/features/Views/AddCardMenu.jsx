import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuCard from "../../components/MenuCard";
import { useRef, useState } from "react";
import DropdownMenu from "../../components/DropdownMenu";
import { useBoardTasks } from "../../hooks/useBoardTasks";
import { useSelector } from "react-redux";

function AddCardMenu({ position }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dueDate, setDueDate] = useState('')
  const [selectedList, setSelectedList] = useState("To do");
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const inputRef = useRef(null);
  const { addTask, setDropDownAction } = useBoardTasks();
  const menuList = [
    {
      menu: "To do",
      action: "To do",
      onClick: setSelectedList,
    },
    {
      menu: "In Progress",
      action: "In Progress",
      onClick: setSelectedList,
    },
    {
      menu: "Done",
      action: "Done",
      onClick: setSelectedList,
    },
  ];

  const addNewTask = () => {
    const newTask = {
      taskName: inputRef?.current?.value,
      taskId: Date.now().toString(), //to be updated
      taskDesc: "",
      boardId: activeBoard.boardId,
      dueDate,
      actionId: selectedList,
    };
    addTask(newTask);
    setDropDownAction(null)
  };
  return (
    <MenuCard position={position} cardTitle="Add a card">
      <div className="flex flex-col gap-2">
        <span className="font-medium">Name*</span>
        <input
          className="border border-gray-300 outline-blue-300 p-2 rounded"
          placeholder="Enter the name of the card"
          ref={inputRef}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <span className="font-medium">Board Description</span>
        <div
          className="border border-gray-300 outline-blue-300 p-2 rounded flex justify-between cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {selectedList}
          <ArrowDropDownIcon />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Due Date</span>
        <input
          type='date'
          className="border border-gray-300 outline-blue-300 p-2 rounded"
          placeholder="Enter the name of the card"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      {isMenuOpen && (
        <DropdownMenu
          position="z-10"
          menuList={menuList}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={addNewTask}
      >
        Add card
      </Button>
    </MenuCard>
  );
}

export default AddCardMenu;
