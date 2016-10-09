package com.zjcds.xa.dao.impl;

import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import oracle.jdbc.OracleCallableStatement;
import oracle.jdbc.OracleTypes;
import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.SqlSessionUtils;
import org.springframework.stereotype.Repository;

import com.zjcds.xa.bean.ExpenseBudgetBean;
import com.zjcds.xa.dao.IExpenseBudgetDao;
import com.zjcds.xa.dao.base.MyBaseDao;

@Repository
public class ExpenseBudgetDaoImpl extends MyBaseDao implements IExpenseBudgetDao {

	
	public ExpenseBudgetBean getExpenseBudgetByParam(String param) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 
	 * @param param
	 * @return List<ExpenseBudgetBean>
	 */
	public List<ExpenseBudgetBean> getExpenseBudgetByParams(Map params) {
		
		return this.getSqlSession().selectList("getExpenseBudgetByParams", params);
	}
	
	/**
	 * 
	 * @param 
	 * @return int
	 */
	public int getExpenseBudgetCount(){
		return this.getSqlSession().selectOne("getExpenseBudgetCount");
	}
	
	/**
	 * 
	 * @param 
	 * @return int
	 */
	public int getExpenseBudgetCountByParams(Map params){
		return this.getSqlSession().selectOne("getExpenseBudgetCountByParams",params);
	}

	/**
	 * 
	 * @param ExpenseBudgetBean
	 * @return 
	 */
	public void insertExpenseBudget(ExpenseBudgetBean expenseBudget) {
		this.getSqlSession().insert("insertExpenseBudget", expenseBudget);

	}
	
	/**
	 * 
	 * @param ExpenseBudgetBean
	 * @return 
	 */
	public void updateExpenseBudget(ExpenseBudgetBean expenseBudget) {
		this.getSqlSession().update("updateExpenseBudget", expenseBudget);

	}

	/**
	 * 
	 * @param String groupid 
	 * @return List
	 */
	public List getLdByGroupid(String groupid) {
		Map param=new HashMap();
		param.put("groupid", groupid);
		List ldlist=this.getSqlSession().selectList("getLdByGroupid",param);
		return ldlist;
	}

	/**
	 * 
	 * @param String sf_xm_name 
	 * @return Map
	 */
	public Map getSfXm(String sf_xm_name) {
		
		Map SfXmMap=this.getSqlSession().selectOne("getSfXmByParams",sf_xm_name);
		return SfXmMap;
	}

	/**
	 * 
	 * @param String xs_cd 
	 * @return Map
	 */
	public Map getSfXsCd(int xs_cd) {
		Map xs_cdMap=this.getSqlSession().selectOne("getSfXsCd",xs_cd);
		return xs_cdMap;
	}

	/**
	 * 
	 * @param String xs_nx 
	 * @return Map
	 */
	public Map getSfXsNx(int xs_nx) {
		Map SfXsNxMap=this.getSqlSession().selectOne("getSfXsNx",xs_nx);
		return SfXsNxMap;
	}

	/**
	 * 
	 * @param String params 
	 * @return List<Map>
	 */
	public List<Map> getExpenseBudgetTongji(Map params) {
		List<Map> SfXsNxMap=this.getSqlSession().selectList("getExpenseBudgetTongji",params);
		return SfXsNxMap;
	}

	/**
	 * 
	 * @param String ld 
	 * @return List<Map>
	 */
	public List<Map> getSfXmbyLd(String ld) {
		List<Map> sfxmlst=this.getSqlSession().selectList("getSfXmByLd",ld);
		return sfxmlst;
	}

	@Override
	public void deleteExpenseBudget(int id) {
		// TODO Auto-generated method stub
		Map map = new HashMap<String, Object>();
		map.put("id", id);
		this.getSqlSession().delete("deleteExpenseBudget",map);
	}

	@Override
	public void insertSfxsCd(Map cdMap) {
		this.getSqlSession().insert("insertSfxsCd", cdMap);
		
	}

	@Override
	public void insertSfxsNx(Map nxMap) {
		this.getSqlSession().insert("insertSfxsNx", nxMap);
	}

	@Override
	public void updateSfxsCd(Map cdMap) {
		// TODO Auto-generated method stub
		this.getSqlSession().update("updateSfxsCd", cdMap);
	}

	@Override
	public void updateSfxsNx(Map nxMap) {
		// TODO Auto-generated method stub
		this.getSqlSession().update("updateSfxsNx", nxMap);
	}

	@Override
	public List selectSfXsCd_sp(Map param) {
		// TODO Auto-generated method stub
		return this.getSqlSession().selectList("selectSfXsCd_sp", param);
	}

	@Override
	public List selectSfXsNx_sp(Map param) {
		// TODO Auto-generated method stub
		return this.getSqlSession().selectList("selectSfXsNx_sp", param);
	}

	@Override
	public void insertxssp(Map xsspMap) {
		// TODO Auto-generated method stub
		this.getSqlSession().insert("insertxssp", xsspMap);
	}

	@Override
	public List<Map> getTotalExpenseBudgetByGroup(String tbsj) {
		// TODO Auto-generated method stub
		Map map = new HashMap<String, Object>();
		map.put("tbsj", tbsj);
		return this.getSqlSession().selectList("getTotalExpenseBudgetByGroup", map);
	}

}
