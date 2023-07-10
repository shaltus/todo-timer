import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Task extends Component {
  state = {
    value: this.props.description,
    timer: this.props.timer,
    pause: false,
  };

  timer = () => {
    this.interval = setInterval(() => {
      if (!this.state.pause) {
        this.setState({ timer: this.state.timer - 1 });
      }
    }, 1000);
  };

  timerRun = () => {
    const { pause, timer } = this.state;
    if (pause) this.setState({ timer: timer - 1 });
  };
  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    const { id, changeTimerValue } = this.props;

    clearInterval(this.interval);
    changeTimerValue(id, this.state.timer);
  }

  setTaskValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  timerSet = () => {
    const { timer } = this.state;

    if (timer < 0) return '00:00';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };
  onPlay = () => {
    this.setState({ pause: false });
  };

  onPause = () => {
    this.setState({ pause: true });
  };

  render() {
    const { edit, description, time, onDeleted, onToggleCompleted, editTask, completed, id, onSubmitEdit } = this.props;
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
              <button className="icon icon-play" onClick={this.onPlay}></button>
              <button className="icon icon-pause" onClick={this.onPause}></button>
              <span className="timer">{this.timerSet()}</span>
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
