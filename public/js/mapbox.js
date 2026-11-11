/* eslint-disable */

console.log('Hello from the client side!');
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

const map = new mapboxgl.Map({
  accessToken:
    'pk.eyJ1IjoibWFheW9uLXRoYXlhcGFyYW4iLCJhIjoiY213Ymxicjh4MDRvaDJ4cTF0YnJxaHJ2bCJ9.BUrePzCaQicWNFYxXh0kmQ',
  container: 'map', // container ID
  style: 'mapbox://styles/maayon-thayaparan/cmwblpglj00p901s19tq81fn7',
  scrollZoom: false,

  //   center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  //   zoom: 10, // starting zoom
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
