import Button from "@mui/material/Button";
import { BOARD_THEMES } from "../../utils/boardThemes";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { boardActions } from "../../store/boardSlice";

function CreateBoardMenu({ position, closeMenu }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [boardTheme, setBoardTheme] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    const newBoard = {
      boardId: "qwe",
      boardName: titleRef.current?.value,
      boardDesc: descRef.current?.value,
      boardTheme,
      collaborators: [],
    };
    dispatch(boardActions.setNewBoard(newBoard));
    dispatch(boardActions.setActiveBoard(newBoard));
    closeMenu();
  };

  const handleSelectTheme = (theme) => {
    setBoardTheme(theme);
  };
  return (
    <div
      className={`absolute ${position} bg-white h-100 w-80 overflow-y-auto p-3 rounded shadow-xl shadow-neutral-400 z-40`}
    >
      <h6 className="text-center mb-2 text-gray-600">
        Select a theme for the board
      </h6>
      <div className="grid grid-cols-4 gap-3 h-25 overflow-y-scroll">
        {BOARD_THEMES.map((theme) => (
          <div
            key={theme}
            className={`${theme} h-10 w-10 rounded-md cursor-pointer hover:shadow-2xl ${
              boardTheme === theme && "outline-2 outline-black"
            }`}
            onClick={() => handleSelectTheme(theme)}
          ></div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Board title*</span>
        <input
          className="border border-gray-300 outline-blue-300 p-2 rounded"
          ref={titleRef}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Board Description</span>
        <input
          className="border border-gray-300 outline-blue-300 p-2 rounded"
          ref={descRef}
        />
      </div>
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={handleClick}
      >
        Create Board
      </Button>
    </div>
  );
}

export default CreateBoardMenu;
