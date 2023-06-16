import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Task from './task';

const TaskList = ({ todos, onDeleted, onToggleCompleted, editTask, onSubmitEdit }) => {
  TaskList.defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
    editTask: () => {},
    onSubmitEdit: () => {},
  };

  TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    editTask: PropTypes.func,
    onSubmitEdit: PropTypes.func,
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
          {...item}
        />
      ))}
    </ul>
  );
};

export default TaskList;
