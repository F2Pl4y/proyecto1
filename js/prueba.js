
// // google.maps.event.addDomListener(window, "load", function () {
// // window.addEventListener("load", function () {


// // async function initMap() {
// async function initMap() {

//     const mapElement = document.getElementById(mapElementId);
//     if (!mapElement) {
//         console.error("Error: No se encontró el elemento del mapa con ID:", mapElementId);
//         return;
//     }


//     const ubicacion = new localizacion(() => {
//         const myLatLng = { lat: ubicacion.latitude, lng: ubicacion.longitude };

//         var texto = '<h1>Nombre del lugar</h1>' + '<p> descripcion del lugar </p>' + '<a href="https://wwww.google.com">Pagina web</a>'

//         const options = {
//             center: myLatLng,
//             zoom: 15
//         }

//         var map = document.getElementById('map');

//         const mapa = new google.maps.Map(map, options);

//         const marcador = new google.maps.Marker({
//             position: myLatLng,
//             map: mapa,
//             tittle: "Mi primer marcador"
//         });

//         // var informacion = new google.maps.InfoWindow({
//         //     content: texto
//         // });
//         var informacion = new google.maps.InfoWindow();

//         marcador.addListener('click', function () {
//             informacion.open(map, marcador);
//         });

//         var autocomplete = document.getElementById('autocomplete');

//         const search = new google.maps.places.Autocomplete(autocomplete);
//         search.bindTo("bounds", mapa);

//         search.addListener('place_changed', function () {
//             informacion.close();
//             marcador.setVisible(false);

//             var place = search.getPlace();
//             if (!place.geometry.viewport) {
//                 window.alert("error al mostrar el lugar");
//                 return;
//             }
//             if (place.geometry.viewport) {
//                 mapa.fitBounds(place.geometry.viewport);
//             }
//             else {
//                 mapa.setCenter(place.geometry.location);
//                 mapa.setZoom(18);
//             }

//             marcador.setPosition(place.geometry.location);
//             marcador.setVisible(true);

//             var address = "";
//             if (place.address_components) {
//                 address = [
//                     (place.address_components[0] && place.address_components[0].short_name || ''),
//                     (place.address_components[1] && place.address_components[1].short_name || ''),
//                     (place.address_components[2] && place.address_components[2].short_name || ''),
//                 ];
//             }
//             informacion.setContent('<div>' + place.name + ' </div><br>' + address[0] + '<br>' + address[1] + '<br>' + address[2]);
//             informacion.open(map, marcador);
//         });

//     });

// }
// // });

// window.addEventListener("load", function () {

//     // initMap();
//     initMap('map1', 'autocomplete1');
//     initMap('map2', 'autocomplete2');
// });













// ---------


async function initMap(mapElementId, autocompleteElementId) {
    const ubicacion = new localizacion(() => {
        const myLatLng = { lat: ubicacion.latitude, lng: ubicacion.longitude };

        if (!myLatLng.lat || !myLatLng.lng) {
            console.error("Error: No se ha obtenido la ubicación.");
            return; // Detener la ejecución si no hay ubicación
        }

        const options = {
            center: myLatLng,
            zoom: 15,
            maxZoom: 22,
            streetViewControl: false,
            fullscreenControl: false
        };

        const map = new google.maps.Map(document.getElementById(mapElementId), options);




        const marcador = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: "Mi primer marcador",
        });

        const informacion = new google.maps.InfoWindow();

        marcador.addListener('click', () => {
            informacion.open(map, marcador);
        });


        // map.addListener('idle', () => {
        //     // Ahora 'map' está definido correctamente
        //     map.style.display = "none";
        // });

        const autocomplete = new google.maps.places.Autocomplete(
            document.getElementById(autocompleteElementId)
        );
        autocomplete.bindTo("bounds", map);

        autocomplete.addListener('place_changed', () => {
            informacion.close();
            marcador.setVisible(false);

            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.viewport) {
                window.alert("error al mostrar el lugar");
                return;
            }

            map.fitBounds(place.geometry.viewport);
            marcador.setPosition(place.geometry.location);
            marcador.setVisible(true);

            const address = [
                place.address_components[0] && place.address_components[0].short_name || '',
                place.address_components[1] && place.address_components[1].short_name || '',
                place.address_components[2] && place.address_components[2].short_name || '',
            ];
            informacion.setContent(
                `<div>${place.name}</div><br>${address.join('<br>')}`
            );
            informacion.open(map, marcador);
        });

    });
}

// Llama a initMap para cada mapa y autocomplete:

window.addEventListener("load", function () {
    initMap('map1', 'autocomplete1');
    initMap('map2', 'autocomplete2');


    // // Oculta los mapas después de que se hayan inicializado
    // const mapas = document.querySelectorAll(".mapa");
    // for (const mapa of mapas) {
    //     mapa.addListener('idle', () => {
    //         mapa.style.display = "none";
    //     });
    // }
});
// ... y así sucesivamente para cualquier mapa adicional











// const mapas = document.querySelectorAll(".mapa");

// Oculta todos los mapas por defecto
// for (const mapa of mapas) {
//     mapa.style.display = "none";
// }

// // Al hacer clic en un botón, muestra el mapa correspondiente
// const botones = document.querySelectorAll(".btn-mapa");
// for (const boton of botones) {
//     boton.addEventListener("click", () => {
//         const mapa = boton.dataset.mapa;
//         mapa.style.display = "block";
//     });
// }



// const botones = document.querySelectorAll(".btn-mapa");
// for (const boton of botones) {
//     boton.addEventListener("click", () => {
//         const mapa = boton.dataset.mapa; // Suponiendo que el valor de este dataset es el ID del mapa
//         const mapaElement = document.getElementById(mapa);
//         mapaElement.style.display = "block";
//     });
// }



// const mapa1 = document.getElementById("map1");
// const mapa2 = document.getElementById("map2");

// console.log(mapa1.style.display); // "none"
// console.log(mapa2.style.display); // "none"

// // Hacemos clic en el botón "Ver" del mapa 1
// btnMap1.click();

// console.log(mapa1.style.display); // "block"
// console.log(mapa2.style.display); // "none"

// // Hacemos clic en el botón "Ver" del mapa 2
// btnMap2.click();

// console.log(mapa1.style.display); // "block"
// console.log(mapa2.style.display); // "block"
