import NavBar from "../components/NavBar";
import ActiveBoard from "../features/Board/ActiveBoard";
import TabComponent from "../features/BoardSwitch/TabComponent";
import SwitchModal from "../features/BoardSwitch/SwitchModal";
import TaskModal from "../features/Board/TaskModal";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";

function UserBoard() {
  const modal = useSelector((state) => state.board.modal);
  const selectedTask = useSelector((state) => state.board.selectedTask);
  return (
    <>
      <div className="w-full h-screen overflow-hidden flex flex-col gap-4">
        <NavBar />
        <ActiveBoard />
        <TabComponent />
      </div>
      {modal.isOpen && (
        <Modal modaltTitle={modal.type}>
          {modal.type === "task" ? (
            <TaskModal selectedTask={selectedTask} />
          ) : (
            <SwitchModal />
          )}
        </Modal>
      )}
    </>
  );
}

export default UserBoard;
