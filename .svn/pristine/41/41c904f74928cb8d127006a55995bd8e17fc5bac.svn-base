package com.zjcds.xa.common.utils;

import java.io.File;

public class FileOperateUtil {

	/**
	 * delete all files in direcotry
	 * @param directoryPath
	 * @return
	 */
	public static boolean deleteFilesInDirectory(String directoryPath){
		File d = new File(directoryPath);
		boolean flag = false;
		if(d.isDirectory()){
			File[] files = d.listFiles();
			for(File file:files){
				file.delete();
			}
			flag = true;
		}
		else{
			System.out.println("is not directory!");
			flag = false;
		}
		return flag;
	}
	
}
