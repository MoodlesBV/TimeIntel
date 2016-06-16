var locale = {
    "combine": ["-", "to", "until", "til", "till"],
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
                "quarter": {
                    "keywords": ["quarters", "quarter"],
                    "multiply": 900
                },
                "half-hours": {
                    "keywords": ["half hours", "half an hour", "half hour", "halfhour"],
                    "multiply": 1800
                },
                "hours": {
                    "keywords": ["hour", "hours", "h"],
                    "multiply": 3600
                },
                "one-and-a-half-hour": {
                    "keywords": ["one and a half hour"],
                    "multiply": 5400
                },
            }
        }
    }
};
