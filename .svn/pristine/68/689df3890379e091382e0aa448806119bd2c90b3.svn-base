
$(document).ready(function(){
	layout();
});

function layout(){
	var nowY = new Date().getFullYear()+1;
	queryXstb(function(nx,cd){
		if(nx.length==0){
			$("#content").hide();
			$("#tag").text(nowY+"年预算调整系数尚未填报！");
			$("#tag").show();
		}
		else if(nx.length==1 && nx[0].YXZT==1){
			$("#content").hide();
			$("#tag").text(nowY+"年预算调整系数已经通过审核！");
			$("#tag").show();
		}
		else if(nx.length==1 && nx[0].YXZT==0){
			
			$("#content").show();
			$("#tag").hide();
			queryReportedParams(nowY);
			$("#param_title").text(nowY+"年 预算 调整系数审批");
			$("#saveBtn").click(saveBtnHandler);
			$("#cancelBtn").click(cancelHandler);
		}
	},nowY);
	
}



// 查询今年已填报的系数
function queryReportedParams(year){
	queryXstb(function(xs_nx,xs_cd){
		var y12 = xs_nx[0].A12.split("_")[0];
		var y12_id = xs_nx[0].A12.split("_")[1];
		var y35 = xs_nx[0].A35.split("_")[0];
		var y35_id = xs_nx[0].A35.split("_")[1];
		var y68 = xs_nx[0].A68.split("_")[0];
		var y68_id = xs_nx[0].A68.split("_")[1];
		var y9 =  xs_nx[0].A9.split("_")[0];
		var y9_id = xs_nx[0].A9.split("_")[1];
		
		var sd1 = xs_cd[0].B1.split("_")[0];
		var sd1_id = xs_cd[0].B1.split("_")[1];
		var sd13 = xs_cd[0].B13.split("_")[0];
		var sd13_id = xs_cd[0].B13.split("_")[1];
		var sd3 = xs_cd[0].B3.split("_")[0];
		var sd3_id = xs_cd[0].B3.split("_")[1];
		
		$("#year12").val(y12);
		$("#year12").attr("yid",y12_id);
		$("#year35").val(y35);
		$("#year35").attr("yid",y35_id);
		$("#year68").val(y68);
		$("#year68").attr("yid",y68_id);
		$("#year9").val(y9);
		$("#year9").attr("yid",y9_id);
		
		$("#sd1").val(sd1);
		$("#sd1").attr("yid",sd1_id);
		$("#sd13").val(sd13);
		$("#sd13").attr("yid",sd13_id);
		$("#sd3").val(sd3);
		$("#sd3").attr("yid",sd3_id);
		
		// 保存初始填写的系数
		$("#year12").attr("ovalue",y12);
		$("#year35").attr("ovalue",y35);
		$("#year68").attr("ovalue",y68);
		$("#year9").attr("ovalue",y9);
		
		$("#sd1").attr("ovalue",sd1);
		$("#sd13").attr("ovalue",sd13);
		$("#sd3").attr("ovalue",sd3);
		
		$("#saveBtn").attr("ysnf",xs_nx[0].YSNF);
		$("#saveBtn").attr("tbsj",xs_nx[0].TBSJ);
		
	},year);
}


function saveBtnHandler(){
	checkParams();
	
}

function cancelHandler(){
	var info = $("#checkInfo").val();
	if(info==null || info==""){
		alert("请在审批意见栏中填写驳回理由！");
	}
	else{
		cancelParams();
	}
	
}

// 对已填报的系数进行审核
function checkParams(){
	var params = getParamValues();
	xtsp(params,function(){
		alert("调整系数审核通过!");
		var url = rootPath+"/app/param_query.jsp";
		$(window.parent.document).find(".content-right-panel-iframe").attr("src",url);
	});
}


// 驳回填报的系数
function cancelParams(){
	var params = getReportedParams();
	xtsp(params,function(){
		var url = rootPath+"/app/param_query.jsp";
		$(window.parent.document).find(".content-right-panel-iframe").attr("src",url);
	});
	
}


// 审核时获取系数及审批意见信息
function getParamValues(){
	var flag = true;
	var inputs_nx = $("#table_nx").find("input[type='text']");
	var ysnf = $("#saveBtn").attr("ysnf");
	var tbsj = $("#saveBtn").attr("tbsj");
	var vos = [];
	for(var i=0;i<inputs_nx.length;i++){
		var s = inputs_nx[i];
		var item = {
		xs_nx:$(s).attr("vl"),
		xs:$(s).val(),
		xs_id:$(s).attr("yid"),
		xs_spzt:1, // 0 未审核  1 通过审核
		yxzt:1,
		tbsj:tbsj,
		spsj:getDateString(new Date()),
		ysnf:ysnf
		};
		var itemValue = $(s).val();
		if(itemValue==null || itemValue==""){
			flag = false;
			vos = null;
			alert("使用年限调整系数不能为空！");
			return vos;
		}
		else{
			vos.push(item);	
		}
	}
	var inputs_sd = $("#table_sd").find("input[type='text']");
	for(var j=0;j<inputs_sd.length;j++){
		var item = {
				xs_cd:$(inputs_sd[j]).attr("vl"),
				xs:$(inputs_sd[j]).val(),
				cd_id:$(inputs_sd[j]).attr("yid"),
				xs_spzt:1,
				yxzt:1,
				tbsj:tbsj,
				spsj:getDateString(new Date()),
				ysnf:ysnf
		};
		var itemValue = $(inputs_sd[j]).val();
		if(itemValue==null || itemValue==""){
			flag = false;
			vos = null;
			alert("隧道监控设施调整系数不能为空！");
			return vos;
		}
		else{
			vos.push(item);	
		}
	}
	var checkInfo = {
			spnf:ysnf,
			sp_yj:$("#checkInfo").val()
	};
	vos.push(checkInfo);
	return vos;
}


//驳回时获取填报的系数及审批意见信息
function getReportedParams(){
	var flag = true;
	var inputs_nx = $("#table_nx").find("input[type='text']");
	var ysnf = $("#saveBtn").attr("ysnf");
	var tbsj = $("#saveBtn").attr("tbsj");
	var vos = [];
	for(var i=0;i<inputs_nx.length;i++){
		var s = inputs_nx[i];
		var item = {
		xs_nx:$(s).attr("vl"),
		xs:$(s).attr("ovalue"),
		xs_id:$(s).attr("yid"),
		xs_spzt:0, // 0 未审核  1 通过审核
		yxzt:0,
		tbsj:tbsj,
		spsj:getDateString(new Date()),
		ysnf:ysnf
		};
		var itemValue = $(s).val();
		if(itemValue==null || itemValue==""){
			flag = false;
			vos = null;
			alert("使用年限调整系数不能为空！");
			return vos;
		}
		else{
			vos.push(item);	
		}
	}
	var inputs_sd = $("#table_sd").find("input[type='text']");
	for(var j=0;j<inputs_sd.length;j++){
		var item = {
				xs_cd:$(inputs_sd[j]).attr("vl"),
				xs:$(inputs_sd[j]).attr("ovalue"),
				cd_id:$(inputs_sd[j]).attr("yid"),
				xs_spzt:0,
				yxzt:0,
				tbsj:tbsj,
				spsj:getDateString(new Date()),
				ysnf:ysnf
		};
		var itemValue = $(inputs_sd[j]).val();
		if(itemValue==null || itemValue==""){
			flag = false;
			vos = null;
			alert("隧道监控设施调整系数不能为空！");
			return vos;
		}
		else{
			vos.push(item);	
		}
	}
	var checkInfo = {
			spnf:ysnf,
			sp_yj:$("#checkInfo").val()
	};
	vos.push(checkInfo);
	return vos;
}