import React from 'react'
import './styles.css'

function Button({ text, className = 'button', onClick }) {
	return (
		<button className={className} onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
