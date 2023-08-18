import React, { useRef, useEffect, useState } from 'react'
import './styles.css'

function Notification(props) {
	const { notification, autoClose } = props
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		if (autoClose > 0) {
			const timer = setTimeout(() => {
				setIsVisible(false)
			}, autoClose)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [autoClose])

	if (!isVisible) {
		return null
	}

	const { content, options = {} } = notification

	return (
		<div className={`notification ${options.type || 'info'} show`}>
			{content}
		</div>
	)
}

export default Notification
