/**
 * @author jingzh
 * @description 地图控件常用方法
 */
var OPLMap = function() {};
OPLMap.prototype.map;//地图对象
OPLMap.prototype.type={Point:1,Line:2};
OPLMap.prototype.flog=false;//地图是否初始化完成
/**
 * 创建map模块div
 */
OPLMap.prototype.newDivs=function () {
  var _t = $('<div id="div_map" style="width: 800px; height: 500px;display: none;"></div>');
  var _div = '<div id="map" style="width: 800px; height: 500px;"></div>';
  _t.append(_div);
  _t.appendTo('body');
};
/**
 * 生成map
 */
OPLMap.prototype.newMap=function (isClick) {
  var options = {
			controls:[],
			Units: "degrees",
			tileSize: new OpenLayers.Size(256, 256),
			singleTile: true,
			transitionEffect: "resize",
			maxExtent: new OpenLayers.Bounds(112.80036258020206, 23.670358856336712,119.42862793151463,30.70651746003774),
			projection: "EPSG:4326",
		    numZoomLevels: 10
	};
  this.map= new HdMap();
  var url="http://10.228.2.72:6080/arcgis/rest/services/admin/SXMAP/MapServer/export";
//  var url ="http://192.168.100.117:6080/arcgis/rest/services/jxcity/MapServer";
  this.map.init("map",options,url);
  //this.map.addPanZoomBar();  //添加缩放平移控件         
  //this.map.addOverViewMap();  //添加鹰眼控件           
  //this.map.addLoadingPanel();//添加进度条控件
 // this.map.addScaline(); //添加比例尺控件
  if(isClick)
  {
	 this.map.pointClick(this.map.map);
  }
  this.flog=true;
};
/**
 * 显示地图
 */
var isExist=false;
OPLMap.prototype.showMapDiv=function () {
  $('#div_map').css('display', 'block');
  if(isExist)
  {
	    $('#div_map').dialog("open");
  }
  else
  {
	  $('#div_map').dialog({
		    title : "地图预览",
		    closable: true,
		    buttons : [ {
		      text : '关闭',
		      handler : function() {
		        $('#div_map').dialog('close');
		      }
		    } ]
		  });
		  this.newMap(false);
  }
  isExist=true;
};
/**
 * 显示地图并获取坐标
 */
OPLMap.prototype.showMapDivPoint=function () {
	 $('#div_map').css('display', 'block');
	  if(isExist)
	  {
		    $('#div_map').dialog("open");
	  }
	  else
	  {
		  $('#div_map').dialog({
			    title : "地图预览",
			    closable: true,
			    buttons : [ {
			      text : '关闭',
			      handler : function() {
			        $('#div_map').dialog('close');
			      }
			    } ]
			  });
			  this.newMap(true);
	  }
	  isExist=true;
};
/**
 * 标点
 */
OPLMap.prototype.addPoint=function (ptx,pty){
	if(ptx==null||ptx==''||ptx==0||pty==0)
	{
        $.messager.alert('信息提示', '无坐标值！');
	}
	if(this.flog)
	{
		this.map.removeLayers();
        this.map.addPoint(ptx, pty);
        this.map.panTo(ptx,pty,8)
	}
};
/**
 * 标线
 */
OPLMap.prototype.addLine=function (linestring){
	if(linestring==null||linestring=='')
	{
		alert("无空间数据");return;
	}
	var lines = [linestring];
	if(this.flog)
	{
		this.map.addLine(lines);
	}
	else
	{
		setTimeout(this.addLine,2000);
	}
};
/**
 * 查询空间数据并在地图上展示
 */
OPLMap.prototype.queryShape=function (id,uri,type){
	  var json=null;
	  $.ajax({
	      type : "POST",
	      url : uri,
	      async : false,
	      data : "id=" + id,
	      dataType : 'json',
	      success: function(msg){
	        if(msg == null){
	        	alert('无空间数据!');return;
	        }
	        else{
	        	 json= msg;
	        }
	      },
	      error : function(){
	    	  alert('查询数据异常!');return;
	      }
	    });
	  if(this.type.Point==type)
		  this.addPoint(json.ptx, json.pty);
	  else
		  this.addLine(json.lineString);
};
