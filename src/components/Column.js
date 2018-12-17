import React, { Component } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InnerTasksList from "./InnerTasksList";

const Container = styled.div`
  margin: 1rem;
  text-align: center;
  border: 3px solid lightgrey;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background-color: white; 
  width: 30%;
  box-sizing: border-box;
  @media screen and (max-width: 700px) {
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
  background-color: ${props =>
    props.isDraggingOver ? "lightgrey" : "inherit"};
  min-height: 100px;
`;


export default class Column extends Component {
  render() {
    const { column, tasks, index } = this.props;

    return (
      <Draggable draggableId={column.id} index={index} type="columns">
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{column.title}</Title>
            <Droppable
              droppableId={column.id}
              // isDropDisabled={this.props.isDropDisabled}
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerTasksList tasks={tasks}/>

                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
    );
  }
}
