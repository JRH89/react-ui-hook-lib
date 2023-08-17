(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ui-hook-react-lib"] = {}, global.React));
})(this, (function (exports, React) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

	function Button({
	  text,
	  className = 'button',
	  onClick
	}) {
	  return /*#__PURE__*/React__default["default"].createElement("button", {
	    className: className,
	    onClick: onClick
	  }, text);
	}

	function ProgressBar({
	  height = 10,
	  color = 'green'
	}) {
	  const [progress, setProgress] = React.useState(0);
	  React.useEffect(() => {
	    const handleScroll = () => {
	      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
	      const scrollProgress = window.scrollY / totalHeight * 100;
	      setProgress(scrollProgress);
	    };
	    window.addEventListener('scroll', handleScroll);
	    return () => window.removeEventListener('scroll', handleScroll);
	  }, []);
	  return /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "progress-bar",
	    style: {
	      height: `${height}px`
	    }
	  }, /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "progress-fill",
	    style: {
	      width: `${progress}%`,
	      backgroundColor: color
	    }
	  }));
	}

	function useLocalStorage(key, initialValue) {
	  // Check if we're on the client side before accessing localStorage
	  const isClient = typeof window !== 'undefined';

	  // Get the value from localStorage or use the initial value
	  const storedValue = isClient ? localStorage.getItem(key) : null;
	  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

	  // Create state for the value
	  const [value, setValue] = React.useState(initial);

	  // Update the value in localStorage whenever it changes
	  const updateValue = newValue => {
	    setValue(newValue);
	    if (isClient) {
	      localStorage.setItem(key, JSON.stringify(newValue));
	    }
	  };
	  return [value, updateValue];
	}

	function StyledInput(props) {
	  const {
	    type = 'text',
	    placeholder,
	    value,
	    onChange
	  } = props;
	  return /*#__PURE__*/React__default["default"].createElement("input", {
	    type: type,
	    placeholder: placeholder,
	    value: value,
	    onChange: onChange,
	    className: "styled-input" // Add your custom CSS class here
	  });
	}

	function StyledCheckbox(props) {
	  const {
	    label,
	    checked,
	    onChange
	  } = props;
	  return /*#__PURE__*/React__default["default"].createElement("label", {
	    className: "styled-checkbox"
	  }, label, /*#__PURE__*/React__default["default"].createElement("input", {
	    type: "checkbox",
	    checked: checked,
	    onChange: onChange
	  }), /*#__PURE__*/React__default["default"].createElement("span", {
	    className: "checkmark"
	  }));
	}

	function StyledRadioButton(props) {
	  const {
	    label,
	    value,
	    checked,
	    onChange
	  } = props;
	  return /*#__PURE__*/React__default["default"].createElement("label", {
	    className: "styled-radio"
	  }, label, /*#__PURE__*/React__default["default"].createElement("input", {
	    type: "radio",
	    value: value,
	    checked: checked,
	    onChange: onChange
	  }), /*#__PURE__*/React__default["default"].createElement("span", {
	    className: "radio-dot"
	  }));
	}

	function StyledSelect(props) {
	  const {
	    options,
	    value,
	    onChange
	  } = props;
	  return /*#__PURE__*/React__default["default"].createElement("select", {
	    value: value,
	    onChange: onChange,
	    className: "styled-select"
	  }, options.map(option => /*#__PURE__*/React__default["default"].createElement("option", {
	    key: option.value,
	    value: option.value
	  }, option.label)));
	}

	exports.Button = Button;
	exports.ProgressBar = ProgressBar;
	exports.StyledCheckbox = StyledCheckbox;
	exports.StyledInput = StyledInput;
	exports.StyledRadioButton = StyledRadioButton;
	exports.StyledSelect = StyledSelect;
	exports.useLocalStorage = useLocalStorage;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
