//while + binary search
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

const binarySearch = (searchVal, array) => {
    let leftIndex = 0,
        rightIndex = array.length - 1;

    while (leftIndex <= rightIndex) {
        let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
        if (array[middleIndex].from === searchVal) {
            return array[middleIndex];
        } else if (array[middleIndex].from < searchVal) {
            leftIndex = middleIndex + 1;

        } else if (array[middleIndex].from > searchVal) {
            rightIndex = middleIndex - 1;
        };
    }
    return false;
};

const chainRoutes = (routes) => {
    let res = [];
    let tail = [];
    let target = routes[0].to;

    while (routes.length) {
        // console.log('target i', target);

        if (routes[0].from === target) {
            // console.log('found i', routes[0].from);
            tail.push(routes[0]);
            target = routes[0].to;
            routes.splice(0, 1);

        } else {
            let slicedArr = routes
                .map((el, i, ar) => ({
                    index: i,
                    ...el
                }))
                .slice(1)
                .sort((a, b) => {
                    return a.from < b.from ? -1 : 1
                });

            // console.log('sliced', slicedArr);
            let nextMatch = binarySearch(target, slicedArr);
            // console.log('match', nextMatch);


            if (nextMatch) {
                // console.log('found k', nextMatch);
                tail.push(nextMatch);
                target = nextMatch.to;
                // console.log('target k: ', target);
                routes.splice(nextMatch.index, 1);
                //console.log('killed k', spliced);
            } else {
                res = [...tail, ...res];
                tail = [routes[0]];
                target = routes[0].to;
                routes.splice(0, 1);
            }

        }

    }
    res = [...tail, ...res];

    return res;
};

chainRoutes(cards);