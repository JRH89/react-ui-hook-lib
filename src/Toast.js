// Toast.js
import React, { useCallback, useEffect } from 'react'
import './styles.css' // Import the shared styles directly

export default function Toast({ toastlist, position, setList, interval = 3000 }) {
	const deleteToast = useCallback((id) => {
		const toastListItem = toastlist.filter((e) => e.id !== id)
		setList(toastListItem)
	}, [toastlist, setList])

	useEffect(() => {
		const toastInterval = setInterval(() => {
			if (toastlist.length) {
				deleteToast(toastlist[0].id)
			}
		}, interval)

		return () => {
			clearInterval(toastInterval)
		}
	}, [toastlist, deleteToast, interval])

	return (
		<div className={`${position}`}>
			{toastlist.map((toast) => (
				<div
					key={toast.id}
					className={`notification toast ${position} ${toast.type}`}
				>
					<button onClick={() => deleteToast(toast.id)}>X</button>
					<div>
						<p className="title">{toast.title}</p>
						<p className="description">{toast.description}</p>
					</div>
				</div>
			))}
		</div>
	)
}
