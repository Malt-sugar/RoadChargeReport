$(document).ready(function(){
	layout();
});

function layout(){
	var nowY = new Date().getFullYear()+1;
	queryXstb(function(nx,cd){
		if(nx.length==0){
			$("#content").show();
			$("#tag").hide();
			queryHistoryParams(nowY,3);
			$("#param_title").text(nowY+"年 预算 调整系数设定");
			$("#saveBtn").click(submitHandler);
			$("#cancelBtn").click(cancelHandler);
		}
		else{
			$("#content").hide();
			$("#tag").text(nowY+"年预算调整系数已经填报过！");
			$("#tag").show();
		}
	},nowY);
	
}





function getXsData(nx,cd){
	var s = new Array();
	for(var i=0;i<nx.length;i++){
		var a12 = {id:nx[i].A12.split("_")[0],value:nx[i].A12.split("_")[1]};
		var a35 = {id:nx[i].A12.split("_")[0],value:nx[i].A35.split("_")[1]};
		var a68 = {id:nx[i].A12.split("_")[0],value:nx[i].A68.split("_")[1]};
		var a9 = {id:nx[i].A12.split("_")[0],value:nx[i].A9.split("_")[1]};
		
		
		var b1 = {id:nx[i].B1.split("_")[0],value:nx[i].B1.split("_")[1]};
		var b13 = {id:nx[i].B13.split("_")[0],value:nx[i].B13.split("_")[1]};
		var b3 = {id:nx[i].B3.split("_")[0],value:nx[i].B3.split("_")[1]};
		
		var d_nx = {A12:a12,A35:a35,A68:a68,A9:a9};
		var d_cd = {B1:b1,B13:b13,B3:b3};
		s.push({nx:d_nx,cd:d_cd}) ;
	}
	return s;
}


// 查询历史系数信息
function queryHistoryParams(year,limit){
	queryXstb(function(xs_nx,xs_cd){
		var html = "";
		
		for(var i=0;i<xs_nx.length;i++){
			var y12 = xs_nx[i].A12.split("_")[0];
			var y35 = xs_nx[i].A35.split("_")[0];
			var y68 = xs_nx[i].A68.split("_")[0];
			var y9 =  xs_nx[i].A9.split("_")[0];
			html = "<tr>"+
			"<td>"+xs_nx[i].YSNF+"</td>" +
			"<td>"+y12+"</td>" +
			"<td>"+y35+"</td>" +
			"<td>"+y68+"</td>" +
			"<td>"+y9+"</td>" +
			"</tr>";
			$("#param_nx_history_list").append(html);
		}
		for(var j=0;j<xs_cd.length;j++){
			var sd1 = xs_cd[j].B1.split("_")[0];
			var sd13 = xs_cd[j].B13.split("_")[0];
			var sd3 = xs_cd[j].B3.split("_")[0];
			html = "<tr>"+
			"<td>"+xs_cd[j].YSNF+"</td>" +
			"<td>"+sd1+"</td>" +
			"<td>"+sd13+"</td>" +
			"<td>"+sd3+"</td>" +
			"</tr>";
			$("#param_sd_history_list").append(html);
		}	
	},null,limit);
}




function submitHandler(){
	var vos = getParamValues();
	if(vos){
		insertXstb(vos,function(){
			alert("填报成功");
		});
	}
}

function cancelHandler(){
	$("#table_nx").find("input[type='text']").val("");
	$("#table_sd").find("input[type='text']").val("");
}


function getParamValues(){
	var flag = true;
	var inputs_nx = $("#table_nx").find("input[type='text']");
	var tbsj = getDateString(new Date());
	var ysnf = new Date().getFullYear()+1;
	
	var vos = [];
	for(var i=0;i<inputs_nx.length;i++){
		var s = inputs_nx[i];
		var item = {
		xs_nx:$(s).attr("vl"),
		xs:$(s).val(),
		xs_spzt:0, // 0 未审核  1  审核
		yxzt:0,  // 0 不可用 1  可用
		tbsj:tbsj,
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
				xs_spzt:0, // 0 未审核  1  审核
				yxzt:0,  // 0 不可用 1  可用
				tbsj:tbsj,
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
	return vos;
}
