package com.zjcds.xa.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.zjcds.xa.bean.UserInfoBean;

public interface IUserInfoService {
	
	public UserInfoBean getUserInfo(String name);
	
	public List<Map> getGroupInfos(int gid);

}
