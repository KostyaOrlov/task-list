import React, { Component } from "react";
import initialData from "./initialData";
import "@atlaskit/css-reset";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import InnerColumnList from "./components/InnerColumnList";

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 700px) {
   flex-direction: column;
  }
`;

class App extends Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "columns") {
      const newColumnsOrder = Array.from(this.state.columnsOrder);
      newColumnsOrder.splice(source.index, 1);
      newColumnsOrder.splice(destination.index, 0, draggableId);

      this.setState({
        ...this.state,
        columnsOrder: newColumnsOrder
      });

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
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
        >
          <Droppable
            droppableId="all columns"
            type="columns"
            direction={window.innerWidth > 700 ? 'horizontal' : 'vertical'}
          >
            {provided => (
              <Container {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.columnsOrder.map((columnId, index) => {
                  const column = this.state.columns[columnId];

                  return (
                    <InnerColumnList
                      key={column.id}
                      column={column}
                      tasksMap={this.state.tasks}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default App;
