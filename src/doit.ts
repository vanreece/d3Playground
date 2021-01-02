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

function favoritesList() {
    const selection = d3.select('#wrapper');
    selection.selectAll('ol').data([0]).enter().append('ol');
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
}

function rangeSlider() {
    const selection = d3.select('#wrapper');

    let _minVal = 0;
    let _maxVal = 1;
    let _initialVal = 0;
    let _step = 0.1;
    let _value = _initialVal;
    let _blueOnLeft = true;
    let _lowOnLeft = true;
    const _sliderToValue = d3.scaleLinear().domain([0,1]).range([-1,1]).clamp(true);

    // Add slider
    selection
        .append('h5')
        .text('Value: ')
        .append('span')
        .attr('class', 'display-option-value');
    
    function updateSliderUI() {
        const slider = d3.select('.rangeSlider');

        // Update the value from existing slider scale
        _value = _sliderToValue(slider.property('value'));

        // Update the scale
        if (_lowOnLeft !== _blueOnLeft) {
            _sliderToValue.range([_maxVal, _minVal])
        } else {
            _sliderToValue.range([_minVal, _maxVal])
        }
        
        // Update slider 
        slider
            .style('direction', function() {
                return _blueOnLeft ? null : "rtl";
            });

        slider.attr('step', _step);
        slider.property('value', _sliderToValue.invert(_value));

        // Update the display
        selection.selectAll('.display-option-value')
            .text(function() {
                return Math.round(_value * 100) / 100;
            });
    }

    selection
        .append('span')
        .text('Blue on left: ')
        .append('input')
        .attr('type', 'checkbox')
        .attr('checked', 'true')
        .on('input', function() {
            _blueOnLeft = d3.select(this).property('checked');
            updateSliderUI();
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
            _lowOnLeft = d3.select(this).property('checked');
            updateSliderUI();
        });

    selection
        .append('br');

    selection
        .append('span')
        .text('Min Value: ')
        .append('input')
        .attr('type', 'text')
        .attr('value', _minVal)
        .on('change', function() {
            _minVal = d3.select(this).property('value');
            updateSliderUI();
        });

    selection
        .append('br');
       
    selection
        .append('span')
        .text('Max Value: ')
        .append('input')
        .attr('type', 'text')
        .attr('value', _maxVal)
        .on('change', function() {
            _maxVal = d3.select(this).property('value');
            updateSliderUI();
        });

    selection
        .append('br');

    selection
        .append('span')
        .text('Resolution: ')
        .append('input')
        .attr('type', 'text')
        .attr('value', 0.1)
        .on('change', function() {
            const fullRange = _maxVal - _minVal;
            const stepCount = fullRange / d3.select(this).property('value');
            _step = 1 / (stepCount);
            updateSliderUI();
        });

    selection
        .append('br');

    selection
        .append('span')
        .text('Range slider:')
        .append('input')
        .attr('type', 'range')
        .attr('min', 0)
        .attr('max', 1)
        .attr('class', 'rangeSlider')
        .on('input', function() {
            updateSliderUI();
        });
    
    updateSliderUI();

}

async function doit() {
    // favoritesList();
    rangeSlider();
}
  
doit();