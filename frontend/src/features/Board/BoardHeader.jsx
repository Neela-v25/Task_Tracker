import ViewListIcon from "@mui/icons-material/ViewList";
import BackgroundMenu from "./BackgroundMenu";
import IconButton from "@mui/material/IconButton";
import { useState, useRef, useEffect } from "react";
import DropdownMenu from "../../components/DropdownMenu";
import AboutMenu from "./AboutMenu";
import { useDropdownActions } from "../../hooks/useDropdownActions";

function BoardHeader({ activeBoard, dropDownAction, updateBoard }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const [boardName, setBoardName] = useState(activeBoard.boardName);
  const inputRef = useRef(null);
  const { settingsMenu, viewMenu } = useDropdownActions();

  useEffect(() => {
    setBoardName(activeBoard.boardName);
  }, [activeBoard]);

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

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
      updateBoard({
        ...activeBoard,
        boardName,
        boardTheme: activeBoard.boardTheme,
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        className="outline-none text-xl font-semibold focus:bg-white focus:p-1 focus:rounded text-white focus:text-black"
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
        <DropdownMenu
          menuList={viewMenu}
          position="right-30 top-35"
          onClose={closeMenus}
        />
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
  );
}

export default BoardHeader;
