// // Initialize and add the map
// let map;

// async function initMap() {
//     // The location of Uluru
//     const position = { lat: -12.156476467448352, lng: -76.9665107237798 };
//     // Request needed libraries.
//     //@ts-ignore
//     const { Map } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

//     // The map, centered at Uluru
//     map = new Map(document.getElementById("map"), {
//         zoom: 4,
//         center: position,
//         mapId: "DEMO_MAP_ID",
//     });

//     // The marker, positioned at Uluru
//     const marker = new AdvancedMarkerView({
//         map: map,
//         position: position,
//         title: "Uluru",
//     });
// }
// initMap();


// esto de aqui abajo es de hoy

// var map;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 43.5293101, lng: -5.6773233 },
//         zoom: 13
//     });
// }


// para cambiar el initmap

// google.maps.event.addDomListener(window, "load", function () {
// window.addEventListener("load", function () {
function initMap() {
    const ubicacion = new localizacion(() => {
        const myLatLng = { lat: ubicacion.latitude, lng: ubicacion.longitude };

        var texto = '<h1>Nombre del lugar</h1>' + '<p> descripcion del lugar </p>' + '<a href="https://wwww.google.com">Pagina web</a>'

        const options = {
            center: myLatLng,
            zoom: 15
        }

        var map = document.getElementById('map');

        const mapa = new google.maps.Map(map, options);

        const marcador = new google.maps.Marker({
            position: myLatLng,
            map: mapa,
            tittle: "Mi primer marcador"
        });

        // var informacion = new google.maps.InfoWindow({
        //     content: texto
        // });
        var informacion = new google.maps.InfoWindow();

        marcador.addListener('click', function () {
            informacion.open(map, marcador);
        });

        var autocomplete = document.getElementById('autocomplete');

        const search = new google.maps.places.Autocomplete(autocomplete);
        search.bindTo("bounds", mapa);

        search.addListener('place_changed', function () {
            informacion.close();
            marcador.setVisible(false);

            var place = search.getPlace();
            console.log(place);
            console.log(place.geometry.viewport);
            if (!place.geometry.viewport) {
                window.alert("error al mostrar el lugar");
                return;
            }
            if (place.geometry.viewport) {
                mapa.fitBounds(place.geometry.viewport);
            }
            else {
                mapa.setCenter(place.geometry.location);
                mapa.setZoom(18);
            }

            marcador.setPosition(place.geometry.location);
            marcador.setVisible(true);

            var address = "";
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || ''),
                ];
            }
            informacion.setContent('<div>' + place.name + ' </div><br>' + address);
            informacion.open(map, marcador);
        });

    });

}
// });

