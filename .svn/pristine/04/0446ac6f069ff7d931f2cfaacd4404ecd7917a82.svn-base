<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Login</title>
	<%@include file="common/taglibs.jsp"%>
	<%@include file="common/meta.jsp"%>
	<%@include file="common/js.jsp"%>
	<link rel="stylesheet" type="text/css" href="themes/default/css/login.css"></link>
	<script src="js/index.js"></script>

	<script type="text/javascript">
		$(document).ready(function(){
		    
			$("#loginBtn").click(login);
			$("#password").keydown(login);
		});
		
		function login(event){
			if(event.keyCode==13 || event.keyCode==undefined){
			    checkUser();
			}
		}
		
		function checkUser() {  
	        var uname = $.trim($("#login_name").val());  
	        var pword = $.trim($("#password").val());
	        if(uname=="" || uname==null){
	        	return;
	        }
	        if(pword=="" || pword==null){
	        	return;
	        }
	        $.ajax({  
	            type:"POST",   //http请求方式  
	            url:'login/login.do',
	            async:false, 
	            data:JSON.stringify({login_name:uname,password:pword}), //发送给服务器的参数  ,JSON.stringify将json对象转换成json字符串，否则后台bean接收不到,报400,415错误
	            //dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
	            contentType:'application/json;charset=UTF-8',  
	            complete:function(msg) {  
	                var vstatus=eval("(" + msg.responseText + ")").vstatus;
	                var messages=eval("(" + msg.responseText + ")").messages;
	                var returnstr;
	                //alert(vstatus);
	                if (vstatus=='false') {   	                
	                    alert(messages);	                    
	                } else {  	              
	                 window.location = rootPath+"/app/home.jsp";            
	                }  
	            }//定义交互完成,并且服务器正确返回数据时调用回调函数   
	        });  
        }  
		

	</script>
  </head>
  
  <body>
	<div id="top">
		<div>新疆维吾尔族自治区</div>
		<div>收费公路 机电系统  运行维护费用 预算信息系统</div>
	</div>
	<div id="content">
		<div id="leftimage"></div>
		<div id="rightpanel">
			<div><input type="text" id="login_name" class="login-textInput" placeholder="请输入用户名  example@zjcds.com" /></div>
			<div><input type="password" id="password" class="login-textInput" placeholder="请输入密码"/></div> 
			<div id="checkbox_div" class="login-checkbox">
				<input type="checkbox" id="checkbox_remember"/> 记住用户名
			</div>
			<div><input type="button" id="loginBtn" class="login-button" value="登录" /></div> 
		</div>
	</div>
	<div id="copyright">
		<span class="copyright-hr">
			<a id="xjjtt" target="_blank" href="http://www.xjjt.gov.cn" >新疆维吾尔族自治区  交通厅 版权所有</a> |
			<a id="zjcds" target="_blank" href="http://www.zjcds.com">浙江协同数据系统有限公司 技术支持</a>
		</span>
	</div>
  </body>
</html>
