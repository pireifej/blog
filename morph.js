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
	
	// Move the ring back in Z so it's not so in-your-face.
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
		//ignore the touchmove event
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		});

		document.addEventListener('touchstart', function(e) {
			e.preventDefault();
			//e.touches is an array (for multitouch usage) but we just want the first finger down
			var touch = e.touches[0];
			//save the time and the screenY coordinate
			jAd.currentTouch.startY = touch.screenY;
			jAd.currentTouch.startTime = e.timeStamp;
		}, false);

		document.addEventListener('touchend', function(e) {
			e.preventDefault();
			var touch = e.changedTouches[0];
			jAd.currentTouch.endY = touch.screenY;
			//work out the speed using the saved coordinate and time
			var time = e.timeStamp - jAd.currentTouch.startTime;
			var speed = (jAd.currentTouch.startY - jAd.currentTouch.endY)/time;
			//send the speed to the spin function
			jAd.spin(speed);
		}, false);
	};

	function spin(speed) {
		//get a string representation of the current 3dCSSMatrix of the <ul> (jAd.shape)
		var theTransform = window.getComputedStyle(jAd.shape).webkitTransform;
		//from this create a new WebKitCSSMatrix
		var matrix = new WebKitCSSMatrix(theTransform);
		//do some stuff to get a number that is somewhere between 0 and 179
		var newX = Math.round(speed * 120);
		newX = (newX > 179) ? 179 : ((newX < -179) ? -179 : newX);
		//rotate the <ul> in the x plane by this value
		shape.style.webkitTransform= matrix.rotate(newX, 0, 0);
	};
}
