import React from "react"

export const ShowToast = (setList, type, description, interval = 3000) => {
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

	setList((prevList) => [...prevList, newToast])

	// Automatically remove the toast after the specified interval
	setTimeout(() => {
		setList((updatedList) =>
			updatedList.filter((toast) => toast.id !== newToast.id)
		)
	}, interval)
}
