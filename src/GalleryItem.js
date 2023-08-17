import React from 'react'

function GalleryItem({ item }) {
	return (
		<div className="gallery-item">
			<img src={item.imageSrc} alt={item.caption} />
			<p className="gallery-caption">{item.caption}</p>
		</div>
	)
}

export default GalleryItem
