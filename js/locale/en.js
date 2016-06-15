var locale = {
    "combine": ["-", "to", "until", "til", "till"],
    "time": {
        "periods": {
            "priority": 1,
            "keywords": {
                "hours"   : ["hours", "o'clock", "hour", "h"],
                "minutes" : ["minutes", "minute", "min", "m"],
                "seconds" : ["seconds", "second", "sec", "s"]
            }
        },
        "duration": {
            "priority": 2,
            "keywords": {
                "hours"               : ["hour", "hours", "h"],
                "one-and-a-half-hour" : ["one and a half hour"],
                "half-hours"          : ["half hours", "half an hour", "half hour", "halfhour"],
                "quarter"             : ["quarters", "quarter"],
                "minutes"             : ["minutes", "minute", "min", "m"],
                "seconds"             : ["seconds", "second", "sec", "s"]
            }
        }
    }
};
