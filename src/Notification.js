import React, { useRef } from 'react'
import { useNotification } from './NotificationContext'

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

export default Notification
