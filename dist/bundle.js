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

	function useLocalStorage(key, initialValue, options = {}) {
	  const isClient = typeof window !== 'undefined';
	  const {
	    expireAfter = null
	  } = options;
	  const storedValue = isClient ? localStorage.getItem(key) : null;
	  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
	  const [value, setValue] = React.useState(initial);
	  React.useEffect(() => {
	    if (isClient) {
	      if (expireAfter !== null) {
	        const storedTime = localStorage.getItem(`${key}_time`);
	        const currentTime = new Date().getTime();
	        if (!storedTime || currentTime - storedTime > expireAfter) {
	          localStorage.removeItem(key);
	          localStorage.removeItem(`${key}_time`);
	          setValue(initialValue);
	        }
	      }
	    }
	  }, [key, expireAfter, initialValue]);
	  const updateValue = newValue => {
	    setValue(newValue);
	    if (isClient) {
	      localStorage.setItem(key, JSON.stringify(newValue));
	      if (expireAfter !== null) {
	        localStorage.setItem(`${key}_time`, new Date().getTime());
	      }
	    }
	  };
	  return [value, updateValue];
	}

	function StyledInput(props) {
	  const {
	    type = 'text',
	    placeholder,
	    value,
	    onChange,
	    className
	  } = props;
	  return /*#__PURE__*/React__default["default"].createElement("input", {
	    type: type,
	    placeholder: placeholder,
	    value: value,
	    onChange: onChange,
	    className: `styled-input ${className}` // Add your custom CSS class here
	  });
	}

	function StyledCheckbox(props) {
	  const {
	    label,
	    checked,
	    onChange,
	    color = '#ccc'
	  } = props;
	  const checkboxStyle = {
	    backgroundColor: color
	  };
	  return /*#__PURE__*/React__default["default"].createElement("label", {
	    className: "styled-checkbox"
	  }, label, /*#__PURE__*/React__default["default"].createElement("input", {
	    type: "checkbox",
	    checked: checked,
	    onChange: onChange
	  }), /*#__PURE__*/React__default["default"].createElement("span", {
	    className: "checkmark",
	    style: checkboxStyle
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

	// StyledSelect.js
	function StyledSelect({
	  options,
	  ...props
	}) {
	  return /*#__PURE__*/React__default["default"].createElement("select", props, options.map((option, index) => /*#__PURE__*/React__default["default"].createElement("option", {
	    key: index,
	    value: option.value
	  }, option.label)));
	}

	function GalleryItem({
	  item
	}) {
	  return /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "gallery-item"
	  }, /*#__PURE__*/React__default["default"].createElement("img", {
	    src: item.imageSrc,
	    alt: item.caption
	  }));
	}

	function Gallery({
	  items,
	  options
	}) {
	  const {
	    autoplay = false,
	    interval = 3000
	  } = options;
	  const [currentIndex, setCurrentIndex] = React.useState(0);
	  React.useEffect(() => {
	    let timer;
	    if (autoplay) {
	      timer = setInterval(() => {
	        setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
	      }, interval);
	    }
	    return () => clearInterval(timer);
	  }, [autoplay, interval, items.length]);
	  return /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "gallery-container"
	  }, /*#__PURE__*/React__default["default"].createElement(GalleryItem, {
	    item: items[currentIndex]
	  }));
	}

	exports.Button = Button;
	exports.Gallery = Gallery;
	exports.GalleryItem = GalleryItem;
	exports.ProgressBar = ProgressBar;
	exports.StyledCheckbox = StyledCheckbox;
	exports.StyledInput = StyledInput;
	exports.StyledRadioButton = StyledRadioButton;
	exports.StyledSelect = StyledSelect;
	exports.useLocalStorage = useLocalStorage;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
