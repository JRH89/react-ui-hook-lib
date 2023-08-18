import React, { useState, useEffect } from 'react'
import './styles.css'

function Notification(props) {
	const { notification } = props

	if (!notification) {
		return null // Return null if there is no notification
	}

	const { content, options = {} } = notification
	const { autoClose = 3000 } = options

	const [visible, setVisible] = useState(true)

	useEffect(() => {
		if (autoClose > 0) {
			const timer = setTimeout(() => {
				setVisible(false)
			}, autoClose)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [autoClose])

	return (
		<div className={`notification ${options.type || 'info'} ${visible ? 'show' : ''}`}>
			{content}
		</div>
	)
}

export default Notification
