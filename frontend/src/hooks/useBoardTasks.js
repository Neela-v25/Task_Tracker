export const useBoardTasks = () => { 
    
    const getTasks = (taskList, boardId) => {
        return taskList.filter(item => item.boardId === boardId)
    }

    return {
        getTasks
    }
}