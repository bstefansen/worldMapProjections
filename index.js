// List of d3 projections
projectionList = [
  d3.geoOrthographic(),
  d3.geoConicEqualArea(),
  d3.geoNaturalEarth1(),
  d3.geoAzimuthalEqualArea(),
  d3.geoConicConformal(),
  d3.geoEquirectangular(),
  d3.geoStereographic(),
  d3.geoTransverseMercator()
]

// List of projection names
projectionName = [
  'Orthographic',
  'Conical Equal-Area',
  'Natural Earth',
  'Azimuthal Equal-Area',
  'Conformal Conic',
  'Equirectangular',
  'Stereographic',
  'Transverse Mercator'
]

// Active projection index
var listIndex = 0;

// Create svg map
function createMap() {

  // remove previous map
  d3.selectAll('path').remove();

  // project configuration
  var svg = d3.select('svg');
  var projection = projectionList[listIndex];
  var pathGenerator = d3.geoPath().projection(projection);

  // create ocean
  svg.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

  // create tooltip
  var tooltip = d3.select('body').append('div')
                  .attr('class', 'tooltip')
                  .style('opacity', 0);

  // Appends all countries on the world atlas
  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(data => {
      var countries = topojson.feature(data, data.objects.countries);
      svg.selectAll('path').data(countries.features)
        .enter().append('path')
          .attr('class', 'country')
          .attr('d', pathGenerator)
          .on('mouseover', function(d) {
            tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
            tooltip.html(d.properties.name)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 40) + "px");
                    // console.log(d.properties.name)
          })
          .on("mouseout", function(d) {		
            tooltip.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
    });
}

// Change projection name
function projectionHTML() {
  document.getElementById('projection').innerHTML = projectionName[listIndex]
}

// Change map projection
function newProjection() {
  if(listIndex == 7) {
    listIndex = 0;
  }
  else {
    listIndex += 1
  }
  projectionHTML()
  createMap()
  // console.log(listIndex, projectionList[listIndex])
}