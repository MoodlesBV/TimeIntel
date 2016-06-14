var churn = false;

window.TimeIntel = function(selector, options) {
    'use strict';

    if (!(this instanceof TimeIntel)) return new TimeIntel(selector, options);
    if (typeof moment !== 'function') { console.warn('moment.js is not included.'); return false; }

    var defaults = {
        locale: 'en'
    };

    var validOptions = true;

    options       = options  || {};
    this.selector = selector || null;
    this.options  = {};
    this.lang     = lang;

    for (var i in options) {
        if (typeof defaults[i] === 'undefined') {
            validOptions = false;
            console.warn('The option "' + i + '" is not supported.');
            return false;
        }
    }

    if (validOptions) {
        for (var j in defaults) {
            this.options[j] = options[j] || defaults[j];
        }
    }

    moment.locale(this.options.locale);

    churn = true;
};

TimeIntel.prototype.elements = function() {
    if (this.selector.substring(0, 1) === '#') {
        return [document.getElementById(this.selector.substring(1))];
    }

    return document.getElementsByClassName(this.selector.substring(1));
};

TimeIntel.prototype.values = function() {
    var elements = this.elements(),
        values = [];

    for (var i = 0; i < elements.length; i++) {
        values.push(elements[i].value || elements[i].innerHTML);
    }

    return values;
};

TimeIntel.prototype.times = function() {
    var lang  = this.lang,
        hour  = this.prepRegex(lang.hour),
        to    = this.prepRegex(lang.to),
        regex = '(\\d+:\\d+\\ ' + hour + '\\ ' + to + '\\ \\d+:\\d+\\ ' + hour + ')|'+
                '(\\d+:\\d+\\ ' + hour + '\\ ' + to + '\\ \\d+:\\d+)|'+
                '(\\d+:\\d+\\ ' + to + '\\ \\d+:\\d+\\ ' + hour + ')|'+
                '(\\d+:\\d+\\ ' + to + '\\ \\d+:\\d+)|'+
                '(\\d+\\ ' + hour + '\\ ' + to + '\\ \\d+\\ ' + hour + ')|'+
                '(\\d+\\ ' + hour + '\\ ' + to + '\\ \\d+)|'+
                '(\\d+\\ ' + to + '\\ \\d+\\ ' + hour + ')|'+
                '(\\d+\\ ' + to + '\\ \\d+)',
        regexp = new RegExp(regex, 'g'),
        values = this.values(),
        times  = [];

    console.log(regex);

    for (var i = 0; i < values.length; i++) {
        times.push(values[i].match(regexp));
    }

    return times;
};

TimeIntel.prototype.duration = function(value) {
    return value;
};

TimeIntel.prototype.prepRegex = function(input) {
    return '[' + input.join('|').replace('\\', '\\\\').replace('/', '\\/').replace(' ', '\\ ') + ']+';
};
