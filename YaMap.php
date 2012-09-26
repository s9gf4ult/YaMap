<?php
if (!defined('MEDIAWIKI')) {
        echo <<<EOT
To install YaMap, put the following line in LocalSettings.php:
require_once( "\$IP/extensions/YaMap/YaMap.php" );
EOT;
        exit( 1 );
}
 
$wgExtensionCredits['specialpage'][] = array(
        'name' => 'YaMap',
        'author' => 's9gf4ult',
       #  'url' => 'http://www.mediawiki.org/wiki/Extension:MyExtension',
        'description' => 'Special page with yandex map using api 2.0',
        'descriptionmsg' => 'Page with Yandex map showing baloon or path',
        'version' => '0.0.0',
);

$dir = dirname(__FILE__) . '/';
 
$wgAutoloadClasses['YaMap'] = $dir . 'YaMap_body.php';
$wgExtensionMessagesFiles['YaMap'] = $dir . 'YaMap.i18n.php';
# $wgExtensionAliasesFiles['MyExtension'] = $dir . 'MyExtension.alias.php';
$wgSpecialPages['YaMap'] = 'YaMap';