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
    }
};
