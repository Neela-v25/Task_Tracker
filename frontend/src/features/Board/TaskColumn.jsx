import { useState } from "react";
import { useSelector } from "react-redux";
import { useBoardTasks } from "../../hooks/useBoardTasks";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "./Card";
import TaskColumnHeader from "./TaskColumnHeader";

const TASK_TITLE = ["TO DO", "IN PROGRESS", "DONE"];

function TaskColumn() {
  const [openInputIndex, setopenInputIndex] = useState("");
  const [taskName, setTaskName] = useState(["", "", ""]);
  const [listBgColor, setListBgColor] = useState(Array(3).fill('bg-gray-200'))
  const toDoTasks = useSelector((state) => state.board.toDoTasks);
  const inProgressTasks = useSelector((state) => state.board.inProgressTasks);
  const doneTasks = useSelector((state) => state.board.doneTasks);
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const { getTasks, addTask } = useBoardTasks();

  const TASK_LIST = [toDoTasks, inProgressTasks, doneTasks];

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
      if (e.target.value) {
        addTask({
          taskId: new Date().toString(),
          taskName: taskName[actionId],
          actionId: TASK_TITLE[actionId],
          boardId: activeBoard.boardId,
        });
      }
      setTaskName([]);
    }
  };

  const onListBgColorChange = (title, color) => {
    let temp = [...listBgColor];
    temp[TASK_TITLE.findIndex(item => item === title)] = color;
    setListBgColor(temp)
  }

  return (
    <div className="grid grid-cols-3 gap-3 h-full">
      {TASK_TITLE.map((title, index) => {
        const tasks = getTasks(TASK_LIST[index], activeBoard.boardId);

        return (
          <div
            key={index}
            className={`${listBgColor[index]} rounded-xl h-fit w-3/4 p-3 flex flex-col text-black`}
          >
            <TaskColumnHeader title={title} onColorChange={onListBgColorChange}/>

            <SortableContext
              items={tasks.map((t) => t.taskId)} // use stable array of ids
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((item) => (
                <Card key={item.taskId} item={item} />
              ))}
            </SortableContext>

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
        );
      })}
    </div>
  );
}

export default TaskColumn;
