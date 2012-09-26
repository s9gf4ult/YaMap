/// var yAction = "path" or "baloon"
/// var yPoint1 = {lat : 24.424,
///                lon : 24}
/// var yPoint2 = same as yPoint1
jQuery(document).ready(function() {

    function recalcMap() {
        el = jQuery('#yandex_map_element');
        if (el.width() == 0 | el.height() == 0) {
            d = jQuery(document);
            p = jQuery('.content > .post');
            el.width(p.width() - 20);
            el.height(d.height() * 0.8);
        }
    }

    recalcMap();
        
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
        if (map != null && map != undefined) {
            x = map;
            map = null;
            x.destroy();
        }
        
        if (yAction == "baloon") {
            if (yPoint1 == 0) {
                alert("This page needs 'lat' and 'lon' request parameters as latitude and longitude respectively");
            } else {
                map = makeMap(yPoint1);
                var pm = new ymaps.Placemark([yPoint1.lat, yPoint1.lon]);
                map.geoObjects.add(pm);
            } 
        } else if (yAction == "path") {
            if (yPoint1 == 0 || yPoint2 == 0) {
                alert("This page needs 'lat', 'lon', 'plat', 'plon' request parameters as latitude and longitude respectively");
            } else {
                map = makeMap(yPoint2);
                ymaps.route([[yPoint1.lat, yPoint1.lon], [yPoint2.lat, yPoint2.lon]],
                           {mapSetAutoApply: true})
                    .then(function(route) {
                        map.geoObjects.add(route);
                        map.setBounds(map.geoObjects.getBounds());
                    }, function(error) {
                        yPoint1 = yPoint2;
                        action = "baloon";
                        exec();
                    });
            }
        }
    }

    function redrawMap() {
        recalcMap();
        exec();
    }
    
    var lastfire = new Date();
    var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    window.addEventListener(orientationEvent, function() {
        var nowfire = new Date();
        if ((nowfire - lastfire) / 1000 > 1) {
            lastfire = new Date();
            // redrawMap();
            window.location.reload(); // lol
        }
    });
    
    exec()
})

        
       })                       // Jquery ready
