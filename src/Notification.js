// Notification.js
import React, { useRef, useEffect } from 'react'
import './styles.css'

function Notification(props) {
	const { notification } = props

	if (!notification) {
		return null // Return null if there is no notification
	}

	const { content, options = {} } = notification
	const { autoClose = 3000 } = options

	const timerRef = useRef()

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			// Clear the notification after autoClose time
			props.onClose() // Call the onClose prop to clear the notification
		}, autoClose)

		return () => {
			clearTimeout(timerRef.current)
		}
	}, [])

	return (
		<div className={`notification ${options.type || 'info'} show`}>
			{content}
		</div>
	)
}

export default Notification
