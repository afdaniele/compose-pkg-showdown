// Extension loading compatible with AMD and CommonJs
(function(extension) {
  'use strict';

  if (typeof showdown === 'object') {
    // global (browser or nodejs global)
    showdown.extension('anchor', extension());
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define('anchor', extension());
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = extension();
  } else {
    // showdown was not found so we throw
    throw Error('Could not find showdown library');
  }

}(function() {

  var anchor_btn = '<a href="{0}" style="float:right; font-size:20px;"><i class="fa fa-link" aria-hidden="true"></i></a>';

  function add_anchor_to_headers(sourceHtml) {
    // Generate dummy element
    var source = document.createElement('div');
    source.innerHTML = sourceHtml;
    // Find headers
    var headers = source.querySelectorAll('h1, h2');
    for (var i = 0; i < headers.length; i++) {
      var el = headers[i];
      if(el.id != undefined && el.id != ''){
        el.innerHTML += anchor_btn.format('#'+el.id);
      }
    }
    return source.innerHTML;
  }

  return [{
    type: 'output',
    filter: add_anchor_to_headers
  }];
}));
