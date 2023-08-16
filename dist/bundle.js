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

	exports.Button = Button;
	exports.ProgressBar = ProgressBar;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
