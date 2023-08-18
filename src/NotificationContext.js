import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
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

	const contextValue = { addNotification, removeNotification }

	return (
		<NotificationContext.Provider value={contextValue}>
			{children}
			{/* Render notifications here */}
		</NotificationContext.Provider>
	)
}

export function useNotification() {
	return useContext(NotificationContext)
}
