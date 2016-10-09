package com.zjcds.xa.controller.hcetc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.zjcds.xa.bean.UserInfoBean;
import com.zjcds.xa.common.utils.Pagination;
import com.zjcds.xa.service.IHcetcService;

@Controller
public class HcetcController {
	
	@Autowired
	private IHcetcService hcetcService;
	public IHcetcService getHcetcService() {
		return hcetcService;
	}
	public void setHcetcService(IHcetcService hcetcService) {
		this.hcetcService = hcetcService;
	}
	/**
	 * 
	 * @param session
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	@RequestMapping(value="/hcetc/select.do",method=RequestMethod.POST, consumes = "application/json")
    @ResponseBody
	public ModelAndView selectHcetc(@RequestBody Map<String,String> pageParam,HttpSession session){
		
		UserInfoBean loginuser=(UserInfoBean)session.getAttribute("loginuserinfo");
		String user=loginuser.getLogin_name();
		int totalRow=hcetcService.getHcetcCount();
		Map params=new HashMap();
		Pagination pagination=new Pagination();
		Map rowNumRangMap=pagination.getRowNumRang(totalRow, Integer.parseInt(pageParam.get("currentPage")), Integer.parseInt(pageParam.get("pageSize")));
		params.put("user", user);
		params.put("ld", pageParam.get("ld"));
		params.put("tbsj", pageParam.get("tbsj"));
		params.put("sh_zt", pageParam.get("sh_zt"));
		params.put("groupid", pageParam.get("groupid"));
		params.put("startIndex", rowNumRangMap.get("startIndex"));
		params.put("endIndex", rowNumRangMap.get("endIndex"));
		
		MappingJacksonJsonView mpjson=new MappingJacksonJsonView();
		HashMap<String, Object> msgmap=new HashMap<String, Object>();
        List list = null;
		list = hcetcService.getHcetc(params);
		ModelAndView mv=new ModelAndView(mpjson);
		int remainder=totalRow%Integer.parseInt(pageParam.get("pageSize"));
        int multiples=totalRow/Integer.parseInt(pageParam.get("pageSize"));
        int pages=remainder==0?multiples:multiples+1;
        msgmap.put("data", list);
        msgmap.put("total", totalRow);
        msgmap.put("pages", pages);
        msgmap.put("rows", pageParam.get("pageSize"));
        
        mpjson.setAttributesMap(msgmap);  
		return mv;
	}

}
