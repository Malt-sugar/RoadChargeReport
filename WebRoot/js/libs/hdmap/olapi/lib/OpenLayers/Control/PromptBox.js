OpenLayers.Control.PromptBox=OpenLayers.Class(OpenLayers.Control, {
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },
    alert:function(message)
    {
       	$(".olControlPromptBox").html(message);
    },
    CLASS_NAME: "OpenLayers.Control.PromptBox"
}
);