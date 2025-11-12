export const projectData = {
    boards: [
      {
        boardId: "board_001",
        boardName: "Website Redesign Project",
        boardDesc: "Complete overhaul of the company’s main website for 2025 launch.",
        collaborators: ["alice@example.com", "bob@example.com", "charlie@example.com"],
        boardTheme: "bg-gradient-to-tl from-[#15803d] via-[#115e59] to-[#164e63]",
      },
      {
        boardId: "board_002",
        boardName: "Mobile App Development",
        boardDesc: "Building the mobile version of our task manager.",
        collaborators: ["dave@example.com", "emma@example.com"],
        boardTheme: "bg-linear-to-r from-indigo-400 to-cyan-400",
      },
      {
        boardId: "board_003",
        boardName: "Trello clone",
        boardDesc: "Create a clone of trllo",
        collaborators: ["dave@example.com", "emma@example.com"],
        boardTheme: "bg-linear-to-r from-indigo-400 to-cyan-400",
      },
      {
        boardId: "board_004",
        boardName: "Project: Get Job",
        boardDesc: "Find a job within 2026",
        collaborators: ["dave@example.com", "emma@example.com"],
        boardTheme: "bg-linear-to-r from-indigo-400 to-cyan-400",
      },
    ],
  
    toDoTasks: [
      {
        boardId: "board_001",
        actionId: "To do",
        taskId: "task_1001",
        taskName: "Design Login Page",
        taskDesc: "Create responsive UI for the login page using Figma.",
        dueDate: "2025-11-10",
      },
      {
        boardId: "board_001",
        actionId: "To do",
        taskId: "task_1002",
        taskName: "Plan Navigation Structure",
        taskDesc: "Define header, footer, and sidebar layout for the new site.",
        dueDate: "2025-11-15",
      },
      {
        boardId: "board_002",
        actionId: "To do",
        taskId: "task_2001",
        taskName: "Set Up Firebase",
        taskDesc: "Initialize Firebase for authentication and cloud storage.",
        dueDate: "2025-11-20",
      },
    ],
  
    inProgressTasks: [
      {
        boardId: "board_001",
        actionId: "In progress",
        taskId: "task_1003",
        taskName: "Develop Home Page",
        taskDesc: "Code the home page layout using React and Tailwind CSS.",
        dueDate: "2025-11-15",
      },
      {
        boardId: "board_001",
        actionId: "In progress",
        taskId: "task_1004",
        taskName: "Integrate API Endpoints",
        taskDesc: "Connect backend endpoints for dynamic content rendering.",
        dueDate: "2025-11-12",
      },
      {
        boardId: "board_002",
        actionId: "In progress",
        taskId: "task_2002",
        taskName: "Implement Push Notifications",
        taskDesc: "Add FCM-based push notification support for new tasks.",
        dueDate: "2025-11-14",
      },
    ],
  
    doneTasks: [
      {
        boardId: "board_001",
        actionId: "Done",
        taskId: "task_1005",
        taskName: "Finalize Color Palette",
        taskDesc: "Select final brand colors and apply them to the style guide.",
        dueDate: "2025-11-01",
      },
      {
        boardId: "board_002",
        actionId: "Done",
        taskId: "task_2003",
        taskName: "Create Project Structure",
        taskDesc: "Set up folder structure and base files for the mobile app.",
        dueDate: "2025-11-03",
      },
      {
        boardId: "board_002",
        actionId: "Done",
        taskId: "task_2004",
        taskName: "Design Splash Screen",
        taskDesc: "Create and export splash screen assets for Android and iOS.",
        dueDate: "2025-11-05",
      },
    ],
  };