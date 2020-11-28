let showIP = document.getElementById("user-ip");
let showLocation = document.getElementById("user-location");
let showTimezone = document.getElementById("user-timezone");
let showIsp = document.getElementById("user-isp");

let mymap = L.map('mapid').setView([30.326487, 78.037], 13);
let myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibmVnaS1yb2hpdCIsImEiOiJja2h5ejU2NWkwMWowMnhtc21temtmNmRzIn0.5_h4lpWhrMGPzqoIZSUGfw'
}).addTo(mymap);

let marker = L.marker([30.326487, 78.037], {icon: myIcon}).addTo(mymap);


function ipUrl(ip){
    let url = `https://geo.ipify.org/api/v1?apiKey=at_ZlbRcjOOEa4Q5EDEzlpWQmXd1mwqv&ipAddress=${ip}`;

    fetch(url)
        .then(res => res.json())
        .then(res =>{
            showIP.innerHTML = res.ip;
            showLocation.innerHTML = res.location.city + "," + res.location.country + " " + res.location.postalCode;
            showTimezone.innerHTML = res.location.timezone;
            showIsp.innerHTML = res.isp;

            mymap.setView([res.location.lat, res.location.lng], 13);
            marker.setLatLng([res.location.lat, res.location.lng]);
        })
}

document.getElementById("form-id").addEventListener("submit", (e) => {
    e.preventDefault();

    ipUrl(e.target[0].value);
})