// Notification.js
import React, { useRef } from 'react'
import { useNotification } from './useNotification'

function Notification({ content, options }) {
	const { removeNotification } = useNotification()
	const { autoClose = 5000 } = options

	const handleMouseEnter = () => {
		clearTimeout(timerRef.current)
	}

	const handleMouseLeave = () => {
		if (autoClose > 0) {
			timerRef.current = setTimeout(() => {
				removeNotification()
			}, autoClose)
		}
	}

	const timerRef = useRef()

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
