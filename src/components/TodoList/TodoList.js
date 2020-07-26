import React, { Component } from 'react';
import AppModal from '../Modal/AppModal'
import './TodoList.css'

class TodoList extends Component {
	
	state = {
		showTodoDetailsModal: false,
		selectedTodo: null
	}

	handleToggleTodoModal = (todo) => {
		const { showTodoDetailsModal } = this.state;
		this.setState({
			showTodoDetailsModal: !showTodoDetailsModal,
			selectedTodo: todo
		});
	}

	handleOnDeleteTodo = (todo) => {
		const { handlers } = this.props;

		handlers.handleOnDelete(todo);
		this.handleToggleTodoModal();
	}

	handleMoveToInProgressTodo = (todo) => {
		const { handlers } = this.props;

		handlers.handleInProgressButtonClick(todo);
		this.handleToggleTodoModal();
	}

	handleSaveTodo = () => {
		const { createNotification } = this.props;
		const { selectedTodo } = this.state;

		createNotification('success', `${selectedTodo.name} has been saved`, 'Todo saved');
		this.handleToggleTodoModal()
	}

	render() {
		const { showTodoDetailsModal, selectedTodo } = this.state;
		const { todoList, currentTodo, errorText } = this.props;
		const { handleOnToggle, handleSaveCurrentTodoDescription,
			onChange, handleEnterButton, handleAddTodo } = this.props.handlers;

		return (
			<div className="todolistContainer">
				<h3>Todo App</h3>
				<input
					type="text"
					className="todo-input"
					onChange={onChange}
					value={currentTodo.name}
					onKeyDown={handleEnterButton}
				/>
				<button onClick={handleAddTodo}>Submit</button>
				<p className="errorText">{errorText}</p>
				{
					todoList.length > 0 && todoList.map(todo => {
						return (
							<>
								<p>{todo?.name}</p>
								<button onClick={() => this.handleToggleTodoModal(todo)}> Details </button>
							</>
						)
					})
				}
				{
					showTodoDetailsModal && (
						<AppModal
							title={'Todo Modal'}
							show={showTodoDetailsModal}
							onClose={this.handleToggleTodoModal}
							onSave={this.handleSaveTodo}
							footerOne={'Close'}
							footerTwo={'Save Changes'}
						>
							<>
								<p style={selectedTodo.completed ? { color: "green" } : null}>{selectedTodo.name}</p>
								<button onClick={() => handleOnToggle(selectedTodo, 'completed')}> {selectedTodo.completed ?
									'Mark as incomplete' : 'Complete'} </button>
								<button onClick={() => this.handleOnDeleteTodo(selectedTodo)}> delete </button>
								<button onClick={() => handleOnToggle(selectedTodo, 'showDescription')}> Description </button>
								<button onClick={() => this.handleMoveToInProgressTodo(selectedTodo)}> Move to In Progress </button>
								<br />
								{selectedTodo.showDescription &&
									<textarea
										onChange={(event) => handleSaveCurrentTodoDescription(event, selectedTodo)}
										value={selectedTodo.description}
										rows="4"
										cols="50"
									/>
								}
							</>
						</AppModal>
					)
				}
			</div>
		)
	}
}

export default TodoList;