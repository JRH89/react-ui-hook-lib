import './styles.css' // Import your CSS file
import Button from './Button'
import ProgressBar from './ProgressBar'
import useLocalStorage from './useLocalStorage'
import StyledInput from './StyledInput'
import Gallery from './Gallery'
import GalleryItem from './GalleryItem'
import { NotificationProvider, useNotification, Notification } from './useNotification'

// Add more imports for other components and hooks if needed

export {
	Gallery,
	GalleryItem,
	Button,
	ProgressBar,
	useLocalStorage,
	StyledInput,
	NotificationProvider, // Export NotificationProvider
	useNotification, // Export useNotification
	Notification, // Export Notification
	// Export other components and hooks as needed
}

// Also export each component as default
export default {
	Gallery,
	GalleryItem,
	Button,
	ProgressBar,
	useLocalStorage,
	StyledInput,
	NotificationProvider,
	useNotification,
	Notification,
	// Export other components and hooks as needed
}
