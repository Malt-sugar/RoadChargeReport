package com.zjcds.xa.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.zjcds.xa.bean.UserInfoBean;

public interface IUserInfoDao {
	
	public UserInfoBean getUserByName(String name);
	
	public List<Map> getGroupInfos(@Param(value="gid") int gid);

}
