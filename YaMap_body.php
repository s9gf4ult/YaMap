<?php

class YaMap extends SpecialPage {
        function __construct() {
                parent::__construct( 'YaMap' );
        }
 
        function execute( $par ) {
                global $wgRequest, $wgOut;
                $this->setHeaders();
				$out = <<<EOD
<div id="yandex_map_element">ELEMENT !!!</div>
EOD;
				$wgOut->addHTML($out);
        }
}