OpenLayers.Control.ToolBar=OpenLayers.Class(OpenLayers.Control, {
	toolList:"zoomExtend,pan,zoomIn,zoomOut,pointSelect,iSearch,MSearch,measureLine,measurePolygon,clear",
	toolbars:[
	          {"id":"zoomExtend","title":"全图","src":"img/btn_map_14.png","fun":"zoomToMaxExtent"},
	          {"id":"pan","title":"平移","src":"img/btn_map_19.png","fun":"zoomInBox","callback":""},
	          {"id":"zoomIn","title":"放大","src":"img/btn_map_10.png","fun":"zoomInBox","callback":""},
	          {"id":"zoomOut","title":"缩小","src":"img/btn_map_11.png","fun":"zoomOutBox","callback":""},
	          {"id":"pointSelect","title":"点击获取坐标","src":"img/btn_map_28.png","fun":"pointSelect","callback":""},
	          {"id":"iSearch","title":"要素查询","src":"img/btn_map_18.png","fun":"iSearch","callback":""},
	          {"id":"MSearch","title":"桩号查询","src":"img/btn_map_21.png","fun":"MSearch","callback":""},
//	          {"id":"zoomOut","title":"拉框获取坐标","src":"img/btn_map_11.png","fun":"boxExtend","callback":""},
	          {"id":"measureLine","title":"测距","src":"img/btn_map_22.png","fun":"measureLine","callback":""},
	          {"id":"measurePolygon","title":"测面","src":"img/btn_map_23.png","fun":"measurePolygon","callback":""},
	          {"id":"clear","title":"清图","src":"img/btn_map_26.png","fun":"removeLayers"}],
	mapName:"map",
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },
    showBar:function()
    {
        var toolList=this.toolList;
        var toolbars=this.toolbars;
        var mapName=this.mapName;
        for (var i = 0,size=toolbars.length; i <size; i++) {
			if(toolList.indexOf(toolbars[i].id)>-1)
			{
				var html= "<img style='position:absolute; right:20px; top:"+(i*40)+"px; z-Index:999;'"+
				"title='"+(toolbars[i].title)+"' alt='' src='"+(toolbars[i].src)+"' id='"+(toolbars[i].id)+"'"
					+ "onClick='"+(mapName+"."+toolbars[i].fun+"()")+"'>";
				$(".olControlToolBar").append(html);
			}
		}
    },
    CLASS_NAME: "OpenLayers.Control.ToolBar"
}
);