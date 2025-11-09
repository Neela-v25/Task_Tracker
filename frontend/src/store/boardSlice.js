import { createSlice } from "@reduxjs/toolkit";
import { getListKey } from "../utils/listKey";
import { projectData } from "../../data/sampleData";

const initialState = {
  //task object
  /*{
    boardId,
    actionId,
    taskId,
    taskName,
    taskDesc,
    dueDate,
  } */
  //board object   {boardId, boardName, boardDesc, collaborators, boardTheme}
  boards: projectData.boards,
  toDoTasks: projectData.toDoTasks,
  inProgressTasks: projectData.inProgressTasks,
  doneTasks: projectData.doneTasks,
  dropDownAction: "", // 'background' || 'about' || 'addMenu
  view: "board", //'table' || 'board' 
  selectedTask: {},
  activeBoard: projectData.boards[0],
  modal: {
    isOpen: false,
    type: null, // 'task' || 'switch'
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBackgroundTheme(state, action) {
      const { boardId } = state.activeBoard;
      state.activeBoard.boardTheme = action.payload;
      const index = state.boards.findIndex((item) => item.boardId === boardId);
      state.boards[index].boardTheme = action.payload;
    },
    setDropDownAction(state, action) {
      state.dropDownAction = action.payload;
    },
    setView(state, action){
      state.view = action.payload;
    },
    openDialog(state, action) {
      state.modal = {
        isOpen: true,
        type: action.payload,
      };
    },
    closeDialog(state) {
      state.modal = {
        isOpen: false,
        type: null,
      };
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
    setActiveBoard(state, action) {
      state.activeBoard = action.payload;
    },
    setNewBoard(state, action) {
      state.boards.unshift(action.payload);
    },
    updateBoard(state, action) {
      const index = state.boards.findIndex(
        (item) => item.boardId === state.activeBoard.boardId
      );
      if (index !== -1) {
        state.boards[index] = action.payload;
        state.activeBoard = action.payload;
      }
    },
  },
});

export const boardActions = boardSlice.actions;
