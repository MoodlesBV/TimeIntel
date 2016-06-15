var churn = false;

window.TimeIntel = function(selector, options) {
    'use strict';

    if (!(this instanceof TimeIntel)) return new TimeIntel(selector, options);

    if (typeof locale === 'undefined' || typeof locale !== 'object') { console.warn('TimeIntel: Locale not included.'); return false; }
    if (typeof moment === 'undefined' || typeof moment !== 'function') { console.warn('TimeIntel: moment.js not included.'); return false; }

    var defaults = {
        lang: 'en'
    };

    var validOptions = true;

    options       = options  || {};
    this.selector = selector || null;
    this.options  = {};

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
    this.sortLocaleByPriority();

    var times = [];

    for (var i in locale.time) {
        var values = this.values(),
            regex  = this.regex(i, locale.time[i]);

        for (var j = 0; j < values.length; j++) {
            times[j] = times[j] || null;

            if (values[j].match(regex) !== null && times[j] === null) {
                times[j] = values[j].match(regex)[0];
            }
        }
    }

    return times;
};

TimeIntel.prototype.regex = function(index, time) {
    var combine  = this.prepRegex(locale.combine);

    var keywordsArray = [],
        regex;

    for (var j in time.keywords) {
        keywordsArray.push(this.prepRegex(time.keywords[j]));
    }

    var keywords = keywordsArray.length > 1 ? '(' + keywordsArray.join('|') + ')' : keywordsArray.join('|');

    if (index === 'periods') {
        regex = '(\\d+:\\d+\\ ' + keywords + '\\ ' + combine + '\\ \\d+:\\d+\\ ' + keywords + ')|' +
                '(' + keywords + '\\ \\d+:\\d+\\ ' + combine + '\\ ' + keywords + '\\ \\d+:\\d+)|' +
                '(\\d+:\\d+\\ ' + keywords + '\\ ' + combine + '\\ \\d+:\\d+)|' +
                '(' + keywords + '\\ \\d+:\\d+\\ ' + combine + '\\ \\d+:\\d+)|' +
                '(\\d+:\\d+\\ ' + combine + '\\ \\d+:\\d+\\ ' + keywords + ')|' +
                '(\\d+:\\d+\\ ' + combine + '\\ ' + keywords + '\\ \\d+:\\d+)|' +
                '(\\d+:\\d+\\ ' + combine + '\\ \\d+:\\d+)|' +
                '(\\d+\\ ' + keywords + '\\ ' + combine + '\\ \\d+\\ ' + keywords + ')|' +
                '(' + keywords + '\\ \\d+\\ ' + combine + '\\ ' + keywords + '\\ \\d+)|' +
                '(\\d+\\ ' + keywords + '\\ ' + combine + '\\ \\d+)|' +
                '(' + keywords + '\\ \\d+\\ ' + combine + '\\ \\d+)|' +
                '(\\d+\\ ' + combine + '\\ \\d+\\ ' + keywords + ')|' +
                '(\\d+\\ ' + combine + '\\ ' + keywords + '\\ \\d+)|' +
                '(\\d+\\ ' + combine + '\\ \\d+)|';
    } else {
        regex = '(\\d+:\\d+\\ ' + keywords + ')|' +
                '(' + keywords + '\\ \\d+:\\d+)|' +
                '(\\d+:\\d+)|' +
                '(\\d+\\ ' + keywords + ')|' +
                '(' + keywords + '\\ \\d+)|' +
                '(\\d+)|' +
                keywords + '|';
    }

    return regex.slice(0, -1);
};

TimeIntel.prototype.duration = function(value) {
    return value;
};

TimeIntel.prototype.prepRegex = function(input) {
    return '(' + input.join('|').replace(/\\/g, '\\\\').replace(/\//g, '\\/').replace(/ /g, '\\ ').replace(/-/g, '\\-') + ')';
};

TimeIntel.prototype.sortLocaleByPriority = function() {
    var sortedLocale = {
        "combine": locale.combine,
        "time": {}
    };

    var sortedKeys = Object.keys(locale.time).sort(function(a, b) {
        return locale.time[a].priority - locale.time[b].priority;
    });

    for (var i = 0; i < sortedKeys.length; i++) {
        sortedLocale.time[sortedKeys[i]] = locale.time[sortedKeys[i]];
    }

    locale = sortedLocale;
};
