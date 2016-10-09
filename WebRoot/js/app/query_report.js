
$(document).ready(function(){
	// 审核状态 暂时隐藏  等待整个审核流程贯通
	$(".bar-checkbox").hide();
	createInitComponents();
});


function createInitComponents(){
	
	initListData();
	createDataGrid();
	$("#searchBtn").click(searchHandler);
	$("#export_excel").click(exportHandler);
}

function initListData(){
	// 初始化年份列表
	queryReportYears(function(yearlist){
		$("#years").append("<option value='0'>全部</option>");
		for(var j=0;j<yearlist.length;j++){
			$("#years").append("<option value='"+yearlist[j]+"'>"+yearlist[j]+"</option>");
		}
		$("#years")[0].selectedIndex = 1;
		var gid = $(window.parent.document).find("#top_user").attr("gid");
		var selectedYear = $("#years").find('option:selected').val();
		if(gid<=1){
			// 是管理员用户，查询全部公路局填报的信息
			queryGroupInfos(-1,function(result){
				for(var j=0;j<result.length;j++){
					$("#grouplist").append("<option value='"+result[j].groupid+"'>"+result[j].groupname+"</option>");
				}
				$("#grouplist")[0].selectedIndex = 0;
				$("#group_panel").show();
				var selectedGroupId = $("#grouplist").find('option:selected').val();
				queryStatisticHcetc(selectedGroupId,selectedYear,null,1,10,function(data,total,rows,pages){
					createDataGrid(data,total,rows,pages,gid);
				});
			});
		}
		else{
			queryStatisticHcetc(gid,selectedYear,null,1,10,function(data,total,rows,pages){
				createDataGrid(data,total,rows,pages,gid);
			});
		}
	});
}

function createDataGrid(temp,total,rows,pages,gid){
	$("#tt").datagrid({
		pagination:true,
		striped:true,
		singleSelect:true,
		fitColumns:true,
		displayMsg:"共{total}条记录",
		beforePageText:"第",
		afterPageText:"页  共{pages}页",
		columns:[[
		          {field:'NO',title:'',align:"center",
		        	  formatter:function(value,rowData,rowIndex){
		        	    rowIndex++;
		        	  	return rowIndex+"";
		          	  }
		          },
		          {field:'ID',title:'预算年度',align:"center"},
		          {field:'IP_ID',title:'仪表ID',align:"left"},
		          {field:'THE_LICENSE_PLATE',title:'车牌',align:"right",formatter:cashFormatHandler},
		          {field:'MODELS',title:'车型',align:"right",formatter:cashFormatHandler},
		          {field:'SELF_RESPECT',title:'自重',align:"right",formatter:cashFormatHandler},
		          {field:'SSDW',title:'所属单位',align:"right",formatter:cashFormatHandler},
		          {field:'TIME',title:'时间',align:"right",formatter:cashFormatHandler},
		          {field:'IP_NUMBER',title:'仪表编号',align:"left"},
		          {field:'SHAFT_TYPE',title:'轴型',align:"left"},
		          {field:'THE_VEHICLE_WEIGHT',title:'整车自重',align:"left"},
		          {field:'SPEED',title:'速度',align:"left"},
		          {field:'LONGITUDE',title:'经度',align:"left"},
		          {field:'LATITUDE',title:'纬度',align:"left"}	          	                   		          		          		          		          	    		          
		]]
		
	});
	// 设置分页控件
	var p = $('#tt').datagrid('getPager'); 
    $(p).pagination({ 
        pageSize: 10,//每页显示的记录条数，默认为10 
        pageList: [5,10,15],//可以设置每页记录条数的列表 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录', 
        /*onBeforeRefresh:function(){
            $(this).pagination('loading');
            alert('before refresh');
            $(this).pagination('loaded');
        }*/ 
    }); 
    if(temp==null || temp.length==0){
    	return;
    }
	$("#tt").datagrid('loadData',temp);
	
}

function cashFormatHandler(value,rowData,rowIndex){
	var s = getValiNumber(value);
	return s.toFixed(2);
}

function checkboxHandler(){
	var id=$(this).attr("id");
	var checked = $(this).attr("checked");
	switch(id){
	case "checkbox_all":
	{
		if(checked){
			$(".bar-checkbox input[type='checkbox']").attr("checked","checked");
		}
		else{
			$(".bar-checkbox input[type='checkbox']").attr("checked",null);
		}
		break;
	};
	default:
	{
		if(!checked){
			$("#checkbox_all").attr("checked",null);
		}
		else{
			var items = $(".bar-checkbox input[type='checkbox']");
			for(var i=1;i<$(items).length;i++){
				checked = $(items).get(i).checked;
				if(!checked){
					break;
				}
			}
			if(checked){
				$("#checkbox_all").attr("checked","checked");
			}
		}
		
	};
	
	}
	
}

function searchHandler(){
	var gid = $(window.parent.document).find("#top_user").attr("gid");
	var selectedGroupId = null;
	if(gid<=1){
		selectedGroupId = $("#grouplist").find('option:selected').val();
	}
	else{
		selectedGroupId = gid;
	}
	var selectedYear = $("#years").find('option:selected').val();
	// 如果选择了全部
	if(selectedYear==0){
		selectedYear = null;
	}
	queryStatisticHcetc(selectedGroupId,selectedYear,null,1,10,function(data,total,rows){
		$("#tt").datagrid('loadData',data);
	});
	
}


function updateHandler(rowIndex){
	$("#tt").datagrid("selectRow",rowIndex);
	var rowData = $('#tt').datagrid('getSelected'); 
	var year = rowData.YEAR;
	var ldmc = rowData.LDMC;
	var status = rowData.UPDATE_FLAG;
	var url = rootPath+"/app/cash_report.jsp?update_year="+year+"&update_ldmc="+ldmc+"&update_flag="+status;
	$(window.parent.document).find(".content-right-panel-iframe").attr("src",url);
}


function exportHandler(){
	var year = $("#years").val();
	var gid = $(window.parent.document).find("#top_user").attr("gid");
	var selectedGroupId = null;
	if(gid<=1){
		selectedGroupId = $("#grouplist").find('option:selected').val();
	}
	else{
		selectedGroupId = gid;
	}
	exportExcel(selectedGroupId,year,function(result){
		if(result!=null){
			window.open(result);
		}
		else{
			alert("导出失败");
		}
	});
	
}



