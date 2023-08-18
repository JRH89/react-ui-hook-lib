// Notification.js
import React from 'react'
import './styles.css'

function Notification(props) {
	const { content, options } = props

	if (!content) {
		return null // Return null if there is no content
	}

	return (
		<div className={`notification ${options.type || 'info'} show`}>
			{content}
		</div>
	)
}

export default Notification
