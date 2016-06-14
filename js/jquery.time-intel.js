/**
 * jQuery TimeIntel
 * JQuery plugin to scan pieces of text intelligently for times and durations.
 * @author Niek den Breeje
 * @version 0.1
 */

(function(t) {
    'use strict';

    t.fn.timeIntel = function(options) {
        var settings = $.extend({
            lang: 'en'
        }, options);

        return this.each(function(index, el) {
            console.log(index, el);
        });
    };
})(jQuery);
