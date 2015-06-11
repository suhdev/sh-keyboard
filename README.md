# shKeyboard

A JavaScript Keyboard for touch devices. 

# Dependencies 

jQuery is the only dependency, the code is built against the most recent version 2.1.13. 
However, older versions should work just fine. 

# Usage

1. Include jQuery in your HTML 

	```html

	<script type="text/javascript" src="path_to_jquery/jquery.min.js"></script>

	```

2. Include shKeyboard script file 

	```html

	<script type="text/javascript" src="path_to_shkeyboard/keyboard.min.js"></script>

	```

3. In your JS code use the following to create a new instance of `shKeyboard`; 

	```javascript

		var key = new shKeyboard(); 
		//if no parameter is supplied to the `render` method, 
		//by default it will append the keyboard to the `body` 
		//element. 
		key.render($('parent-element-selector')); 

	```


