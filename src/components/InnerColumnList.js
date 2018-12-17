import React, { PureComponent } from "react";
import Column from "./Column";

export default class InnerColumnList extends PureComponent {
  render() {
    const { column, tasksMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => tasksMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}
