import { useSelector } from "react-redux";
import { useBoardTasks } from "../../hooks/useBoardTasks";
import AddCardButton from "../../components/AddCardButton";

function TableView() {
  const toDoTasks = useSelector((state) => state.board.toDoTasks);
  const inProgressTasks = useSelector((state) => state.board.inProgressTasks);
  const doneTasks = useSelector((state) => state.board.doneTasks);
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const { getTasks, handleTaskSelect } = useBoardTasks();

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="bg-white rounded h-10/12 overflow-y-auto p-4">
        <table className="w-full">
          <thead className="border-b-2 border-b-gray-200 text-left">
            <tr>
              <th>Card</th>
              <th>List</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {getTasks(
              [...toDoTasks, ...inProgressTasks, ...doneTasks],
              activeBoard.boardId
            ).map((item) => (
              <tr
                key={item.taskId}
                className="border-b-2 cursor-pointer border-b-gray-200"
                onClick={() => handleTaskSelect(item)}
              >
                <td>{item.taskName}</td>
                <td>{item.actionId}</td>
                <td>{item.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddCardButton position='left-2 bottom-15' />
    </div>
  );
}

export default TableView;
