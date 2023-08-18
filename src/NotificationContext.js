import React, { createContext, useContext, useState } from 'react'
import './styles.css'
const NotificationContext = createContext()

export function NotificationProvider({ children }) {
	const [notifications, setNotifications] = useState([])

	const addNotification = (content, options) => {
		const id = Date.now()
		const notification = { id, content, options }
		setNotifications((prevNotifications) => [...prevNotifications, notification])

		if (options.autoClose > 0) {
			setTimeout(() => {
				removeNotification(id)
			}, options.autoClose)
		}
	}

	const removeNotification = (id) => {
		setNotifications((prevNotifications) =>
			prevNotifications.filter((notification) => notification.id !== id)
		)
	}

	const contextValue = { addNotification, removeNotification }

	return (
		<NotificationContext.Provider value={contextValue}>
			{children}
			{notifications.map((notification) => (
				<Notification
					key={notification.id}
					content={notification.content}
					options={notification.options}
					onClose={() => removeNotification(notification.id)}
				/>
			))}
		</NotificationContext.Provider>
	)
}

export function useNotification() {
	const context = useContext(NotificationContext)
	if (!context) {
		throw new Error('useNotification must be used within a NotificationProvider')
	}
	return context
}


