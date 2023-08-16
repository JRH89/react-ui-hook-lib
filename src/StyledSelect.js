import React from 'react'
import './styles.css' // Import your CSS for styling

function StyledSelect(props) {
	const { options, value, onChange } = props

	return (
		<select value={value} onChange={onChange} className="styled-select">
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

export default StyledSelect
