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
    {'name': 'traitor(best)', best: true},
    {'name': 'pianist(not best)', best: false},
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
        .text(function(d) {return `Name: ${d.name}  `})

    listElements.enter()
        .append('li')
        .text(function(d) {return `Name: ${d.name}  `})
        .append('button') 
            .attr('class', 'background-favorite-button')
            .attr('title', 'Rocks')
            .attr('tabindex', -1)
            .text('Favorite')
            .on('click', function(d) {
                // Appropriately tag the favorites
                if (d.favorite) {
                    d.favorite = false;
                } else {
                    d.favorite = true;
                }
                // Sort based on the new world order
                list.selectAll('li').sort(sortSources);

                // Flash the things that change
                const parentElement = this.parentElement;
                if (!parentElement) {
                    return;
                }
                const selection = d3.select(this.parentElement);
                selection.transition()
                    .style("background-color", "orange")
                    .transition()
                        .style("background-color", null)

            })

    listElements.exit()
        .remove()
    
    list.selectAll('li').sort(sortSources);
}
  
init();
doit();