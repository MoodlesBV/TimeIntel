var locale = {
    "combine": ["-", "tot", "tot en met", "t/m", "t\\m"],
    "time": {
        "periods": {
            "priority": 1,
            "props": {
                "seconds": {
                    "keywords": ["seconden", "secondes", "seconde", "sec", "s"],
                    "multiply": 1
                },
                "minutes": {
                    "keywords": ["minuten", "minuut", "min", "m"],
                    "multiply": 60
                },
                "hours": {
                    "keywords": ["uren", "uur", "u"],
                    "multiply": 3600
                },
            }
        },
        "duration": {
            "priority": 2,
            "props": {
                "seconds": {
                    "keywords": ["seconden", "secondes", "seconde", "sec", "s"],
                    "multiply": 1
                },
                "minutes": {
                    "keywords": ["minuten", "minuut", "min", "m"],
                    "multiply": 60
                },
                "quarter": {
                    "keywords": ["kwartieren", "kwartier"],
                    "multiply": 900
                },
                "half-hours": {
                    "keywords": ["halve uren", "half uur", "halfuur"],
                    "multiply": 1800
                },
                "hours": {
                    "keywords": ["uren", "uur", "u"],
                    "multiply": 3600
                },
                "one-and-a-half-hour": {
                    "keywords": ["anderhalve uren", "anderhalf uur"],
                    "multiply": 5400
                },
            }
        }
    }
};
