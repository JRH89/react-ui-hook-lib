// StyledSelect.js

import React from 'react'

function StyledSelect({ options, ...props }) {
	return (
		<select {...props}>
			{options.map((option, index) => (
				<option key={index} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

export default StyledSelect
