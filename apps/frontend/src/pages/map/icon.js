import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('../../assets/img/marker.png'),
    iconRetinaUrl: require('../../assets/img/marker.png'),
    iconAnchor: null,
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconPerson };