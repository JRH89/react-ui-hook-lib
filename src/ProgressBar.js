import React, { useState, useEffect } from 'react'
import './styles.css'

function ProgressBar({ height = 10, color = 'green' }) {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const totalHeight = document.documentElement.scrollHeight - window.innerHeight
			const scrollProgress = (window.scrollY / totalHeight) * 100
			setProgress(scrollProgress)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div className="progress-bar" style={{ height: `${height}px` }}>
			<div className="progress-fill" style={{ width: `${progress}%`, backgroundColor: color }} />
		</div>
	)
}

export default ProgressBar
