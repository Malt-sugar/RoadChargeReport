
    OpenLayers.Control.TDTPanZoomBar = OpenLayers.Class(OpenLayers.Control.PanZoom, {
    zoomStopWidth: 31,
    zoomStopHeight: 14,
    slider: null,
    sliderEvents: null,
    zoombarDiv: null,
    divEvents: null,
    zoomWorldIcon: true,
    panIcons: true,
    forceFixedZoomLevel: false,
    mouseDragStart: null,
    deltaY: null,
    zoomStart: null,
    leftTooltips:null,
    leftTops:[],
    leftTooltipPositionAry:["","-31px -222px","-31px -208px","-31px -193px","-31px -178px","-31px -163px","-31px -148px","-32px -133px","-32px -119px","-31px -105px","-31px -91px","-73px -90px","-73px -106px","-73px -121px","-72px -138px","-73px -154px","-75px -170px","-76px -185px","-73px -202px","-72px -220px"],
    tempEvt:null,
    rightTips:null,//右侧
    showStreet:true,//是否显示街道级别
    destroy: function() {

        this._removeZoomBar();

        this.map.events.un({
            "changebaselayer": this.redraw,
            scope: this
        });

        OpenLayers.Control.PanZoom.prototype.destroy.apply(this, arguments);

        delete this.mouseDragStart;
        delete this.zoomStart;
    },
    setMap: function(map) {
        OpenLayers.Control.PanZoom.prototype.setMap.apply(this, arguments);
        this.map.events.register("changebaselayer", this, this.redraw);
    },
    redraw: function() {
        if (this.div != null) {
            this.removeButtons();
            this._removeZoomBar();
        }  
        this.draw();
    },
    
    /**
    * Method: draw 
    *
    * Parameters:
    * px - {<OpenLayers.Pixel>} 
    */
    draw: function(px) {
        // initialize our internal div
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        px = this.position.clone();
        // place the controls
        this.buttons = [];

        var sz = new OpenLayers.Size(18,18);
        if (this.panIcons) {
            var centered = new OpenLayers.Pixel(px.x+sz.w/2, px.y);
            var wposition = sz.w;

            if (this.zoomWorldIcon) {
                centered = new OpenLayers.Pixel(px.x+sz.w, px.y);
            }

            this._addButton("panup", "zoombarmini.png", new OpenLayers.Pixel(22, 5), new OpenLayers.Size(15,17), "\u5411\u4e0a\u5e73\u79fb","-110px -1px");  //向上箭头
            px.y = centered.y+sz.h;
            centered = centered.add(-9, 0); //住左偏移九个像素
            this._addButton("panleft", "zoombarmini.png", new OpenLayers.Pixel(5, 24), new OpenLayers.Size(13, 11), "\u5411\u5de6\u5e73\u79fb","-84px -1px");  //向左箭头
            if (this.zoomWorldIcon) {
                this._addButton("zoomworld", "zoombarmini.png", new OpenLayers.Pixel(20, 22), new OpenLayers.Size(17, 16), "\u5168\u90E8\u5730\u56FE","-112px -26px");

                wposition *= 2;
            }
            this._addButton("panright", "zoombarmini.png", new OpenLayers.Pixel(38, 23), new OpenLayers.Size(13, 11), "\u5411\u53f3\u5e73\u79fb","-97px 0px");  //向右箭头
            this._addButton("pandown", "zoombarmini.png", new OpenLayers.Pixel(22, 36), new OpenLayers.Size(15, 17), "\u5411\u4e0b\u5e73\u79fb","-125px 0px"); //向下箭头
            this._addButton("zoomin", "zoombarmini.png", centered.add(2, sz.h*3+5), new OpenLayers.Size(31,	18), "\u653e\u5927\u4e00\u7ea7","-70px -60px"); //放大按纽
            centered = this._addZoomBar(centered.add(0, sz.h*4 + 5));
            this._addButton("zoomout", "zoombarmini.png", centered.add(1, -2), new OpenLayers.Size(31, 18), "\u7f29\u5c0f\u4e00\u7ea7","-105px -51px"); //缩小按纽
            
            
            //添加 zoomToolTip
            var tooltipSZ = new OpenLayers.Size(25,15);
            var tooltipLeftSZ = new OpenLayers.Size(35,17);
            var imgLocation = OpenLayers.Util.getImagesLocation();
            var zoomScale = new OpenLayers.Size(41,12);
          //添加右侧比例尺标示
            //this._addRightZoomScaleTip("zoomScaletooltip", "zoombarmini.png", centered.add(30,-10), zoomScale,"-31px -222px");
            var thisProjection = this.map.getProjection();
            //判断是否显示街道，默认显示街道
           /* if(this.showStreet){
            	//判断是否为墨卡托投影（900913）
            	if(thisProjection.indexOf("900913")>-1){
            		this.leftTooltips = {
                        	zltGlb:{url:"zoombarmini.png",tempTop:-31,res:0.703125,position:"0px -70px"},
                        	zltCountry:{url:"zoombarmini.png",tempTop:-23,res:0.0439453125,position:"0px -53px"},
                        	zltPro:{url:"zoombarmini.png",tempTop:-25,res:0.0054931640625,position:"0px -36px"},
                        	zltCity:{url:"zoombarmini.png",tempTop:-25,res:0.0006866455078125,position:"0px -19px"},
                        	zltStr:{url:"zoombarmini.png",tempTop:-40,res:0.00002145767211914062,position:"0px -2px"}
                    };
                	this.mercatorLeftTooltips = {
                			zltGlb:{url:"zoombarmini.png",tempTop:-31,res:39135.7585,position:"0px -70px"},
                        	zltCountry:{url:"zoombarmini.png",tempTop:-25,res:4891.9698,position:"0px -53px"},
                        	zltPro:{url:"zoombarmini.png",tempTop:-22,res:611.4962,position:"0px -36px"},
                        	zltCity:{url:"zoombarmini.png",tempTop:-25,res:76.4370,position:"0px -19px"},
                        	zltStr:{url:"zoombarmini.png",tempTop:-40,res:2.3887,position:"0px -2px"}
                    };
            	}else{
            		this.leftTooltips = {
                        	zltGlb:{url:"zoombarmini.png",tempTop:-31,res:0.703125,position:"0px -70px"},
                        	zltCountry:{url:"zoombarmini.png",tempTop:-23,res:0.0439453125,position:"0px -53px"},
                        	zltPro:{url:"zoombarmini.png",tempTop:-25,res:0.0054931640625,position:"0px -36px"},
                        	zltCity:{url:"zoombarmini.png",tempTop:-25,res:0.0006866455078125,position:"0px -19px"},
                        	zltStr:{url:"zoombarmini.png",tempTop:-40,res:0.00002145767211914062,position:"0px -2px"}
                    };
                	this.mercatorLeftTooltips = {
                			zltGlb:{url:"zoombarmini.png",tempTop:-31,res:39135.7585,position:"0px -70px"},
                        	zltCountry:{url:"zoombarmini.png",tempTop:-25,res:4891.9698,position:"0px -53px"},
                        	zltPro:{url:"zoombarmini.png",tempTop:-22,res:611.4962,position:"0px -36px"},
                        	zltCity:{url:"zoombarmini.png",tempTop:-25,res:76.4370,position:"0px -19px"},
                        	zltStr:{url:"zoombarmini.png",tempTop:-40,res:2.3887,position:"0px -2px"}
                    };
            	}
            }else{
            	if(thisProjection.indexOf("900913")>-1){
            		this.leftTooltips = {
            				zltGlb:{url:"zoombarmini.png",tempTop:-31,res:0.703125,position:"0px -70px"},
                        	zltCountry:{url:"zoombarmini.png",tempTop:-23,res:0.0439453125,position:"0px -53px"},
                        	zltPro:{url:"zoombarmini.png",tempTop:-25,res:0.0054931640625,position:"0px -36px"},
                        	zltCity:{url:"zoombarmini.png",tempTop:-25,res:0.0006866455078125,position:"0px -19px"}
                    };
                	this.mercatorLeftTooltips = {
                			zltGlb:{url:"zoombarmini.png",tempTop:-31,res:39135.7585,position:"0px -70px"},
                        	zltCountry:{url:"zoombarmini.png",tempTop:-25,res:4891.9698,position:"0px -53px"},
                        	zltPro:{url:"zoombarmini.png",tempTop:-22,res:611.4962,position:"0px -36px"},
                        	zltCity:{url:"zoombarmini.png",tempTop:-25,res:76.4370,position:"0px -19px"}
                    };
            	}else{
            		this.leftTooltips = {
            				zltGlb:{url:"zoombarmini.png",tempTop:-31,res:0.703125,position:"0px -70px"},
                        	zltCountry:{url:"zoombarmini.png",tempTop:-23,res:0.0439453125,position:"0px -53px"},
                        	zltPro:{url:"zoombarmini.png",tempTop:-25,res:0.0054931640625,position:"0px -36px"},
                        	zltCity:{url:"zoombarmini.png",tempTop:-25,res:0.0006866455078125,position:"0px -19px"}
                    };
                	this.mercatorLeftTooltips = {
                			zltGlb:{url:"zoombarmini.png",tempTop:-31,res:39135.7585,position:"0px -70px"},
                        	zltCountry:{url:"zoombarmini.png",tempTop:-25,res:4891.9698,position:"0px -53px"},
                        	zltPro:{url:"zoombarmini.png",tempTop:-22,res:611.4962,position:"0px -36px"},
                        	zltCity:{url:"zoombarmini.png",tempTop:-25,res:76.4370,position:"0px -19px"}
                    };
            	}
            }*/
          /*  centered  = centered.add(-25,20);
             if(thisProjection.indexOf("900913")>-1){
             for(var myitem in this.mercatorLeftTooltips){
             centered = centered.add(0,this.mercatorLeftTooltips[myitem].tempTop);
             if(myitem == "zltGlb"){
             tooltipSZ = new OpenLayers.Size(39,15);
             this._addZoomToolTip(myitem, this.mercatorLeftTooltips[myitem].url, centered.add(-15,0), tooltipSZ,this.mercatorLeftTooltips[myitem].position);
             }else{
             tooltipSZ = new OpenLayers.Size(25,15);
             this._addZoomToolTip(myitem, this.mercatorLeftTooltips[myitem].url, centered, tooltipSZ,this.mercatorLeftTooltips[myitem].position);
             }

             }
             }else{
             for(var myitem in this.leftTooltips){
             centered = centered.add(0,this.leftTooltips[myitem].tempTop);
             if(myitem == "zltGlb"){
             tooltipSZ = new OpenLayers.Size(39,15);
             this._addZoomToolTip(myitem, this.leftTooltips[myitem].url, centered.add(-15,0), tooltipSZ,this.leftTooltips[myitem].position);
             }else{
             tooltipSZ = new OpenLayers.Size(25,15);
             this._addZoomToolTip(myitem, this.leftTooltips[myitem].url, centered, tooltipSZ,this.leftTooltips[myitem].position);
             }

             }
             }*/
        }
        else {
            this._addButton("zoomin", "zoom-plus-mini.png", px, sz);
            centered = this._addZoomBar(px.add(0, sz.h));
            this._addButton("zoomout", "zoom-minus-mini.png", centered, sz);
            if (this.zoomWorldIcon) {
                centered = centered.add(0, sz.h+3);
                this._addButton("zoomworld", "zoom-world-mini.png", centered, sz);
            }
        }
        this.div.style.background = "url(olapi/img/zoombarmini.png)";  //更改样式
        this.div.style.backgroundRepeat = "no-repeat";
        this.div.style.backgroundPosition = "-27px 3px";
        this.div.style.width = "58px";
        this.div.style.height = "58px";
    	this.div.style.zIndex = "10001";
        this.div.style.left = "20px";
        this.div.style.right = "";
        this.div.style.top = "20px";
        this.div.style.cursor = "pointer";
        return this.div;
    },
  //添加 zoomToolTip
    _addZoomToolTip:function(id, img, xy, sz,position) {
    	var imgLocation = OpenLayers.Util.getImagesLocation()+img;
    	if(position){
    		var tooltip = document.createElement("div");
    		tooltip.id = "OpenLayers_Control_PanZoom_" + id;
    		tooltip.style.background = "url("+imgLocation+")";
    		tooltip.style.backgroundRepeat = "no-repeat";
    		tooltip.style.backgroundPosition = position;
    		tooltip.style.height = sz.h+"px";
    		tooltip.style.width = sz.w+"px";
    		tooltip.style.top = xy.y+"px";
    		tooltip.style.left = xy.x+"px";
    		tooltip.style.position = "absolute";
    	}else{
    		var tooltip = OpenLayers.Util.createAlphaImageDiv(
    	            "OpenLayers_Control_PanZoom_" + id, 
    	            xy, sz, imgLocation, "absolute");
    	}
         //初始化不显示
//        TDTPanZoomBar.isVisible = false;
	    this.tipEvents = new OpenLayers.Events(this, tooltip, null, true,
                {includeXY: true});
	    this.tipEvents.on({
            "click": this.tipClick,
            "mouseover":this.slideMouseOver,
            "mouseout": this.mouseOut
        });
	    tooltip.style.display = "none";
	    this.leftTops.push(tooltip);
        this.div.appendChild(tooltip);
        return tooltip;
    },
    //添加右侧比例尺标示
    _addRightZoomScaleTip:function(id, img, xy, sz,position){
    	var imgLocation = OpenLayers.Util.getImagesLocation()+img;
    	if(position){
        	var tooltips = document.createElement("div");
        	tooltips.id = "OpenLayers_Control_PanZoomScale_" + id;
        	tooltips.style.height = sz.h+"px";
        	tooltips.style.width = sz.w+"px";
        	tooltips.style.top = xy.y+"px";
        	tooltips.style.left = xy.x+"px";
        	tooltips.style.background = "url("+imgLocation+")";
        	tooltips.style.backgroundRepeat = "no-repeat";
        	tooltips.style.backgroundPosition = position;
        	tooltips.style.position = "absolute";
        }else{
        	var tooltips = OpenLayers.Util.createAlphaImageDiv(
                    "OpenLayers_Control_PanZoomScale_" + id, 
                    xy, sz, imgLocation, "absolute");
        }
         //初始化不显示
	    this.rightTips = tooltips;
	    this.rightTips.style.display = "none";
        this.div.appendChild(tooltips);
        return tooltips;
    },
    /**
     * Method:tipClick
     * Picks up on clicks directly on the tooltipLeft div
     *           and sets the zoom level appropriately.
     */
    tipClick: function (evt) {
    	var o = evt.srcElement || evt.target;
    	var thisProjection = this.map.getProjection();
    	//the map is Mercator
    	if(thisProjection.indexOf("900913")>-1){
    		var maxResolution = this.map.getMaxResolution();
    		var currentResolution = this.map.getResolution();
    		var maxZoom = this.getCurrentZoomNumFromResolution(currentResolution,maxResolution);
    		var leftTipName = o.id.split("_")[3];
        	var res = this.mercatorLeftTooltips[leftTipName]["res"];
            var zoom = Math.log(78271.5170/res)/Math.log(2);
            this.map.zoomTo((zoom-maxZoom)-1);
            OpenLayers.Event.stop(evt);
    	}else{
    		var pyramidMaxResolution = (this.map.pyramid.getTopTileSize().w /
    				this.map.pyramid.tileSize.w) /
    				Math.pow(2, this.map.pyramid.topLevelIndex);
        	var maxZoom = this.getCurrentZoomNumFromResolution(pyramidMaxResolution,this.map.maxResolution);
            var leftTipName = o.id.split("_")[3];
        	var res = this.leftTooltips[leftTipName]["res"];
            var zoom = this.getCurrentZoomNumFromResolution(pyramidMaxResolution,res)-2;
            if(res == 0.703125){
            	this.map.zoomTo((zoom-maxZoom)+1);
            }else{
                this.map.zoomTo((zoom-maxZoom));
            }
            OpenLayers.Event.stop(evt);
    	}
    },
    slideMouseOver: function(evt) {
    	clearTimeout(this.tempEvt);
    	TDTPanZoomBar.isVisible = true;
    	var leftTips = this.leftTops.length;
    	for(var i=0;i<leftTips;i++){
    		this.leftTops[i].style.display = "block";
    	}
    	OpenLayers.Event.stop(evt);
    },
    mouseOut: function(evt) {
    	var tooltip = this.leftTops;
//    	TDTPanZoomBar.isVisible = false;
    	var callfn = OpenLayers.Function.bind(function() {
			if(OpenLayers.Control.TDTPanZoomBar.isVisible) {
				for(var i=0;i<tooltip.length;i++){
		    		tooltip[i].style.display = "none";
		    	}
				this.rightTips.style.display = "none";
			}
    	},this)
    	this.tempEvt = window.setTimeout(callfn,500);
    	OpenLayers.Event.stop(evt);
    },
    /**
     * Method: getDataExtent
     * 从给定金字塔最大分辨率和地图当前分辨率计算当前级别数
     */
	getCurrentZoomNumFromResolution: function(maxRes,currentRes){
	
		//原计算方法直接取地图当前级别：parseInt(this.map.getZoom());
		//现在的方法计算当前分辨率相对于金字塔最大分辨率的级别
        var zoomRatio = parseInt(this.map.getZoom());
        
        //如果当前分辨率比金字塔最大分辨率还大，说明出错
        if(zoomRatio < 1) return 0;
        
        var zoom = 0;
        while( (zoomRatio / 2) >= 1 ){
        	zoom++;
        	zoomRatio = zoomRatio/2;
        };
        return zoom ;
	},
    _addButton:function(id, img, xy, sz, msg,position) {
        var imgLocation = OpenLayers.Util.getImagesLocation() + img;
        if(position){
        	var btn = document.createElement("div");
            btn.id = this.id + "_" + id;
            btn.style.height = sz.h+"px";
            btn.style.width = sz.w+"px";
            btn.style.top = xy.y+"px";
            btn.style.left = xy.x+"px";
            btn.style.background = "url("+imgLocation+")";
            btn.style.backgroundRepeat = "no-repeat";
            btn.style.backgroundPosition = position;
            btn.style.position = "absolute";
        }else{
        	var btn = OpenLayers.Util.createAlphaImageDiv(
                    this.id + "_" + id, 
                    xy, sz, imgLocation, "absolute");
        	btn.style.cursor = "pointer";
        }
        btn.title = msg; //添加title属性
        //we want to add the outer div
        this.div.appendChild(btn);

//        OpenLayers.Event.observe(btn, "mousedown", 
//            OpenLayers.Function.bindAsEventListener(this.onButtonClick, btn));
        OpenLayers.Event.observe(btn, "dblclick", 
            OpenLayers.Function.bindAsEventListener(this.onButtonClick, btn));
        OpenLayers.Event.observe(btn, "click", 
            OpenLayers.Function.bindAsEventListener(this.onButtonClick, btn));
        btn.action = id;
        btn.map = this.map;
    
        if(!this.slideRatio){
            var slideFactorPixels = this.slideFactor;
            var getSlideFactor = function() {
                return slideFactorPixels;
            };
        } else {
            var slideRatio = this.slideRatio;
            var getSlideFactor = function(dim) {
                return this.map.getSize()[dim] * slideRatio;
            };
        }

        btn.getSlideFactor = getSlideFactor;

        //we want to remember/reference the outer div
        this.buttons.push(btn);
        return btn;
    },
    _addZoomBar:function(centered) {
        var imgLocation = OpenLayers.Util.getImagesLocation();
        
        var id = this.id + "_" + this.map.id;
        var zoomsToEnd = this.map.getNumZoomLevels() - 1 - this.map.getZoom();
//        var slider = OpenLayers.Util.createAlphaImageDiv(id,
//                       centered.add(-1, zoomsToEnd * this.zoomStopHeight), 
//                       new OpenLayers.Size(13,6),
//                       imgLocation+"slider1.png",
//                       "absolute");
//        centered.add(-1, zoomsToEnd * this.zoomStopHeight);
//        var tempCentered = centered.add(-1, zoomsToEnd * this.zoomStopHeight);
        var slider = document.createElement("div");
        slider.style.height = "6px";
        slider.style.width = "13px";
        slider.style.top = (centered.y+zoomsToEnd * this.zoomStopHeight)+"px";
        slider.style.background = "url("+imgLocation+"zoombarmini.png)";
        slider.style.backgroundRepeat = "no-repeat";
        slider.style.backgroundPosition = "-85px -15px";
        slider.style.position = "absolute"
        slider.style.cursor = "move";
        slider.style.left = "22px"; //设置左边距
        this.slider = slider;
        this.sliderEvents = new OpenLayers.Events(this, slider, null, true,
                                            {includeXY: true});
        this.sliderEvents.on({
            "touchstart": this.zoomBarDown,
            "touchmove": this.zoomBarDrag,
            "touchend": this.zoomBarUp,
            "mousedown": this.zoomBarDown,
            "mousemove": this.zoomBarDrag,
            "mouseup": this.zoomBarUp,
            "dblclick": this.doubleClick,
            "click": this.doubleClick,
            "mouseout":this.mouseOut
        });
        
        var sz = new OpenLayers.Size();
        sz.h = this.zoomStopHeight * this.map.getNumZoomLevels();
        sz.w = this.zoomStopWidth;
        var div = null;
        
        if (OpenLayers.Util.alphaHack()) {
            var id = this.id + "_" + this.map.id;
//            div = OpenLayers.Util.createAlphaImageDiv(id, centered,
//                                      new OpenLayers.Size(sz.w, 
//                                              this.zoomStopHeight),
//                                      imgLocation + "zoombar1.png", 
//                                      "absolute", null, "crop");
            div = document.createElement("div");
            div.id = id;
            div.style.top = centered.y+"px";
            div.style.left = centered.x+"px";
            div.style.width = sz.w+"px";
            div.style.height = this.zoomStopHeight+"px";
            div.style.background = "url("+imgLocation+"zoombarmini.png)";
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundPosition = "0px -87px";
            div.style.position = "absolute"
            div.style.height = sz.h + "px";
        } else {
//            div = OpenLayers.Util.createDiv(
//                        'OpenLayers_Control_PanZoomBar_Zoombar' + this.map.id,
//                        centered,
//                        sz,
//                        imgLocation+"zoombar1.png");
        	div = document.createElement("div");
        	div.id = 'OpenLayers_Control_PanZoomBar_Zoombar' + this.map.id;
        	div.style.position = "absolute"
        	div.style.top = centered.y+"px";
        	div.style.width = sz.w+"px";
        	div.style.height = sz.h+"px";
        	div.style.background = "url("+imgLocation+"zoombarmini.png)";
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundPosition = "0px -87px";
        }
        div.style.cursor = "pointer";
        div.style.left = "14px";  //设置左边距
        this.zoombarDiv = div;
        
        this.divEvents = new OpenLayers.Events(this, div, null, true, 
                                                {includeXY: true});
        this.divEvents.on({
            "touchmove": this.passEventToSlider,
            "mousedown": this.divClick,
            "mousemove": this.passEventToSlider,
            "dblclick": this.doubleClick,
            "click": this.doubleClick,
            "mouseout":this.mouseOut
        });
        
        this.div.appendChild(div);

        this.startTop = parseInt(div.style.top);
        this.div.appendChild(slider);

        this.map.events.register("zoomend", this, this.moveZoomBar);

        centered = centered.add(0, 
            this.zoomStopHeight * this.map.getNumZoomLevels());
        return centered; 
    },
    _removeZoomBar: function() {
        this.sliderEvents.un({
            "touchmove": this.zoomBarDrag,
            "mousedown": this.zoomBarDown,
            "mousemove": this.zoomBarDrag,
            "mouseup": this.zoomBarUp,
            "dblclick": this.doubleClick,
            "click": this.doubleClick,
            "mouseout":this.mouseOut
        });
        this.sliderEvents.destroy();

        this.divEvents.un({
            "touchmove": this.passEventToSlider,
            "mousedown": this.divClick,
            "mousemove": this.passEventToSlider,
            "dblclick": this.doubleClick,
            "click": this.doubleClick,
            "mouseout":this.mouseOut
        });
        this.divEvents.destroy();
        
        this.div.removeChild(this.zoombarDiv);
        this.zoombarDiv = null;
        this.div.removeChild(this.slider);
        this.slider = null;
        
        this.map.events.unregister("zoomend", this, this.moveZoomBar);
    },
    passEventToSlider:function(evt) {
    	
    	var offsets = OpenLayers.Util.pagePosition(this.zoombarDiv);
        if ((evt.clientY - offsets[1]) > 0 && 
            (evt.clientY - offsets[1]) < parseInt(this.zoombarDiv.style.height) - 2) {
            var newTop = parseInt(this.zoombarDiv.style.top)+ evt.xy.y;
            var levels = evt.xy.y / this.zoomStopHeight;
            if(this.forceFixedZoomLevel || !this.map.fractionalZoom) {
                levels = Math.floor(levels);
            }    
            var zoom = (this.map.getNumZoomLevels() - 1) - levels; 
            zoom = Math.min(Math.max(zoom, 0), this.map.getNumZoomLevels() - 1);
        	var fixZoom = this.map.getZoom();
            var fixTop = 
            	((this.map.getNumZoomLevels()-1) - fixZoom) * 
                this.zoomStopHeight + newTop + 1;
            var imgLocation = OpenLayers.Util.getImagesLocation();
            var toolTipTop = fixTop;
    		this.rightTips.style.top = (newTop-4) + "px";
    		this.rightTips.style.backgroundPosition = this.leftTooltipPositionAry[parseInt(zoom)+1];
//    		var img = this.rightTips.childNodes[0];
//    		img.src = imgLocation+"panzoombar_blue/zoom"+(parseInt(zoom)+1)+".png";
        }
    	
    	
    	
        this.sliderEvents.handleBrowserEvent(evt);
    },
    divClick: function (evt) {
        if (!OpenLayers.Event.isLeftClick(evt)) {
            return;
        }
        var levels = evt.xy.y / this.zoomStopHeight;
        if(this.forceFixedZoomLevel || !this.map.fractionalZoom) {
            levels = Math.floor(levels);
        }    
        var zoom = (this.map.getNumZoomLevels() - 1) - levels; 
        zoom = Math.min(Math.max(zoom, 0), this.map.getNumZoomLevels() - 1);
        this.map.zoomTo(zoom);
        OpenLayers.Event.stop(evt);
    },
    zoomBarDown:function(evt) {
        if (!OpenLayers.Event.isLeftClick(evt) && !OpenLayers.Event.isSingleTouch(evt)) {
            return;
        }
        this.map.events.on({
            "touchmove": this.passEventToSlider,
            "mousemove": this.passEventToSlider,
            "mouseup": this.passEventToSlider,
            "mouseout":this.mouseOut,
            scope: this
        });
        this.mouseDragStart = evt.xy.clone();
        this.zoomStart = evt.xy.clone();
        this.div.style.cursor = "move";
        // reset the div offsets just in case the div moved
        this.zoombarDiv.offsets = null; 
        OpenLayers.Event.stop(evt);
    },
    zoomBarDrag:function(evt) {
    	
    	 OpenLayers.Control.TDTPanZoomBar.isVisible = true;
    	 this.rightTips.style.display = "";
    	 
    	var leftTips = this.leftTops.length;
    	for(var i=0;i<leftTips;i++){
    		this.leftTops[i].style.display = "block";
    	}
    	
        if (this.mouseDragStart != null) {
            var deltaY = this.mouseDragStart.y - evt.xy.y;
            var offsets = OpenLayers.Util.pagePosition(this.zoombarDiv);
            if ((evt.clientY - offsets[1]) > 0 && 
                (evt.clientY - offsets[1]) < parseInt(this.zoombarDiv.style.height) - 2) {
                var newTop = parseInt(this.slider.style.top) - deltaY;
                this.slider.style.top = newTop+"px";
                this.mouseDragStart = evt.xy.clone();
            }
            // set cumulative displacement
            this.deltaY = this.zoomStart.y - evt.xy.y;
            OpenLayers.Event.stop(evt);
        }
    },
    zoomBarUp:function(evt) {
        if (!OpenLayers.Event.isLeftClick(evt) && evt.type !== "touchend") {
            return;
        }
        if (this.mouseDragStart) {
            this.div.style.cursor="";
            this.map.events.un({
                "touchmove": this.passEventToSlider,
                "mouseup": this.passEventToSlider,
                "mousemove": this.passEventToSlider,
                scope: this
            });
            var zoomLevel = this.map.zoom;
            if (!this.forceFixedZoomLevel && this.map.fractionalZoom) {
                zoomLevel += this.deltaY/this.zoomStopHeight;
                zoomLevel = Math.min(Math.max(zoomLevel, 0), 
                                     this.map.getNumZoomLevels() - 1);
            } else {
                zoomLevel += this.deltaY/this.zoomStopHeight;
                zoomLevel = Math.max(Math.round(zoomLevel), 0);      
            }
            this.map.zoomTo(zoomLevel);
            this.mouseDragStart = null;
            this.zoomStart = null;
            this.deltaY = 0;
            OpenLayers.Event.stop(evt);
        }
    },
    moveZoomBar:function() {
        var newTop = 
            ((this.map.getNumZoomLevels()-1) - this.map.getZoom()) * 
            this.zoomStopHeight + this.startTop + 1;
        this.slider.style.top = newTop + "px";
    },
    
    /**
     * Method: getDataExtent
     * 计算当前分辨率相对于金字塔的级别数
     */
    getCurrentZoomNum: function(){
    	var topTileSize = this.map.pyramid.getTopTileSize();
        var pyramidMaxResolution = (topTileSize.w / this.map.pyramid.tileSize.w) /  
		                            Math.pow(2, this.map.pyramid.topLevelIndex);

        var fixZoom = this.getCurrentZoomNumFromResolution(pyramidMaxResolution,this.map.getResolution());
        return fixZoom;
    },
    CLASS_NAME: "TDTPanZoomBar"
});
OpenLayers.Control.PanZoom.prototype.onButtonClick = function(evt){
	var btn = evt.buttonElement || evt.currentTarget;
	if(!btn){
		btn = evt.srcElement;
		if(btn.id.indexOf("panleft")>-1){
			btn.action = "panleft";
		}else if(btn.id.indexOf("panright")>-1){
			btn.action = "panright";
		}else if(btn.id.indexOf("panup")>-1){
			btn.action = "panup";
		}else if(btn.id.indexOf("pandown")>-1){
			btn.action = "pandown";
		}else if(btn.id.indexOf("zoomin")>-1){
			btn.action = "zoomin";
		}else if(btn.id.indexOf("zoomout")>-1){
			btn.action = "zoomout";
		}else if(btn.id.indexOf("zoomworld")>-1){
			btn.action = "zoomworld";
		}
	}
    switch (btn.action) {
        case "panup": 
            this.map.pan(0, -this.getSlideFactor("h"));
            break;
        case "pandown": 
            this.map.pan(0, this.getSlideFactor("h"));
            break;
        case "panleft": 
            this.map.pan(-this.getSlideFactor("w"), 0);
            break;
        case "panright": 
            this.map.pan(this.getSlideFactor("w"), 0);
            break;
        case "zoomin": 
            this.map.zoomIn(); 
            break;
        case "zoomout": 
            this.map.zoomOut(); 
            break;
        case "zoomworld": 
            this.map.zoomToMaxExtent(); 
            break;
    }
}