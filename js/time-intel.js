window.TimeIntel = function(selector, options) {
    'use strict';

    if (!(this instanceof TimeIntel)) return new TimeIntel(selector, options);

    if (typeof locale === 'undefined' || typeof locale !== 'object') { console.error('TimeIntel: Locale not included.'); return; }
    if (typeof moment === 'undefined' || typeof moment !== 'function') { console.error('TimeIntel: moment.js not included.'); return; }

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
            console.warn('The option "' + i + '" is not supported.'); return;
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

TimeIntel.prototype.timeString = function() {
    this.sortLocaleByPriority();

    var timeString = [];

    for (var i in locale.time) {
        var values = this.values(),
            regex  = this.regex(i, locale.time[i]);

        for (var j = 0; j < values.length; j++) {
            timeString[j] = timeString[j] || null;

            if (values[j].match(regex) !== null && timeString[j] === null) {
                timeString[j] = values[j].match(regex)[0];
            }
        }
    }

    return timeString;
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

TimeIntel.prototype.times = function() {
    var elements     = this.elements(),
        timeString   = this.timeString(),
        combineRegex = new RegExp('\\s+(?:' + this.prepRegex(locale.combine) + ')\\s+'),
        times        = [];

    for (var i = 0; i < timeString.length; i++) {
        if (timeString[i] === null || typeof timeString[i] === 'undefined') {
            times[i] = null;
        } else {
            // If regex succeeds, this means we can calculate the difference.
            // Else, it's just a time format.
            if (combineRegex.test(timeString[i])) {
                times[i] = timeString[i].split(combineRegex);
            } else {
                times[i] = [timeString[i]];
            }
        }
    }

    return times;
};

TimeIntel.prototype.format = function(format) {
    var formats   = ['s', 'm', 'h', 'd', 'w', 'm', 'y'],
        times     = this.times(),
        formatted = [];

    format = format || 's';

    if (formats.indexOf(format) < 0) {
        console.error('TimeIntel: Format not supported.'); return;
    }

    for (var i = 0; i < times.length; i++) {
        formatted[i] = null;

        if (times[i] !== null) {
            if (times[i].length > 1) {
                // You can assume the format to be in hours here.
                var start    = moment(times[i][0], 'HH:mm'),
                    end      = moment(times[i][1], 'HH:mm'),
                    duration = moment.duration(end.diff(start));

                formatted[i] = this.getFormatted(format, duration);
            } else {
                // TODO: Get the format from the string using regular
                // expressions
                console.log(times[i]);

                formatted[i] = times[i][0];
            }
        }
    }

    return formatted;
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

TimeIntel.prototype.getFormatted = function(format, duration) {
    var formatted;

    switch(format) {
        case 'ms': formatted = duration.asMilliseconds(); break;
        case 's': formatted  = duration.asSeconds(); break;
        case 'm': formatted  = duration.asMinutes(); break;
        case 'h': formatted  = duration.asHours(); break;
        case 'd': formatted  = duration.asDays(); break;
        case 'm': formatted  = duration.asMonths(); break;
        case 'y': formatted  = duration.asYears(); break;
        default: console.error('TimeIntel: Format not recognized.'); return;
    }

    return formatted;
};
