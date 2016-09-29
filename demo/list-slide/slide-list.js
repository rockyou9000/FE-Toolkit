;(function(_){

	var sl_debugger = true; //调试模式

	//滑动构造函数
	function Slide_list(options){
		//用户配置
		options = options || {};
		this.container = document.body.querySelectorAll('.slide_container')[0];
		_.removeClass(this.container,'slide_container');
		this.list = this.container.querySelectorAll('.slide_list_li');
		this.btn = options.btn;
		this.color = options.color || ['#FFF'];
		this.bgColor = options.bgColor || ['red'];
		this.width = options.width || [50];
		this.btn_all_width = eval(this.width.join('+'));
		this.style = options.style || 'right';
		if(sl_debugger)console.log('----btn_all_width-----',this.btn_all_width)

		if(options.btn == undefined || options.btn.length>=3 ){
				if(sl_debugger) throw Error('按钮数量不符合要求!')
			}

		this._initDrag();//滑动事件初始化
		this._initTemplate(this.style,this.btn.length); // 按钮模板初始化


		this._initEvent(); //按钮事件绑定初始化
		
	}
	_.extend(Slide_list.prototype, _.emitter ); //事件分发系统初始化
	_.extend(Slide_list.prototype,{
		//创建按钮template
	    _initTemplate:function(style,num){
	    	if(style === undefined ||num === undefined) return;
	    	if(sl_debugger)console.log('-----this-----',this)
	    		if(num == 1){
			    	var btn_html = '<div class="slide_list_btn_'+style+'" data-status = "0" >\
								    	<span class="list_btn btn1" style="color:'+this.color[0]+';background:'+this.bgColor[0]+';width:'+this.width[0]+'px">'+this.btn[0]+'</span>\
							    	</div>'
			    	var btn_node = _.html2node(btn_html);
			    	for(var i = 0;i<this.list.length;i++){
						this.list[i].appendChild(btn_node.cloneNode(true))
					};
	    		}else if(num == 2){
	    			var btn_html = '<div class="slide_list_btn_'+style+'" data-status = "0" >\
								    	<span class="list_btn btn1" style="color:'+this.color[0]+';background:'+this.bgColor[0]+';width:'+this.width[0]+'px">'+this.btn[0]+'</span><span class="list_btn btn2" style="color:'+this.color[1]+';background:'+this.bgColor[1]+';width:'+this.width[1]+'px">'+this.btn[1]+'</span>\
							    	</div>'
			    	var btn_node = _.html2node(btn_html);
			    	for(var i = 0;i<this.list.length;i++){
						this.list[i].appendChild(btn_node.cloneNode(true))
					};
	    		}else{
	    			if(sl_debugger) throw Error('按钮数量错误!')
	    		}

	    	if(style =='left'){
	    		for(var j = 0;j<this.list.length;j++){
	    			this.list[j].querySelector('.slide_list_btn_left').style.marginLeft = - this.btn_all_width+'px'
	    		}
	    	}else if(style == 'right'){
	    		for(var j = 0;j<this.list.length;j++){
	    			this.list[j].querySelector('.slide_list_btn_right').style.marginRight = - this.btn_all_width+'px'
	    		}
	    	}
	    },
	    _initEvent:function(){
	    	var target1 = this.container.querySelectorAll('.btn1');
	    	var target2 = this.container.querySelectorAll('.btn2');
	    	for(var i=0;i<target1.length;i++){
	    		target1[i].addEventListener('touchstart',this._onBtn1.bind(this));
	    	}
	    	for(var j=0;j<target2.length;j++){
	    		target2[j].addEventListener('touchstart',this._onBtn2.bind(this));
	    	}
	    },
	    _onBtn1:function(){
	    	if(sl_debugger)console.log('btn1')
	    	this.emit('btn1');
	    },
	    _onBtn2:function(){
	 		if(sl_debugger)console.log('btn2')
	    	this.emit('btn2');
	    },
		//拖动相关 初始化绑定事件
		_initDrag: function(){
			// this._dragInfo = {};
			for(var i = 0 ;i<this.list.length;i++){
				this.list[i].addEventListener('touchstart', this._dragstart.bind(this));//回调函数为this调用回调函数的bind引用
				this.list[i].addEventListener('touchmove', this._dragmove.bind(this));
				this.list[i].addEventListener('touchend', this._dragend.bind(this));
			}
	    },
	    //touch事件开始回调
	    _dragstart:function(event){
	    	var touch = event.touches[0];//选择第一个触摸点
	    	this.touch_start = parseInt(touch.clientX);
	    	this.d_target = event.currentTarget.querySelector('.slide_list_text');
	    	this.d_target_btn = event.currentTarget.querySelector('.slide_list_btn_'+this.style);
	    },
	    //touch事件移动回调
	    _dragmove:function(event){
	    	event.preventDefault(); // 必须有,否则会有奇怪的不明移动
	    	if(this.d_target && this.d_target_btn){
	    		var touch = event.touches[0];
		    	this.touch_end = parseInt(touch.clientX);
		    	var moveX = this.touch_end - this.touch_start;
		    	if(sl_debugger)console.log(moveX)

		    	//根据style配置 锁定其他滑动方向
		    	if(this.style =="left" && moveX<0 &&this.d_target_btn.dataset.status == 0 )return; 
		    	if(this.style =="right" && moveX>0 && this.d_target_btn.dataset.status == 0 )return;

		    	if(Math.abs(moveX) < this.btn_all_width){
		    		this.d_target.style.transform = 'translate3d('+moveX+'px,0,0)';
		    		this.d_target_btn.style.transform = 'translate3d('+moveX+'px,0,0)';
		    	}else{
		    		var remainX = moveX > 0 ?(moveX - this.btn_all_width)*0.2:(moveX + this.btn_all_width)*0.2;
		    		if(moveX>0){
		    			this.d_target.style.transform = 'translate3d('+(this.btn_all_width + remainX)+'px,0,0)';
		    			this.d_target_btn.style.transform = 'translate3d('+(this.btn_all_width + remainX)+'px,0,0)';
		    		}else{
		    			this.d_target.style.transform = 'translate3d('+(-this.btn_all_width + remainX)+'px,0,0)';
		    			this.d_target_btn.style.transform = 'translate3d('+(-this.btn_all_width + remainX)+'px,0,0)';
		    		}
		    	}
	    	}
	    },
	    //touch事件结束回调
	    _dragend:function(event){
	    	var endX = this.touch_end - this.touch_start;

	    	if(this.style =="left" && endX<=0 && this.d_target_btn.dataset.status == 0 )return;
		    if(this.style =="right" && endX>=0 && this.d_target_btn.dataset.status == 0 )return;

	    		if(Math.abs(endX) >= this.btn_all_width){ //当滑动距离超出按钮露出距离时,松开后按钮停留在界面中,否则按钮隐藏到界面外
		    		if(endX>0 && this.d_target_btn.dataset.status == 0){
			    		this.d_target.style.transform = 'translate3d('+this.btn_all_width+'px,0,0)';
			    		this.d_target_btn.style.transform = 'translate3d('+this.btn_all_width+'px,0,0)';
			    		this.d_target_btn.dataset.status = '1';
			    		
		    		}else if(endX<0 && this.d_target_btn.dataset.status == 0){
		    			this.d_target.style.transform = 'translate3d(-'+this.btn_all_width+'px,0,0)';
		    			this.d_target_btn.style.transform = 'translate3d(-'+this.btn_all_width+'px,0,0)';
			    		this.d_target_btn.dataset.status = '1';
			    		
		    		}else{
			    		this.d_target.style.transform = 'translate3d(0,0,0)';
			    		this.d_target_btn.style.transform = 'translate3d(0,0,0)';
			    		this.d_target_btn.dataset.status = '0';	
		    	}
		    	}else{
		    		this.d_target.style.transform = 'translate3d(0,0,0)';
		    		this.d_target_btn.style.transform = 'translate3d(0,0,0)';
		    		this.d_target_btn.dataset.status = '0';
		    	}
	    }
	})

	window.Slide_list = Slide_list; // 把构造函数Slide_list升级为全局变量

})(util) //注入util全局变量  在util.js内定义
	