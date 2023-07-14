import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addItem: () => {},
  };

  static propTypes = {
    addItem: PropTypes.func,
  };

  state = {
    description: '',
    time: new Date(),
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { description, min, sec } = this.state;
    e.preventDefault();
    const timerSec = parseInt(min || 0) * 60 + parseInt(sec || 0) * 1;
    if (!this.state.description.trim().length) return;
    if (this.state.description.length !== 0) {
      this.props.addItem(description, timerSec);
      this.setState({ description: '', min: '', sec: '' });
    }
  };
  onChangeInputMin = (e) => {
    let value = e.target.value;
    if (value !== '') e.target.value = this.clamp(+value, 0, 1440) || 0;
    this.setState({
      min: e.target.value,
    });
  };
  onChangeInputSec = (e) => {
    let value = e.target.value;
    if (value !== '') e.target.value = this.clamp(+value, 0, 60) || 0;
    this.setState({
      sec: e.target.value,
    });
  };
  clamp = (value, min, max) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            onChange={this.onLabelChange}
            value={this.state.description}
            placeholder="Task"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onChangeInputMin}
            value={this.state.min}
            pattern="([0-5]?[0-9])"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onChangeInputSec}
            value={this.state.sec}
            pattern="([0-5]?[0-9])"
          />
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </header>
    );
  }
}
