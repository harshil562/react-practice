
import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { createNotification } from './Utils/app.utils'

import Todo from './Todo';
import 'react-notifications/lib/notifications.css';

const App = () => {
	return (
		<>
			<Todo createNotification={createNotification} />
			<NotificationContainer />
		</>
	);
}

export default App;