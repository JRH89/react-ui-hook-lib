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
		<NotificationContext.Provider value={{ addNotification, removeNotification }}>			{children}
			{/* Render notifications here */}
		</NotificationContext.Provider>
	)
}

function useNotification() {
	const context = useContext(NotificationContext)
	if (!context) {
		throw new Error('useNotification must be used within a NotificationProvider')
	}
	return context
}

export { NotificationProvider, useNotification }
