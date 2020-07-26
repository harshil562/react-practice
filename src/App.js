import React, { Component } from 'react';
import TodoStatusColumn from './components/TodoStatusColumn/TodoStatusColumn';
import TodoList from './components/TodoList/TodoList';
import { doTransition } from './Utils/app.utils'
import './App.css';

class App extends Component {
  state = {
    todoList: [],
    currentTodo: {},
    errorText: "",
    inProgressTodoList: [],
    completedTodoList: []
  }

  onChange = (event) => {
    const currentTodo = { name: event.target.value };
    this.setState({
      currentTodo
    });
  }

  handleAddTodo = () => {
    const { currentTodo, todoList } = this.state;
    if (!currentTodo.name) {
      this.setState({
        errorText: "Cant enter an empty todo !"
      });
      /* Removing error text after 3000ms */
      this.timeOutId = setTimeout(() => {
        this.setState({
          errorText: ""
        })
      }, 3000);
      return;
    }
    const newList = [...todoList, currentTodo];
    this.setState({
      todoList: newList,
      currentTodo: { name: "" }
    });
  }

  //on click of enter
  handleEnterButton = (event) => {
    if (event?.keyCode === 13) {
      this.handleAddTodo();
    }
  }

  handleOnToggle = (selectedTodo, propertyName) => {
    const { createNotification } = this.props;
    const { todoList } = this.state;
    const updatedTodoList = todoList.map(initialTodo => {
      if (initialTodo.name === selectedTodo.name) {
        selectedTodo[propertyName] = selectedTodo[propertyName] ? !selectedTodo[propertyName] : true;
        return selectedTodo;
      } else return initialTodo;
    })
    this.setState({
      todoList: updatedTodoList
    });
    createNotification('success', `Todo ${propertyName} saved`, propertyName);
  }

  handleOnDelete = (selectedTodo) => {
    const { todoList } = this.state;
    const { createNotification } = this.props;
    const updatedTodoList = todoList.filter(initialTodo => initialTodo.name !== selectedTodo.name);
    this.setState({
      todoList: updatedTodoList
    });
    createNotification('success', 'Todo has been successfully deleted', `${selectedTodo.name} deleted`);
  }

  handleSaveCurrentTodoDescription = (event, selectedTodo) => {
    const { todoList } = this.state;
    const updatedTodo = { ...selectedTodo, description: event.target.value };
    const updatedTodoList = todoList.map(initialTodo => {
      if (initialTodo.name === selectedTodo.name) {
        return updatedTodo
      } else return initialTodo;
    })
    this.setState({
      todoList: updatedTodoList
    });
  }

  handleInProgressButtonClick = (selectedTodo) => {
    const { todoList, inProgressTodoList } = this.state;
    const updatedLists = doTransition(todoList, inProgressTodoList, selectedTodo);
    const { updatedFromList, updatedToList } = updatedLists;
    this.setState({
      todoList: updatedFromList,
      inProgressTodoList: updatedToList
    });
  }

  handleMoveToCompleteButtonClick = (inProgressTodo) => {
    const { inProgressTodoList, completedTodoList } = this.state;
    const updatedLists = doTransition(inProgressTodoList, completedTodoList, inProgressTodo);
    const { updatedFromList, updatedToList } = updatedLists;
    this.setState({
      inProgressTodoList: updatedFromList,
      completedTodoList: updatedToList
    });
  }

  handleMoveToInProgress = (completedTodo) => {
    const { inProgressTodoList, completedTodoList } = this.state;
    const updatedLists = doTransition(completedTodoList, inProgressTodoList, completedTodo);
    const { updatedFromList, updatedToList } = updatedLists;
    this.setState({
      inProgressTodoList: updatedToList,
      completedTodoList: updatedFromList
    });
  }

  getStatusColumns = () => {
    const { inProgressTodoList, completedTodoList } = this.state;
    return (
      [
        {
          title: 'In Progress Items',
          transitionStateText: 'Move to Complete',
          itemsList: inProgressTodoList,
          handleStateTransition: (todo) => this.handleMoveToCompleteButtonClick(todo)
        },
        {
          title: 'Completed Items',
          transitionStateText: 'Move Back to Inprogress',
          itemsList: completedTodoList,
          handleStateTransition: (todo) => this.handleMoveToInProgress(todo)
        }
      ]
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutId);
  }

  render() {
    const { todoList, currentTodo, errorText } = this.state;
    const { createNotification } = this.props;
    const getStatusColumns = this.getStatusColumns();
    const handlers = {
      onChange: this.onChange,
      handleEnterButton: this.handleEnterButton,
      handleOnDelete: (todo) => this.handleOnDelete(todo),
      handleOnToggle: (todo, propertyName) => this.handleOnToggle(todo, propertyName),
      handleInProgressButtonClick: (todo) => this.handleInProgressButtonClick(todo),
      handleSaveCurrentTodoDescription: (event, todo) => this.handleSaveCurrentTodoDescription(event, todo),
      handleAddTodo: this.handleAddTodo
    }

    return (
      <div className="container">
        <TodoList
          todoList={todoList}
          currentTodo={currentTodo}
          errorText={errorText}
          handlers={handlers}
          createNotification={createNotification}
        />
        {
          getStatusColumns.map(statusColumn => {
            const { title, itemsList, transitionStateText, handleStateTransition } = statusColumn;
            return (
              <TodoStatusColumn
                title={title}
                itemsList={itemsList}
                transitionStateText={transitionStateText}
                handleStateTransition={handleStateTransition}
                createNotification={createNotification}
              />
            )
          })
        }
      </div>
    );
  }

}

export default App;
