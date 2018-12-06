import React, { Component } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Container = styled.div`
  margin: 1rem;
  text-align: center;
  border: 3px solid lightgrey;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  width: 30%;
`;
const Title = styled.h3`
  padding: 0.5rem;
`;
const TaskList = styled.div`
  padding: 0.5rem;
  background: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
`;

export default class Column extends Component {
  render() {
    const { column, tasks } = this.props;
    return (
      <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
