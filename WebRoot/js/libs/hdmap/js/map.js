/**
 * gis地图控件
 * @className:HdMap
 * @param:
 * @method:
 *
 * */
if (!window.HdMap) window.HdMap = {};
var HdMap = function () {};
HdMap.prototype = {
    url:null,
    options:null,
    /**
     * Property: div
     * {} 地图容器
     */
    div: null,
    /**
     * Property: map
     * {}
     */
    map: null,
    /**
     * Property: popoup
     * {}
     */
    popup:null,
    /**
     * Property: this.vectorLayer
     *
     */
    vectorLayer: null,

    /**
     * Property: lineFeature
     *
     */
    lineFeature: null,
    startLonlat:null,

    /**
     * 初始化加载地图
     * */
    /**
     * 初始化加载地图
     * */
    init: function (div,options,url,loadEndFun) {

        var layer;

        this.map = new OpenLayers.Map(div, options);
        layer = new OpenLayers.Layer.ArcGIS93Rest("ArcGIS Server Layer",
            url,
            {format: "PNG32", srs: "4326"},
            {attribution:'数据来源：'+ '<a target="_blank" ' +
                'href="http://www.hdsxtech.com">' +
                '恒达时讯</a> '},
            {isBaseLayer: true}
           );
		 layer.events.register("loadend", layer, function (e) {
			 if(loadEndFun && typeof(loadEndFun) === "function")
         	{
				 loadEndFun(e);
         	}
		 });
		 this.map.addLayer(layer);
		  //添加地图地图加载进度条控件

        //初始化设置地图中心
        if(!this.map.getCenter()){
            this.map.setCenter(this.map.getCenter(), 1);

        }

        /**
         * 删除默认的地图控件
         * */

        var zoomControl = this.map.getControlsByClass('OpenLayers.Control.Zoom')[0];
        this.map.removeControl(zoomControl);

        /**
         * 添加地图平移及导航控件
         * */

        this.map.addControl(new OpenLayers.Control.Navigation());
    },
    
    getCenter:function()
    {
        return	this.map.getCenter();
    },
    getResolution:function()
    {
    	return this.map.getResolution();
    },
    getZoom:function()
    {
    	return this.map.getZoom();
    },
    getExtent:function()
    {
    	return this.map.getExtent();
    },
    getPixelFromLonLat:function(lon,lat)
    {
    	var lonLat=new OpenLayers.LonLat(lon,lat);
    	return this.map.getPixelFromLonLat(lonLat);
    },
    getLonLatFromPixel:function(x,y)
    {
    	var pixel=new OpenLayers.Pixel(x,y);
    	return this.map.getLonLatFromPixel(pixel);
    },
    /**
     * 添加比例尺控件并中文化
     * */
    addScaline:function(){
        OpenLayers.INCHES_PER_UNIT["千米"] = OpenLayers.INCHES_PER_UNIT["km"];
        OpenLayers.INCHES_PER_UNIT["米"] = OpenLayers.INCHES_PER_UNIT["m"];
        /*OpenLayers.INCHES_PER_UNIT["公里"] = OpenLayers.INCHES_PER_UNIT["mi"];
         OpenLayers.INCHES_PER_UNIT["英寸"] = OpenLayers.INCHES_PER_UNIT["ft"];*/
        this.map.addControl(new OpenLayers.Control.ScaleLine({topOutUnits: "千米",
            topInUnits: "米", bottomOutUnits: '', bottomInUnits: ''
        }));
    },
    /**
     * 添加地图地图加载进度条控件
     * */
    addLoadingPanel:function(){
        var loadingpanel = new OpenLayers.Control.LoadingPanel();
        var parent=$(".olMap");
        var lpTop=(parent.height()-100)/2;
        var lpLeft=(parent.width()-100)/2;
        this.map.addControl(loadingpanel);
        $(".olControlLoadingPanel").css({"top":lpTop+"px","left":lpLeft+"px"});
    },
    /**
     * 添加地图自定义导航控件
     * */
    addPanZoomBar:function(){
        var panZoomBar = new OpenLayers.Control.TDTPanZoomBar();
        this.map.addControl(panZoomBar);
    },
    /**
     * 添加图层切换控件
     */
    addLayerSwitcher:function()
    {
    	var layerSwitcher= new OpenLayers.Control.LayerSwitcher();
    	this.map.addControl(layerSwitcher);
    },
    /**
     * 添加mouseposition鼠标跟随
     * */
    addMousePosition:function(){
        var mousePosition = new OpenLayers.Control.MousePosition({
            prefix: '<a target="_blank" ' +
            'href="http://spatialreference.org/ref/epsg/4326/">' +
            'EPSG:4326</a> 坐标: ',
            separator: ' | ',
            numDigits:6,
            emptyString: '超出地图范围'
        	});
        this.map.addControl(mousePosition);
    },
    /**
     * 添加鹰眼控件
     * */
    addOverViewMap:function(){
        var overViewMap = new OpenLayers.Control.LTOverviewMap();
        this.map.addControl(overViewMap);
    },
    /**
     * 添加工具条
     * */
    addToolBar:function(options)
    {
    	var toolBar=new OpenLayers.Control.ToolBar(options);
    	this.map.addControl(toolBar);
    	toolBar.showBar();
    },
    addPromptBox:function()
    {
    	var proptBox=new OpenLayers.Control.PromptBox();
    	this.map.addControl(proptBox);
    	return proptBox;
    },
    addZoomAnimation:function()
    {
    	var zoomAnimation=new OpenLayers.Control.LTZoomAnimation();
        this.map.addControl(zoomAnimation);
    },
    /**
     * 拉框放大
     * */
    zoomInBox:function(){
        var controlBox = new OpenLayers.Control();
        OpenLayers.Util.extend(controlBox, {
            draw: function () {
                this.box = new OpenLayers.Handler.Box( controlBox,
                    {"done": this.notice},{ "persist": true},
                    {keyMask:OpenLayers.Handler.MOD_SHIFT });
                this.box.activate();
            },
            notice: function () {
                map.zoomIn();
            }
        });
        this.map.addControl(controlBox);
    },
    /**
     * 拉框缩小
     * */
    zoomOutBox:function(){
        var controlBox = new OpenLayers.Control();
        OpenLayers.Util.extend(controlBox, {
            draw: function () {
                this.box = new OpenLayers.Handler.Box( controlBox,
                    {"done": this.notice},{ "persist": true},
                    {keyMask:OpenLayers.Handler.MOD_SHIFT });
                this.box.activate();
            },
            notice: function () {
                map.zoomOut();
            }
        });
        this.map.addControl(controlBox);
    },
    /**
     * 测量线
     * */
    measureLine:function(){
        var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
        renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
        var  LineMeasure = new OpenLayers.Control.Measure(
            OpenLayers.Handler.Path, {
                eventListeners: {
                    measure: function(evt) {
                        alert("路线长度为 " + evt.measure + evt.units);
                    }
                },
                persist: true,
                handlerOptions: {
                    layerOptions: {
                        renderers: renderer

                    }
                }
            }
        );
        map.addControl(LineMeasure);
        LineMeasure.activate();
    },
    /**
     * 测量面
     * */
    measurePolygon:function(){
        var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
        renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

        var polygonMeasure = new OpenLayers.Control.Measure(
            OpenLayers.Handler.Polygon, {
                persist: true,
                handlerOptions: {
                    layerOptions: {
                        renderers: renderer

                    }
                },
                eventListeners: {
                    measure: function(evt) {
                        alert("面积 " + evt.measure + "平方"+evt.units );
                    }
                }
            }
        );
        map.addControl(polygonMeasure);
        polygonMeasure.activate();
    },
    //用point的方式加单点
     addPoint:function(x,y){
        var markers = new OpenLayers.Layer.Markers("Markers");
        this.map.addLayer(markers);
        var size = new OpenLayers.Size(21,25);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        var icon = new OpenLayers.Icon("img/marker.png", size, offset);
        markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(x,y),icon));
    },
    removeMarker:function(){
        var layer = this.map.getLayersByName("Markers")[0];
        if (layer !=undefined) {
        	layer.clearMarkers();
        }
    },
    
    /**
     * 标多点
     *
     * */

    addPoints: function (points,html,callback,ispop,width_pop,high_pop) {
        var jsons;
        for( i = 0, j=points.length;i<j; i++){
            jsons = {"type": "FeatureCollection", "features": points};
        }


        var styleMap = new OpenLayers.StyleMap({
            "default": {
                fillOpacity: 1,
                strokeOpacity: 1,
                strokeColor: "#000000",
                graphicWidth: 30,
                graphicHeight: 30,
                externalGraphic: "${image}",
                attributes: "${attributes}"
            }
        });


        var geoJson = new OpenLayers.Format.GeoJSON();
        var pointLayer = new OpenLayers.Layer.Vector("points", {
            styleMap: styleMap
        });

        pointLayer.addFeatures(geoJson.read(jsons));
        this.map.addLayer(pointLayer);


        //this.map.setCenter(new OpenLayers.LonLat(), 2);
        // Interaction; not needed for initial display.
        var selectControl = new OpenLayers.Control.SelectFeature(pointLayer);
        this.map.addControl(selectControl);
        selectControl.activate();
        pointLayer.events.on({
            'featureselected': onFeatureSelect,
            'featureunselected': onFeatureUnselect
        });

        if (typeof(selectControl.handlers) != "undefined") { // OL 2.7
            selectControl.handlers.feature.stopDown = false;
        } else if (typeof(selectControl.handler) != "undefined") { // OL < 2.7
            selectControl.handler.stopDown = false;
            selectControl.handler.stopUp = false;
        }

        function formatHtml(html,feature)
        {
        	var result=html.replace(/\{([a-z]+)\}/ig, function(s, t){ 
        		return feature.attributes[t];
        		});
        	return result;
        }
        function onFeatureSelect(evt) {
            feature = evt.feature;
            if(ispop&&html!=null&&html!="")
            {
	            popup = new OpenLayers.Popup.CSSFramedCloud("featurePopup",
	                feature.geometry.getBounds().getCenterLonLat(),
	                new OpenLayers.Size(width_pop, high_pop),
	                formatHtml(html,feature),
	                null, true, onPopupClose);
	            feature.popup = popup;
	            popup.feature = feature;
	            this.map.addPopup(popup, true);
            }
            if((callback && typeof(callback) === "function"))
            	{
                   callback(feature);
            	}
        }

        function onFeatureUnselect(evt) {
            feature = evt.feature;
            if (feature.popup) {
                popup.feature = null;
                this.map.removePopup(feature.popup);
                feature.popup.destroy();
                feature.popup = null;
            }
        }

        function onPopupClose(evt) {
            // 'this' is the popup.
            var feature = this.feature;
            if (feature.layer) { // The feature is not destroyed
                selectControl.unselect(feature);
            } else { // After "moveend" or "refresh" events on POIs layer all
                //     features have been destroyed by the Strategy.BBOX
                this.destroy();
            }
        }
    },
    
    addPopup:function(id,lonLat,width,high,html,data,closeBox,closeBoxCallback)
    {
        function formatHtml(html,data)
        {
        	var result=html.replace(/\{([a-z]+)\}/ig, function(s, t){ 
        		return data[t];
        		});
        	return result;
        }
        if(html!=null&&html!="")
        {
            popup = new OpenLayers.Popup.CSSFramedCloud(id+"_",
            		lonLat,
                new OpenLayers.Size(width,high),
                formatHtml(html,data),
                null, closeBox, onPopupClose);
            this.map.addPopup(popup);
        }
        function onPopupClose(evt) {
                this.destroy();
            if(closeBoxCallback && typeof(closeBoxCallback) === "function")
            	{
            	   closeBoxCallback(evt);
            	}
        }
    },
    /**
     * 删除多点
     * */

    removePoints:function(){
        var layer = this.map.getLayersByName("points")[0];
        if (layer != null) {
            this.map.removeLayer(layer);
        }
    },

    /**
     * 标线
     * */

    addLine: function (lines) {
        // 地图标记点样式
        var styleMap = new OpenLayers.StyleMap({
            "default": {
                strokeColor: "#990000",
                strokeWidth: 4,
                strokeDashstyle: "solid",
                attributes:"info"
            }
        });
        var lineLayer;
        for (var i = 0, j = lines.length; i < j; i++) {
            var line = (new OpenLayers.Format.WKT()).read(lines[i]).geometry;
            line = line.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:4326"));

            lineLayer = new OpenLayers.Layer.Vector("路线",
                {
                styleMap:styleMap
               /* eventListeners:{
                    featureover:onSelect,
                    featureout:unSelect
                }*/
                });
            this.map.addLayer(lineLayer);

            var feature = new OpenLayers.Feature.Vector(line);
            lineLayer.addFeatures(feature);
             this.map.zoomToExtent(feature.geometry.bounds,false);
        };

        var selectControl = new OpenLayers.Control.SelectFeature(lineLayer);
        this.map.addControl(selectControl);
        selectControl.activate();
        if (typeof(selectControl.handlers) != "undefined") { // OL 2.7
            selectControl.handlers.feature.stopDown = false;
        } else if (typeof(selectControl.handler) != "undefined") { // OL < 2.7
            selectControl.handler.stopDown = false;
            selectControl.handler.stopUp = false;
        }

        function onSelect(evt){
            feature = evt.feature;
            this.popup = new OpenLayers.Popup.CSSFramedCloud("featurePopup",
                feature.geometry.getBounds().getCenterLonLat(),
                new OpenLayers.Size(200, 500),
                "<div style='width:260px;height:150px;font-size:.8em'>基本信息: " + feature.attributes + "hjhk"+ "<br>"+feature.id
                    +"<br></div>",
                null, true, onPopupClose);
            feature.popup = this.popup;
            this.popup.feature = feature;
            this.map.addPopup(this.popup, true);
        };
        function unSelect(evt){
            feature = evt.feature;
            if (feature.popup) {
                this.popup.feature = null;
                this.map.removePopup(feature.popup);
                feature.popup.destroy();
                feature.popup = null;
            }
        };
        function onPopupClose(evt) {
            // 'this' is the popup.
            var feature = this.feature;
            if (feature.layer) { // The feature is not destroyed
                selectControl.unselect(feature);
            } else { // After "moveend" or "refresh" events on POIs layer all
                //     features have been destroyed by the Strategy.BBOX
                this.destroy();
            }
        }
    },

    /**
     * 清除线
     * */

    removeLine:function(){
        var LineLayer = this.map.getLayersByName("路线")[0];
        if (LineLayer != null) {
            this.map.removeLayer(LineLayer);
        }
    },
    /**
     * 标面
     * */
    addPolygon: function () {
        var polygon = {
            "type": "Polygon",
            "coordinates": [
                [
                    [117.43, 40.1],
                    [117.58, 40.20],
                    [1177.83, 40.3],
                    [117.86, 40.16],
                    [117.61, 41.96]
                ]
            ]
        };
        var featureCollection = {
            "type": "FeatureCollection",
            "features": [
                {"geometry": {
                    "type": "GeometryCollection",
                    "geometries": [
                        polygon
                    ]
                }}
            ]
        };
        var geojson_format = new OpenLayers.Format.GeoJSON();
        var polygonLayer = new OpenLayers.Layer.Vector("面");
        this.map.addLayer(polygonLayer);
        polygonLayer.addFeatures(geojson_format.read(featureCollection));

    },

    /**
     * 地图上画圆 传入点和半径
     * */

    addCircle:function(point,radius){
        // var  point = 'point(116.40124 39.92978)';
        //var point = new OpenLayers.Geometry.fromWKT(coordinate);
        var circlePoint =(new OpenLayers.Format.WKT()).read(point).geometry;

        var circleFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
            circlePoint, radius, 360, 20), null, {
            fillOpacity: 0.5,
            fillColor: '#990000',
            strokeColor: '#990000',
            strokeOpacity: 1
        });
        var circleLayer = new OpenLayers.Layer.Vector("圆");
        circleLayer.addFeatures([circleFeature]);
        this.map.addLayer(circleLayer);
    },

    /**
     * 清除圆
     * */

    removeCircle:function(){
        var circleLayer = this.map.getLayersByName("圆")[0];
        if (circleLayer != null) {
            this.map.removeLayer(circleLayer);
        }
    },
    /**
     * 清除面
     * */
    removePolygon: function () {
        var PolygonLayer = this.map.getLayersByName("面")[0];
        if (PolygonLayer != null) {
            this.map.removeLayer(PolygonLayer);
        }
    },

    /**
     * 加载图层
     * @param layer
     */
    addLayer:function(layer)
    {
    	if(layer!=null)
        {
    		this.map.addLayer(layer);
        }   	
    },
    /**
     * 清除所有图层
     * */

    removeLayers: function () {
      var layers=this.map.layers;
      var layer;
      for (var i = 0,num=layers.length; i <num; i++) {
		  layer=layers[i];
		  if(!layer.isBaseLayer)
			  {
			     this.map.removeLayer(layer);
			  }
	   }
    },

    /**
     * 清除点
     * */

    removePoint: function () {
        var layer = this.map.getLayersByName("point")[0];
        if (layer != null) {
            this.map.removeLayer(layer);
        }
        var layerPoint = this.map.getLayersByName("Points")[0];
        if (layerPoint != null) {
            this.map.removeLayer(layerPoint);
        }
    },

    /**
     * 放大
     * */

    zoomIn: function () {
        this.map.zoomIn();
    },

    /**
     * 缩小
     **/

    zoomOut: function () {
        this.map.zoomOut();
    },

    /**
     * 拉宽并获取经纬度坐标系
     * */

    boxExtend: function () {
        var controlBox = new OpenLayers.Control();
        OpenLayers.Util.extend(controlBox, {
            draw: function () {
                this.box = new OpenLayers.Handler.Box(controlBox,
                    {"done": this.notice}, { "persist": true},
                    {keyMask: OpenLayers.Handler.MOD_SHIFT });
                this.box.activate();
            },

            notice: function (bounds) {
                var ll = this.map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom));
                var ur = this.map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top));
                alert(ll.lon.toFixed(4) + ", " +
                    ll.lat.toFixed(4) + ", " +
                    ur.lon.toFixed(4) + ", " +
                    ur.lat.toFixed(4));
            }
        });
        this.map.addControl(controlBox);
    },
    /**
     * 点击地图获取经纬度坐标
     * */
    pointSelect: function () {
        this.pointClick = new OpenLayers.Control.ClickControl();
        this.map.addControl(this.pointClick);
        this.pointClick.activate();
    },
    /**
     * 取消点击地图获取经纬度坐标系
     * */

    cancelPointClick: function () {
        if (this.pointClick.activate()) {
            this.pointClick.destroy();
            this.pointClick.deactivate();
        }
    },

    /**
     * 点居中并闪烁
     * */
    centerAt: function (x,y,zoom) {
        this.map.setCenter(new OpenLayers.LonLat(x,y),zoom);
    },
    /*设置中心点*/
    setCenter:function(x,y)
    {
    	this.map.setCenter(new OpenLayers.LonLat(x,y),3);
    },
    /**
     * 标单点
     * */
    addSinglePoint: function (x, y, html, image, zoom) {

        var popup,pointLayer;

        // 地图标记点样式
        var styleMap = new OpenLayers.StyleMap({
            "default": {
                fillOpacity: 1,
                hoverFillOpacity: 1,
                hoverFillColor: "",
                strokeOpacity: 1,
                strokeColor: "#ee9900",
                graphicWidth: 30,
                graphicHeight: 30,
                externalGraphic: image
            }
        });

        var point = new OpenLayers.Geometry.Point(x, y);
        var feature = new OpenLayers.Feature.Vector(point);
        pointLayer = new OpenLayers.Layer.Vector("单点", {
            eventListeners:{
                featureover: onFeatureSelect,

                featureout: onFeatureUnselect,
                featureclick:clickTest

            },
            styleMap: styleMap});

        pointLayer.addFeatures(feature);
        if(pointLayer != null){
            pointLayer.removeMap();
        }
        this.map.addLayer(pointLayer);
        //点缩放至某一级显示在中心
        var lonLat = new OpenLayers.LonLat(x, y);
        this.map.setCenter(lonLat, zoom);

        /*// create the layer with listeners to create and destroy popups
         var selectControl = new OpenLayers.Control.SelectFeature(pointLayer);
         this.map.addControl(selectControl);
         selectControl.activate();
         *//* pointLayer.events.on({
         'featureselected':onFeatureSelect,
         'featureunselected': onFeatureUnselect
         });
         *//*

         if (typeof(selectControl.handlers) != "undefined") { // OL 2.7
         selectControl.handlers.feature.stopDown = false;
         } else if (typeof(selectControl.handler) != "undefined") { // OL < 2.7
         selectControl.handler.stopDown = false;
         selectControl.handler.stopUp = false;
         }*/

        function onFeatureSelect(evt) {
            feature = evt.feature;
            popup = new OpenLayers.Popup.CSSFramedCloud("featurePopup",
                feature.geometry.getBounds().getCenterLonLat(),
                new OpenLayers.Size(100, 100),

                html,
                null, true, onPopupClose);

            feature.popup = popup;
            popup.feature = feature;
            this.map.addPopup(popup, true);
        }

        function onFeatureUnselect(evt) {
            feature = evt.feature;
            if (feature.popup) {
                popup.feature = null;
                this.map.removePopup(feature.popup);
                feature.popup.destroy();
                feature.popup = null;
            }
        }
        function clickTest(evt){
            feature = evt.feature;
            if (feature.popup) {
                popup.feature = null;
                this.map.removePopup(feature.popup);
                feature.popup.destroy();
                feature.popup = null;
            }

        }

        function onPopupClose(evt) {
            // 'this' is the popup.
            var feature = this.feature;
            if (feature.layer) { // The feature is not destroyed
                selectControl.unselect(feature);
            } else { // After "moveend" or "refresh" events on POIs layer all
                //     features have been destroyed by the Strategy.BBOX
                this.destroy();
            }
            this.destroy();
        }

    },
    /**
     * 平移至
     * */
    panTo:function(x,y){
        var lonlat = new OpenLayers.LonLat(x,y);
        this.map.panTo(lonlat);
    },
    /**
     * 缩放至
     * */
    zoomTo: function (zoom) {
        this.map.zoomTo(zoom);
    },
    setStart:function(OPX){
        var startPoint = this.map.getLayersByName("startPoint")[0];
        if (startPoint != null) {
            this.map.removeLayer(startPoint);
        }
        var styleMap = new OpenLayers.StyleMap({
            "default": {
                graphicWidth: 32,
                graphicHeight: 32,
                externalGraphic: "img/起.png"
            }
        });
        this.startLonlat = this.map.getLonLatFromLayerPx(OPX);

        var point = (new OpenLayers.Format.WKT()).read("point(" + this.startLonlat.lon + " " + this.startLonlat.lat + ")").geometry;
        point = point.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:4326"));
        var vector = new OpenLayers.Layer.Vector("startPoint", {
            styleMap: styleMap
        });
        var feature = new OpenLayers.Feature.Vector(point);
        vector.addFeatures(feature);
        this.map.addLayer(vector);


    },
    setEnd:function(OPX){
        console.log(this.startLonlat);
        var endPoint = this.map.getLayersByName("endPoint")[0];
        if (endPoint != null) {
            this.map.removeLayer(endPoint);
        }
        var styleMap = new OpenLayers.StyleMap({
            "default": {
                graphicWidth: 32,
                graphicHeight: 32,
                externalGraphic: "img/终.png"
            }
        });
        var lonlat = this.map.getLonLatFromLayerPx(OPX);
        
        var point = (new OpenLayers.Format.WKT()).read("point(" + lonlat.lon + " " + lonlat.lat + ")").geometry;
        point = point.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:4326"));
        var vector = new OpenLayers.Layer.Vector("endPoint", {
            styleMap: styleMap
        });
        var feature = new OpenLayers.Feature.Vector(point);
        vector.addFeatures(feature);
        this.map.addLayer(vector);
        //this.addLine(lines);
    },
    addMarker:function(OPX){
       var markerLayer = this.map.getLayersByName("Markers")[0];
        if (markerLayer != null) {
            this.map.removeLayer(markerLayer);
        }
        var markers = new OpenLayers.Layer.Markers("Markers");
        this.map.addLayer(markers);
        var size = new OpenLayers.Size(28, 28);
        var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
        var icon = new OpenLayers.Icon("/giscjapp/hdmap/img/marker.png", size, offset);
        var lonlat = this.map.getLonLatFromLayerPx(OPX);
        markers.addMarker(new OpenLayers.Marker(lonlat, icon)); 
    },
    addMarker:function(x,y){
    	var markerLayer = this.map.getLayersByName("Markers")[0];
        if (markerLayer != null) {
            this.map.removeLayer(markerLayer);
        }
        var markers = new OpenLayers.Layer.Markers("Markers");
        this.map.addLayer(markers);
        var size = new OpenLayers.Size(21,25);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        var icon = new OpenLayers.Icon("/giscjapp/hdmap/img/marker.png", size, offset);
        var lonlat=new OpenLayers.LonLat(x,y);
        markers.addMarker(new OpenLayers.Marker(lonlat,icon));
    },
	pointClick:function(control){
		control.events.register("click", control , function(e){ 
		var layer = control.getLayersByName("Markers")[0];
	    if (layer != null) {
	    	control.removeLayer(layer);
	    }
		var markers = new OpenLayers.Layer.Markers("Markers");
		control.addLayer(markers);
		var size = new OpenLayers.Size(28, 28);
        var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
        var icon = new OpenLayers.Icon("img/marker.png", size, offset);
		var lonlat =control.getLonLatFromLayerPx(e.xy);
		var ptx = new Number(lonlat.lon);
		var pty = new Number(lonlat.lat);
        $("#ptx").val(ptx.toFixed(8));
        $("#pty").val(pty.toFixed(8));
		markers.addMarker(new OpenLayers.Marker(lonlat, icon)); 
     });
		
   },
    CLASS_NAME: HdMap
};
