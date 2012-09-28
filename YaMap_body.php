<?php

class YaMap extends SpecialPage {
        function __construct() {
                parent::__construct( 'YaMap' );
        }
 
        function execute( $par ) {
                global $wgRequest, $wgOut;
                $this->setHeaders();
				$action = $wgRequest->getVal("action");
				if (! in_array($action, Array("baloon", "path"))) {
					$action = "baloon";
				}
				$lat = $wgRequest->getVal("lat");
				$lon = $wgRequest->getVal("lon");
				if (empty($lat) || empty($lon)) {
					$p1 = 0;
				} else {
					$p1 = "{lat : $lat, lon: $lon}";
				}
				
				if ($action == "path") {
					$plat = $wgRequest->getVal("plat");
					$plon = $wgRequest->getVal("plon");
				} else {
					$plat = NULL;
					$plon = NULL;
				}
				
				if (empty($plat) || empty($plon)) {
					$p2 = 0;
				} else {
					$p2 = "{lat : $plat, lon : $plon}";
				}
                $mobile = mobiledetect() ? 'true' : 'false';
                if (mobiledetect()) {
                $buttons = <<<EOD
<button class="arrow_button leftright_button" onclick="leftclicked();"><img src="extensions/YaMap/img/left.png"></img></button>
<button class="arrow_button leftright_button" onclick="rightclicked();"><img src="extensions/YaMap/img/right.png"></img></button>
<button class="arrow_button updown_button" onclick="upclicked();"><img src="extensions/YaMap/img/up.png"></img></button>
<button class="arrow_button updown_button" onclick="downclicked();"><img src="extensions/YaMap/img/down.png"></img></button>
EOD;
                } else {
                    $buttons = "";
                }
				$dir = dirname(__FILE__) . '/';
				$code = file_get_contents($dir . 'js/yamap.js');
$out = <<<EOD
$buttons
<div id="yandex_map_element"></div>
<script src="http://api-maps.yandex.ru/2.0-stable/?load=package.full&lang=ru-RU" type="text/javascript"> </script>
<script type="text/javascript">
/// variables inserted from the query parameters
var yAction = "$action";
var yPoint1 = $p1;
var yPoint2 = $p2;
var yMobile = $mobile;
$code
</script>
EOD;
				$target = $wgRequest->getVal('target');
				if (!empty($target)) {
					$wgOut->addWikiText("=== Как добраться до: $target ===");
				}
				$wgOut->addHTML($out); # This is quick and dirty way
        }
}