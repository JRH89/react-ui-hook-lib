import { useContext } from 'react'

const NotificationContext = createContext()

function useNotification() {
	const context = useContext(NotificationContext)
	return context
}

export default useNotification
