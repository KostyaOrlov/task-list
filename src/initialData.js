const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Learn React" },
    "task-2": { id: "task-2", content: "Learn Node.js" },
    "task-3": { id: "task-3", content: "Learn React Native" },
    "task-4": { id: "task-4", content: "Build Super App" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    }
  },
  columnsOrder: ["column-1"]
};

export default initialData;
