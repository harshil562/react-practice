
import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { createNotification } from './Utils/app.utils'

import App from './App';
import 'react-notifications/lib/notifications.css';

const AppWrapper = () => {
	return (
		<>
			<App createNotification={createNotification} />
			<NotificationContainer />
		</>
	);
}

export default AppWrapper;