const socket = io();

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
    (position)=>{
        const {latitude,longitude} = position.coords;
        socket.emit('send-location',{latitude,longitude});
    }),
    (err)=>{
        console.error(err);
    },
    {
        enableHighAccuracy:0,
        timeout:5000,
        maximumAge:0
    }
}





// Initialize Leaflet map
var map = L.map('map').setView([0, 0], 16);

// Add tile layer
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Sourav Kumar'
});

tileLayer.addTo(map);  // Add the tile layer to the map

const marker={};

socket.on('recieve-location',(data)=>{
    const {id, latitude,longitude} = data;
    map.setView([latitude,longitude])

    if(marker[id]){
        marker[id].setLatLang([latitude.longitude]);
    }else{
        marker[id] = L.marker([latitude,longitude]).addTo(map);
    }
})

socket.on("user-dis",(id)=>{
    if(marker[id]){
        map.removeLayer(marker[id])
        delete marker[id]
    }
})