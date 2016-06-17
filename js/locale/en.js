var locale = {
    "combine": ["until", "til", "till", "-", "to"],
    "time": {
        "periods": {
            "priority": 1,
            "props": {
                "seconds": {
                    "keywords": ["seconds", "second", "sec", "s"],
                    "multiply": 1
                },
                "minutes": {
                    "keywords": ["minutes", "minute", "min", "m"],
                    "multiply": 60
                },
                "hours": {
                    "keywords": ["hours", "o'clock", "hour", "h"],
                    "multiply": 3600
                },
                "days": {
                    "keywords": ["day", "days"],
                    "multiply": 28800 // Technically 8 hours
                }
            }
        },
        "duration": {
            "priority": 2,
            "props": {
                "seconds": {
                    "keywords": ["seconds", "second", "sec", "s"],
                    "multiply": 1
                },
                "minutes": {
                    "keywords": ["minutes", "minute", "min", "m"],
                    "multiply": 60
                },
                "quarters": {
                    "keywords": ["quarters", "quarter"],
                    "multiply": 900
                },
                "half-hours": {
                    "keywords": ["half hours", "half an hour", "half hour", "halfhour", "half"],
                    "multiply": 1800
                },
                "one-and-a-half-hours": {
                    "keywords": ["one and a half hour", "one and a half"],
                    "multiply": 5400
                },
                "hours": {
                    "keywords": ["hour", "hours", "h"],
                    "multiply": 3600
                },
                "days": {
                    "keywords": ["day", "days"],
                    "multiply": 28800 // Technically 8 hours
                }
            }
        }
    },
    "words": {
        "small": {
            "zero"      : 0,
            "one"       : 1,
            "two"       : 2,
            "three"     : 3,
            "four"      : 4,
            "five"      : 5,
            "six"       : 6,
            "seven"     : 7,
            "eight"     : 8,
            "nine"      : 9,
            "ten"       : 10,
            "eleven"    : 11,
            "twelve"    : 12,
            "thirteen"  : 13,
            "fourteen"  : 14,
            "fifteen"   : 15,
            "sixteen"   : 16,
            "seventeen" : 17,
            "eighteen"  : 18,
            "nineteen"  : 19,
            "twenty"    : 20,
            "thirty"    : 30,
            "forty"     : 40,
            "fifty"     : 50,
            "sixty"     : 60,
            "seventy"   : 70,
            "eighty"    : 80,
            "ninety"    : 90,
        },
        "magnitude": {
            "thousand"    : 1000,
            "million"     : 1000000,
            "billion"     : 1000000000,
            "trillion"    : 1000000000000,
            "quadrilion"  : 1000000000000000,
            "quintillion" : 1000000000000000000,
            "sextillion"  : 1000000000000000000000,
        }
    }
};
