package com.zjcds.xa.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zjcds.xa.bean.UserInfoBean;
import com.zjcds.xa.dao.IUserInfoDao;
import com.zjcds.xa.service.IUserInfoService;

@Service
public class UserInfoServiceImpl implements IUserInfoService {
	@Autowired 
	private IUserInfoDao userInfoDao;
	static Logger logger;

	public UserInfoBean getUserInfo(String name) { 
		logger=Logger.getLogger(IUserInfoDao.class);
		UserInfoBean userinfo= userInfoDao.getUserByName(name);
		logger.debug("mydebug:");
		return userinfo;
	}

	@Override
	public List<Map> getGroupInfos(int gid) {
		// TODO Auto-generated method stub
		List<Map> list = userInfoDao.getGroupInfos(gid);
		return list;
	}

}
