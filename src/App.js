import React, { Component } from "react";
import initialData from "./initialData";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";

class App extends Component {
  state = initialData;
  onDragEnd = result => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    console.log(source.index, destination.index);

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    console.log(newTaskIds);
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };
    console.log(newColumn);
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    };

    this.setState(newState);
  };
  render() {
    return (
      <div className="App">
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnsOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId]
            );

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </DragDropContext>
      </div>
    );
  }
}

export default App;
