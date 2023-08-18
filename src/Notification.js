import React, { useEffect } from 'react'
import './styles.css'

function Notification(props) {
	const { notification } = props

	if (!notification) {
		return null // Return null if there is no notification
	}

	const { content, options = {} } = notification
	const { autoClose = 3000 } = options

	useEffect(() => {
		const timer = setTimeout(() => {
			// Code to close the notification after autoClose time
			// Remove this line or replace it with your own logic
			// Example: props.onClose(); if you pass onClose prop from parent
		}, autoClose)

		return () => {
			clearTimeout(timer)
		}
	}, [autoClose])

	return (
		<div className={`notification ${options.type || 'info'}`}>
			{content}
		</div>
	)
}

export default Notification
