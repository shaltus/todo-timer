import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', task: 'All' },
    { name: 'active', task: 'Active' },
    { name: 'completed', task: 'Completed' },
  ];

  static defaultProps = {
    onFilterChange: () => {},
  };
  static propTypes = {
    onFilterChange: PropTypes.func,
  };

  maxId = 100;

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, task }) => {
      const isActive = filter === name;
      return (
        <li key={name}>
          <button type="button" className={`${isActive ? 'selected' : ''}`} onClick={() => onFilterChange(name)}>
            {task}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons} </ul>;
  }
}
