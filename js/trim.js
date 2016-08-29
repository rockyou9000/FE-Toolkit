function trim(str){
	var str = str;
	var reg = /^\s*|\s*$/g ;
	str = str.replace(reg,'')
	return str;
}

