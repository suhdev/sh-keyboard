(function(w){
var baseLayout = [
    [{
        "base": "`",
        "alt": "~"
    }, {
        "base": "1",
        "alt": "!"
    }, {
        "base": "2",
        "alt": "@"
    }, {
        "base": "3",
        "alt": "#"
    }, {
        "base": "4",
        "alt": "$"
    }, {
        "base": "5",
        "alt": "%"
    }, {
        "base": "6",
        "alt": "^"
    }, {
        "base": "7",
        "alt": "&"
    }, {
        "base": "8",
        "alt": "*"
    }, {
        "base": "9",
        "alt": "("
    }, {
        "base": "0",
        "alt": ")"
    }, {
        "base": "-",
        "alt": "_"
    }, {
        "base": "=",
        "alt": "+"
    }, {
        "base": "Backspace",
        "alt": "DEL",
        "ctrl": true,
        "keyCode": "Backspace",
        "className":"backspace-key",
        "keySize":5
    }],
    [{
        "base": "Tab",
        "alt": "Tab",
        "ctrl": true,
        "keyCode": "Tab",
        "className":"tab-key",
        "keySize":3
    }, {
        "base": "q",
        "alt": "Q"
    }, {
        "base": "w",
        "alt": "W"
    }, {
        "base": "e",
        "alt": "E"
    }, {
        "base": "r",
        "alt": "R"
    }, {
        "base": "t",
        "alt": "T"
    }, {
        "base": "y",
        "alt": "Y"
    }, {
        "base": "u",
        "alt": "U"
    }, {
        "base": "i",
        "alt": "I"
    }, {
        "base": "o",
        "alt": "O"
    }, {
        "base": "p",
        "alt": "P"
    }, {
        "base": "[",
        "alt": "{"
    }, {
        "base": "]",
        "alt": "}"
    }, {
        "base": "\\",
        "alt": "|",
        "keySize":3
    }],
    [{
        "base": "Caps Lock",
        "alt": "CAPS",
        "ctrl": true,
        "keyCode": "CapsLock",
        "className":"capslock-key",
        "keySize":4
    }, {
        "base": "a",
        "alt": "A"
    }, {
        "base": "s",
        "alt": "S"
    }, {
        "base": "d",
        "alt": "D"
    }, {
        "base": "f",
        "alt": "F"
    }, {
        "base": "g",
        "alt": "G"
    }, {
        "base": "h",
        "alt": "H"
    }, {
        "base": "j",
        "alt": "J"
    }, {
        "base": "k",
        "alt": "K"
    }, {
        "base": "l",
        "alt": "L"
    }, {
        "base": ";",
        "alt": ":"
    }, {
        "base": "'",
        "alt": "\""
    }, {
        "base": "Enter",
        "alt": "Enter",
        "ctrl": true,
        "keySize":"6",
        "keyCode": "Enter",
        "className":"enter-key"
    }],
    [{
        "base": "Shift",
        "alt": "Shift",
        "ctrl": true,
        "keySize":"6",
        "keyCode": "Shift",
        "className":"shift-key"
    }, {
        "base": "z",
        "alt": "Z"
    }, {
        "base": "x",
        "alt": "X"
    }, {
        "base": "c",
        "alt": "C"
    }, {
        "base": "v",
        "alt": "V"
    }, {
        "base": "b",
        "alt": "B"
    }, {
        "base": "n",
        "alt": "N"
    }, {
        "base": "m",
        "alt": "M"
    }, {
        "base": ",",
        "alt": "<"
    }, {
        "base": ".",
        "alt": ">"
    }, {
        "base": "/",
        "alt": "?"
    }, {
        "base": "Shift",
        "alt": "Shift",
        "ctrl": true,
        "keyCode": "Shift",
        "keySize":"8",
        "className":"shift-key"
    }],
    [{
        "base": "Space",
        "alt": "Space",
        "ctrl":true,
        "keySize":"10",
        "keyCode": "Space",
        "className":"space-key"
    }]
]; 
w.shDefaultLayout = baseLayout;
})(window); 