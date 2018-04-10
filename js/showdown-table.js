// Extension loading compatible with AMD and CommonJs
(function(extension) {
    'use strict';

    if (typeof showdown === 'object') {
        // global (browser or nodejs global)
        showdown.extension('table', extension());
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define('table', extension());
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
            // create fake HTML element to use jQuery on
            var doc = document.createElement( 'div' );
            doc.innerHTML = sourceHtml;
            // add class callout to paragraphs starting with keywords
            $('table', doc).each( function(){
                $(this).addClass('table table-striped');
            } );
            // return modified HTML
            return doc.innerHTML;
        }
    }];
}));
