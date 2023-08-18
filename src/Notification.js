import React, { useEffect } from 'react'
import './styles.css'

function Notification(props) {
	const { notification, onClose } = props

	useEffect(() => {
		if (notification && notification.options.autoClose > 0) {
			const timer = setTimeout(onClose, notification.options.autoClose)
			return () => clearTimeout(timer)
		}
	}, [notification, onClose])

	if (!notification) {
		return null // Return null if there is no notification
	}

	const { content, options = {} } = notification

	return (
		<div className={`notification ${options.type || 'info'} show`}>
			{content}
		</div>
	)
}

export default Notification
