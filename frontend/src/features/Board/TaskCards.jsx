import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../store/boardSlice";

const TASK_TITLE = ["TO DO", "IN PROGRESS", "DONE"];

function TaskCards() {
  const [openInputIndex, setopenInputIndex] = useState("");
  const [taskName, setTaskName] = useState(["", "", ""]);
  const toDoTasks = useSelector((state) => state.board.toDoTasks);
  const inProgressTasks = useSelector((state) => state.board.inProgressTasks);
  const doneTasks = useSelector((state) => state.board.doneTasks);

  const TASK_LIST = [toDoTasks, inProgressTasks, doneTasks];

  const dispatch = useDispatch();

  const onInputChange = (e, index) => {
    let temp = [...taskName];
    temp[index] = e.target.value;
    setTaskName(temp);
  };

  const addCard = (e, actionId) => {
    if (e.target.tagName === "BUTTON") {
      setopenInputIndex(actionId);
    }
    if (e.key === "Enter" || e.target.id === "add") {
      setopenInputIndex("");
      dispatch(
        boardActions.addTask({
          taskId: "abcded",
          taskName: taskName[actionId],
          actionId: TASK_TITLE[actionId],
        })
      );
      setTaskName([]);
    }
  };

  const handleTaskClick = (item, index) => {
    dispatch(boardActions.setSelectedTask({
      taskName: item.taskName,
      actionId: TASK_TITLE[index],
      taskDesc: item.taskDesc,
      taskId: item.taskId,
    }))
    dispatch(boardActions.toggleDialog(true));
  }

  return (
    <div className="grid grid-cols-3 gap-3 h-full">
      {TASK_TITLE.map((title, index) => (
        <div
          className="bg-gray-200 rounded-xl h-fit w-3/4 p-3 flex flex-col text-black"
          key={index}
        >
          <h6 className="text-center font-medium mb-2">{title}</h6>
          {TASK_LIST[index]?.map((item) => (
            <div
              className="border border-gray-400 rounded-md mb-1 mt-2 p-2 w-11/12 hover:bg-gray-200 cursor-pointer"
              key={item.taskName}
              onClick={() => handleTaskClick(item, index)}
            >
              {item.taskName}
            </div>
          ))}
          {openInputIndex === index && (
            <div>
              <input
                type="text"
                className="border border-gray-400 rounded-md mb-6 mt-2 p-2 w-11/12"
                value={taskName[index] ?? ""}
                onChange={(e) => onInputChange(e, index)}
                onKeyDown={(e) => addCard(e, index)}
                autoFocus
              />
            </div>
          )}
          <button
            id={openInputIndex === index ? "add" : "open"}
            className={`${
              openInputIndex === index
                ? "w-6/12 bg-blue-300 text-center"
                : "w-11/12 hover:bg-gray-300 text-left"
            } 
              rounded-md p-1.5 mt-auto`}
            onClick={(e) => addCard(e, index)}
          >
            {openInputIndex === index ? "Add Card" : "+  Add Card"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskCards;
