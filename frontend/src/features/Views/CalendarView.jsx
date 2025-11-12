import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSelector } from "react-redux";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { useState } from "react";
import { useBoardTasks } from "../../hooks/useBoardTasks";
import AddCardButton from "../../components/AddCardButton";

function CalendarView() {
  const [currMonth, setCurrMonth] = useState(new Date());

  const monthStart = startOfMonth(currMonth); //1st of month
  const monthEnd = endOfMonth(currMonth); //End of month
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); //Date on sun
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 }); //date on sat
  const today = new Date();

  const toDoTasks = useSelector((state) => state.board.toDoTasks);
  const inProgressTasks = useSelector((state) => state.board.inProgressTasks);
  const doneTasks = useSelector((state) => state.board.doneTasks);
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const { handleTaskSelect } = useBoardTasks();

  const rows = [];
  let days = [];
  let day = startDate;

  const taskList = [...toDoTasks, ...inProgressTasks, ...doneTasks].filter(
    (item) => item.boardId === activeBoard.boardId
  );

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={`border-b not-last:border-r border-gray-300 overflow-hidden min-h-28
            ${!isSameMonth(day, currMonth) && "bg-gray-200 font-extralight"}
            ${isSameDay(day, today) && "bg-blue-200"}
            `}
          key={format(day, "yyyy-MM-dd")}
        >
          <div className={`${isSameDay(day, today) && "font-extrabold"}`}>
            <h4>{format(day, "d")}</h4>
            <div className="flex flex-col gap-1 mb-2">
              {taskList
                .filter((item) => item.dueDate === format(day, "yyyy-MM-dd"))
                .map((item) => (
                  <div
                    className="w-25 text-xs rounded shadow-2xl shadow-neutral-400 ml-2 p-1.5 cursor-pointer"
                    onClick={() => {
                      handleTaskSelect(item);
                    }}
                    key={item.taskId}
                  >
                    {item.taskName}
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
      day = addDays(day, 1);
    }

    rows.push(
      <div
        className="grid grid-cols-7"
        key={format(day, "yyyy-MM-dd") + "-row"}
      >
        {days}
      </div>
    );
    days = [];
  }

  return (
    <>
      <div className="bg-white rounded-md shadow overflow-hidden flex flex-col max-h-[55vh]">
        <div className="flex gap-4 items-center mt-1">
          <ChevronLeftIcon onClick={() => setCurrMonth((prev) => subMonths(prev, 1))} color="action" className="cursor-pointer"/>
          <h4 className="font-medium">{format(currMonth, "MMM yyyy")}</h4>
          <ChevronRightIcon onClick={() => setCurrMonth((prev) => addMonths(prev, 1))} color="action" className="cursor-pointer"/>
        </div>

        <div className="sticky top-10 z-10 bg-white border-b grid grid-cols-7 text-sm font-medium text-center text-gray-500">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="overflow-y-auto mt-3">
          <div className="text-center">{rows}</div>
        </div>
      </div>
      <AddCardButton position="left-2 bottom-15 z-10" />
    </>
  );
}

export default CalendarView;
