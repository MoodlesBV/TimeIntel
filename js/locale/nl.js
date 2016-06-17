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
                "days": {
                    "keywords": ["dagen", "dag"],
                    "multiply": 28800 // Technically 8 hours
                }
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
                "quarters": {
                    "keywords": ["kwartieren", "kwartier"],
                    "multiply": 900
                },
                "half-hours": {
                    "keywords": ["halve uren", "half uur", "halfuur", "half"],
                    "multiply": 1800
                },
                "hours": {
                    "keywords": ["uren", "uur", "u"],
                    "multiply": 3600
                },
                "one-and-a-half-hours": {
                    "keywords": ["anderhalve uren", "anderhalf uur", "anderhalve", "anderhalf"],
                    "multiply": 5400
                },
                "days": {
                    "keywords": ["dagen", "dag"],
                    "multiply": 28800 // Technically 8 hours
                }
            }
        }
    }
};
