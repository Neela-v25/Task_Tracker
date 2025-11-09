import { useEffect, useState, useRef } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import { VIEW_MENU } from "../../utils/menuItems";
import DropdownMenu from "../../components/DropdownMenu";
import BackgroundMenu from "./BackgroundMenu";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import TaskCards from "./TaskCards";
import { boardActions } from "../../store/boardSlice";
import { useDropdownActions } from "../../hooks/useDropdownActions";
import AboutMenu from "./AboutMenu";
import TableView from "../Views/TableView";
import CalendarView from "../Views/CalendarView";

function ActiveBoard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const dropDownAction = useSelector((state) => state.board.dropDownAction);
  const view = useSelector(state => state.board.view);
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const [boardName, setBoardName] = useState(activeBoard.boardName);
  const inputRef = useRef(null)
  const dispatch = useDispatch();
  const { settingsMenu, viewMenu } = useDropdownActions();

  useEffect(() => {
    setBoardName(activeBoard.boardName)
  }, [activeBoard])

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
      dispatch(
        boardActions.updateBoard({
          boardName,
          boardId: "abcde",
          boardDesc: "",
          boardTheme: activeBoard.boardTheme,
          collaborators: [],
        })
      );
    }
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

  return (
    <div
      className={`w-9/12 h-10/12 ${activeBoard.boardTheme} rounded-xl flex flex-col gap-2 ml-55 p-4 shadow-2md`}
    >
      <div className="flex items-center gap-4">
        <input
          className="outline-none text-xl font-semibold focus:bg-white focus:p-1 focus:rounded text-white"
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />
        <IconButton
          className="relative cursor-pointer"
          onClick={onViewMenuClick}
          sx={{ marginLeft: "auto" }}
        >
          <ViewListIcon />
        </IconButton>
        {isViewMenuOpen && (
          <DropdownMenu menuList={viewMenu} position="right-30 top-35" onClose={closeMenus}/>
        )}
        <button
          className="text-5xl text-center relative text-white"
          onClick={onSettingsClick}
        >
          <sup>...</sup>
        </button>
        {isSettingsOpen && (
          <DropdownMenu
            menuList={settingsMenu}
            position="right-22 top-35"
            onClose={closeMenus}
          />
        )}
        {dropDownAction === "background" && (
          <BackgroundMenu position="right-22 top-35" />
        )}
        {dropDownAction === "about" && <AboutMenu position="right-22 top-35" />}
      </div>
      {view === "board" && <TaskCards />}
      {view === "table" && <TableView />}
      {view === "calendar" && <CalendarView />}
    </div>
  );
}

export default ActiveBoard;
