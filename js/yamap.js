/// var yAction = "path" or "baloon"
/// var yPoint1 = {lat : 24.424,
///                lon : 24}
/// var yPoint2 = same as yPoint1


ymaps.ready(function() {
    var map;
    function makeMap(p) {
        var map;
        map = new ymaps.Map("yandex_map_element", {center: [p.lat, p.lon], zoom: 15});
        // if (! (p === undefined)) {
            // map.setCenter([p.lat, p.lon], 15);
        // }
        map.controls.add(
            new ymaps.control.ZoomControl()
        );
        map.controls.add(
            new ymaps.control.TypeSelector()
        );
        map.behaviors.enable('scrollZoom');
        return map;
    }

    function exec() {
        if (yAction == "baloon") {
            if (yPoint1 == 0) {
                alert("This page needs 'lat' and 'lon' request parameters as latitude and longitude respectively");
            } else {
                var map = makeMap(yPoint1);
                var pm = new ymaps.Placemark([yPoint1.lat, yPoint1.lon]);
                map.geoObjects.add(pm);
            } 
        } else if (yAction == "path") {
            if (yPoint1 == 0 || yPoint2 == 0) {
                alert("This page needs 'lat', 'lon', 'plat', 'plon' request parameters as latitude and longitude respectively");
            } else {
                var map = makeMap(yPoint2);
                ymaps.route([[yPoint1.lat, yPoint1.lon], [yPoint2.lat, yPoint2.lon]],
                           {mapSetAutoApply: true})
                    .then(function(route) {
                        map.geoObjects.add(route);
                        map.setBounds(map.geoObjects.getBounds());
                    }, function(error) {
                        yPoint1 = yPoint2;
                        action = "baloon";
                        map.destroy();
                        exec();
                    });
            }
        }
    }
    exec()
})
