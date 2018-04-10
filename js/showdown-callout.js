// Extension loading compatible with AMD and CommonJs
(function(extension) {
    'use strict';

    if (typeof showdown === 'object') {
        // global (browser or nodejs global)
        showdown.extension('callout', extension());
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define('callout', extension());
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = extension();
    } else {
        // showdown was not found so we throw
        throw Error('Could not find showdown library');
    }

}(function() {
    function create_callout( element, callout_type, callout_style ){
        var message = $(element).html().substr(5).trim();
        // create callout
        return "<div class=\"bs-callout bs-callout-{0}\"><h4>{1}</h4><p>{2}</p></div>".format( callout_style, callout_type, message );
    }
    return [{
        type: 'output',
        filter: function(sourceHtml) {
            // create fake HTML element to use jQuery
            var doc = document.createElement( 'div' );
            doc.innerHTML = sourceHtml;
            // add class callout to paragraphs starting with keywords
            $('p', doc).each( function(){
                // tODO callout
                if( $(this).html().startsWith("TODO: ") ){
                    callout = create_callout( this, 'TODO', 'danger' );
                    $(this).replaceWith(callout);
                }
                // nOTE callout
                if( $(this).html().startsWith("NOTE: ") ){
                    callout = create_callout( this, 'Note', 'info' );
                    $(this).replaceWith(callout);
                }
                // wARN callout
                if( $(this).html().startsWith("WARN: ") ){
                    callout = create_callout( this, 'Warning', 'warning' );
                    $(this).replaceWith(callout);
                }
            } );
            // return modified HTML
            return doc.innerHTML;
        }
    }];
}));
