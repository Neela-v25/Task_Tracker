import { createSlice } from "@reduxjs/toolkit";
import { getListKey } from "../utils/listKey";

const initialState = {
  //task object
  /*{
    actionId,
    taskId,
    taskName,
    taskDesc,
    dueDate,
  } */
  toDoTasks: [],
  inProgressTasks: [],
  doneTasks: [],
  dropDownAction: "",
  backgroundTheme: "bg-linear-to-r from-rose-400 to-red-500",
  isDialogOpen: false,
  selectedTask: {},
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBackgroundTheme(state, action) {
      state.backgroundTheme = action.payload;
    },
    setDropDownAction(state, action) {
      state.dropDownAction = action.payload;
    },
    toggleDialog(state, action) {
      state.isDialogOpen = action.payload;
    },
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },
    addTask(state, action) {
      const targetListKey = getListKey(action.payload.actionId);
      state[targetListKey].push(action.payload);
    },
    updateTask(state, action) {
      let targetList = state[getListKey(action.payload.actionId)];

      const index = targetList.findIndex(
        (item) => item.taskId === action.payload.taskId
      );
      if (index !== -1) {
        targetList[index] = action.payload;
      }
    },
    moveTask(state, action) {
      const { task, toListId } = action.payload;
      const fromKey = getListKey(task.actionId);
      const toKey = getListKey(toListId);

      // Find the task to move
      const taskIndex = state[fromKey].findIndex(
        (item) => item.taskId === task.taskId
      );
      if (taskIndex === -1) return;

      const [taskToBeMoved] = state[fromKey].splice(taskIndex, 1); // remove
      taskToBeMoved.actionId = toListId; // update its status
      state.selectedTask.actionId = toListId; // update its status
      state[toKey].unshift(taskToBeMoved); // add to new list
    },
  },
});

export const boardActions = boardSlice.actions;
