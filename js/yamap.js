/// var yAction = "path" or "baloon"
/// var yPoint1 = {lat : 24.424,
///                lon : 24}
/// var yPoint2 = same as yPoint1


ymaps.ready(function() {
    var map;
    if (yAction == "baloon") {
        if (yPoint1 == 0) {
            alert("This page needs 'lat' and 'lon' request parameters as latitude and longitude respectively");
        } else {
            map = new ymaps.Map("yandex_map_element", {
                center : [yPoint1.lat, yPoint1.lon],
                zoom: 15});
            map.controls.add(
                new ymaps.control.ZoomControl()
            );
            map.controls.add(
                new ymaps.control.TypeSelector()
            );
            var pm = new ymaps.Placemark([yPoint1.lat, yPoint1.lon]);
            map.geoObjects.add(pm);
        }
    }
})
