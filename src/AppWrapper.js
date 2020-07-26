
import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import App from './App';
import 'react-notifications/lib/notifications.css';

class AppWrapper extends React.Component {
	createNotification = (type, message, title) => {
		// eslint-disable-next-line default-case
		switch (type) {
			case 'info':
				NotificationManager.info(message);
				break;
			case 'success':
				NotificationManager.success(message, title);
				break;
			case 'warning':
				NotificationManager.warning(message, title, 3000);
				break;
			case 'error':
				NotificationManager.error(message, title, 5000, () => {
					alert('callback');
				});
				break;
		}
	};

	render() {
		return (
			<>
				<App createNotification={this.createNotification} />
				<NotificationContainer />
			</>
		);
	}
}

export default AppWrapper;