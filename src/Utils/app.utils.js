export const doTransition = (fromList, toList, item) => {
	const updatedFromList = fromList.filter(initialTodo => initialTodo.name !== item.name);
	const updatedToList = [...toList, item];
	return ({
		updatedFromList,
		updatedToList
	})
}