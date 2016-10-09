/**
 * Class ClickControl
 * User: jyhao
 * Date: 13-10-31
 * Time: 下午2:15
 * To change this template use File | Settings | File Templates.
 */
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 5,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        );
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.onClick,
                'dblclick': this.onDblclick
            }, this.handlerOptions
        );
    },

    onClick: function(evt) {
        var lonlat = this.map.getLonLatFromPixel(evt.xy);
        alert("经度：" + lonlat.lat + " N, " +
            "纬度：" + lonlat.lon + " E");
        var output = document.getElementById(this.key + "Output");
        var msg = "经度： " + lonlat.lat + ""+ "纬度：" + lonlat.lon;
        output.value = output.value + msg ;
    },

    onDblclick: function(evt) {
        var output = document.getElementById(this.key + "Output");
        var msg = "dblclick " + evt.xy;
        output.value = output.value + msg + "\n";
    },
    CLASS_NAME: "OpenLayers.Control.Click"
});