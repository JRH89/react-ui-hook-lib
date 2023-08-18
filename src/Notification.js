import React, { useEffect, useState } from 'react'
import './styles.css'

const Notify = ({ content, type = 'info', autoClose = 3000 }) => {
	const [show, setShow] = useState(true)

	useEffect(() => {
		if (autoClose > 0) {
			const timer = setTimeout(() => {
				setShow(false)
			}, autoClose)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [autoClose])

	if (!show || !content) {
		return null
	}

	return (
		<div className={`notification ${type} show`}>
			{content}
		</div>
	)
}

export default Notify
