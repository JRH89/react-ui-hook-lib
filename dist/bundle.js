(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
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

	const NotificationContext = /*#__PURE__*/React.createContext();
	function NotificationProvider({
	  children
	}) {
	  const [notifications, setNotifications] = React.useState([]);
	  const addNotification = (content, options) => {
	    const id = Date.now();
	    const notification = {
	      id,
	      content,
	      options
	    };
	    setNotifications(prevNotifications => [...prevNotifications, notification]);
	  };
	  const removeNotification = id => {
	    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
	  };
	  return /*#__PURE__*/React__default["default"].createElement(NotificationContext.Provider, {
	    value: {
	      addNotification,
	      removeNotification
	    }
	  }, children, /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "notification-container"
	  }, notifications.map(notification => /*#__PURE__*/React__default["default"].createElement(Notification, {
	    key: notification.id,
	    notification: notification
	  }))));
	}
	function useNotification() {
	  return React.useContext(NotificationContext);
	}
	function Notification({
	  notification
	}) {
	  const {
	    removeNotification
	  } = useNotification();
	  const {
	    content,
	    options = {}
	  } = notification;
	  const {
	    autoClose = 5000
	  } = options;
	  const timerRef = React.useRef();
	  const handleMouseEnter = () => {
	    clearTimeout(timerRef.current);
	  };
	  const handleMouseLeave = () => {
	    if (autoClose > 0) {
	      timerRef.current = setTimeout(() => {
	        removeNotification(notification.id);
	      }, autoClose);
	    }
	  };
	  return /*#__PURE__*/React__default["default"].createElement("div", {
	    className: `notification ${options.type || 'info'}`,
	    onMouseEnter: handleMouseEnter,
	    onMouseLeave: handleMouseLeave
	  }, content);
	}

	// Also export each component as default
	var index = {
	  Gallery,
	  GalleryItem,
	  Button,
	  ProgressBar,
	  useLocalStorage,
	  StyledInput,
	  NotificationProvider,
	  useNotification,
	  Notification
	  // Export other components and hooks as needed
	};

	exports.Button = Button;
	exports.Gallery = Gallery;
	exports.GalleryItem = GalleryItem;
	exports.Notification = Notification;
	exports.NotificationProvider = NotificationProvider;
	exports.ProgressBar = ProgressBar;
	exports.StyledInput = StyledInput;
	exports["default"] = index;
	exports.useLocalStorage = useLocalStorage;
	exports.useNotification = useNotification;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
