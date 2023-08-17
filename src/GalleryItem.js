import React from 'react'

function GalleryItem({ item }) {
	return (
		<div className="gallery-item">
			<img src={item.imageSrc} alt={item.caption} />
		</div>
	)
}

export default GalleryItem
