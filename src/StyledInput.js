import React from 'react'
import './styles.css' // Import your CSS for styling

function StyledInput(props) {
	const { type = 'text', placeholder, value, onChange } = props

	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="styled-input" // Add your custom CSS class here
		/>
	)
}

export default StyledInput
