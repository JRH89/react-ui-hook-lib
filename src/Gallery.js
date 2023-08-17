import React, { useState, useEffect } from 'react'
import GalleryItem from './GalleryItem'
import './Gallery.css' // Import your custom gallery styles

function Gallery({ items, options }) {
	const { autoplay = false, interval = 3000 } = options

	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		let timer

		if (autoplay) {
			timer = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
			}, interval)
		}

		return () => clearInterval(timer)
	}, [autoplay, interval, items.length])

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
	}

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
	}

	return (
		<div className="gallery-container">
			<button className="gallery-nav" onClick={handlePrev}>
				Previous
			</button>
			<GalleryItem item={items[currentIndex]} />
			<button className="gallery-nav" onClick={handleNext}>
				Next
			</button>
		</div>
	)
}

export default Gallery
