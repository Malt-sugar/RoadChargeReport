package com.zjcds.xa.dao;

import java.util.List;
import java.util.Map;

import com.zjcds.xa.bean.HcEtcInfo;

public interface IHcetcDao {
	
	public List<Map<String,HcEtcInfo>> getHcetc(Map params);
    public int getHcetcCount();
	
}
