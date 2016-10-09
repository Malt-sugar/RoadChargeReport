package com.zjcds.xa.service;

import java.util.List;
import java.util.Map;

import com.zjcds.xa.bean.ExpenseBudgetBean;
import com.zjcds.xa.bean.ExpenseRowVo;
import com.zjcds.xa.bean.UserInfoBean;

public interface IExcelImpAndExpService {

	public List<ExpenseRowVo> getTableData(String name,int groupId,String year);
	
	public String exp(String rootPath,UserInfoBean userinfo,String year);
	
	public String expCollectBudget(String rootPath,List<Map> list,String year);
	
	public List<String> queryReportYears(String name);
}
