import React, { Component } from 'react';

import NewTaskForm from './new-task';
import TaskList from './task-list';
import Footer from './footer';

export default class App extends Component {
  maxId = 1;
  state = {
    todoData: [],
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => item.id !== id);
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (text) => {
    const newItem = {
      description: text,
      completed: false,
      id: this.maxId++,
      time: new Date(),
    };

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onSubmitEdit = (event, id) => {
    event.preventDefault();
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldData = todoData[index];
      const newData = {
        ...oldData,
        edit: !oldData.edit,
        description: event.target[0].value,
      };
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  clearComplete = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => !item.completed);
      return {
        todoData: newArr,
      };
    });
  };

  filterTask = () => {
    const { todoData, filter } = this.state;
    if (filter === 'all') return todoData;
    return todoData.filter((item) => (filter === 'completed' ? item.completed : !item.completed));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, filter } = this.state;
    const completedCount = todoData.filter((el) => !el.completed).length;
    const visibleItems = this.filterTask();
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            editTask={this.editTask}
            onSubmitEdit={this.onSubmitEdit}
          />
          <Footer
            completedCount={completedCount}
            clearComplete={this.clearComplete}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}
