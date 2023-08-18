import './styles.css'
import React, { createContext, useContext, useState, useRef } from 'react'
import ReactDOM from 'react-dom'

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

	return (
		<NotificationContext.Provider value={{ addNotification, removeNotification }}>
			{children}
			<div className="notification-container">
				{notifications.map((notification) => (
					<Notification key={notification.id} notification={notification} />
				))}
			</div>
		</NotificationContext.Provider>
	)
}

function useNotification() {
	return useContext(NotificationContext)
}

function Notification({ notification }) {
	const { removeNotification } = useNotification()
	const { content, options = {} } = notification
	const { autoClose = 5000 } = options

	const timerRef = useRef()

	const handleMouseEnter = () => {
		clearTimeout(timerRef.current)
	}

	const handleMouseLeave = () => {
		if (autoClose > 0) {
			timerRef.current = setTimeout(() => {
				removeNotification(notification.id)
			}, autoClose)
		}
	}

	return (
		<div
			className={`notification ${options.type || 'info'}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{content}
		</div>
	)
}


export default useNotification