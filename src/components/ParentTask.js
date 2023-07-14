import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Task from './task';

export default class ParentTask extends Component {
  state = {
    id: this.props.id,
    timer: this.props.timer,
    pause: false,
  };

  timer = () => {
    this.interval = setInterval(() => {
      if (!this.state.pause) {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
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
    const { ...taskProps } = this.props;

    return (
      <Task
        changeTimerValue={this.changeTimerValue}
        timerSet={this.timerSet()}
        onPlay={this.onPlay}
        onPause={this.onPause}
        {...taskProps}
      />
    );
  }
}
ParentTask.defaultProps = {
  changeTimerValue: () => {},
  timer: 0,
};

ParentTask.propTypes = {
  changeTimerValue: PropTypes.func,
  timer: PropTypes.number,
};
