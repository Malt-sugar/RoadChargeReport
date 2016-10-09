/**
 * JS���ж�����ӷ���
 * @param a
 * @param len
 * @return
 */

Math.toFixed = function(a,len){
	var tempNum = 0;
    var s,temp;
    var s1 = a+"";
    var start = s1.indexOf(".");
    
    //��ȡС����,0֮������֣��ж��Ƿ����5��������5����Ϊ1

   if(s1.substr(start+len+1,1)>=5)
    tempNum=1;

    //����10��len�η�,��ԭ����)����Ҫ�����С��λ��ı���
  var temp = Math.pow(10,len);
    //����ӽ�this * temp����С����
    //floor() ����ִ�е�������ȡ����㣬��ص���С�ڻ���ں����������֮��ӽ������
    s = Math.floor(a * temp) + tempNum;
    return s/temp;
	
}

Math.toFormatString = function(a,c){
	var s = a;
	switch(c){
		case '%':
		{
			s = Math.round(a*100)+"%"
			break;
		}
	}
	return s;
}



function getValiNumber(sk){
	if(sk==null || sk==undefined || sk==""){
		sk = 0;
	}
	return Number(sk);
}

function getDateString(date){
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	return year+"-"+month+"-"+day;
}

