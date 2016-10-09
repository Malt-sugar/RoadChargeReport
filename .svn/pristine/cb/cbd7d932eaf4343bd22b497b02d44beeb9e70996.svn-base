$(function() {
	var options = {
			controls:[],
			Units: "degrees",
			tileSize: new OpenLayers.Size(256, 256),
			singleTile: true,
			transitionEffect: "resize",
		    maxExtent: new OpenLayers.Bounds(103.07278351203196,29.429479961084557,116.32453362734368,40.07462723390718),
			projection: "EPSG:4326",
		    numZoomLevels: 10
	};
  this.map= new HdMap();
  var url ="http://10.228.2.72:6080/arcgis/rest/services/admin/SXMAP/MapServer/export";
//  var url ="http://192.168.100.117:6080/arcgis/rest/services/jxcity/MapServer";
  this.map.init("map",options,url);
  this.map.addLoadingPanel();
  //this.map.addPanZoomBar();  //添加缩放平移控件         
  //this.map.addOverViewMap();  //添加鹰眼控件           
  //this.map.addLoadingPanel();//添加进度条控件
 // this.map.addScaline(); //添加比例尺控件
//	getData();
//	if(type=='point')
//		OPLMap.addPoint(ptx, pty);
//	else
//		OPLMap.addLine("");
});