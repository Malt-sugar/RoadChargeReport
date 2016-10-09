package com.zjcds.xa.bean;

import org.springframework.stereotype.Component;

@Component("userinfo")
public class UserInfoBean {
    private String username;
    private String password;
    private int userid;
    private String login_name;
    private int groupid;
    private String groupname;
    public String getUsername() {
       return username;
    }
    public void setUsername(String username) {
       this.username = username;
    }
    public String getPassword() {
       return password;
    }
    public void setPassword(String password) {
       this.password = password;
    }
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public int getUserid() {
		return userid;
	}
	public void setLogin_name(String login_name) {
		this.login_name = login_name;
	}
	public String getLogin_name() {
		return login_name;
	}
	public void setGroupid(int groupid) {
		this.groupid = groupid;
	}
	public int getGroupid() {
		return groupid;
	}
	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}
	public String getGroupname() {
		return groupname;
	}
   
}