//Maps version
const cards = [{
        "from": "Travemuende harbour",
        "to": "Luebeck Hbf",
        "transport": {
            "type": "bus",
            "number": "01",
            "gate": null,
            "seat": null,
            "baggage": null
        }
    },
    {
        "from": "Munich Airport",
        "to": "Salzburg",
        "transport": {
            "type": "flight",
            "number": "03345LH",
            "gate": null,
            "seat": "14",
            "baggage": "drop at check-in desk 19"
        }
    },
    {
        "from": "Moscow",
        "to": "St. Petersburg",
        "transport": {
            "type": "train",
            "number": "755 Sapsan",
            "gate": null,
            "seat": "02/04",
            "baggage": null
        }
    },

    {
        "from": "Helsinki",
        "to": "Travemuende harbour",
        "transport": {
            "type": "ferry",
            "number": "555",
            "gate": null,
            "seat": "224",
            "baggage": null
        }
    },

    {
        "from": "Luebeck Hbf",
        "to": "Munich Hbf",
        "transport": {
            "type": "train",
            "number": "22D",
            "gate": null,
            "seat": "11",
            "baggage": null
        }
    },
    {
        "from": "St. Petersburg",
        "to": "Helsinki",
        "transport": {
            "type": "train",
            "number": "785 Allegro",
            "gate": null,
            "seat": "06/13",
            "baggage": null
        }
    },
    {
        "from": "Munich Hbf",
        "to": "Munich Airport",
        "transport": {
            "type": "bus",
            "number": "11",
            "gate": null,
            "seat": null,
            "baggage": null
        }
    },


    {
        "from": "Barcelona",
        "to": "New York JFK",
        "transport": {
            "type": "flight",
            "number": "DY7025",
            "gate": "10A",
            "seat": "03",
            "baggage": "auto"
        }
    },
    {
        "from": "London",
        "to": "Barcelona",
        "transport": {
            "type": "flight",
            "number": "FR9044",
            "gate": "1F",
            "seat": "22",
            "baggage": "drop at check-in desk 1"
        }
    },
    {
        "from": "Salzburg",
        "to": "London",
        "transport": {
            "type": "flight",
            "number": "03345LH",
            "gate": "33D",
            "seat": "8",
            "baggage": "drop at check-in desk 2"
        }
    }

];

const chainRoutes = (routes) => {

    let objMap = new Map();

    let obj2Map = new Map();


    let first, last;


    routes.forEach(route => {
        objMap.set(route.from, route);
        obj2Map.set(route.to, route);
    });
  
    routes.forEach((route) => {
        if (!obj2Map.has(route.from)) {
            first = route;            
        } else if (!objMap.has(route.to)) {
            last = route;           
        }
    });
    objMap.delete(first.from);
    objMap.delete(last.from);
   
    let middle = [], nextKey = first.to, nextPair;

    while (objMap.size) {
        nextPair = objMap.get(nextKey);
        if (nextPair) {
            middle.push(nextPair);
            objMap.delete(nextKey);
            nextKey = nextPair.to;
        };
    }
    console.log([first, ...middle, last]);
    
};

chainRoutes(cards);