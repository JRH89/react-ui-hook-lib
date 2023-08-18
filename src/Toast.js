import React, { useCallback, useEffect } from 'react'
import styles from './Toast.module.css'

export const showToast = (setList, type, description, interval = 3000) => {
	const toastTypeToTitle = {
		success: 'Success',
		danger: 'Danger',
		info: 'Info',
		warning: 'Warning',
		// Add more mappings if needed
	}

	const newToast = {
		id: Date.now(),
		type,
		title: toastTypeToTitle[type], // Set the title based on the type
		description,
	}

	setList(prevList => [...prevList, newToast])

	// Automatically remove the toast after the specified interval
	setTimeout(() => {
		setList(updatedList => updatedList.filter(toast => toast.id !== newToast.id))
	}, interval)
}

const Toast = ({ toastlist, position, setList, interval = 3000 }) => {
	const deleteToast = useCallback((id) => {
		const toastListItem = toastlist.filter((e) => e.id !== id)
		setList(toastListItem)
	}, [toastlist, setList])

	useEffect(() => {
		const toastInterval = setInterval(() => {
			if (toastlist.length) {
				deleteToast(toastlist[0].id)
			}
		}, interval) // Use the interval prop here

		return () => {
			clearInterval(toastInterval)
		}
	}, [toastlist, deleteToast, interval])

	return (
		<div className={`${styles.container} ${styles[position]}`}>
			{toastlist.map((toast) => (
				<div
					key={toast.id}
					className={`${styles.notification} ${styles.toast} ${styles[position]} ${styles[toast.type]}`}
				>
					<button onClick={() => deleteToast(toast.id)}>X</button>
					<div>
						<p className={styles.title}>{toast.title}</p>
						<p className={styles.description}>{toast.description}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default Toast