import React, { Component } from "react";
import initialData from "./initialData";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./components/Column";

const Container = styled.div`
  display: flex;
`;

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

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    //Move within one list
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    //Move from one list to another
    const startTasksIds = Array.from(start.taskIds);
    startTasksIds.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      taskIds: startTasksIds
    };

    const finishTasksIds = Array.from(finish.taskIds);
    finishTasksIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finish,
      taskIds: finishTasksIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [start.id]: newStartColumn,
        [finish.id]: newFinishColumn
      }
    };

    this.setState(newState);
  };
  render() {
    return (
      <div className="App">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            {this.state.columnsOrder.map(columnId => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => this.state.tasks[taskId]
              );

              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </Container>
        </DragDropContext>
      </div>
    );
  }
}

export default App;
