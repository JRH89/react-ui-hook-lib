import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue, options = {}) {
	const isClient = typeof window !== 'undefined'
	const { expireAfter = null } = options

	const storedValue = isClient ? localStorage.getItem(key) : null
	const initial = storedValue ? JSON.parse(storedValue) : initialValue

	const [value, setValue] = useState(initial)

	useEffect(() => {
		if (isClient) {
			if (expireAfter !== null) {
				const storedTime = localStorage.getItem(`${key}_time`)
				const currentTime = new Date().getTime()

				if (!storedTime || currentTime - storedTime > expireAfter) {
					localStorage.removeItem(key)
					localStorage.removeItem(`${key}_time`)
					setValue(initialValue)
				}
			}
		}
	}, [key, expireAfter, initialValue])

	const updateValue = (newValue) => {
		setValue(newValue)
		if (isClient) {
			localStorage.setItem(key, JSON.stringify(newValue))
			if (expireAfter !== null) {
				localStorage.setItem(`${key}_time`, new Date().getTime())
			}
		}
	}

	return [value, updateValue]
}

export default useLocalStorage
