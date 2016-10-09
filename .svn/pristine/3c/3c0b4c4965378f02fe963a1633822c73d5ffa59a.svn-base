package com.zjcds.xa.controller.export;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.zjcds.xa.bean.ExpenseBudgetBean;
import com.zjcds.xa.bean.UserInfoBean;
import com.zjcds.xa.common.utils.Pagination;
import com.zjcds.xa.dao.IReportTableDao;
import com.zjcds.xa.service.IExcelImpAndExpService;
import com.zjcds.xa.service.IExpenseBudgetService;
import com.zjcds.xa.service.IUserInfoService;

@Controller
public class ExcelController {
	@Autowired
	private IExcelImpAndExpService excelService;
	@Autowired
	private IUserInfoService userService;
	@Autowired
	private IExpenseBudgetService ebudgetService;
	
	/**
	 * 导出为Excel
	 * @param session
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	@RequestMapping(value="/export/excel.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView exportExcel(@RequestBody Map<String,String> pageParam,HttpSession session,HttpServletRequest request,HttpServletResponse response){
		String year = pageParam.get("year");
		UserInfoBean selectedUserInfo = null;
		// 管理员用户导出详细信息只有通过选择不同的管理局一个个导出（原则上管理员用户只提供汇总信息的导出功能）
		UserInfoBean loginuser=(UserInfoBean)session.getAttribute("loginuserinfo");
		// 非管理员用户
		if(loginuser.getGroupid()>1){
			selectedUserInfo = loginuser;
		}
		else{
			int selectedGid = Integer.parseInt(pageParam.get("gid"));
			List<Map> gInfo = userService.getGroupInfos(selectedGid);
			String gName = gInfo.get(0).get("groupname").toString();
			selectedUserInfo = new UserInfoBean();
			selectedUserInfo.setGroupid(selectedGid);
			selectedUserInfo.setGroupname(gName);
		}
		
		String rootPath = session.getServletContext().getRealPath("");
		MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
		String filePath = excelService.exp(rootPath,selectedUserInfo, year);
		String temp = request.getRequestURL().toString().replace("export/excel.do", "");
		filePath = (temp+filePath);
		String fileName = null;
		msgmap.put("data", filePath);
		ModelAndView mv=new ModelAndView(mpjson);
        mpjson.setAttributesMap(msgmap);
		return mv;
	}
	
	/**
	 * 导出为Excel
	 * @param session
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	@RequestMapping(value="/export/excel/collect.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView exportExcelCollect(@RequestBody Map<String,String> pageParam,HttpSession session,HttpServletRequest request,HttpServletResponse response){
		String year = pageParam.get("year");
		
		List<Map> list = ebudgetService.getTotalExpenseBudgetByGroup(year);
		
		String rootPath = session.getServletContext().getRealPath("");
		MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
		String filePath = excelService.expCollectBudget(rootPath, list, year);
		String temp = request.getRequestURL().toString().replace("export/excel/collect.do", "");
		filePath = (temp+filePath);
		msgmap.put("data", filePath);
		ModelAndView mv=new ModelAndView(mpjson);
        mpjson.setAttributesMap(msgmap);
		return mv;
	}	
	
	
	
	
	
	/**
	 * 查询填报年度
	 * @param session
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	@RequestMapping(value="/query/years.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView queryReportYears(HttpSession session){
		UserInfoBean loginuser=(UserInfoBean)session.getAttribute("loginuserinfo");
		String user=loginuser.getLogin_name();
		int groupid = loginuser.getGroupid();
		// 如果用户属于管理员Group ，将能看到所有填报用户填报的预算信息
		if(groupid<=1){
			user = null;
		}
		String rootPath = session.getServletContext().getRealPath("");
		MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
		List<String> list = excelService.queryReportYears(user);
		msgmap.put("data", list);
		ModelAndView mv=new ModelAndView(mpjson);
        mpjson.setAttributesMap(msgmap);  
		return mv;
	}	
}
