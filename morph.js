function hasClassName(inElement, inClassName) {
	var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
	return regExp.test(inElement.className);
}
 
function addClassName(inElement, inClassName) {
	if (!hasClassName(inElement, inClassName))
		inElement.className = [inElement.className, inClassName].join(' ');
}
 
function removeClassName(inElement, inClassName) {
	if (hasClassName(inElement, inClassName)) {
		var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
		var curClasses = inElement.className;
		inElement.className = curClasses.replace(regExp, ' ');
	}
}
 
function toggleClassName(inElement, inClassName) {
	if (hasClassName(inElement, inClassName))
		removeClassName(inElement, inClassName);
	else
	addClassName(inElement, inClassName);
}
 
function toggleShape() {
	var shape = document.getElementById('shape');
	if (hasClassName(shape, 'ring')) {
		removeClassName(shape, 'ring');
		addClassName(shape, 'cube');
	} else {
		removeClassName(shape, 'cube');
		addClassName(shape, 'ring');
	}
	
	var stage = document.getElementById('stage');
	if (hasClassName(shape, 'ring'))
		stage.style.webkitTransform = 'translateZ(-200px)';
	else
		stage.style.webkitTransform = '';
}
    
function toggleBackfaces() {
	var backfacesVisible = document.getElementById('backfaces').checked;
	var shape = document.getElementById('shape');
	if (backfacesVisible)
		addClassName(shape, 'backfaces');
	else
		removeClassName(shape, 'backfaces');
}

var jAd = function() {
	function createRing() {
		var items = shape.getElementsByTagName('li');
		var angle = 360 / items.length, newAngle;
		for(var i = 0, l = items.length; i < l; i++){
			newAngle = (angle * i);
			var matrix = new WebKitCSSMatrix();
			items[i].style.webkitTransform= matrix.rotate(newAngle, 0, 0).translate(0, 0, 380);
		}
	}

	  function bindTouches() {
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		});

		document.addEventListener('touchstart', function(e) {
			e.preventDefault();
			var touch = e.touches[0];
			jAd.currentTouch.startY = touch.screenY;
			jAd.currentTouch.startTime = e.timeStamp;
		}, false);

		document.addEventListener('touchend', function(e) {
			e.preventDefault();
			var touch = e.changedTouches[0];
			jAd.currentTouch.endY = touch.screenY;
			var time = e.timeStamp - jAd.currentTouch.startTime;
			var speed = (jAd.currentTouch.startY - jAd.currentTouch.endY)/time;
			jAd.spin(speed);
		}, false);
	};

	function spin(speed) {
		var theTransform = window.getComputedStyle(jAd.shape).webkitTransform;
		var matrix = new WebKitCSSMatrix(theTransform);
		var newX = Math.round(speed * 120);
		newX = (newX > 179) ? 179 : ((newX < -179) ? -179 : newX);
		shape.style.webkitTransform= matrix.rotate(newX, 0, 0);
	};
}
