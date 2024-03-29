window.iPortal = {
	"sudyInitCallback": (function () {
		var init = false;
		return function (context) {
			if (init) {
				return init;
			}
			init = true;
			window.iPortal.context = context;
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = context.libPath;
			document.getElementsByTagName("head")[0].appendChild(script);
			return init;
		};
	})()
};
