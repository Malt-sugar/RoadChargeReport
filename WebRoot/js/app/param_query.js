
function initXsInfos(){
	queryXstb(function(nx,sd){
		var temp = getXsData(nx,sd);
		layoutParamNxDataGrid(temp);
	});
}


function getXsData(nx,cd){
	var s = new Array();
	for(var i=0;i<nx.length;i++){
		var xs = {};
		$.extend(xs,nx[i],cd[i]);
		xs.A12 = xs.A12.split("_")[0];
		xs.A35 = xs.A35.split("_")[0];
		xs.A68 = xs.A68.split("_")[0];
		xs.A9 = xs.A9.split("_")[0];
		xs.B1 = xs.B1.split("_")[0];
		xs.B13 = xs.B13.split("_")[0];
		xs.B3 = xs.B3.split("_")[0];
		s.push(xs);
	}
	return s;
}



function layoutParamNxDataGrid(temp){
	$("#nx_tt").datagrid({
		pagination:true,
		striped:true,
		singleSelect:true,
		fitColumns:true,
		displayMsg:"共{total}条记录",
		beforePageText:"第",
		afterPageText:"页  共{pages}页",
		columns:[[
		          {field:'YSNF',title:'预算年度',align:"center",rowspan:2},
		          {title:'年限调整系数',align:"center",colspan:4},
		          {title:'隧道监控设施调整系数',align:"center",colspan:3},
		          {field:'YXZT',title:'状态',align:"right",rowspan:2,
		        	  styler:function(value,rowData,rowIndex){
		        	    var csstext = "";
		        	  	switch(value){
			        	  	case 2:
			        	  	{
			        	  		csstext =  "color:#FF3333";
			        	  		break;
			        	  	}
			        	  	case 0:
			        	  	{
			        	  		var us = rowData.UPDATE_FLAG;
				        	  	if(us==1){
				        	  		csstext =  "color:#33FF33";
				        	  	}
				        	  	break;
			        	  	}
		        	  	}
		        	  	return csstext;
		          	  },
		          	  formatter:function(value,rowData,rowIndex){
		          		var text = "";
		        	  	switch(value){
			        	  	case 0:
			        	  	{
			        	  		text = "审核中";
			        	  		break;
			        	  	}
			        	  	case 1:
			        	  	{
			        	  		text =  "通过审核";
			        	  		break;
			        	  	}
		        	  	}
		        	  	
		        	  	return text;
		          	  }
		          }
//		          {field:'oprate',title:'操作',align:"center",rowspan:2,
//		        	  formatter:function(value,rowData,rowIndex){
//		        	  	var us = rowData.UPDATE_FLAG;
//		        	  	var buttonText = "";
//		        	  	var html = "";
//		        	  	if(us==1){
//		        	  		buttonText = "继续完成";
//		        	  	}
//		        	  	else{
//		        	  	    buttonText = "修改";	
//		        	  	}
//		        	  	// 除审核通过以外的其他状态
//		        	  	if(rowData.YXZT==1){
//		        	  		html = "<input type='button' style='width:100;' value='"+buttonText+"'/>";
//		        	  	}
//		        	  	 return html;
//		          	  }
//		          }
		          ],
		          [
		          {field:'A12',title:'1~2年',align:"right",colspan:1},
		          {field:'A35',title:'3~5年',align:"right",colspan:1},
		          {field:'A68',title:'6~8年',align:"right",colspan:1},
		          {field:'A9',title:'9年以上',align:"right",colspan:1},
		          
		          {field:'B1',title:'L≤1000米',align:"right",colspan:1},
		          {field:'B13',title:'1000米＜L≤3000米',align:"right",colspan:1},
		          {field:'B3',title:'L＞3000米',align:"right",colspan:1},
		          
		          ]
		]
		
	});
	// 设置分页控件
	var p = $('#nx_tt').datagrid('getPager'); 
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
	$("#nx_tt").datagrid('loadData',temp);
	
}