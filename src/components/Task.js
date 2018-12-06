import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  padding: 0.5rem;
  margin-bottom: 10px;
  border: 3px solid lightblue;
  border-radius: 4px;
  display: flex;
  background: ${props => (props.isDragging ? 'lightblue' : 'white')};
  font-weight: 500;  
`;

export default class Task extends Component {
  render() {
    const { index, task } = this.props;
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
