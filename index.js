

// List of d3 projections
projectionList = [
  d3.geoOrthographic(),
  d3.geoConicEqualArea(),
  d3.geoNaturalEarth1()
]

// List of projection names
projectionName = [
  'Orthographic',
  'Conical Equal Area',
  'Natural Earth'
]

// Active projection index
var listIndex = 0;

// Create svg map
function createMap() {
  var svg = d3.select('svg');
  var projection = projectionList[listIndex];
  var pathGenerator = d3.geoPath().projection(projection);

  svg.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({type: 'Sphere'}));

  // Appends all countries on the world atlas
  d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
    .then(data => {
      var countries = topojson.feature(data, data.objects.countries);
      svg.selectAll('path').data(countries.features)
        .enter().append('path')
          .attr('class', 'country')
          .attr('d', pathGenerator);
    });
}

// Change projection name
function projectionHTML() {
  document.getElementById('projection').innerHTML = projectionName[listIndex]
}

// Change map projection
function newProjection() {
  if(listIndex == 2) {
    listIndex = 0;
  }
  else {
    listIndex += 1
  }
  projectionHTML()
  createMap()
  console.log(listIndex, projectionList[listIndex])
}