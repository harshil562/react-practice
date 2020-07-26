import React from 'react';

const TodoStatusColumn = (props) => {
	const { itemsList, title, transitionStateText, handleStateTransition } = props;
	return (
		<div style={{ flex: 1 }}>
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