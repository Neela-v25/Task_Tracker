import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../store/boardSlice";
import TableView from "../Views/TableView";
import CalendarView from "../Views/CalendarView";
import BoardHeader from "./BoardHeader";
import DraggableTaskColumn from "./DraggableTaskColumn";

function ActiveBoard() {
  const dropDownAction = useSelector((state) => state.board.dropDownAction);
  const view = useSelector((state) => state.board.view);
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const toDoTasks = useSelector((state) => state.board.toDoTasks);
  const inProgressTasks = useSelector((state) => state.board.inProgressTasks);
  const doneTasks = useSelector((state) => state.board.doneTasks);
  const dispatch = useDispatch();

  const updateBoard = (item) => {
    dispatch(boardActions.updateBoard(item));
  };

  const handleDrop = (active, over) => {
    dispatch(boardActions.handleDrop({ activeId: active.id, overId: over.id }));
  };

  return (
    <div
      className={`w-9/12 h-10/12 ${activeBoard.boardTheme} rounded-xl flex flex-col gap-2 ml-55 p-4 shadow-2md`}
    >
      <BoardHeader
        updateBoard={updateBoard}
        dropDownAction={dropDownAction}
        activeBoard={activeBoard}
      />

      {view === "board" && (
        <DraggableTaskColumn
          handleDrop={handleDrop}
          allTasks={[...toDoTasks, ...inProgressTasks, ...doneTasks]}
        />
      )}
      {view === "table" && <TableView />}
      {view === "calendar" && <CalendarView />}
    </div>
  );
}

export default ActiveBoard;
