Array.prototype.deleteRepeat = function(){
	var arr = this, //获取数组
		result=[], //定义返回数组
		flag; //定义标记
	for(var i=0;i<arr.length;i++){//外层循环，遍历整个数组
		flag=true;
		for(var j=0;j<result.length;j++){//内层循环，遍历结果数组
			if(result[j]===arr[i]){ //如果在结果数组找到相同
				flag=false;
				break;
			}
		}
		if(flag)result.push(arr[i]);//如果在结果数组没找到相同
	}
	return result;//返回结果
}