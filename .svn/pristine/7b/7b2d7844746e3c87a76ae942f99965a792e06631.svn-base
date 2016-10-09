<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>调整系数审核</title>
	<%@include file="../common/taglibs.jsp"%>
	<%@include file="../common/meta.jsp"%>
	<%@include file="../common/js.jsp"%>
	<link type="text/css" rel="stylesheet" href="<%= basePath %>themes/default/css/report_cash.css"/>
	<script type="text/javascript" src="<%= basePath %>js/app/param_check.js"></script>
	<style type="text/css">
		#param_title{
			height:40px;
			font-size: 18px;
			text-align: center;
		}

	</style>
  </head>
  
  <body>
	<div id="tag" style="display:none;margin:20px 20px;font-size:18px;"></div>
	<div id="content" style="display:none;">
		<div id="param_title"></div>
		<div class='panel'>
			<div class='panel-item'>
				<div class='panel-item-title'>使用年限调整系数</div>
				<div class='panel-item-content' style="display: inline-table;">
					<table id="table_nx">
						<tr><td>年限（年）</td><td>系数α</td></tr>
						<tr><td>1~2年</td><td><input type='text' id="year12"  vl="1<=α<=2" style='text-align:right;'/></td></tr>
						<tr><td>3~5年</td><td><input type='text' id="year35"  vl="3<=α<=5" style='text-align:right;'/></td></tr>
						<tr><td>6~8年</td><td><input type='text' id="year68" vl="6<=α<=8" style='text-align:right;'/></td></tr>
						<tr><td>9年及以上</td><td><input type='text' id="year9" vl="9<=α" style='text-align:right;'/></td></tr>
					</table>
				</div>
			</div>
			<div class='panel-item'>
				<div class='panel-item-title'>隧道监控设施调整系数</div>
				<div class='panel-item-content' style="display: inline-table;">
					<table id="table_sd">
						<tr><td>隧道长度（L）</td><td>系数β</td></tr>
						<tr><td>L≤1000米</td><td><input type='text' id="sd1" vl="β<=1000"  style='text-align:right;'/></td></tr>
						<tr><td>1000米＜L≤3000米</td><td><input type='text' id="sd13" vl="1000<β<=3000"  style='text-align:right;'/></td></tr>
						<tr><td>L＞3000米</td><td><input type='text' id="sd3" vl="3000<β"  style='text-align:right;'/></td></tr>
					</table>
				</div>
			</div>
			<div class='panel-item-content' style="margin-top:10px;">
				<label>审批意见</label>
				<textarea id="checkInfo" style="width:700px;"></textarea>
			</div>
			<div class='bar-button'>
				<input type="button" id="saveBtn" class="login-button" value="通过"/>
				<input type="button" id="cancelBtn" class="login-button" value="驳回"/>
			</div>
			<div>
				
	
			</div>
		</div>
	</div>

  </body>
</html>
