import TaskColumn from "./TaskColumn";
import {
  closestCorners,
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";

function DraggableTaskColumn({ handleDrop, allTasks }) {
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const task = allTasks.find((t) => t.taskId === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    handleDrop(active, over);
    setActiveTask(null);
  };
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // start dragging after 5px movement
    },
  });

  const sensors = useSensors(mouseSensor);
  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <TaskColumn />
      <DragOverlay>
        {activeTask ? (
          <div className="border-inherit rounded-md bg-transparent shadow p-2 w-11/12">
            {activeTask.taskName}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default DraggableTaskColumn;
