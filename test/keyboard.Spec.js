describe("Keyboard Spec", function() {
	var key; 
	beforeEach(function() {
		if (key){
			key.dispose(); 
		}
		key = new shKeyboard();
	});
	it("should construct a new instance and initialize properties", function() {
		expect(key.element).toBe(null);
		expect(key.capsLock).toBe(false);
		expect(key.shift).toBe(false); 		
		expect(key.options).toBeDefined();
	});

	it('should render element on body',function(){
		key.render(); 
		expect($('.sh-keyboard').parent().get(0).tagName).toEqual('BODY');
	}); 

	it('should render element as a child of another element',function(){
		key.render($('<div>').addClass('container').appendTo('body')); 
		expect($('.sh-keyboard').parent().hasClass('container')).toBe(true); 
	});

	it('should respond to toggling capsLock',function(){
		key.render($('<div>').addClass('container').appendTo('body')); 
		expect(key.toggleCapsLock).toBeDefined(); 
		key.toggleCapsLock(); 
		expect(key.element.hasClass('capslock')).toBe(true);
		$('.sh-key.capslock-key').click(); 
		expect(key.element.hasClass('capslock')).toBe(false); 
	});

	it('should respond to toggling shift',function(){
		key.render($('<div>').addClass('container').appendTo('body')); 
		expect(key.toggleShift).toBeDefined(); 
		key.toggleShift(); 
		expect(key.element.hasClass('alt')).toBe(true);
		$('.sh-key.shift-key').first().click(); 
		expect(key.element.hasClass('alt')).toBe(false); 
	});

	
	
});