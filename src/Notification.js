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

	const handleMouseEnter = () => {
		clearTimeout(timerRef.current)
	}

	const handleMouseLeave = () => {
		if (autoClose > 0) {
			timerRef.current = setTimeout(() => {
				// Code to close the notification after autoClose time
				// Remove this line or replace it with your own logic
				// Example: props.onClose(); if you pass onClose prop from parent
			}, autoClose)
		}
	}

	useEffect(() => {
		return () => {
			clearTimeout(timerRef.current)
		}
	}, [])

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
