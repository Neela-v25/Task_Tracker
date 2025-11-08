export const getListKey = (actionId) => {
    switch (actionId.toUpperCase()) {
      case "TO DO":
        return "toDoTasks";
      case "IN PROGRESS":
        return "inProgressTasks";
      case "DONE":
        return "doneTasks";
    }
  };