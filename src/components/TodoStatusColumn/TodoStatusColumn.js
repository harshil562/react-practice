import React from 'react';
import './TodoStatusColumn.css';

const TodoStatusColumn = (props) => {
	const { itemsList, title, transitionStateText, handleStateTransition } = props;
	return (
		<div className="todoStatusColumn">
			<h3> {title} </h3>
			{
				itemsList && itemsList.length > 0 && itemsList.map(todo => {
					return (
						<>
							<p>{todo.name}</p>
							<button onClick={() => handleStateTransition(todo)}>
								{transitionStateText}</button>
						</>
					)
				})
			}
		</div>
	)
}

export default TodoStatusColumn;