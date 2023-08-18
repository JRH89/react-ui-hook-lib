// index.js
// Import your CSS file
import './styles.css'

// Import individual components and hooks
import Button from './Button'
import ProgressBar from './ProgressBar'
import useLocalStorage from './useLocalStorage'
import StyledInput from './StyledInput'
import Gallery from './Gallery'
import GalleryItem from './GalleryItem'
import { useNotification } from './useNotification' // Import useNotification hook
import { Notification } from './Notification' // Import Notification component

// Export individual components and hooks
export { default as Gallery } from './Gallery'
export { default as GalleryItem } from './GalleryItem'
export { default as Button } from './Button'
export { default as ProgressBar } from './ProgressBar'
export { default as useLocalStorage } from './useLocalStorage'
export { default as StyledInput } from './StyledInput'
export { default as useNotification } from './useNotification' // Export useNotification hook
export { default as Notification } from './Notification' // Export Notification component

// Add more exports for other components and hooks if needed
