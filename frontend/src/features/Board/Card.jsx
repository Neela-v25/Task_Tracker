import { useSortable } from "@dnd-kit/sortable";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { format, isToday } from "date-fns";
import { useBoardTasks } from "../../hooks/useBoardTasks";
import { CSS } from "@dnd-kit/utilities";

function Card({ item }) {
  const { handleTaskSelect } = useBoardTasks();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      {...attributes}
      {...listeners}
      className="border border-gray-400 rounded-md mb-1 mt-2 p-2 w-11/12 hover:bg-gray-200 cursor-pointer flex flex-col"
      onClick={() => handleTaskSelect(item)}
      ref={setNodeRef}
      style={style}
    >
      {item.taskName}
      {item.dueDate && (
        <div
          className={`rounded-sm shadow-md shadow-gray-300 p-1 h-6 w-fit text-xs text-white ${
            isToday(item.dueDate) ? "bg-red-600" : "bg-lime-600"
          } flex items-center gap-1`}
        >
          <ScheduleIcon fontSize="small" />
          {format(item.dueDate, "MMM dd")}
        </div>
      )}
    </div>
  );
}

export default Card;
