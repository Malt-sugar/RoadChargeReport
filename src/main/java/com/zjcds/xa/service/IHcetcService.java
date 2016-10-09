package com.zjcds.xa.service;

import java.util.List;
import java.util.Map;

import com.zjcds.xa.bean.HcEtcInfo;

public interface  IHcetcService {
	
	public List<Map<String, HcEtcInfo>> getHcetc(Map params);
	public int getHcetcCount();

}
