import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Task extends Component {
  state = {
    value: this.props.description,
    originalValue: this.props.description,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
    document.addEventListener('keydown', this.handleKeyDown.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.key === 'Escape' && this.props.edit) {
      this.setState({ value: this.state.originalValue });
      this.props.editTask(this.props.id, this.state.originalValue);
    }
  }

  handleClickOutside(event) {
    const editNode = document.querySelector('.editing');
    if (editNode) {
      if (!editNode.contains(event.target) && this.props.edit) {
        this.setState({ value: this.state.originalValue });
        this.props.editTask(this.props.id, this.state.originalValue);
      }
    }
  }

  setTaskValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const {
      edit,
      description,
      time,
      onDeleted,
      onToggleCompleted,
      editTask,
      completed,
      id,
      onSubmitEdit,
      onPlay,
      onPause,
      timerSet,
    } = this.props;
    return edit ? (
      <li className="editing">
        <form onSubmit={onSubmitEdit}>
          <input className="edit" type="text" value={this.state.value} onChange={this.setTaskValue} />
        </form>
      </li>
    ) : (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" onClick={onPlay}></button>
              <button className="icon icon-pause" onClick={onPause}></button>
              <span className="timer">{timerSet}</span>
            </span>
            <span className="description">created {time}</span>
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
  timer: 0,
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
  timer: PropTypes.number,
};
