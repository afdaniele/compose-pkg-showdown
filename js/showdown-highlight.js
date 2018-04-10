// Extension loading compatible with AMD and CommonJs
(function(extension) {
    'use strict';

    if (typeof showdown === 'object') {
        // global (browser or nodejs global)
        showdown.extension('highlightjs', extension());
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define('highlightjs', extension());
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = extension();
    } else {
        // showdown was not found so we throw
        throw Error('Could not find showdown library');
    }

}(function() {
    function htmlunencode(text) {
        return (
            text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
        );
    }
    return [
      {
        type: 'output',
        filter: function (text, converter, options) {
          // use new shodown's regexp engine to conditionally parse codeblocks
          var left  = '<pre><code\\b[^>]*>',
              right = '</code></pre>',
              flags = 'g',
              replacement = function (wholeMatch, match, left, right) {
                // unescape match to prevent double escaping
                match = htmlunencode(match);
                return left + hljs.highlightAuto(match).value + right;
              };
          return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
        }
      }
    ];
}));
