//while version

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

let res = [];
let tail = [];
let target = routes[0].to;
tail.push(routes[0]);
routes.splice(0, 1);

let spliced;


while(routes.length){
    let found = false;
    console.log('target i', target);

    if (routes[0].from === target) {
        found = true;
        console.log('found i', routes[0].from);
        tail.push(routes[0]);
        target = routes[0].to;
        spliced = routes.splice(0, 1);
        console.log('killed i', spliced);

    } else {
       
        for (let k = 0; k < routes.length; k++) {
            if (routes[k].from === target) {
                found = true;
                console.log('found k', routes[k].from);
                tail.push(routes[k]);
                target = routes[k].to;
                console.log('target k: ', target);
                spliced = routes.splice(k, 1);
                console.log('killed k', spliced);
            }
        }

    }
if (!found) {
res = [...tail, ...res];
tail = [routes[0]];
target = routes[0].to;
routes.splice(0, 1);
}
  
   
}
res = [...tail, ...res];

console.log(res);
//     console.log('arr', routes);
};

chainRoutes(cards);