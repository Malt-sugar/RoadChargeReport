package com.zjcds.xa.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.zjcds.xa.bean.HcEtcInfo;
import com.zjcds.xa.dao.IHcetcDao;
import com.zjcds.xa.dao.base.MyBaseDao;
@Repository
public class HcetcDaoImpl  extends MyBaseDao implements IHcetcDao{

	@Override
	public List<Map<String, HcEtcInfo>> getHcetc(Map params) {
		return this.getSqlSession().selectList("selectHcetc", params);
	}

	@Override
	public int getHcetcCount() {
		// TODO Auto-generated method stub
		return this.getSqlSession().selectOne("getHcetcCount");
	}

}
