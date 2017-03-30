// tokens.js
// 2016-01-13

// (c) 2006 Douglas Crockford

// Produce an array of simple token objects from a string.
// A simple token object contains these members:
//      type: 'name', 'string', 'number', 'operator'
//      value: string or number value of the token
//      from: index of first character of the token
//      to: index of the last character + 1

// Comments of the // type are ignored.

// Operators are by default single characters. Multicharacter
// operators can be made by supplying a string of prefix and
// suffix characters.
// characters. For example,
//      '<>+-&', '=>&:'
// will match any of these:
//      <=  >>  >>>  <>  >=  +: -: &: &&: &&

/*jslint this */

RegExp.prototype.bexec = function(str) {
    var index = this.lastIndex;
    var match = this.exec(str);
    if(match && index == match.index){
        return match;
    }
    else{
        return null;
    }
}

String.prototype.tokens = function (prefix, suffix) {
    'use strict';
    var from;                   // The index of the start of the token.
    var i = 0;                  // The index of the current character.
    var length = this.length;
    var n;                      // The number value.
    var matching;

    var white             = /\s+/g;
    var singleLineComment = /\/\/.*/g;
    var multiLineComment  = /\/\*(.|\r?\n)*?\*\//g;
    var identifiers       = /[a-zA-Z_$](\w|\$)*/g;
    var singleCharOp      = /([-+*\/=()&|;:,<>{}[\]])/g;
    var twoCharOp         = /(===|!==|[+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/g;
    var numbers           = /\d+(\.\d*)?([eE][+-]?\d+)?/g;
    var string            = /(('(\\.|[^'])*')|("(\\.|[^"])*"))/g;

    var regexps           = [white, singleLineComment, multiLineComment,
                            identifiers, singleCharOp, twoCharOp, numbers, string];
    var result = [];            // An array to hold the results.

    // Makes a token
    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

    var getTok = function(){
        var match = matching[0];
        i += match.length;
        return match;
    };
    // Begin tokenization. If the source string is empty, return nothing.

    if (!this) {
        return;
    }

    while(i < length){
        regexps.forEach( function(t) { t.lastIndex = i;});
        from = i;
        if ((matching = white.bexec(this)) || (matching = singleLineComment.bexec(this)) || (matching = multiLineComment.bexec(this))){
            getTok();
        }
        else if(matching = numbers.bexec(this)){
            n = +getTok();
            if(isFinite(n)){
                result.push(make('number', n));
            }
        }
        else if(matching = identifiers.bexec(this)){
            result.push(make('name', getTok()));
        }
        else if(matching = string.bexec(this)){
            result.push(make('string', getTok().replace(/^['"]|['"]$/g,'')));
        }
        else if((matching = singleCharOp.bexec(this)) || (matching = twoCharOp.bexec(this))){
            result.push(make('operator', getTok()));
        }
        else{
            throw "Syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};
