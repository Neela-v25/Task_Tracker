import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../store/boardSlice";

export const useDropdownActions = () => {
  const selectedTask = useSelector((state) => state.board.selectedTask);
  const dispatch = useDispatch();

  const onMenuClick = (action) => {
    dispatch(boardActions.setDropDownAction(action));
  };

  const moveTask = (toListId) => {
    dispatch(
      boardActions.moveTask({
        task: selectedTask,
        toListId,
      })
    );
  };
  const settingsMenu = [
    {
      menu: "Change Background",
      action: "background",
      onClick: onMenuClick,
    },
    {
      menu: "About",
      action: "about",
      onClick: onMenuClick,
    },
  ];

  const moveMenu = [
    {
      menu: "To Do",
      action: "TO DO",
      onClick: moveTask,
    },
    {
      menu: "In Progress",
      action: "IN PROGRESS",
      onClick: moveTask,
    },
    {
      menu: "Done",
      action: "DONE",
      onClick: moveTask,
    },
  ];

  return {
    settingsMenu,
    moveMenu,
  };
};
