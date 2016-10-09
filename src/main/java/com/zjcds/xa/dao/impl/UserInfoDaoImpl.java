package com.zjcds.xa.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zjcds.xa.bean.UserInfoBean;
import com.zjcds.xa.dao.IUserInfoDao;
import com.zjcds.xa.dao.base.MyBaseDao;
@Repository
public class UserInfoDaoImpl extends MyBaseDao  implements IUserInfoDao {

	
	
	public UserInfoBean getUserByName(String name) {
		UserInfoBean userinfo=null;
		userinfo=(UserInfoBean)this.getSqlSession().selectOne("getUserByName",name);
		return userinfo;
	}

	@Override
	public List<Map> getGroupInfos(int gid) {
		// TODO Auto-generated method stub
		Map map = new HashMap<String, Object>();
		map.put("gid", gid);
		List<Map> list = this.getSqlSession().selectList("getGroupInfos",map);
		return list;
	}

}
