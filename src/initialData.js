const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Learn React" },
    "task-2": { id: "task-2", content: "Learn Node.js" },
    "task-3": { id: "task-3", content: "Learn React Native" },
    "task-4": { id: "task-4", content: "Build Super App" },
    "task-5": { id: "task-5", content: "Learn Javascript" },
    "task-6": { id: "task-6", content: "Learn CSS" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "WIP",
      taskIds: ["task-5", "task-6"]
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  columnsOrder: ["column-1",  "column-2", "column-3"]
};

export default initialData;
