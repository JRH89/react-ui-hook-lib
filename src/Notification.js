import React, { useEffect } from 'react'
import './styles.css'

function Notification(props) {
	const { notification } = props

	if (!notification) {
		return null
	}

	const { content, options = {} } = notification
	const { autoClose = 3000 } = options

	useEffect(() => {
		const timer = setTimeout(() => {
			// Code to close the notification after autoClose time
			// Example: props.onClose(); if you pass onClose prop from parent
		}, autoClose)

		return () => {
			clearTimeout(timer)
		}
	}, [autoClose])

	return (
		<div className={`notification ${options.type || 'info'} show`}>
			{content}
		</div>
	)
}

export default Notification
