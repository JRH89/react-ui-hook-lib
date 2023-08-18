import React, { createContext, useContext, useState } from 'react'
import ReactDOM from 'react-dom'

const NotificationContext = createContext()

function NotificationProvider({ children }) {
	const [notifications, setNotifications] = useState([])

	const addNotification = (content, options) => {
		const id = Date.now()
		const notification = { id, content, options }
		setNotifications((prevNotifications) => [...prevNotifications, notification])
	}

	const removeNotification = (id) => {
		setNotifications((prevNotifications) =>
			prevNotifications.filter((notification) => notification.id !== id)
		)
	}

	return (
		<NotificationContext.Provider value={{ addNotification, removeNotification }}>
			{children}
			<div className="notification-container">
				{/* Map through the notifications and render them */}
				{notifications.map((notification) => (
					<div
						key={notification.id}
						className={`notification ${notification.options.type || 'info'}`}
						onMouseEnter={() => removeNotification(notification.id)}
					>
						{notification.content}
					</div>
				))}
			</div>
		</NotificationContext.Provider>
	)
}

function useNotification() {
	return useContext(NotificationContext)
}

export { NotificationProvider, useNotification }
