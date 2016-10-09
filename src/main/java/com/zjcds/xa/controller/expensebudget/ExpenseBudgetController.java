package com.zjcds.xa.controller.expensebudget;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.zjcds.xa.service.IExpenseBudgetService;

@Controller
public class ExpenseBudgetController {
	@Autowired
	private IExpenseBudgetService expenseBudgetService;
	
	/**
	 * 
	 * @param session
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	@RequestMapping(value="/expenseBudget/select.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView selectExpenseBudget(@RequestBody Map<String,String> pageParam,HttpSession session){
		UserInfoBean loginuser=(UserInfoBean)session.getAttribute("loginuserinfo");
		String user=loginuser.getLogin_name();
		int totalRow=expenseBudgetService.getExpenseBudgetCount();
		Map params=new HashMap();
		Pagination pagination=new Pagination();
		Map rowNumRangMap=pagination.getRowNumRang(totalRow, Integer.parseInt(pageParam.get("currentPage")), Integer.parseInt(pageParam.get("pageSize")));
		params.put("user", user);
		params.put("ld", pageParam.get("ld"));
		params.put("tbsj", pageParam.get("tbsj"));
		params.put("sh_zt", pageParam.get("sh_zt"));
		params.put("groupid", pageParam.get("groupid"));
		params.put("", rowNumRangMap.get("startIndex"));
		params.put("", rowNumRangMap.get("endIndex"));
		
		MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
        List list = null;
		if("yes".equals(pageParam.get("detailOrNot"))){
			list = expenseBudgetService.getExpenseBudgetByParams(params);
		}else{
			list = expenseBudgetService.getExpenseBudgetTongji(params);
		}
		ModelAndView mv=new ModelAndView(mpjson);
        msgmap.put("data", list);
        mpjson.setAttributesMap(msgmap);  
		return mv;
	}
	
	/*
	 * 根据user,ld,年份获取费用预算记录数
	 */
	@RequestMapping(value="/expenseBudget/getExpenseBudgetCountByParams.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView getExpenseBudgetCountByParams(@RequestBody Map<String,String> param,HttpSession session){
		UserInfoBean loginuser=(UserInfoBean)session.getAttribute("loginuserinfo");
		String user=loginuser.getLogin_name();
		String ld=param.get("ld");
		MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
		HashMap<String, Object> paramsMap=new HashMap<String, Object>();
		paramsMap.put("user", user);
		paramsMap.put("ld", ld);
		int ExpenseBudgetCount=expenseBudgetService.getExpenseBudgetCountByParams(paramsMap);
		ModelAndView mv=new ModelAndView(mpjson);
        msgmap.put("data", ExpenseBudgetCount);
        mpjson.setAttributesMap(msgmap);  
		return mv;
	}
	
	/*
	 * 根据groupid获取路段
	 */
	@RequestMapping(value="/expenseBudget/selectld.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView selectLdByGroupid(@RequestBody Map<String,String> param){
		String groupid=param.get("groupid");
		MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
		List ldList = null;
		ldList=expenseBudgetService.getLdByGroupid(groupid);
		ModelAndView mv=new ModelAndView(mpjson);
        msgmap.put("data", ldList);
        mpjson.setAttributesMap(msgmap);  
		return mv;
	}
	
	/*
	 * 根据ld获取收费项目
	 */
	@RequestMapping(value="/expenseBudget/selectSfxmByLd.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView selectSfxmByLd(@RequestBody Map<String,String> param){
		String ld=param.get("ld");
		MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
		List sfxmList = null;
		sfxmList=expenseBudgetService.getSfXmbyLd(ld);
		ModelAndView mv=new ModelAndView(mpjson);
        msgmap.put("data", sfxmList);
        mpjson.setAttributesMap(msgmap);  
		return mv;
	}
	
	/**
	 * 
	 * @param expenseBudgetLst
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/expenseBudget/insert.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView insertExpenseBudget(@RequestBody ArrayList<ExpenseBudgetBean> expenseBudgetLst,HttpSession session){
		UserInfoBean loginuserinfo=(UserInfoBean)session.getAttribute("loginuserinfo");
		for(int i=0;i<expenseBudgetLst.size();i++){
			ExpenseBudgetBean expenseBudget=expenseBudgetLst.get(i);
			Map sfxmMap=expenseBudgetService.getSfXm(expenseBudget.getXmmc());
			
			if(sfxmMap!=null){
				insertTzxs(sfxmMap,expenseBudget);
				expenseBudget.setFyxj(this.computeFy(sfxmMap, expenseBudget));
			}
			if(loginuserinfo!=null){
				expenseBudget.setTbr(loginuserinfo.getLogin_name());
			}
			
			expenseBudgetService.insertExpenseBudget(expenseBudget);
		}
		
		HashMap<String, String> msgmap=new HashMap<String, String>();
 	    msgmap.put("vstatus", "true");
 	    msgmap.put("messages", "插入成功！");
 	    MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
 	    ModelAndView mv=new ModelAndView(mpjson,msgmap);    	  
 	    return mv;
	}
	
	/**
	 * 系数填报
	 * @param 
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/xstb/insert.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView insertSfXs(@RequestBody ArrayList<HashMap> SfXsLst,HttpSession session){
		String xs_nx=null;
		String xs_cd=null;
		for(int i=0;i<SfXsLst.size();i++){
            Map SfXsMap=SfXsLst.get(i);
            if(SfXsMap.containsKey("xs_nx")){
                expenseBudgetService.insertSfxsNx(SfXsMap);
            }
            else if(SfXsMap.containsKey("xs_cd")){
                expenseBudgetService.insertSfxsCd(SfXsMap);
            }
        }
		HashMap<String, String> msgmap=new HashMap<String, String>();
 	    msgmap.put("vstatus", "true");
 	    msgmap.put("messages", "插入成功！");
 	    MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
 	    ModelAndView mv=new ModelAndView(mpjson,msgmap);    	  
 	    return mv;
	}
	
	/**
	 * 系数修改
	 * @param 
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/xstb/update.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView updateSfXs(@RequestBody ArrayList<HashMap> SfXsLst,HttpSession session){
		String xs_nx=null;
		String xs_cd=null;
        for(int i=0;i<SfXsLst.size();i++){
            Map SfXsMap=SfXsLst.get(i);
            if(SfXsMap.containsKey("xs_nx")){//根据年限算调整系数
                expenseBudgetService.updateSfxsNx(SfXsMap);
            }
            else if(SfXsMap.containsKey("xs_cd")){//根据里程算调整系数
                expenseBudgetService.updateSfxsCd(SfXsMap);
            }
        }
		HashMap<String, String> msgmap=new HashMap<String, String>();
 	    msgmap.put("vstatus", "true");
 	    msgmap.put("messages", "更新成功！");
 	    MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
 	    ModelAndView mv=new ModelAndView(mpjson,msgmap);    	  
 	    return mv;
	}
	
	/**
	 * 系数查询
	 * @param 
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/xstb/selectSfXs_sp.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView selectSfXs_sp(@RequestBody Map<String,String> param,HttpSession session){
		List cd_xs_lst =expenseBudgetService.selectSfXsCd_sp(param);
		List nx_xs_lst =expenseBudgetService.selectSfXsNx_sp(param);
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
		msgmap.put("xs_cd", cd_xs_lst);
		msgmap.put("xs_nx", nx_xs_lst);
 	    msgmap.put("vstatus", "true");
 	    msgmap.put("messages", "查询成功！");
 	    MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
 	    ModelAndView mv=new ModelAndView(mpjson,msgmap);    	  
 	    return mv;
	}
	
	/**
	 * 系数审批
	 * @param 
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/xstb/sfxs_sp.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView sfxs_sp(@RequestBody ArrayList<HashMap> SfXsLst,HttpSession session){
		String xs_nx=null;
		String xs_cd=null;
		for(int i=0;i<SfXsLst.size();i++){
            Map SfXsMap=SfXsLst.get(i);
            if(SfXsMap.containsKey("xs_nx")){//根据年限算调整系数
                expenseBudgetService.updateSfxsNx(SfXsMap);
            }
            else if(SfXsMap.containsKey("xs_cd")){//根据里程算调整系数
                expenseBudgetService.updateSfxsCd(SfXsMap);
            }
            else if(SfXsMap.containsKey("sp_yj")){//插入审批说明
            	expenseBudgetService.insertxssp(SfXsMap);
            }
        }
		HashMap<String, String> msgmap=new HashMap<String, String>();
 	    msgmap.put("vstatus", "true");
 	    msgmap.put("messages", "插入成功！");
 	    MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
 	    ModelAndView mv=new ModelAndView(mpjson,msgmap);    	  
 	    return mv;
	}
	
	/**
	 * 省厅根据局，按系统分类，统计预算费用
	 * @param 
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/expenseBudget/getTotalExpenseBudgetByGroup.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView getTotalExpenseBudgetByGroup(@RequestBody Map<String,String> param,HttpSession session){
		String tbsj=param.get("tbsj");
		List ExpenseBudgetLst =expenseBudgetService.getTotalExpenseBudgetByGroup(tbsj);
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
		msgmap.put("expenseBudgetLst", ExpenseBudgetLst);
 	    msgmap.put("vstatus", "true");
 	    msgmap.put("messages", "查询成功！");
 	    MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
 	    ModelAndView mv=new ModelAndView(mpjson,msgmap);    	  
 	    return mv;
	}
	
	/**
	 * 
	 * @param expenseBudgetLst
	 * @return
	 */
	@RequestMapping(value="/expenseBudget/update.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView updateExpenseBudget(@RequestBody ArrayList<ExpenseBudgetBean> expenseBudgetLst){
		for(int i=0;i<expenseBudgetLst.size();i++){
			ExpenseBudgetBean expenseBudget=expenseBudgetLst.get(i);
			Map sfxmMap=expenseBudgetService.getSfXm(expenseBudget.getXmmc());
			
			if(sfxmMap!=null){
				insertTzxs(sfxmMap,expenseBudget);
				expenseBudget.setFyxj(this.computeFy(sfxmMap, expenseBudget));
			}
			
			expenseBudgetService.updateExpenseBudget(expenseBudget);
		}
		
		HashMap<String, String> msgmap=new HashMap<String, String>();
 	    msgmap.put("vstatus", "true");
 	    msgmap.put("messages", "保存成功！");
 	    MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
 	    ModelAndView mv=new ModelAndView(mpjson,msgmap);    	  
 	    return mv;
	}
	
	
	/**
	 * 
	 * @param expenseBudgetLst
	 * @return
	 */
	@RequestMapping(value="/expenseBudget/delete.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView deleteExpenseBudget(@RequestBody ArrayList<Integer> ids){
		for(int i=0;i<ids.size();i++){
			expenseBudgetService.deleteExpenseBudget(ids.get(i));
		}
		HashMap<String, String> msgmap=new HashMap<String, String>();
 	    msgmap.put("vstatus", "true");
 	    msgmap.put("messages", "删除成功！");
 	    MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
 	    ModelAndView mv=new ModelAndView(mpjson,msgmap);    	  
 	    return mv;
	}
	
	/*
	 * //插入调整系数
	 */
	private void insertTzxs(Map sfxmMap,ExpenseBudgetBean expenseBudget){
		//String dw=(String)sfxmMap.get("dw");//单位
		//String jijia=(String)sfxmMap.get("jijia");//基价
		String jsgs=(String)sfxmMap.get("jsgs");//计算公式类似这样：‘jijia*shuliang*α’；或者：‘jijia*wh_lc*β’
		//String xs="";
		if(jsgs.indexOf("α")!=-1 ){//年限调整系数
			String nx = expenseBudget.getNx();
			if("".equals(nx) || nx ==null){
				nx = "0";
			}
			Map SfXsNxMap=expenseBudgetService.getSfXsNx(Integer.parseInt(nx));
			if(SfXsNxMap!=null){
				String xs_nx=(String)SfXsNxMap.get("xs").toString();
				expenseBudget.setNx_tzxs(xs_nx);
			}
			
			
		}else if(jsgs.indexOf("β")!=-1){//隧道监控设施调整系数
			String xs_cd=(String)expenseBudgetService.getSfXsCd((int)expenseBudget.getWh_lc()).get("xs").toString();
			expenseBudget.setSd_jkxs(xs_cd);
		}
	}
	
	/*
	 *计算每个项目的费用 
	 */
	private String computeFy(Map sfxmMap,ExpenseBudgetBean expenseBudget){
		String dw=(String)sfxmMap.get("dw");//单位
		float jijia=Float.parseFloat((sfxmMap.get("jijia").toString()));//基价
		String jsgs=(String)sfxmMap.get("jsgs");//计算公式类似这样：‘jijia*shuliang*α’；或者：‘jijia*wh_lc*β’
		float shuliang=0;
		if(expenseBudget.getShuliang()!=null){
			shuliang=Float.parseFloat(expenseBudget.getShuliang());
		}
		
		float wh_lc=expenseBudget.getWh_lc();
		float fyxj=0;
		float nx_tzxs=0;
		float sd_jkxs=0;
		if(expenseBudget.getNx_tzxs()!=null){
			 nx_tzxs=Float.parseFloat(expenseBudget.getNx_tzxs());//α
			 
		}else if(expenseBudget.getSd_jkxs()!=null){
			sd_jkxs=Float.parseFloat(expenseBudget.getSd_jkxs());//β
		}
		
        if(jsgs.trim().equals("jijia*shuliang*α")){
        	fyxj=jijia*shuliang*nx_tzxs;
        }else if(jsgs.trim().equals("jijia*wh_lc*α")){
        	fyxj=jijia*wh_lc*nx_tzxs;
        }else if(jsgs.trim().equals("jijia*wh_lc*α*β")){
        	fyxj=jijia*wh_lc*nx_tzxs*sd_jkxs;
        }else if(jsgs.trim().equals("jijia*shuliang")){
        	fyxj=jijia*shuliang;
        }else if(jsgs.trim().equals("jijia*wh_lc")){
        	fyxj=jijia*wh_lc;
        }
        
        return Float.toString(fyxj);

	}
}
