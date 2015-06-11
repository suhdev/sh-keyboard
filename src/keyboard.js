(function($){
/**
 * @name Keyboard
 * @author Suhail Abood
 * @version 0.1.0 
 * @constructor
 * @param {object} opts the options to use to initialize the instance. 
 * @property {object} element a reference to the root DOM element of the keyboard instance. 
 * @property {boolean} capsLock a boolean flag which is true when caps lock is active, false otherwise. 
 * @property {boolean} shift a boolean flat which is true when the shift key is active, false otherwise. 
 * @property {object} input a reference to the input field within the keyboard instance. 
 * @property {object} layout the current layout of the keyboard, 
 *  this is used to provide configurable keyboard layouts. 
 * @description
 * Creates a new instance of the Keyboard class. 
 */ 
var Keyboard = function(opts){
	//@todo setup some defaults such as default selectors, etc. 
  var defaults = {},
  	self = this; 
  this.options = $.extend({},defaults,opts); 
  this.element = this.options.element || null;
  this.element = this.element && jQuery(this.element); 
  this.capsLock = false;
  this.shift = false;
  this.layout = this.options.layout || shDefaultLayout;
};

Keyboard.prototype = {
  /**
   * @name Keyboard#_attachEvents
   * @description 
   * Attaches the events to the elements of the keyboard. This includes key events, and input field events. 
   */
  _attachEvents:function(){
    var self = this;
    this.input = this.element.find('.sh-keyboard-textarea'); 
    this.input.on('click',function(){
      return false;
    });
    this.input.on('keydown',function(e,a){
      if (e.originalEvent){
        return false;
      }
      //extract the value of the text area (input field)
      var t = $(this).val(),
      	//keep the current position of the cursor 
        st = this.selectionStart,
        //keep the end of selection (in case there is a selection) 
        et = this.selectionEnd,
        //create a character array out of the text 
        k = t.split('');

      //handle backspace key diffrently 
      if (e.which === 8){
      	//check if there is a selection 
        if((this.selectionEnd-this.selectionStart) > 0){
        	//in case there is a selection, delete everything selected 
          k.splice(this.selectionStart,(this.selectionEnd-this.selectionStart));
        }else{
        	//if no selection, then delete the character thats just before the cursor 
          k.splice(this.selectionStart-1,1); 
        }
        //reconstruct the text again 
        $(this).val(k.join('')); 
        //set the selection to be one place before the previous position 
        this.selectionStart = this.selectionEnd = st-1;
        //end of special handling, early exit 
        return;
      }
      //replace the selection (if any) by the new character 
      k.splice(this.selectionStart,this.selectionEnd-this.selectionStart,String.fromCharCode(e.which));
      //reconstruct the text from the array 
      $(this).val(k.join('')); 
      //set the selection (cursor position) one place ahead. 
      this.selectionStart = this.selectionEnd = st+1;

    });
	//wrap the onKeyClick method with a wrapper function to ensure
	//that the element gets caled on the right context `self` 
    this.element.find('.sh-key').on('click',
      function(){
        self.onKeyClicked(this); 
      });

  },
  /**
   * @name Keyboard#toggleShift
   * @description 
   * Toggles shift mode on, the method toggles a class `alt` on the 
   * root element of the {@link Keyboard Keyboard} instance forcing an alternative
   * view to show up on the buttons. 
   */
  toggleShift:function(){
    this.element.toggleClass('alt');
    this.shift = !this.shift; 
  },
  /**
   * @name Keyboard#toggleCapsLock 
   * @description
   * Toggles the caps lock mode on the keyboard. The method toggles 
   * a class `capslock` on the root element of the {@link Keyboard Keyboard} 
   * instance, forcing character keys to show uppercase states. 
   */
  toggleCapsLock:function(){
    this.element.toggleClass('capslock');
    this.capsLock = !this.capsLock;
  },
  /**
   * @name Keyboard#onKeyClicked
   * @param {DOMElement} key the DOMElement of the key that has been clicked. 
   * @description
   * A key click handler that is triggered everytime a key is pressed. 
   */ 
  onKeyClicked:function(key){
    var data = $(key).data(),
      kkey = -1;
    //check if the key is a control key 
    if (data.ctrl){
      switch(data.keyCode){
        case 'Tab':
        kkey = '\t'.charCodeAt(0); 
        break;
        case 'Enter':
        kkey = '\n'.charCodeAt(0); 
        break;
        case 'Backspace':
        kkey = 8; 
        break;
        case 'Space':
        kkey = ' '.charCodeAt(0); 
        break;
        case 'CapsLock':
        this.toggleCapsLock(); 
        return;
        case 'Shift':
        this.toggleShift();
        return; 
      }
    }else{
      kkey = (this.shift)?data.alt.charCodeAt(0):((this.capsLock)?data.base.toUpperCase():data.base).charCodeAt(0);
    }
    //create a `keydown` event
    var e = jQuery.Event("keydown",{which:kkey,keyCode:kkey});
    //trigger the event on the input field 
    this.input.trigger(e);
  },
  /**
   * @name Keyboard#setLayout
   * @param {object} layout the new keyboard layout to use. 
   * @description
   * A method to set the layout of the keyboard. This can be used to provide 
   * layouts for other languages. Note that this method removes the root element
   * of the {@link Keyboard Keyboard} instance and issues a render call to re-render
   * the keyboard with the new layout. 
   * @todo implement light-weight binding to replace the keys. Perhaps using a static 
   * keys layout with single key-value bindings. 
   */ 
  setLayout:function(layout){
  	this.layout = layout; 
  	var parent = this.element?this.element.parent():null;
  	$(this.element).remove(); 
  	this.render(parent); 
  },
  /**
   * @name Keyboard#dispose
   * @description
   * Disposes of the Keyboard instance, by removing the root element. 
   * @todo Make sure everything is cleaned up 
   */
  dispose:function(){
  	if (this.element){
  		this.element.remove(); 
  	}
  },
  /**
   * @name Keyboard#render
   * @param {DOMElement} [parentEl] the parentElement to attach the keyboard instance to. 
   * @description 
   * Renders the keyboard on screen, the method generates all the element required by the 
   * keyboard object, and then invokes {@link Keyboard#_attachEvents _attachEvents} method 
   * to attach the event listeners to the keys and input field. 
   */

  render:function(parentEl){
    //if the parentEl is defined then attach it to the provided element.
    //otherwise, use the body element as the parent. 
    var p = parentEl || $('body'),
      row,i,l,j,ll,kkey; 
    this.element = $('<div>')
      .addClass('sh-keyboard')
      .append($('<div>')
        .addClass('sh-keyboard-input')
        .append($('<textarea>')
          .addClass('sh-keyboard-textarea')
          .attr('readonly','readonly')))
      .appendTo(p); 

    //keep a reference within the root element to the keyboard instance
    //this is helpful for in-browser debugging (using $0) 
    this.element.data('__SH_KEYBOARD__',this); 

    //loop through the rows to generate the keyboard 
    for(i=0,l=this.layout.length;i<l;i++){
      row = $('<div>')
        .addClass('sh-keys-row')
        .appendTo(this.element); 
      for(j=0,ll=this.layout[i].length;j<ll;j++){
        kkey = this.layout[i][j]; 
        row.append($('<div>')
          .data(kkey)
          .addClass('sh-key')
          .addClass(kkey.ctrl?'sh-ctrl-key':'sh-char-key')
          .addClass(kkey.className?kkey.className:'sh-no-class')
          .attr('key-size',kkey.keySize||'1')
          .append($('<span>')
            .addClass('sh-base')
            .html(kkey.base))
          .append($('<span>')
            .addClass('sh-alt')
            .html(kkey.alt)))
          .appendTo(row);
      }
    }
    //attach the event handlers/listeners 
    this._attachEvents();
  }
}; 

window.shKeyboard = Keyboard; 
})(jQuery); 