import React, { useEffect, useState } from 'react'
import './styles.css'

function Notification(props) {
	const { content, options } = props

	const [show, setShow] = useState(true)

	useEffect(() => {
		if (options.autoClose > 0) {
			const timer = setTimeout(() => {
				setShow(false)
			}, options.autoClose)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [options.autoClose])

	if (!show || !content) {
		return null
	}

	return (
		<div className={`notification ${options.type || 'info'} show`}>
			{content}
		</div>
	)
}

export default Notification
