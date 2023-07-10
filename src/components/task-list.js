import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Task from './task';

const TaskList = ({ todos, onDeleted, onToggleCompleted, editTask, onSubmitEdit, changeTimerValue }) => {
  TaskList.defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
    editTask: () => {},
    onSubmitEdit: () => {},
    changeTimerValue: () => {},
  };

  TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    editTask: PropTypes.func,
    onSubmitEdit: PropTypes.func,
    changeTimerValue: PropTypes.func,
  };
  return (
    <ul className="todo-list">
      {todos.map(({ id, description, time, ...item }) => (
        <Task
          key={id}
          description={description}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          editTask={() => editTask(id)}
          onSubmitEdit={(event) => onSubmitEdit(event, id)}
          time={formatDistanceToNow(time, { includeSeconds: true })}
          changeTimerValue={(id, value) => changeTimerValue(id, value)}
          timer={item.timer}
          {...item}
        />
      ))}
    </ul>
  );
};

export default TaskList;
