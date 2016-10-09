<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>预算信息汇总</title>
	<%@include file="../common/taglibs.jsp"%>
	<%@include file="../common/meta.jsp"%>
	<%@include file="../common/js.jsp"%>
	<link rel="stylesheet" type="text/css" href="<%= basePath %>themes/default/css/query_report.css"/>
	<style type="text/css">
	.title{
		font-size: 18px;
		text-align: center;
	
	}
	.exportBtn{
		float:right;
		margin-right:20px;
	}
	
	#tt{
		margin:20px 20px;
	
	}



	</style>
	<script type="text/javascript">
		$(document).ready(function(){
		
			initBudgetColllectInfo();
			$("#exportBtn").click(exportHandler);
			
		});
		
		function initBudgetColllectInfo(){
		
			var year = new Date().getFullYear();
			var yssj = year+1;
			$("#title").text(yssj+"年  公路机电系统运行维护费用预算汇总表");
			queryBudgetCollect(year,function(result){
				layout(result);
			
			});
		
		}
		
		
		
		function exportHandler(){
			var year = new Date().getFullYear();
			exportExcelCollect(year,function(result){
				if(result!=null){
					window.open(result);
				}
				else{
					alert("导出失败");
				}
			});
		
		}
		
		function layout(temp){
			$("#tt").datagrid({
				striped:true,
				singleSelect:true,
				fitColumns:true,
				columns:[[
					{field:'GROUPNAME',title:'单位名称',align:"right"},
					{field:'NUM',title:'合计',align:"right"},
					{field:'SFXT',title:'收费系统',align:"right"},
					{field:'TXXT',title:'通信系统',align:"right"},
					{field:'JKXT',title:'监控系统',align:"right"},
					{field:'ZMXT',title:'供配电与照明系统',align:"right"},
					{field:'SDXT',title:'隧道系统',align:"right"}
				]]
			});
			
			$("#tt").datagrid('loadData',temp);
		
		}
		
	</script>
  </head>
  
  <body>
	<div style="margin:20px;">
		<span>
			<label id="title" style="text-align:center;font-size: 18px;"></label>
			<input type="button" id="exportBtn" style="float:right;margin-right:20px;" class="login-button" value="导出汇总信息"/>
		</span>
		<div style="margin-top:10px;">
			<table id="tt"></table>		
		</div>
	</div>
  </body>
</html>
