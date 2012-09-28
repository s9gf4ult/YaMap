/// var yAction = "path" or "baloon"
/// var yPoint1 = {lat : 24.424,
///                lon : 24}
/// var yPoint2 = same as yPoint1
/// var yMobile = is it mobile client ?

var leftclicked = function () {}
var rightclicked = function () {}
var upclicked = function () {}
var downclicked = function () {}
jQuery(document).ready(function() {

    function recalcMap() {
        el = jQuery('#yandex_map_element');
        if (yMobile) {
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
        map = new ymaps.Map("yandex_map_element",
                            {center: [p.lat, p.lon],
                             zoom: 15,
                             behaviors: ['drag', 'scrollZoom']});
        if (yMobile) {
            map.controls.add('smallZoomControl');
        } else {
            map.controls.add('zoomControl');
        }
        map.controls.add(
            new ymaps.control.TypeSelector()
        );
        map.behaviors.enable('scrollZoom');
        map.behaviors.enable('drag');
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

    if (yMobile) {
        window.addEventListener(orientationEvent, function() {
            var nowfire = new Date();
            if ((nowfire - lastfire) / 1000 > 1) {
                lastfire = new Date();
                // redrawMap();
                window.location.reload(); // lol
            }
        });
    }
    
    exec()

    function getMapWidth() {
        b = map.getBounds();
        return Math.abs(b[0][1] - b[1][1]);
    }

    function getMapHeight() {
        b = map.getBounds();
        return Math.abs(b[0][0] - b[1][0]);
    }

    function moveVertical(pos, val) {
        return [pos[0] + val, pos[1]];
    }

    function moveHorizontal(pos, val) {
        return [pos[0], pos[1] + val];
    }

    leftclicked = function () {
        var pos = map.getCenter();
        map.setCenter(moveHorizontal(pos, -(getMapWidth() * 0.15)));
    }

    rightclicked = function () {
        var pos = map.getCenter();
        map.setCenter(moveHorizontal(pos, getMapWidth() * 0.15));
    }

    upclicked = function () {
        var pos = map.getCenter();
        map.setCenter(moveVertical(pos, getMapHeight() * 0.15));
    }

    downclicked = function () {
        var pos = map.getCenter();
        map.setCenter(moveVertical(pos, -(getMapHeight() * 0.15)));
    }
    
})

        
       })                       // Jquery ready
