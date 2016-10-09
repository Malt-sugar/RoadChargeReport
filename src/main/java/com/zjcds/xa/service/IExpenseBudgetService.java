package com.zjcds.xa.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.zjcds.xa.bean.ExpenseBudgetBean;

public interface IExpenseBudgetService {
	
	public ExpenseBudgetBean getExpenseBudgetByParam(String param);
	public List<ExpenseBudgetBean>  getExpenseBudgetByParams(Map params);
	public List<Map> getTotalExpenseBudgetByGroup(String tbsj);
	public List<Map>  getExpenseBudgetTongji(Map params);
	public int getExpenseBudgetCount();
	public int getExpenseBudgetCountByParams(Map params);
	public Map getSfXm(String sf_xm_name);
	public List<Map> getSfXmbyLd(String ld);
	public void insertxssp(Map xsspMap);
	public void insertSfxsCd(Map cdMap);
	public void insertSfxsNx(Map nxMap);
	public void updateSfxsNx(Map nxMap);
	public void updateSfxsCd(Map cdMap);
	public List selectSfXsNx_sp(Map param);
	public List selectSfXsCd_sp(Map param);
    public Map getSfXsNx(int xs_nx);
    public Map getSfXsCd(int xs_cd);
    public List getLdByGroupid(String groupid);
    public void insertExpenseBudget(ExpenseBudgetBean expenseBudget);
    public void updateExpenseBudget(ExpenseBudgetBean expenseBudget);
    public void deleteExpenseBudget(int id);
}
