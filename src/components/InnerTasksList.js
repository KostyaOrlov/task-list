import React, {  PureComponent } from "react";
import Task from "./Task";

export default class InnerTasksList extends PureComponent {
  render() {
    const { tasks } = this.props;
    return (
      <div>
        {tasks.map((task, index) => (
          <Task key={task.id} task={task} index={index} />
        ))}
      </div>
    );
  }
}
