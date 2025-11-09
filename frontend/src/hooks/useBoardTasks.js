import { useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";

export const useBoardTasks = () => {
  const dispatch = useDispatch();

  const handleTaskSelect = (item) => {
    console.log("Selected task", item);
    dispatch(boardActions.setSelectedTask(item));
    dispatch(boardActions.openDialog("task"));
  };

  const addTask = (item) => {
    dispatch(boardActions.addTask(item));
  };

  const setDropDownAction = (action) => {
    dispatch(boardActions.setDropDownAction(action));
  };

  const getTasks = (taskList, boardId) => {
    return taskList.filter((item) => item.boardId === boardId);
  };

  return {
    getTasks,
    handleTaskSelect,
    addTask,
    setDropDownAction
  };
};
