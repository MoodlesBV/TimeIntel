window.TimeIntel = function(selector, options) {
    'use strict';

    if (!(this instanceof TimeIntel)) return new TimeIntel(selector, options);

    if (typeof locale === 'undefined' || typeof locale !== 'object') { console.error('TimeIntel: Locale not included.'); return; }
    if (typeof moment === 'undefined' || typeof moment !== 'function') { console.error('TimeIntel: moment.js not included.'); return; }

    var defaults = {
        "lang"   : "en",
        "format" : "s"
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

    this.sortLocaleByPriority();
    moment.locale(this.options.lang);
};

TimeIntel.prototype.getElements = function() {
    if (this.selector.substring(0, 1) === '#') {
        return [document.getElementById(this.selector.substring(1))];
    }

    return document.getElementsByClassName(this.selector.substring(1));
};

TimeIntel.prototype.getValues = function() {
    var elements = this.getElements(),
        values   = [];

    for (var i = 0; i < elements.length; i++) {
        values.push(elements[i].value || elements[i].innerHTML);
    }

    return values;
};

TimeIntel.prototype.getDurations = function() {
    var values    = this.getValues(),
        durations = [];

    for (var i in locale.time) {
        var regex = this.getRegex(i, locale.time[i]);

        for (var j = 0; j < values.length; j++) {
            durations[j] = durations[j] || null;

            if (values[j].match(regex) !== null && durations[j] === null) {
                durations[j] = values[j].match(regex)[0];
            }
        }
    }

    return durations;
};

TimeIntel.prototype.getFormattedDurations = function(format) {
    if (typeof format !== 'undefined') this.setFormat(format);

    var durations          = this.getDurations(),
        regex              = new RegExp(this.prepareRegex(locale.combine), 'i'),
        formattedDurations = [];

    for (var i = 0; i < durations.length; i++) {
        formattedDurations[i] = null;

        if (typeof durations[i] === 'undefined' || durations[i] !== null) {
            var formatted;

            if (regex.test(durations[i])) {
                formatted = this.getFormattedPeriod(durations[i]);
            } else {
                formatted = this.getFormattedPlain(durations[i]);
            }

            formattedDurations[i] = formatted;
        }
    }

    return formattedDurations;
};

TimeIntel.prototype.getFormattedPeriod = function(duration) {
    var regex = new RegExp('\\s+(?:' + this.prepareRegex(locale.combine) + ')\\s+', 'i'),
        split = duration.split(regex),
        start = moment(split[0], 'HH:mm'),
        end   = moment(split[1], 'HH:mm');

    if (start.diff(end) > 0) {
        end.add(12, 'h');
    }

    var total = moment.duration(end.diff(start)).asSeconds();

    return this.calculate(total);
};

TimeIntel.prototype.getFormattedPlain = function(duration) {
    var props = locale.time.duration.props,
        match;

    var number = (duration.match(/\d+/g) || ['1']).join();

    for (var i in props) {
        var regex = new RegExp(this.prepareRegex(props[i].keywords), 'i');

        if (regex.test(duration)) {
            match = i;
            break;
        }
    }

    if (typeof match === 'undefined') {
        match = 'hours';
    }

    var total = number * locale.time.duration.props[match].multiply;

    return this.calculate(total);
};

TimeIntel.prototype.getFormat = function(format) {
    return this.options.format;
};

TimeIntel.prototype.setFormat = function(format) {
    this.options.format = format;
};

TimeIntel.prototype.getRegex = function(index) {
    var keywordsArray = [];

    for (var j in locale.time[index].props) {
        keywordsArray.push('(' + this.prepareRegex(locale.time[index].props[j].keywords) + ')');
    }

    var keywords = keywordsArray.length > 1 ? '(' + keywordsArray.join('|') + ')' : keywordsArray.join();

    return this.generateRegex(index, keywords);
};

TimeIntel.prototype.prepareRegex = function(input) {
    return '\\b' + input.join('|').replace(/\\/g, '\\\\').replace(/\b\/\b/g, '\\/').replace(/\s+/g, '\\s+').replace(/-/g, '\\-').replace(/\|/g, '\\b|\\b') + '\\b';
};

TimeIntel.prototype.generateRegex = function(index, keywords) {
    var combine  = '(' + this.prepareRegex(locale.combine) + ')';

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
        "time"    : {},
        "words"   : locale.words
    };

    var sortedKeys = Object.keys(locale.time).sort(function(a, b) {
        return locale.time[a].priority - locale.time[b].priority;
    });

    for (var i = 0; i < sortedKeys.length; i++) {
        sortedLocale.time[sortedKeys[i]] = locale.time[sortedKeys[i]];
    }

    locale = sortedLocale;
};

TimeIntel.prototype.calculate = function(total) {
    var formatted;

    switch(this.options.format) {
        case 'ms': formatted = total * 1000; break;
        case 's': formatted = total; break;
        case 'm': formatted = total / 60; break;
        case 'h': formatted = total / 3600; break;
        case 'd': formatted = total / 86400; break;
    }

    return formatted;
};
