import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../store/boardSlice";

function SwitchModal() {
  const boards = useSelector((state) => state.board.boards);
  const dispatch = useDispatch();

  const handleSelectBoard = (board) => {
    dispatch(boardActions.setActiveBoard(board));
    dispatch(boardActions.closeDialog());
  };
  return (
    <div className="grid grid-cols-3">
      {boards.map((item) => (
        <div
          className={`h-35 w-35 ${item.boardTheme} rounded-xl shadow-md flex items-center cursor-pointer mb-10`}
          key={item.boardId}
          onClick={() => handleSelectBoard(item)}
        >
          <div className="text-wrap text-sm font-medium mt-auto w-full bg-white p-2 text-center h-15">
            {item.boardName}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SwitchModal;
