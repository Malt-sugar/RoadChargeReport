<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>TOC</title>
	<%@include file="../common/taglibs.jsp"%>
	<%@include file="../common/meta.jsp"%>
	<%@include file="../common/js.jsp"%>
	<link type="text/css" rel="stylesheet" href="<%= basePath %>themes/default/css/param_query.css"/>
	<script type="text/javascript" src="<%= basePath %>js/app/param_query.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			initXsInfos();
		});

	</script>
  </head>
  
  <body>
	<div class="content-div">
		<table id="nx_tt"></table>		
	</div>
  </body>
</html>
