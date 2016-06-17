var locale = {
    "combine": ["tot en met", "tot", "t/m", "t\\m", "-"],
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
                "one-and-a-half-hours": {
                    "keywords": ["anderhalve uren", "anderhalf uur", "anderhalve", "anderhalf"],
                    "multiply": 5400
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
        }
    },
    "words": {
        "hundred": "honderd",
        "small": {
            "nul"       : 0,
            "een"       : 1,
            "twee"      : 2,
            "drie"      : 3,
            "vier"      : 4,
            "vijf"      : 5,
            "zes"       : 6,
            "zeven"     : 7,
            "acht"      : 8,
            "negen"     : 9,
            "tien"      : 10,
            "elf"       : 11,
            "twaalf"    : 12,
            "dertien"   : 13,
            "veertien"  : 14,
            "vijftien"  : 15,
            "zestien"   : 16,
            "zeventien" : 17,
            "achttien"  : 18,
            "negentien" : 19,
            "twintig"   : 20,
            "dertig"    : 30,
            "veertig"   : 40,
            "vijftig"   : 50,
            "zestig"    : 60,
            "zeventig"  : 70,
            "tachtig"   : 80,
            "negentig"  : 90,
        },
        "magnitude": {
            "duizend"     : 1000,
            "miljoen"     : 1000000,
            "miljard"     : 1000000000,
            "biljoen"     : 1000000000000,
            "quadriljoen" : 1000000000000000,
            "triljoen"    : 1000000000000000000,
            "triljard"    : 1000000000000000000000,
        },
    }
};
