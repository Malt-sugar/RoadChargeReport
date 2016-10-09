package com.zjcds.xa.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zjcds.xa.bean.HcEtcInfo;
import com.zjcds.xa.dao.IHcetcDao;
import com.zjcds.xa.service.IHcetcService;
@Service
public class HcetcServiceImpl  implements IHcetcService{
	@Autowired 
	private IHcetcDao hcetcdao;
	public IHcetcDao getHcetcdao() {
		return hcetcdao;
	}
	public void setHcetcdao(IHcetcDao hcetcdao) {
		this.hcetcdao = hcetcdao;
	}
	@Override
	public List<Map<String, HcEtcInfo>> getHcetc(Map params) {
		// TODO Auto-generated method stub
		return hcetcdao.getHcetc(params);
	}
	@Override
	public int getHcetcCount() {
		// TODO Auto-generated method stub
		return hcetcdao.getHcetcCount();
	}

}
