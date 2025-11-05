import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import TaskBoard from "./features/Board/TaskBoard";
import Modal from "./components/Modal";

function App() {
  const isDialogOpen = useSelector((state) => state.board.isDialogOpen);
  const selectedTask = useSelector(state => state.board.selectedTask)
  return (
    <>
      <div className="w-full h-screen">
        <NavBar />
        <TaskBoard />
      </div>
      {isDialogOpen && <Modal selectedTask={selectedTask} />}
    </>
  );
}

export default App;
