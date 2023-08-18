import React, { useRef } from 'react'

function Notification(props) {
	const { content, options = {} } = props
	const { autoClose = 5000 } = options

	const timerRef = useRef()

	const handleMouseEnter = () => {
		clearTimeout(timerRef.current)
	}

	const handleMouseLeave = () => {
		if (autoClose > 0) {
			timerRef.current = setTimeout(() => {
				// removeNotification(notification.id); // Assuming you have a removeNotification function
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
