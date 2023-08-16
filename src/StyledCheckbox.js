import React from 'react'
import './styles.css' // Import your CSS for styling

function StyledCheckbox(props) {
	const { label, checked, onChange } = props

	return (
		<label className="styled-checkbox">
			{label}
			<input type="checkbox" checked={checked} onChange={onChange} />
			<span className="checkmark"></span>
		</label>
	)
}

export default StyledCheckbox
