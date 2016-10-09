<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String update_year = request.getParameter("update_year");
String update_ldmc = request.getParameter("update_ldmc");
String update_flag = request.getParameter("update_flag");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>预算费用填报</title>
	<%@include file="../common/taglibs.jsp"%>
	<%@include file="../common/meta.jsp"%>
	<%@include file="../common/js.jsp"%>
	<link type="text/css" rel="stylesheet" href="<%= basePath %>themes/default/css/report_cash.css"/>
	<script type="text/javascript" src="<%= basePath %>js/app/report_cash.js"></script>
    <script type="text/javascript">
		var update_year = <%= update_year%>;
		var update_ldmc = '<%= update_ldmc%>';
		var update_flag = <%= update_flag%>;
		$(document).ready(function(){
			// 修改
			if(update_year!=null && update_ldmc!=null){
				$("#report_content").attr("operateStatus",1);
				$("#fm_ldmc").hide();
				$("#update_ldmc").text(update_ldmc);
				$("#update_ldmc").show();
				selectSfxmByLd(update_ldmc,function(result){
					createInitComponents(update_flag,result,function(){
						queryBudgets(update_ldmc,update_year,1,10,function(result){
							var data = result;
							insertToReport(data);
						});
					
					});
				});
			}
			// 新增
			else{
				$("#report_content").attr("operateStatus",0);
				$("#update_ldmc").hide();
				$("#fm_ldmc").show();
				// 获取当前用户所在管理单位ID
				var gid = $(window.parent.document).find("#top_user").attr("gid");
				queryLdByGroupId(gid,function(result){
					$("#fm_ldmc").append("<option id='0'>请选择路段----</option>");
					for(var i=0;i<result.length;i++){
						var item = "<option id="+result[i].ld_id+">"+result[i].ld_mc+"</option>";
						$("#fm_ldmc").append(item);
					}
					$("#fm_ldmc").selectedIndex = 0;
					$("#fm_ldmc").change(roadSelectedHandler);
					
				});
			}
			
			
		});
	</script>
  </head>
  
  <body>
	<div class="panel" id="report_content">
		<div class="panel-item">
			<div class="panel-item-title"></div>
			<div class="panel-item-content">
				<div class="panel-item-content-row">
					<label>路段名称：</label>
					<select  id="fm_ldmc" class='input-long'></select>
					<label id="update_ldmc" style='display: none;'></label>
				</div>
			</div>
		</div>
		<div id="systems_content"></div>
	</div>
	<div class='bar-button' style='display: none;'>
		<input type="button" id="holdsaveBtn" class="login-button" value="暂存"/>
		<input type="button" id="saveBtn" class="login-button" value="提交"/>
		<input type="button" id="cancelBtn" class="login-button" value="取消"/>
	</div>
  </body>
</html>
