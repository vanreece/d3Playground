async function init() {
    const selection = d3.select('#wrapper');
    selection.selectAll('ol').data([0]).enter().append('ol');
}

function sortSources(a: datum, b: datum) {
    return a.favorite && !b.favorite ? -1
        : b.favorite && !a.favorite ? 1
        : a.best && !b.best ? -1
        : b.best && !a.best ? 1
        : d3.ascending(a.name, b.name) || 0;
}

type datum = {
    name: string,
    best?: boolean,
    favorite?: boolean,
}

const data: datum[] = [
    {'name': 'traitor', best: true},
    {'name': 'pianist', best: false},
    {'name': 'nondefinitive'},
    {'name': 'combinedly'},
    {'name': 'predelivery'},
    {'name': 'raker'},
    {'name': 'preinsinuatingly'},
    {'name': 'anconeous'},
    {'name': 'capuchin'},
    {'name': 'staio'},
    {'name': 'preoccipital'},
]

async function toggleFavorite(index: number) {
    if(data[index].favorite) {
        data[index].favorite = false;
    } else {
        data[index].favorite = true;
    }
    doit();
}

async function doit() {
    const selection = d3.select('#wrapper');
    const list = selection.selectAll('ol');


    const listElements = list.selectAll('li').data(data);
    listElements
        // .text(function(d) {return `Existing: ${d.name}`})
        .text(function(d) {return `${d.name}`})
        .enter()

    listElements.enter()
        .append('li')
        // .text(function(d) {return `New: ${d.name}`})
        .text(function(d) {return `${d.name}`})

    listElements.exit()
        .remove()
    
    list.selectAll('li').sort(sortSources);
}
  
init();
doit();