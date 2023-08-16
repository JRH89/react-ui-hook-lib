import React from 'react'
import './styles.css' // Import your CSS for styling

function StyledRadioButton(props) {
	const { label, value, checked, onChange } = props

	return (
		<label className="styled-radio">
			{label}
			<input type="radio" value={value} checked={checked} onChange={onChange} />
			<span className="radio-dot"></span>
		</label>
	)
}

export default StyledRadioButton
