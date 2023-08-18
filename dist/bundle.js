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
	  const addNotification = (content, options = {}) => {
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
	  const contextValue = {
	    addNotification,
	    removeNotification
	  };
	  return /*#__PURE__*/React__default["default"].createElement(NotificationContext.Provider, {
	    value: contextValue
	  }, children, notifications.map(notification => /*#__PURE__*/React__default["default"].createElement(Notification, {
	    key: notification.id,
	    content: notification.content,
	    type: notification.options.type,
	    autoClose: notification.options.autoClose
	  })));
	}
	function useNotification() {
	  const context = React.useContext(NotificationContext);
	  if (!context) {
	    throw new Error('useNotification must be used within a NotificationProvider');
	  }
	  return context;
	}

	const Notification$1 = ({
	  content,
	  options
	}) => {
	  const [show, setShow] = React.useState(true);
	  React.useEffect(() => {
	    if (options.autoClose > 0) {
	      const timer = setTimeout(() => {
	        setShow(false);
	      }, options.autoClose);
	      return () => {
	        clearTimeout(timer);
	      };
	    }
	  }, [options.autoClose]);
	  if (!show || !content) {
	    return null;
	  }
	  return /*#__PURE__*/React__default["default"].createElement("div", {
	    className: `notification ${options.type || 'info'}`
	  }, content);
	};

	function Alert({
	  variant
	}) {
	  const [open, setOpen] = React.useState(true);
	  if (open) return /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "alert-container",
	    style: {
	      background: variant.mainColor,
	      border: "0.1rem solid " + variant.secondaryColor
	    }
	  }, /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "symbol-container",
	    style: {
	      background: variant.secondaryColor
	    }
	  }, /*#__PURE__*/React__default["default"].createElement("span", {
	    class: "material-symbols-outlined symbol"
	  }, variant.symbol), " "), /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "description-container"
	  }, /*#__PURE__*/React__default["default"].createElement("span", {
	    className: "description-title"
	  }, variant.title, ":"), /*#__PURE__*/React__default["default"].createElement("span", {
	    className: "description-text"
	  }, variant.text)), /*#__PURE__*/React__default["default"].createElement("a", {
	    className: "symbol-close-link",
	    onClick: () => setOpen(false)
	  }, /*#__PURE__*/React__default["default"].createElement("span", {
	    class: "material-symbols-outlined "
	  }, "close")));
	}

	const variants = [
	//red
	{
	  mainColor: "#FDEDED",
	  secondaryColor: "#F16360",
	  symbol: "error",
	  title: "Error",
	  text: "The action was not carried out succesfully please try again."
	},
	//blue
	{
	  mainColor: "#E5F6FD",
	  secondaryColor: "#1AB1F5",
	  symbol: "info",
	  title: "Information",
	  text: "Our newest module can be bought, or you can always just use our 30 day trial."
	},
	//green
	{
	  mainColor: "#EDFEEE",
	  secondaryColor: "#5CB660",
	  symbol: "check_circle",
	  title: "Success",
	  text: "Saving of your newest settings are successfuly carried out. "
	},
	//yellow
	{
	  mainColor: "#FFF4E5",
	  secondaryColor: "#FFA117",
	  symbol: "warning",
	  title: "Warning",
	  text: "Your trial is ending soon, please click here to renew it."
	},
	//pink
	{
	  mainColor: "#FFC0CB",
	  secondaryColor: "#FF69B4",
	  symbol: "pets",
	  title: "Check it out",
	  text: "Fun and cute pictures of dogs are to be released daily from now on!"
	}];

	exports.Alert = Alert;
	exports.Button = Button;
	exports.Gallery = Gallery;
	exports.GalleryItem = GalleryItem;
	exports.Notification = Notification$1;
	exports.NotificationProvider = NotificationProvider;
	exports.ProgressBar = ProgressBar;
	exports.StyledInput = StyledInput;
	exports.useLocalStorage = useLocalStorage;
	exports.useNotification = useNotification;
	exports.variants = variants;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
