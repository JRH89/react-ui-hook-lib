import React, { createContext, useContext, useState } from 'react'
import './styles.css'
const NotificationContext = createContext()

export function NotificationProvider({ children }) {
	const [notification, setNotification] = useState(null)

	const addNotification = (content, options) => {
		const newNotification = { content, options }
		setNotification(newNotification)
	}

	const removeNotification = () => {
		setNotification(null)
	}

	const contextValue = { addNotification, removeNotification }

	return (
		<NotificationContext.Provider value={contextValue}>
			{children}
			{notification && (
				<Notification
					content={notification.content}
					options={notification.options}
				/>
			)}
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
