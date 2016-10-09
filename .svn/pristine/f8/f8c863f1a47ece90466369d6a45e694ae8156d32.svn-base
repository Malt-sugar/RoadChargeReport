package com.zjcds.xa.common.utils;
import java.util.HashMap;
import java.util.Map;
/**
 *
 * @author renshui
 * 对oracle查询进行分页
 *
 */
public class Pagination {
 
 private int startIndex;//rownum的上限
 private int endIndex;//rownum的下限
 
 /**
  * 获取oracle rownum的上下限
  * @return
  */
 public Map<String, Integer> getRowNumRang(int totalRow,int currentPage,int pageSize){
	 
	 Map<String, Integer> rangMap=new HashMap<String, Integer>();
	 if(currentPage==1){
		 startIndex=1;
		 endIndex=pageSize;
	 }else{
		 startIndex=pageSize*(currentPage-1)+1;
		 endIndex=startIndex+pageSize-1;
	 }
	 rangMap.put("startIndex", startIndex);
	 rangMap.put("endIndex", endIndex);
	 return rangMap; 
 }
  
}