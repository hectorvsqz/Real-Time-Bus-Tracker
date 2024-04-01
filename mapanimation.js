
const busStops = [
  { lat: 42.35912433463781, lng: -71.09358397208564},
  { lat: 42.36080530098814, lng: -71.09589708211139},
  { lat: 42.36300885263203, lng: -71.09945277189371},
  { lat: 42.36532384990206, lng: -71.10340374219147},
  { lat: 42.36676820602481, lng: -71.10581426974103},
  { lat: 42.36838471467759, lng: -71.10862481268472},
  { lat: 42.369255915930964, lng: -71.11075706868806},
  { lat: 42.370269435937054, lng: -71.11300946309771},
  { lat: 42.37209657689657, lng: -71.11537129311745},
  { lat: 42.373099425546485, lng: -71.1176043321183},
  { lat: 42.37478968206916, lng: -71.1184945275332},
];

// const busStops = [
//   [42.35911020869218, -71.09354573892095],
//   [42.36080530098814, -71.09589708211139],
//   [42.36300885263203, -71.09945277189371],
//   [42.36532384990206, -71.10340374219147],
//   [42.36676820602481, -71.10581426974103],
//   [42.36838471467759, -71.10862481268472],
//   [42.369255915930964, -71.11075706868806],
//   [42.370269435937054, -71.11300946309771],
//   [42.37209657689657, -71.11537129311745],
//   [42.373099425546485, -71.1176043321183],
//   [42.37478968206916, -71.1184945275332]
// ];

async function run() {
  const locations = await getBusLocations();
  //console.log(new Date());
  return locations;
  //console.log(locations);
  //setTimeout(run, 15000);
}

async function getBusLocations() {
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

// let coor = run().then(locations => {
//   //console.log("coor: ", locations);
//   //console.log("latitude is: ", locations[0].attributes.latitude);
//   let latLng = `{lat: ${locations[0].attributes.latitude}, lng: ${locations[0].attributes.longitude}}`;
//   //console.log(latLng);
//   return latLng;
// });

// console.log(coor);

async function coor() {
  let coordinates = await run();
  (locations => {
    //console.log("coor: ", locations);
    //console.log("latitude is: ", locations[0].attributes.latitude);
    let latLng = `{lat: ${locations[0].attributes.latitude}, lng: ${locations[0].attributes.longitude}}`;
    //console.log(latLng);
    return latLng;
  });
  //console.log(coordinates);

} 

async function assignCoordinates() {
  try {
    const coordinates = await coor();
    return coordinates;
  }
  catch(error){
    console.log(error.message);
  }
}

let finalCoordinates = assignCoordinates();
console.log(finalCoordinates);

// Initialize and add the map
let map;
let marker;
const busIcon = document.createElement("img");

async function initMap() {
  // The location of Bus stop
  const position = { lat: 42.35912433463781, lng: -71.09358397208564 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Bus stop
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Bus stop
  
  busIcon.src = "https://img.icons8.com/metro/26/bus.png";
  marker = new AdvancedMarkerElement({
    map: map,
    position: {lat: 42.35912433463781, lng: -71.09358397208564},
    title: "Bus 1 stops",
    content: busIcon,
  });
}

let counter = 0;
let busStopsArrayLength = busStops.length;
function move() {

  setTimeout(() => {
    if (counter >= busStopsArrayLength) return;
    marker.position = busStops[counter];
    counter++;
    move();
  }, 1000);
}


initMap();
run();
move();

