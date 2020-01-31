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

const getData = async (url, dbName) => {
    const response = await fetch(`${url}${dbName}`);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`)
    };
    return response;
};

const printData = (cards, body) => {
    const routesList = document.createElement('ul');
    body.appendChild(routesList);

    cards.forEach(card => {
        const {from, to, transport:{type, number, gate, seat, baggage}} = card;
        const routeItem = document.createElement('li');

        routeItem.textContent = `From ${from}, take ${type} #${number} to ${to}. ${gate ?'Gate ' + gate + '.' : ''} ${!seat ? '' : 'Seat ' + seat + '.'} ${baggage ==='auto' ? 'Baggage will be automatically transferred from your last leg.' : !baggage ? '' : 'Baggage ' + baggage + '.'}`;
        routesList.appendChild(routeItem);
    })
};

getData('http://localhost:3000', '/cards/')
    .then(res => res.json())
    .then(arr => printData(chainRoutes(arr), document.body));

