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
};

TimeIntel.prototype.elements = function() {
    if (this.selector.substring(0, 1) === '#') {
        return [document.getElementById(this.selector.substring(1))];
    }

    return document.getElementsByClassName(this.selector.substring(1));
};

TimeIntel.prototype.values = function() {
    var elements = this.elements(),
        values   = [];

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
    var combine  = '(' + this.prepRegex(locale.combine) + ')';

    var keywordsArray = [],
        regex;

    for (var j in time.keywords) {
        keywordsArray.push('(' + this.prepRegex(time.keywords[j]) + ')');
    }

    var keywords = keywordsArray.length > 1 ? '(' + keywordsArray.join('|') + ')' : keywordsArray.join('|');

    if (index === 'periods') {
        regex = '(\\d+:\\d+\\s+' + keywords + '\\s+' + combine + '\\s+\\d+:\\d+\\s+' + keywords + ')|' +
                '(' + keywords + '\\s+\\d+:\\d+\\s+' + combine + '\\s+' + keywords + '\\s+\\d+:\\d+)|' +
                '(\\d+:\\d+\\s+' + keywords + '\\s+' + combine + '\\s+\\d+:\\d+)|' +
                '(' + keywords + '\\s+\\d+:\\d+\\s+' + combine + '\\s+\\d+:\\d+)|' +
                '(\\d+:\\d+\\s+' + combine + '\\s+\\d+:\\d+\\s+' + keywords + ')|' +
                '(\\d+:\\d+\\s+' + combine + '\\s+' + keywords + '\\s+\\d+:\\d+)|' +
                '(\\d+:\\d+\\s+' + combine + '\\s+\\d+:\\d+)|' +
                '(\\d+\\s+' + keywords + '\\s+' + combine + '\\s+\\d+\\s+' + keywords + ')|' +
                '(' + keywords + '\\s+\\d+\\s+' + combine + '\\s+' + keywords + '\\s+\\d+)|' +
                '(\\d+\\s+' + keywords + '\\s+' + combine + '\\s+\\d+)|' +
                '(' + keywords + '\\s+\\d+\\s+' + combine + '\\s+\\d+)|' +
                '(\\d+\\s+' + combine + '\\s+\\d+\\s+' + keywords + ')|' +
                '(\\d+\\s+' + combine + '\\s+' + keywords + '\\s+\\d+)|' +
                '(\\d+\\s+' + combine + '\\s+\\d+)|';
    } else {
        regex = '(\\d+:\\d+\\s+' + keywords + ')|' +
                '(' + keywords + '\\s+\\d+:\\d+)|' +
                '(\\d+:\\d+)|' +
                '(\\d+\\s+' + keywords + ')|' +
                '(' + keywords + '\\s+\\d+)|' +
                '(\\d+)|' +
                keywords + '|';
    }

    return new RegExp(regex.slice(0, -1), 'gi');
};

TimeIntel.prototype.format = function() {
    var elements     = this.elements(),
        times        = this.times(),
        combineRegex = new RegExp('\\s+(?:' + this.prepRegex(locale.combine) + ')\\s+'),
        tmp = [];

    for (var i = 0; i < times.length; i++) {
        var cont = true;

        if (times[i] === null || typeof times[i] === 'undefined') {
            cont = false;
            tmp[i] = null;
        }

        if (cont) {
            // If regex succeeds, this means we can calculate the difference.
            // Else, it's just a time format.
            if (combineRegex.test(times[i])) {
                var asdf = times[i].split(combineRegex);

                console.log(asdf, asdf.map(function(a) { return moment(a, 'HH:mm').format('HH:mm'); }));
            } else {
                console.log(times[i], moment(times[i], 'HH:mm').format('HH:mm'));
            }
            // console.log(times[i], combineRegex.test(times[i]), times[i] === null ? null : times[i].split(combineRegex));
        }
    }

    return tmp;
};

TimeIntel.prototype.prepRegex = function(input) {
    return input.join('|').replace(/\\/g, '\\\\').replace(/\//g, '\\/').replace(/\s+/g, '\\s+').replace(/-/g, '\\-');
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
