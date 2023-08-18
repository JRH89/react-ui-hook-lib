(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ui-hook-react-lib"] = {}, global.React));
})(this, (function (exports, React) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

	var styles = {"container":"Toast-module_container__yfhSl","bottom-right":"Toast-module_bottom-right__85BD-","toast-in-right":"Toast-module_toast-in-right__nfzLE","top-right":"Toast-module_top-right__4GZxd","notification":"Toast-module_notification__3F4VJ","toast":"Toast-module_toast__g-Wol","title":"Toast-module_title__cOpi4","description":"Toast-module_description__5reRH","success":"Toast-module_success__bCO8-","danger":"Toast-module_danger__b7PeN","info":"Toast-module_info__CKI9r","warning":"Toast-module_warning__OJPEX"};

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

	const showToast = (setList, type, description, interval = 3000) => {
	  const toastTypeToTitle = {
	    success: 'Success',
	    danger: 'Danger',
	    info: 'Info',
	    warning: 'Warning'
	    // Add more mappings if needed
	  };

	  const newToast = {
	    id: Date.now(),
	    type,
	    title: toastTypeToTitle[type],
	    // Set the title based on the type
	    description
	  };
	  setList(prevList => [...prevList, newToast]);

	  // Automatically remove the toast after the specified interval
	  setTimeout(() => {
	    setList(updatedList => updatedList.filter(toast => toast.id !== newToast.id));
	  }, interval);
	};
	const Toast = ({
	  toastlist,
	  position,
	  setList,
	  interval = 3000
	}) => {
	  const deleteToast = React.useCallback(id => {
	    const toastListItem = toastlist.filter(e => e.id !== id);
	    setList(toastListItem);
	  }, [toastlist, setList]);
	  React.useEffect(() => {
	    const toastInterval = setInterval(() => {
	      if (toastlist.length) {
	        deleteToast(toastlist[0].id);
	      }
	    }, interval); // Use the interval prop here

	    return () => {
	      clearInterval(toastInterval);
	    };
	  }, [toastlist, deleteToast, interval]);
	  return /*#__PURE__*/React__default["default"].createElement("div", {
	    className: `${styles.container} ${styles[position]}`
	  }, toastlist.map(toast => /*#__PURE__*/React__default["default"].createElement("div", {
	    key: toast.id,
	    className: `${styles.notification} ${styles.toast} ${styles[position]} ${styles[toast.type]}`
	  }, /*#__PURE__*/React__default["default"].createElement("button", {
	    onClick: () => deleteToast(toast.id)
	  }, "X"), /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("p", {
	    className: styles.title
	  }, toast.title), /*#__PURE__*/React__default["default"].createElement("p", {
	    className: styles.description
	  }, toast.description)))));
	};

	exports.Button = Button;
	exports.Gallery = Gallery;
	exports.GalleryItem = GalleryItem;
	exports.ProgressBar = ProgressBar;
	exports.StyledInput = StyledInput;
	exports.Toast = Toast;
	exports.showToast = showToast;
	exports.useLocalStorage = useLocalStorage;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
