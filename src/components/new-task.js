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
  };

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.description, this.state.time);
    this.setState({ description: '' });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            onChange={this.onLabelChange}
            value={this.state.description}
            placeholder="What needs to be done?"
            autoFocus
          />
        </form>
      </header>
    );
  }
}
