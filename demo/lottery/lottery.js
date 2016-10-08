/**
 * 抽奖
 * Created by user on 2015/4/28.
 */


var lottery = {
	index : 0,			//当前高亮位置
    prevIndex : 0,		//前一个位置
	speed : 300,		//初使化速度
	timer : '',		//定义对象
	endIndex : 0,		//决定在哪一格变慢
	cycle : 0,			//转动圈数
	endCycle : 0,		//计算转动圈数
	flag : false,		//结束转动标志
    bProceed : true,   //防止重复点击
	arr : [],           //
	quick : 0,			//加速
	tb : document.getElementById('lottery'),	//获取tb对象
    fnStartCallback : '',   //开始抽奖时回调函数
    fnEndCallback : '', //抽奖结束后回调函数
	init : function(opt){
		this.arr = this.getSide(3,3);
        this.fnStartCallback = opt.startCallback || function(){return false;};
        this.fnEndCallback = opt.endCallback || function(){return false;};
        //防止重复点击
        if(this.bProceed){
            this.startGame();
        }else{
            this.fnStartCallback.apply(this);
        }
	},
	/**
	 * [getSide 定义奖项数组]
	 * @param  {[type]} m [description]
	 * @param  {[type]} n [description]
	 * @return {[type]}   [description]
	 */
	getSide : function(m,n){
		var awardArr = [];		//初始化数组
		for(var i = 0; i < m; i++){
			awardArr.push([]);
			for(var j = 0; j < n; j++){
				awardArr[i][j] = i * n + j;
			}
		}
        var resultArr = [],		//获取数组最外圈
            tempX = 0,
            tempY = 0,
            count = 0,
            direction = 'Along';

		while(tempX >= 0 && tempX < n && tempY >= 0 && tempY < m && count < (m * n)){
			count++;
			resultArr.push([tempY,tempX]);
			if(direction === 'Along'){
				if(tempX === n-1){
					tempY++;
				}else{
					tempX++;
				}
				if(tempX === n-1 && tempY === m-1){
					direction = 'Inverse';
				}
			}else{
				if(tempX === 0){
					tempY--;
				}else{
					tempX--;
				}
				if(tempX === 0 && tempY ===0){
					break;
				}
			}
		}
		return resultArr;
	},
	/**
	 * [startGame 抽奖开始]
	 * @return {[type]} [description]
	 */
	startGame : function(){
		clearInterval(this.timer);
		this.cycle = 0;
		this.flag = false;
		this.endIndex = Math.floor(Math.random()*8+1);
		this.endCycle = 6;
        this.timer = setInterval(this.star, this.speed);
	},
	/**
	 * [star 跑马灯开始]
	 * @return {[type]}     [description]
	 */
	star : function(){
        var that = lottery;
		if(that.flag === false){
            that.bProceed = false;
			//从第5格开始加速
			if(that.quick === 5){
				clearInterval(that.timer);
                that.speed = 50;
                that.timer = setInterval(that.star, that.speed);
			}
			//跑N圈后减速
			if(that.cycle === (that.endCycle + 1) && that.index === parseInt(that.endIndex)){
				clearInterval(that.timer);
                that.speed = 300;
                that.flag = true;		//触发结束
                that.timer = setInterval(that.star, that.speed);
			}
		}
		if(that.index >= that.arr.length){
            that.index = 0;
            that.cycle++;
		}

        that.tb.rows[that.arr[that.index][0]].cells[that.arr[that.index][1]].firstChild.className = '';
		if(that.index > 0){
            that.prevIndex = that.index - 1;
		}else{
            that.prevIndex = that.arr.length - 1;
		}

        that.tb.rows[that.arr[that.prevIndex][0]].cells[that.arr[that.prevIndex][1]].firstChild.className = 'lottery_shadow';

        //结束转动并选中号码
        //trim里改成数字就可以减速，变成endIndex的话就没有减速效果了
        if(that.flag === true && that.index === parseInt(that.Trim(that.endIndex.toString())-1)){
            that.quick = 0;
            that.fnEndCallback.apply(that);
            clearInterval(that.timer);
            that.bProceed = true;
        }
        that.index++;
        that.quick++;
	},
    Trim : function(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
};