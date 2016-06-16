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

TimeIntel.prototype.regex = function(index) {
    var keywordsArray = [];

    for (var j in locale.time[index].props) {
        keywordsArray.push('(' + this.prepRegex(locale.time[index].props[j].keywords) + ')');
    }

    var keywords = keywordsArray.length > 1 ? '(' + keywordsArray.join('|') + ')' : keywordsArray.join('|');

    return this.generateRegex(index, keywords);
};

TimeIntel.prototype.times = function() {
    var elements     = this.elements(),
        timeString   = this.timeString(),
        combineRegex = new RegExp('\\s+(?:' + this.prepRegex(locale.combine) + ')\\s+', 'i'),
        times        = [];

    for (var i = 0; i < timeString.length; i++) {
        if (timeString[i] === null || typeof timeString[i] === 'undefined') {
            times[i] = null;
        } else {
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
    format = format || 's';

    var formats   = ['ms', 's', 'm', 'h', 'd'],
        times     = this.times(),
        formatted = [];

    if (formats.indexOf(format) < 0) {
        console.error('TimeIntel: Format not supported.'); return;
    }

    for (var i = 0; i < times.length; i++) {
        formatted[i] = null;

        if (times[i] !== null) {
            formatted[i] = times[i].length > 1 ? this.getFormattedPeriod(times[i], format) : this.getFormattedDuration(times[i][0], format);
        }
    }

    return formatted;
};

TimeIntel.prototype.prepRegex = function(input) {
    return input.join('|').replace(/\\/g, '\\\\').replace(/\//g, '\\/').replace(/\s+/g, '\\s+').replace(/-/g, '\\-');
};

TimeIntel.prototype.generateRegex = function(index, keywords) {
    var combine  = '(' + this.prepRegex(locale.combine) + ')';

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

TimeIntel.prototype.sortLocaleByPriority = function() {
    var sortedLocale = {
        "combine" : locale.combine,
        "time"    : {}
    };

    var sortedKeys = Object.keys(locale.time).sort(function(a, b) {
        return locale.time[a].priority - locale.time[b].priority;
    });

    for (var i = 0; i < sortedKeys.length; i++) {
        sortedLocale.time[sortedKeys[i]] = locale.time[sortedKeys[i]];
    }

    locale = sortedLocale;
};

TimeIntel.prototype.getFormattedPeriod = function(times, format) {
    var start = moment(times[0], 'HH:mm'),
        end   = moment(times[1], 'HH:mm');

    if (start.diff(end) > 0) {
        end.add(12, 'h');
    }

    var total = moment.duration(end.diff(start)).asSeconds();

    return this.calculate(total, format);
};

TimeIntel.prototype.getFormattedDuration = function(time, format) {
    var props = locale.time.duration.props,
        regex,
        match;

    var number = (time.match(/\d+/g) || ['1']).join();

    for (var i in props) {
        regex = new RegExp('\\b' + this.prepRegex(props[i].keywords) + '\\b', 'i');

        if (regex.test(time)) {
            match = i;
        }
    }

    if (typeof match === 'undefined') {
        match = 'hours';
    }

    var total = number * locale.time.duration.props[match].multiply;

    return this.calculate(total, format);
};

TimeIntel.prototype.calculate = function(total, format) {
    var formatted;

    switch(format) {
        case 'ms': formatted = total * 1000; break;
        case 's': formatted = total; break;
        case 'm': formatted = total / 60; break;
        case 'h': formatted = total / 3600; break;
        case 'd': formatted = total / 86400; break;
    }

    return formatted;
};
