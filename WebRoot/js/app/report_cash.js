
// 收费系统
var cashsystem = [];
// 通信系统
var infosystem = [];
// 监控系统
var monitorsystem = [];
// 供配电与照明系统
var powersystem = [];	
// 隧道系统
var tunnelsystem = [];			
		
var systems = [];

// 清空上一次初始化的内容
function emptySystemsContent(){
	$("#systems_content").empty();
	cashsystem = [];
	infosystem = [];
	monitorsystem = [];
	powersystem = [];
	tunnelsystem = [];
	systems = [];
}


function createInitComponents(update_flag,result,completeHandler){
	emptySystemsContent();
	for(var i=0;i<result.length;i++){
		var xtid = result[i].SF_ST_ID;
		var xmid = result[i].SF_XM_ID;
		var xmmc = result[i].SF_XM_NAME;
		var unit = result[i].DW.replace("/","");
		var trsj = result[i].TR_YXSJ;
		var gzsj = result[i].GZ_TIME;
		result[i].name = xmmc;
		result[i].unit = unit;
		result[i].id = xmid;
		if(trsj!=null && trsj!=undefined){
			result[i].trsj = trsj.substring(0,4);
		}
		else result[i].trsj = trsj;
		result[i].gzsj = gzsj;
		if(xtid == 1){
			cashsystem.push(result[i]);
		}
		else if(xtid == 2){
			infosystem.push(result[i]);
		}
		else if(xtid == 3){
			monitorsystem.push(result[i]);
		}
		else if(xtid == 4){
			powersystem.push(result[i]);
		}
		else if(xtid == 5){
			tunnelsystem.push(result[i]);
		}
	}
	
	systems = [
	           {data:cashsystem,id:"cashsystem",name:"收费系统"},
	           {data:infosystem,id:"infosystem",name:"通信系统"},
	           {data:monitorsystem,id:"monitorsystem",name:"监控系统"},
	           {data:powersystem,id:"powersystem",name:"供配电与照明系统"},
	           {data:tunnelsystem,id:"tunnelsystem",name:"隧道系统"}
   ];
	
	var html = createSystemHtml(systems);
	$("#systems_content").append(html);
	
	for(var i=0;i<systems.length;i++){
		for(var j=0;j<systems[i].data.length;j++){
			var item = systems[i].data[j];
			if(!$("#"+item.id+"_runing_time").is("label")){
				$("#"+item.id+"_runing_time").attr("class","Wdate")
				.focus(function(){
					WdatePicker({
						lang:'zh-cn',
						dateFmt:'yyyy',
						maxDate:new Date().getFullYear()+1,
						onpicked:function(dp){
							var date = dp.cal.newdate;
							var year = date.y;
							var now = new Date().getFullYear();
							var years = now - year;
							if(years<0){
								alert("投入运行时间大于当前时间，请重新选择！");
								return;
							}
							var id = $(this).attr("id");
							var inputId = id.replace("_runing_time","_runing_years");
							$("#"+inputId).val(years);
						}
							
					});
				
				});
			}

			// 改造时间
			$("#"+item.id+"_rebuild_time").attr("class","Wdate")
			.focus(function(){
				var id = $(this).attr("id");
				var runId = id.replace("_rebuild_time","_runing_time");
				var runYear = $("#"+runId).val();
				WdatePicker({
					lang:'zh-cn',
					dateFmt:'yyyy',
					minDate:runYear,
					maxDate:new Date().getFullYear()+1,
					onpicked:function(dp){
						var date = dp.cal.newdate;
						var year = date.y;
						var now = new Date().getFullYear();
						var years = now - year;
						if(years<0){
							alert("改造时间大于当前时间，请重新选择！");
							return;
						}
						var id = $(this).attr("id");
						var inputId = id.replace("_rebuild_time","_runing_years");
						$("#"+inputId).val(years);
					}
						
				});
			
			});			
		}
	}
	
	$(".bar-button").show();
	if(update_flag ==0){
		$("#holdsaveBtn").hide();
	}
	$("#holdsaveBtn").click(saveOrCreate);
	$("#saveBtn").click(saveOrCreate);
	$("#saveAndCreateBtn").click(saveOrCreate);
	$("#cancelBtn").click(closeChangeReport);
	// 初始化完成调用
	if(completeHandler){
		completeHandler();
	}
}


function createChargeMileageHTML(item,systemid){
	var html = "";
	if(item!==null && item!==undefined){
		html = "<div id='"+item.id+"' class='panel-item-content-row'>" +
		"<label class='panel-item-content-row-name'>"+item.name+"</label>"+
		//"<label>基价：</label><label id='"+item.id+"_baseline'>"+item.baseprice+"</label><span>万元</span>" +
		"<label>起点桩号：</label> K <input type='text' id='"+item.id+"_start_k' class='input-short'/> + <input type='text' id='"+item.id+"_start_ke' class='input-short'/>" +
		"<label>终点桩号：</label> K <input type='text' id='"+item.id+"_end_k' class='input-short'/> + <input type='text' id='"+item.id+"_end_ke' class='input-short'/>" +
		"<label>维护里程：</label><input type='text' id='"+item.id+"_mileage' class='input-common'/><span>"+item.unit+"</span>" ;
		if(systemid=="powersystem" || item.name=="隧道照明设施"){
			html += "";
		}
		else{
			html += "<div><label>投入运行时间</label>";
			if(item.trsj!=null){
				html += ("<label id='"+item.id+"_runing_time'>"+item.trsj+"</label>");
			}
			else{
				html += ("<input type='text' id='"+item.id+"_runing_time'/>");
			} 
			html += " 年";
			html +=	("<label>改造时间</label><input type='text' id='"+item.id+"_rebuild_time'/> 年" +
					"<label>年限</label><input type='text' id='"+item.id+"_runing_years'  disabled='true' class='input-short'/><span>年</span>");
		}
		 html += (
		"<label>备注:</label><input type='text' id='"+item.id+"_remark' class='input-common'>" +
		"</div>" +
		"</div>");	
	}

	return html;
}


function createFacilityHTML(item,systemid){
	var html = "";
	if(item!==null && item!==undefined){
		html = "<div id='"+item.id+"' class='panel-item-content-row'>" +
		"<label class='panel-item-content-row-name'>"+item.name+"</label><input type='text' id='"+item.id+"_count' class='input-short'/><span>"+item.unit+"</span>" ;
		//"<label>基价：</label><label id='"+item.id+"_baseline'>"+item.baseprice+"</label><span>万元</span>" +
		if(systemid=="powersystem" || item.name=="隧道照明设施"){
			html += "";
		}
		else{
			html += "<label>投入运行时间</label>";
			if(item.trsj!=null){
				html += ("<label id='"+item.id+"_runing_time'>"+item.trsj+"</label>");
			}
			else{
				html += ("<input type='text' id='"+item.id+"_runing_time'/>");
			} 
			html += " 年";
			html +=	("<label>改造时间</label><input type='text' id='"+item.id+"_rebuild_time'/> 年" +
					"<label>年限</label><input type='text' id='"+item.id+"_runing_years' disabled='true' class='input-short'/><span>年</span>");
		}
		 html += ("<label>备注:</label><input type='text' id='"+item.id+"_remark' class='input-common'>" +
		"</div>");	
	}
	return html;
}

function createSystemHtml(systems){
	var html = "";
	for(var i=0;i<systems.length;i++){
		html += "<div class='panel-item'>"+
		"<div class='panel-item-title'>"+systems[i].name+"</div>" +
		"<div class='panel-item-content'>"+
		"<div id='"+systems[i].id+"'>";
		
		for(var j=0;j<systems[i].data.length;j++){
			var item = systems[i].data[j];
			var unit = item.unit;
			if(unit=="KM" || unit=="km"){
				html += createChargeMileageHTML(item,systems[i].id);
			}
			else{
				html += createFacilityHTML(item,systems[i].id);
			}
		}
		html += "</div>" +
		"</div>" +
		"</div>";
	}
	return html;
}


function roadSelectedHandler(item){
	var index = $(this)[0].selectedIndex;
	var id= $(this).attr("id");
	var ldmc = $(this).val();
	if(index!=0){
		getExpenseBudgetCountByParams(ldmc,function(result){
			// 该路段是否已经上报过
			if(result==0){
				selectSfxmByLd(ldmc,function(result){
					createInitComponents(null,result);
				});
			}
			else{
				var flag = confirm(ldmc+" 已经填报过，是否查看或修改？");
				if(flag){
					var url = rootPath+"/app/cash_query.jsp";
					$(window.parent.document).find(".content-right-panel-iframe").attr("src",url);
				}
				else{
					var url = rootPath+"/app/cash_report.jsp";
					$(window.parent.document).find(".content-right-panel-iframe").attr("src",url);
				}
			}
		});
	}
}



function saveOrCreate(){
	var id = $(this).attr("id");
	var update_flag = 0;
	if(id=="holdsaveBtn"){
		update_flag = 1;
	}
	else update_flag =0;
	var vos = getReportData(update_flag);
	if(vos.update.length==0 && vos.insert.length==0){
		alert("尚未填写预算信息！");
		return;
	}
	switch(id){
	case "holdsaveBtn":
	{
		if(vos.deleteOperate.length>0){
			deleteReportRows(vos.deleteOperate,function(){
				if(vos.insert.length>0){
					insertReportData(vos.insert,function(){
						if(vos.update.length>0){
							updateReportData(vos.update,function(){
								alert("填报内容已暂存！");
								window.location = rootPath+"/app/cash_query.jsp";
							});
						}
						else{
							alert("填报内容已暂存！");
							window.location = rootPath+"/app/cash_query.jsp";
						}
					});
				}
				else{
					updateReportData(vos.update,function(){
						alert("填报内容已暂存！");
						window.location = rootPath+"/app/cash_query.jsp";
					});
				}
			})
		}
		else{
			if(vos.insert.length>0){
				insertReportData(vos.insert,function(){
					if(vos.update.length>0){
						updateReportData(vos.update,function(){
							alert("填报内容已暂存！");
							window.location = rootPath+"/app/cash_query.jsp";
						});
					}
					else{
						alert("填报内容已暂存！");
						window.location = rootPath+"/app/cash_query.jsp";
					}
				});
			}
			else{
				updateReportData(vos.update,function(){
					alert("填报内容已暂存！");
					window.location = rootPath+"/app/cash_query.jsp";
				});
			}
		}
		break;
	}
	case "saveBtn":
	case "saveAndCreateBtn":
	{
		if(vos.deleteOperate.length>0){
			deleteReportRows(vos.deleteOperate,function(){
				if(vos.insert.length>0){
					insertReportData(vos.insert,function(){
						if(vos.update.length>0){
							updateReportData(vos.update,function(){
								alert("保存成功！");
								window.location = rootPath+"/app/cash_query.jsp";
							});
						}
						else{
							alert("保存成功！");
							window.location = rootPath+"/app/cash_query.jsp";
						}
					});
				}
				else{
					updateReportData(vos.update,function(){
						alert("保存成功！");
						window.location = rootPath+"/app/cash_query.jsp";
					});
				}
			});
		}
		else{
			if(vos.insert.length>0){
				insertReportData(vos.insert,function(){
					if(vos.update.length>0){
						updateReportData(vos.update,function(){
							alert("保存成功！");
							window.location = rootPath+"/app/cash_query.jsp";
						});
					}
					else{
						alert("保存成功！");
						window.location = rootPath+"/app/cash_query.jsp";
					}
				});
			}
			else{
				updateReportData(vos.update,function(){
					alert("保存成功！");
					window.location = rootPath+"/app/cash_query.jsp";
				});
			}
		}
		break;
	}
	}
		
}

function closeChangeReport(){
	window.location = rootPath+"/app/cash_report.jsp";
}

// 保存时组装 填报数据
function getReportData(update_flag){
	var ldmc = $("#fm_ldmc").val();
	if(ldmc==undefined || ldmc==null || ldmc==""){
		ldmc = $("#update_ldmc").text();
	}
	var insertVos = [];
	var updateVos = [];
	var deleteIds = [];
	var operateStatus = $("#report_content").attr("operateStatus");
	for(var i=0;i<systems.length;i++){
		var system = systems[i];
		for(var j=0;j<system.data.length;j++){
			var item = system.data[j];
			var unit = item.unit;
			var vo = new BudgetVo();
			vo.ld = ldmc;
			vo.xtmc = system.name;
			vo.xmmc = item.name;
			vo.update_flag = update_flag;
			vo.beizhu = $("#"+item.id+"_remark").val();
			vo.id = $("#"+item.id+"_remark").attr("idValue");
			if(unit=="KM" || unit=="km"){
				vo.wh_lc = $("#"+item.id+"_mileage").val();
				if(vo.wh_lc=="0" || vo.wh_lc=="" || vo.wh_lc==null || vo.wh_lc==undefined){
					if(vo.id){
						deleteIds.push(vo.id);
						continue;
					}
				}
				else{
					if(vo.id){
						updateVos.push(vo);
					}
					else{
						insertVos.push(vo);
					}
				}
				var sk = getValiNumber($("#"+item.id+"_start_k").val());
				var ske = getValiNumber($("#"+item.id+"_start_ke").val());
				var ek = getValiNumber($("#"+item.id+"_end_k").val());
				var eke = getValiNumber($("#"+item.id+"_end_ke").val());
				
				vo.qd_zh = (sk+ske*0.001);
				vo.zd_zh = (ek+eke*0.001);
				
			}
			else{
				vo.shuliang = $("#"+item.id+"_count").val();
				if(vo.shuliang=="0" || vo.shuliang=="" || vo.shuliang==null || vo.shuliang==undefined){
					if(vo.id){
						deleteIds.push(vo.id);
						continue;
					}
				}
				else{
					if(vo.id){
						updateVos.push(vo);
					}
					else{
						insertVos.push(vo);
					}
				}
			}
			
			// 投入运行时间
			if($("#"+item.id+"_runing_time").is("label")){
				vo.tr_yxsj = $("#"+item.id+"_runing_time").text();
			}
			else vo.tr_yxsj = $("#"+item.id+"_runing_time").val();
			var tempNx = $("#"+item.id+"_runing_years");
			if(tempNx.length>0){
				vo.nx = $("#"+item.id+"_runing_years").val();
			}
			// 改造时间
			var rebuildTime =  $("#"+item.id+"_rebuild_time").val();
			vo.gz_time = rebuildTime;
		}
	}
	// 当是新增时，所有数量或里程为空，表示没有填报。
	if(operateStatus=="0"){
		deleteIds = [];
	}
	return {"deleteOperate":deleteIds,"update":updateVos,"insert":insertVos};
}



function insertToReport(result){
	for(var i=0;i<systems.length;i++){
		var system = systems[i];
		for(var k=0;k<system.data.length;k++){
			var item = system.data[k];
			var unit = item.unit;
			var name = item.name;
			
			for(var j=0;j<result.length;j++){
				if(name == result[j].xmmc){
					var data = result[j];
					$("#"+item.id+"_remark").attr("idValue",data.id);
					$("#"+item.id+"_remark").val(data.beizhu);
					$("#"+item.id+"_count").val(data.shuliang);
					$("#"+item.id+"_mileage").val(data.wh_lc);
					if(data.qd_zh!=0){
						var t_s = getZhValues(data.qd_zh);
						$("#"+item.id+"_start_k").val(t_s.zh_k);
						$("#"+item.id+"_start_ke").val(t_s.zh_e);
						var t_e = getZhValues(data.zd_zh);
						$("#"+item.id+"_end_k").val(t_e.zh_k);
						$("#"+item.id+"_end_ke").val(t_e.zh_e);
					}
					// 如果投入运行时间是不可修改的
					if($("#"+item.id+"_runing_time").is("label")){
						$("#"+item.id+"_runing_time").text(data.tr_yxsj);
					}
					else $("#"+item.id+"_runing_time").val(data.tr_yxsj);
					
					$("#"+item.id+"_rebuild_time").val(data.gz_time);
					$("#"+item.id+"_runing_years").val(data.nx);
					break;
				}
			}
			
		}
	}
	
}






function getZhValues(value){
	value+="";
	if(value.indexOf(".")!=-1){
		var a = value.split(".")[0];
		var b = value.split(".")[1];
		return {"zh_k":a,"zh_e":b*100};
	}
	else{
		return {"zh_k":value};
	}
}


/** =====================================   VO  =========================================== **/
function BudgetVo(){
	var child = new Object();
	child.id;// id
	child.xtmc; //系统名称
	child.ld; // 路段名称
	child.xmmc; // 项目名称
	child.shuliang; // 数量
	child.qd_zh; // 	起点桩号
	child.zd_zh; // 终点桩号
	child.wh_lc; // 维护里程
	child.tr_yxsj; // 投入运行时间
	child.gz_time;
	child.nx; // 年限
	child.beizhu; // 备注
	child.update_flag; // 填报状态  0  完整  1 暂存
	return child;
}

