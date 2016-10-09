package com.zjcds.xa.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zjcds.xa.bean.ExpenseRowVo;

public interface IReportTableDao {

	public List<ExpenseRowVo> queryExpenseRows(
			@Param(value="username")String username,
			@Param(value="groupid")int groupId,
			@Param(value="year")String year);
	
	public List<String> queryReportYears(@Param(value="username")String username);
	
}
