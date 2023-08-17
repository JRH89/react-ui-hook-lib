import React, { useState, useEffect } from 'react'
import GalleryItem from './GalleryItem'
import './styles.css'

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

	return (
		<div className="gallery-container">
			<GalleryItem item={items[currentIndex]} />
		</div>
	)
}

export default Gallery
