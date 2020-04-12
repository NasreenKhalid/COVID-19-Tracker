var markers = [];
var infoWindow;
var map;
const country = document.getElementById("country");

function initMap() {
  var losAngeles = {
    lat: 34.06338,
    lng: -118.35808,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: "roadmap",
  });

  infoWindow = new google.maps.InfoWindow({});

}

function searchCountry() {
  let inputData;
  var input = country.value;
  console.log(input);
  fetch(`http://corona-api.com/countries/${input}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // inputData = data;
      var country = data.data.name;
      var totalCases = data.data.latest_data.confirmed;

      var totalDeaths = data.data.latest_data.deaths;
      var totalRecoveries = data.data.latest_data.recovered;
      var totalCritical = data.data.latest_data.critical;
      var todayCases = data.data.today.confirmed;
      var latitude = data.data.coordinates.latitude;
      var longitude = data.data.coordinates.longitude;

      console.log(latitude);

      var bounds = new google.maps.LatLngBounds();
      var latlng = new google.maps.LatLng(latitude, longitude);
      bounds.extend(latlng);

      map.fitBounds(bounds);

      var html = `
    <div class="store-info-window">
    <div class="country-info-name">
  ${name}  
    </div>
    <div class="stats">
    <h3>${country.toUpperCase()}</h3>
    <h3>Cases: ${totalCases}</h3>
    <h3>Deaths: ${totalDeaths}</h3>
    <h3>Recovered: ${totalRecoveries}</h3>
    <h3>Critical: ${totalCritical}</h3>
    <h3><b>Today's Cases: ${todayCases}</h3>
    
    </div>
  
    </div>
    `;

      var marker = new google.maps.Marker({
        map: map,
        position: latlng,
          icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
        },
      });
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
      markers.push(marker);
      console.log(markers);
    });
}
