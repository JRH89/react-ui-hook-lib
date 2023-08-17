import { useState } from 'react'

function useLocalStorage(key, initialValue) {
	// Check if we're on the client side before accessing localStorage
	const isClient = typeof window !== 'undefined'

	// Get the value from localStorage or use the initial value
	const storedValue = isClient ? localStorage.getItem(key) : null
	const initial = storedValue ? JSON.parse(storedValue) : initialValue

	// Create state for the value
	const [value, setValue] = useState(initial)

	// Update the value in localStorage whenever it changes
	const updateValue = (newValue) => {
		setValue(newValue)
		if (isClient) {
			localStorage.setItem(key, JSON.stringify(newValue))
		}
	}

	return [value, updateValue]
}

export default useLocalStorage
