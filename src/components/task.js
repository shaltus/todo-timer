import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Task extends Component {
  state = {
    value: this.props.description,
  };

  setTaskValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  render() {
    const { edit, description, time, onDeleted, onToggleCompleted, editTask, completed, id, onSubmitEdit } = this.props;

    return edit ? (
      <li className="editing">
        <form onSubmit={onSubmitEdit}>
          <input className="edit" type="text" value={this.state.value} onChange={this.setTaskValue} autoFocus />
        </form>
      </li>
    ) : (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} />
          <label>
            <span className="description">{description}</span>
            <span className="created">created {time}</span>
          </label>
          <button className="icon icon-edit" onClick={editTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  description: '',
  onDeleted: () => {},
  onToggleCompleted: () => {},
  completed: false,
  id: 1,
  edit: false,
  onSubmitEdit: () => {},
  editTask: () => {},
};

Task.propTypes = {
  description: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  completed: PropTypes.bool,
  id: PropTypes.number,
  edit: PropTypes.bool,
  onSubmitEdit: PropTypes.func,
  editTask: PropTypes.func,
};
