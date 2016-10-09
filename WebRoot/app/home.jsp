<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.zjcds.xa.bean.UserInfoBean"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
UserInfoBean userinfo = (UserInfoBean)request.getSession().getAttribute("loginuserinfo");
String uname = userinfo.getLogin_name();
String gname = userinfo.getGroupname();
int gid = userinfo.getGroupid();
String ualias = userinfo.getUsername();
if(ualias==null){
	ualias = uname;
}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>HOME</title>
	<%@include file="../common/taglibs.jsp"%>
	<%@include file="../common/meta.jsp"%>
	<%@include file="../common/js.jsp"%>
	<link type="text/css" rel="stylesheet" href="<%= basePath %>themes/default/css/home.css"></link>
	<script type="text/javascript">
		var ualias = '<%= ualias %>';
		var gname = '<%= gname %>';
		var gid = <%= gid%>;
		$(document).ready(function(){
			$("#top_user").text(gname+" "+ualias);
			$("#top_user").attr("gid",<%= gid %>);
			$("#menu a").click(changeContentPage);
			$("#top_quit").click(quitSystem);	    
		});
		
		function changeContentPage(){
			var id = $(this).attr("id");
			var url = rootPath+"/app/";
			switch(id){
			case "report_param": url += "param_report.jsp";break;
			case "check_param": url += "param_check.jsp";break;
			case "query_param": url += "param_query.jsp";break;
			case "report_cash": url += "cash_report.jsp";break;
			case "check_cash": url += "cash_check.jsp";break;
			case "query_report": url += "hcetc_query.jsp";break;
			case "collect":url+="budgetCollect.jsp";break;
			case "manage_system": url += "manage_system.jsp";break;
			}
			$(".content-right-panel-iframe").attr("src",url);
		
		}
		
		function quitSystem(){
			window.location = rootPath;
		}
	</script>
  </head>
  
  <body>
	<div class="top">
		<div class="top-logo-title">货车称重车辆信息监控</div>
		<ul class="top-ul">
			<li id="top_quit">退出</li>
			<li id="top_update_password">修改密码</li>
			<li id="top_user" style="width:200px;"></li>
		</ul>
	</div>
	<div class="content">
		<div class="content-left-toc">
			<ul id="menu">
<!--				<li><a id="collect">预算汇总信息</a></li>-->
				<li><a id="query_report">货车信息查询</a></li>
			</ul>
		</div>
		<div class="content-right-panel">
			<iframe class="content-right-panel-iframe"></iframe>
		</div>
	</div>
	<div class="copyright">
		<span>
			<a id="xjjtt" >新疆维吾尔族自治区  交通厅 版权所有</a>
		</span>
	</div>
  </body>
</html>
