import { useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import { BOARD_MENU, VIEW_MENU } from "../../utils/menuItems";
import DropdownMenu, { BackgroundMenu } from "../../components/DropdownMenu";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import TaskCards from "./TaskCards";
import { boardActions } from "../../store/boardSlice";

function TaskBoard() {
  const [boardName, setBoardName] = useState("My Board");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const dropDownAction = useSelector((state) => state.board.dropDownAction);
  const backgroundTheme = useSelector((state) => state.board.backgroundTheme);
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    setBoardName(e.target.value);
  };

  const onSettingsClick = () => {
    setIsViewMenuOpen(false);
    setIsSettingsOpen((prev) => !prev);
  };

  const onViewMenuClick = () => {
    setIsSettingsOpen(false);
    setIsViewMenuOpen((prev) => !prev);
  };

  const closeMenus = () => {
    setIsSettingsOpen(false);
    setIsViewMenuOpen(false);
  };

  const onThemeMenuClick = (action) => {
    dispatch(boardActions.setDropDownAction(action));
  };

  return (
    <div
      className={`w-9/12 h-10/12 ${backgroundTheme} rounded-xl flex flex-col gap-2 ml-55 p-4 shadow-2md`}
    >
      <div className="flex items-center gap-4">
        <input
          className="outline-none text-xl font-semibold"
          type="text"
          value={boardName}
          onChange={onInputChange}
        />
        <IconButton
          className="relative cursor-pointer"
          onClick={onViewMenuClick}
          sx={{ marginLeft: "auto" }}
        >
          <ViewListIcon />
        </IconButton>
        {isViewMenuOpen && (
          <DropdownMenu menuList={VIEW_MENU} position="right-30 top-35" />
        )}
        <button
          className="text-5xl text-center relative"
          onClick={onSettingsClick}
        >
          <sup>...</sup>
        </button>
        {isSettingsOpen && (
          <DropdownMenu
            menuList={BOARD_MENU}
            position="right-22 top-35"
            onClose={closeMenus}
            menuAction={{ action: onThemeMenuClick, params: 'background' }}
          />
        )}
        {dropDownAction === "background" && (
          <BackgroundMenu position="right-22 top-35" />
        )}
      </div>
      <TaskCards />
    </div>
  );
}

export default TaskBoard;
