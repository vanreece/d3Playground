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
                    .duration(300)
                    .ease(d3.easeCubicInOut)
                    .transition()
                        .style("background-color", null)
                        .ease(d3.easeCubicInOut)
                        .duration(300)

            })

    listElements.exit()
        .remove()
    
    list.selectAll('li').sort(sortSources);

    let _minVal = -1;
    let _maxVal = 1;
    let _initialVal = 0;
    let _step = 0.01;
    let _value = _initialVal;
    let _blueOnLeft = true;
    let _lowOnLeft = true;

    // Add slider
    selection
        .append('h5')
        .text('Value: ')
        .append('span')
        .attr('class', 'display-option-value');
    
    function updateValue(newValue: number) {
        _value = newValue;
        selection.selectAll('.display-option-value')
            .text(function() {
                return Math.round(_value * 100) / 100;
            });

    }

    function updateBlueOnLeft(blueOnLeft: boolean) {
        _blueOnLeft = blueOnLeft;

        selection.selectAll('.rangeSlider')
            .style('direction', function() {
                return _blueOnLeft ? null : "rtl";
            });
    }

    function updateLowOnLeft(lowOnLeft: boolean) {
        _lowOnLeft = lowOnLeft;

        if (_lowOnLeft) {
            selection.selectAll('.rangeSlider')
                .attr('min', _minVal)
                .attr('max', _maxVal);
        } else {
            selection.selectAll('.rangeSlider')
                .attr('min', _maxVal)
                .attr('max', _minVal);
        }
    }

    selection
        .append('span')
        .text('Blue on left: ')
        .append('input')
        .attr('type', 'checkbox')
        .attr('checked', 'true')
        .on('input', function() {
            updateBlueOnLeft(d3.select(this).property('checked'));
        });

    selection
        .append('br');

    selection
        .append('span')
        .text('Low on left: ')
        .append('input')
        .attr('type', 'checkbox')
        .attr('checked', 'true')
        .on('input', function() {
            updateLowOnLeft(d3.select(this).property('checked'));
        });

    selection
        .append('br');

    selection
        .append('span')
        .text('Range slider:')
        .append('input')
        .attr('type', 'range')
        // .attr('min', _minVal)
        // .attr('max', _maxVal)
        .attr('step', _step)
        .attr('class', 'rangeSlider')
        .property('value', _value)
        .on('input', function() {
            updateValue(d3.select(this).property('value'));
        });
    
    updateBlueOnLeft(_blueOnLeft);
    updateLowOnLeft(_lowOnLeft);
    updateValue(_value);
}
  
init();
doit();