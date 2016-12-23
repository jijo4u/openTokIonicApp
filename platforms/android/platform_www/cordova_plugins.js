cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-x-toast.Toast",
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "pluginId": "cordova-plugin-x-toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "id": "cordova-plugin-x-toast.tests",
        "file": "plugins/cordova-plugin-x-toast/test/tests.js",
        "pluginId": "cordova-plugin-x-toast"
    },
    {
        "id": "cordova-plugin-opentokjs.OpenTokClient",
        "file": "plugins/cordova-plugin-opentokjs/src/android/opentok.js",
        "pluginId": "cordova-plugin-opentokjs",
        "clobbers": [
            "OT"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-x-toast": "2.5.2",
    "cordova-plugin-crosswalk-webview": "2.2.0",
    "cordova-plugin-iosrtc": "3.2.2",
    "cordova-plugin-opentokjs": "0.1.2"
};
// BOTTOM OF METADATA
});