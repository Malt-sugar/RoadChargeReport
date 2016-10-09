package com.zjcds.xa.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;


import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zjcds.xa.bean.ExpenseRowVo;
import com.zjcds.xa.bean.UserInfoBean;
import com.zjcds.xa.common.utils.FileOperateUtil;
import com.zjcds.xa.dao.IReportTableDao;
import com.zjcds.xa.service.IExcelImpAndExpService;
@Service
public class ExcelImpAndExpService implements IExcelImpAndExpService{
	
	@Autowired 
	private IReportTableDao reportTableDao;
	
	@Override
	public String exp(String rootPath,UserInfoBean userinfo,String year) {
		// TODO Auto-generated method stub
		String filePath = null;
		List<ExpenseRowVo> list = getTableData(userinfo.getLogin_name(),userinfo.getGroupid(), year);
		String modelPath = rootPath+"\\files\\model\\workbook.xls";
		System.out.println(modelPath);
		FileOperateUtil.deleteFilesInDirectory(rootPath+"\\files\\excel");
		FileOutputStream fileOut = null;
		HSSFWorkbook xls;
		try {
			xls = new HSSFWorkbook(new FileInputStream(modelPath));
			HSSFSheet sheet = xls.getSheetAt(0);
			HSSFRow row1 = sheet.getRow(1);
			HSSFCell groupCell = row1.getCell((short)1);
//			groupCell.setEncoding((short)1);
			groupCell.setCellValue(userinfo.getGroupname());
			System.out.println(groupCell.getStringCellValue());
			HSSFCell timeCell = row1.getCell((short)11);
//			timeCell.setEncoding(HSSFWorkbook.ENCODING_UTF_16);
			timeCell.setCellValue(year+"年 编制");
			HSSFFont boldFont = xls.createFont();
			boldFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			HSSFCellStyle boldStyle = xls.createCellStyle();
			boldStyle.setFont(boldFont);
			
			HSSFCellStyle rightAlignStyle = xls.createCellStyle();
			rightAlignStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
			String currentLdmc = null;
			String lastLdmc = list.get(0).getLd();
			short minColumn = 0;
			short minRow = 3;
			short maxColumn = 0;
			short maxRow = 3;
			short ldIndex = 1;
			for(int i=0;i<list.size();i++){
				
				// create row is right 
				HSSFRow row = sheet.createRow(i+3);
				ExpenseRowVo vo = list.get(i);
				currentLdmc = vo.getLd();
				if(currentLdmc.equals(lastLdmc)){
					maxRow++;
				}
				else{
					lastLdmc = currentLdmc;
					sheet.addMergedRegion(new CellRangeAddress(minRow,maxRow-1,minColumn,maxColumn));
					ldIndex++;
					sheet.addMergedRegion(new CellRangeAddress(minRow,maxRow-1,minColumn+1,maxColumn+1));
					maxRow++;
					minRow = (short) (maxRow-1);
				}
				HSSFCell cell1 = row.createCell((short)0);
				HSSFCell cell2 = row.createCell((short)1);
				HSSFCell cell3 = row.createCell((short)2);
				HSSFCell cell4 = row.createCell((short)3);
				HSSFCell cell5 = row.createCell((short)4);
				HSSFCell cell6 = row.createCell((short)5);
				HSSFCell cell7 = row.createCell((short)6);
				HSSFCell cell8 = row.createCell((short)7);
				HSSFCell cell9 = row.createCell((short)8);
				HSSFCell cell10 = row.createCell((short)9);
				HSSFCell cell11 = row.createCell((short)10);
				HSSFCell cell12 = row.createCell((short)11);
				HSSFCell cell13 = row.createCell((short)12);
				HSSFCell cell14 = row.createCell((short)13);
				HSSFCell cell15 = row.createCell((short)14);
				HSSFCell cell16 = row.createCell((short)15);
				HSSFCell cell17 = row.createCell((short)16);
				HSSFCell cell18 = row.createCell((short)17);
				HSSFCell cell19 = row.createCell((short)18);
				cell8.setCellStyle(rightAlignStyle);
				cell10.setCellStyle(rightAlignStyle);
				cell11.setCellStyle(rightAlignStyle);
				cell12.setCellStyle(rightAlignStyle);
				cell13.setCellStyle(rightAlignStyle);
				cell17.setCellStyle(rightAlignStyle);
				cell18.setCellStyle(rightAlignStyle);
				
				cell1.setCellValue(ldIndex);
				cell2.setCellValue(vo.getLd());
				if(vo.getX()==0 && vo.getM()==0 && vo.getJ()==0){
					cell18.setCellValue(vo.getFyxj());
				}
				else if(vo.getM()==0 && vo.getJ()==0){
					cell3.setCellValue(vo.getX());
					cell6.setCellStyle(boldStyle);
					cell6.setCellValue(vo.getXtmc());
					cell18.setCellValue(vo.getFyxj());
				}
				else{
					if(vo.getM()!=0){
						cell4.setCellValue(vo.getM());
					}
					if(vo.getJ()!=0){
						cell5.setCellValue(vo.getJ());
					}
					cell6.setCellValue(vo.getXmmc());
					cell7.setCellValue(vo.getDw());
					cell8.setCellValue(Double.parseDouble(String.valueOf(vo.getJijia())));
					if(vo.getShuliang()!=null){
						cell9.setCellValue(Integer.parseInt(vo.getShuliang()));
					}
					if(vo.getQd_zh()!=0){
						cell10.setCellValue(Double.parseDouble(String.valueOf(vo.getQd_zh())));
					}
					if(vo.getZd_zh()!=0){
						cell11.setCellValue(Double.parseDouble(String.valueOf(vo.getZd_zh())));
					}
					if(vo.getWh_lc()!=0){
						cell12.setCellValue(Double.parseDouble(String.valueOf(vo.getWh_lc())));
					}
					if(vo.getTr_yxsj()!=null){
						cell13.setCellValue(vo.getTr_yxsj()+"年");
					}
					if(vo.getNx()!=null){
						cell14.setCellValue(Integer.parseInt(vo.getNx()));
					}
					if(vo.getNx_tzxs()!=null){
						cell15.setCellValue(Double.parseDouble(vo.getNx_tzxs()));
					}
					if(vo.getSd_jkxs()!=null){
						cell16.setCellValue(Double.parseDouble(vo.getSd_jkxs()));
					}
					cell17.setCellValue(vo.getJsgs());
					if(vo.getFyxj()!=null){
						cell18.setCellValue(Double.parseDouble(vo.getFyxj()));
					}
					cell19.setCellValue(vo.getBeizhu());
				}
				
				
			}
			for(int j=0;j<19;j++){
				sheet.autoSizeColumn((short)j,true);
			}
			String s = "机电系统运行维护预算表";
			String filename = (Integer.parseInt(year)+1)+"年"+userinfo.getGroupname()+s+".xls";
			fileOut = new FileOutputStream(rootPath+"\\files\\excel\\"+filename);
			xls.write(fileOut);  
			
			//fileOut.close();  
			System.out.print("OK");  
			filePath = "/files/excel/"+filename;
			
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch(Exception e){
			e.printStackTrace();
		}
        finally{  
            if(fileOut != null){  
                try {  
                    fileOut.close();  
                } catch (IOException exc) {  
                    // TODO Auto-generated catch block  
                	exc.printStackTrace();  
                }  
            }  
        } 
		return filePath;
	}

	@Override
	public List<ExpenseRowVo> getTableData(String username,int groupId,String year) {
		// TODO Auto-generated method stub
		List<ExpenseRowVo> list = reportTableDao.queryExpenseRows(username,groupId,year);
		for(ExpenseRowVo vo:list){
			if(vo.getXmid()==0){
				vo.setX(vo.getXtid());
				vo.setM(0);
				vo.setJ(0);
			}
			else{
				vo.setX(vo.getXtid());
				vo.setM(vo.getXmid());
			}
			
		}
		return list;
	}

	@Override
	public List<String> queryReportYears(String user) {
		// TODO Auto-generated method stub
		List<String> years = reportTableDao.queryReportYears(user);
		return years;
	}

	@Override
	public String expCollectBudget(String rootPath, List<Map> list,String year) {
		// TODO Auto-generated method stub
		String filePath = null;
		String modelPath = rootPath+"\\files\\model\\collectBudgetModel.xls";
		System.out.println(modelPath);
		FileOperateUtil.deleteFilesInDirectory(rootPath+"\\files\\collect");
		FileOutputStream fileOut = null;
		HSSFWorkbook xls;
		try {
			xls = new HSSFWorkbook(new FileInputStream(modelPath));
			HSSFSheet sheet = xls.getSheetAt(0);
			HSSFRow row1 = sheet.getRow(1);
			HSSFCell groupCell = row1.getCell((short)1);
//			groupCell.setEncoding((short)1);
			groupCell.setCellValue("新疆交通厅");
			System.out.println(groupCell.getStringCellValue());
			HSSFCell timeCell = row1.getCell((short)4);
//			timeCell.setEncoding(HSSFWorkbook.ENCODING_UTF_16);
			timeCell.setCellValue(year+"年 编制");
			HSSFFont boldFont = xls.createFont();
			boldFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			HSSFCellStyle boldStyle = xls.createCellStyle();
			boldStyle.setFont(boldFont);
			
			HSSFCellStyle rightAlignStyle = xls.createCellStyle();
			rightAlignStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
			
			short minColumn = 0;
			short minRow = 3;
			short maxColumn = 0;
			short maxRow = 3;
			for(int i=0;i<list.size();i++){
				
				// create row is right 
				HSSFRow row = sheet.createRow(i+3);
				Map map = list.get(i);
				HSSFCell cell1 = row.createCell((short)0);
				HSSFCell cell2 = row.createCell((short)1);
				HSSFCell cell3 = row.createCell((short)2);
				HSSFCell cell4 = row.createCell((short)3);
				HSSFCell cell5 = row.createCell((short)4);
				HSSFCell cell6 = row.createCell((short)5);
				HSSFCell cell7 = row.createCell((short)6);
				HSSFCell cell8 = row.createCell((short)7);
				cell2.setCellStyle(rightAlignStyle);
				cell3.setCellStyle(rightAlignStyle);
				cell4.setCellStyle(rightAlignStyle);
				cell5.setCellStyle(rightAlignStyle);
				cell6.setCellStyle(rightAlignStyle);
				cell7.setCellStyle(rightAlignStyle);
				cell8.setCellStyle(rightAlignStyle);
				
				cell1.setCellValue(i+1);
				cell2.setCellValue(map.get("GROUPNAME").toString());
				cell3.setCellValue(map.get("NUM").toString());
				cell4.setCellValue(map.get("SFXT").toString());
				cell5.setCellValue(map.get("TXXT").toString());
				cell6.setCellValue(map.get("JKXT").toString());
				cell7.setCellValue(map.get("ZMXT").toString());
				cell8.setCellValue(map.get("SDXT").toString());
			}
			for(int j=0;j<8;j++){
				sheet.autoSizeColumn((short)j,true);
			}
			String s = "机电系统运行维护预算汇总表";
			String filename = (Integer.parseInt(year)+1)+"年"+s+".xls";
			fileOut = new FileOutputStream(rootPath+"\\files\\collect\\"+filename);
			xls.write(fileOut);  
			
			//fileOut.close();  
			System.out.print("OK");  
			filePath = "/files/collect/"+filename;
			
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch(Exception e){
			e.printStackTrace();
		}
        finally{  
            if(fileOut != null){  
                try {  
                    fileOut.close();  
                } catch (IOException exc) {  
                    // TODO Auto-generated catch block  
                	exc.printStackTrace();  
                }  
            }  
        } 
		return filePath;
	}

}
