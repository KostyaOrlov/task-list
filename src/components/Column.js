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
  /* justify-content: space-between; */
  /* align-items: center; */
  width: 30%;
  box-sizing: border-box;
  @media (max-width: 700px) {
    margin: 1rem auto;
    width: 90%;
  }
`;
const Title = styled.h3`
  padding: 0.5rem;
`;
const TaskList = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
  transition: background-color 0.3s ease-in-out;
  background-color: ${props => (props.isDraggingOver ? "lightgrey" : "white")};
  min-height: 100px;
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
