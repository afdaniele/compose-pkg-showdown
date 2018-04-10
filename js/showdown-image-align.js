// Extension loading compatible with AMD and CommonJs
(function(extension) {
    'use strict';

    if (typeof showdown === 'object') {
        // global (browser or nodejs global)
        showdown.extension('image-align', extension());
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define('image-align', extension());
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = extension();
    } else {
        // showdown was not found so we throw
        throw Error('Could not find showdown library');
    }

}(function() {
    return [{
        type: 'output',
        filter: function(sourceHtml) {
            // create fake HTML element to use jQuery
            var doc = document.createElement( 'div' );
            doc.innerHTML = sourceHtml;
            // adjust alignment using alt
            $('p img', doc).each( function(){
                $(this).parent().css( 'text-align', $(this).attr('alt') );
                $(this).attr('alt', '');
            } );
            // return modified HTML
            return doc.innerHTML;
        }
    }];
}));
