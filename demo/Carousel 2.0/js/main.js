;(function(_){

	var template = 
	  '<div class="m-slider" >\
	    <div class="slide"></div>\
	    <div class="slide"></div>\
	    <div class="slide"></div>\
	  </div>'


	function Slider(opt){
		//mixin 传入配置项
		_.extend(this,opt);
		
		//设置carousel外部容器
		this.container = this.container || document.body;
		this.container.style.overflow = 'hidden';
		
		//组件节点
		this.slider = this._layout.cloneNode(true);
		this.slides = [].slice.call(this.slider.querySelectorAll('.slide'))
		
		//拖拽相关变量
		this.offsetWidth = this.container.offsetWidth;
		this.breakPoint = this.offsetWidth/4;

		this.pageNum = this.contents.length;

		//内部数据结构
		this.slideIndex = 1;
		this.pageIndex = this.pageIndex || 0 ;
		this.offsetAll = this.pageIndex;

		this.container.appendChild(this.slider);

		//自动轮播时间
		this.autoPlay = this.autoPlay || 0;

		//保存this
		this.target = this;

		//拖拽初始化
		if(this.drag) this._initDrag();

		//轮播初始化
		this._init();

	}

	_.extend( Slider.prototype, _.emitter);
	_.extend( Slider.prototype,{

		_layout:_.html2node(template),

		_init:function(){
			this.nav(this.pageIndex,true);

			if(this.autoPlay){
				var that = this;
				this.timer = setInterval(function(){that.target.next()},this.autoPlay) 
			}
		},

		// 直接跳转到指定页
	    nav: function(pageIndex,first){
	    	if(!first){
	    		//停止轮播
	      		if(this.autoPlay){clearInterval(this.timer);}
	    	}
		    this.pageIndex = pageIndex 
		    this.slideIndex = typeof this.slideIndex === 'number'? this.slideIndex: (pageIndex+1) % 3;
		    this.offsetAll = pageIndex;

		    this.slider.style.transitionDuration = '0s';

		    this._calcSlide();

		    if(!first){
		    	//重新启动自动轮播
			      if(this.autoPlay){
						var that = this;
						this.timer = setInterval(function(){that.target.next()},this.autoPlay) 
		  		}
		    }

	    },
	    // 下一页
	    next: function(){
	    	this._step(1);
	    },
	    // 上一页
	    prev: function(){
	    	this._step(-1);
	    },
	    // 单步移动
	    _step: function(offset){

		    this.offsetAll += offset;
		    this.pageIndex += offset;
		    this.slideIndex +=offset;
		    this.slider.style.transitionDuration = '.5s';

		    this._calcSlide();

	    },

		// 计算Slide
	    // 每个slide的left = (offsetAll + offset(1, -1)) * 100%;
	    // 外层容器 (.m-slider) 的偏移 = offsetAll * 宽度
	    _calcSlide:function(pageIndex, slideIndex){

			var slideIndex = this.slideIndex= this._normIndex(this.slideIndex, 3);
			var pageIndex = this.pageIndex= this._normIndex(this.pageIndex, this.pageNum);
			var offsetAll = this.offsetAll;
			var pageNum = this.pageNum;

			var prevSlideIndex = this._normIndex( slideIndex - 1, 3 );
			var nextSlideIndex = this._normIndex( slideIndex + 1, 3);

			var slides = this.slides;

			// 三个slide的偏移
			slides[slideIndex].style.left = (offsetAll) * 100 + '%'
			slides[prevSlideIndex].style.left = (offsetAll-1) * 100 + '%'
			slides[nextSlideIndex].style.left = (offsetAll+1) * 100 + '%'

			// 容器偏移
			this.slider.style.transform = 'translateX('+ (-offsetAll * 100)+'%) translateZ(0)'


			// 当前slide 添加 'z-active'的className
			slides.forEach(function(node){ _.delClass(node, 'z-active') })
			_.addClass(slides[slideIndex], 'z-active');

			this._onNav(this.pageIndex, this.slideIndex);


	    },
	    //标准化下标
	    _normIndex:function(index,len){
	    	return (index + len)%len
	    },
	    // 跳转时完成的逻辑， 这里是设置图片的url
	    _onNav: function(pageIndex, slideIndex){

	      var slides = this.slides;
	      var img_url = this.contents[0].match(/(.*?)(\d)+\.jpg$/)[1], img_num;

	      for(var i =-1; i<= 1; i++){
	        var index = (slideIndex + i+3)%3; 
	        var img = slides[index].querySelector('img')
	        if(!img){
	          img = document.createElement('img');
	          slides[index].appendChild(img);
	        }
	        img.src = img_url + ( ( img_num = this._normIndex(pageIndex + i, this.pageNum)+1)<10 ?'0'+img_num :img_num ) + '.jpg';
	      }

	      this.emit('nav', {
	        pageIndex: pageIndex,
	        slideIndex: slideIndex
	      })

		},

			//拖拽相关代码
		_initDrag: function(){
	        
	      this._dragInfo = {};

	      this.slider.addEventListener('mousedown', this._dragstart.bind(this));
	      this.slider.addEventListener('mousemove', this._dragmove.bind(this));
	      this.slider.addEventListener('mouseup', this._dragend.bind(this));
	      this.slider.addEventListener('mouseleave', this._dragend.bind(this));

	      //暂时没做移动端支持
	      /*this.slider.addEventListener('touchstart', this._dragstart.bind(this));
	      this.slider.addEventListener('touchmove', this._dragmove.bind(this));
	      this.slider.addEventListener('touchend', this._dragend.bind(this));*/

	    },

	    _dragstart: function(ev){
	   	  //停止轮播
	      if(this.autoPlay){clearInterval(this.timer);}

	      var dragInfo = this._dragInfo;
	      dragInfo.start = {x: ev.pageX, y: ev.pageY};
	      
	    },

	    _dragmove: function(ev){

	      var dragInfo = this._dragInfo;
	      // 如果还没有开始拖拽则退出
	      if(!dragInfo.start) return;

	      ev.preventDefault();
	      this.slider.style.transitionDuration = '0s';

	      var start = dragInfo.start;
	      // 清除恼人的选区
	      if (window.getSelection) {
	        window.getSelection().removeAllRanges();
	      } else if (window.document.selection) {
	        window.document.selection.empty();
	      }

	      // 加translateZ 分量是为了触发硬件加速
	      this.slider.style.transform = 
	       'translateX(' +  (-(this.offsetWidth * this.offsetAll - ev.pageX+start.x)) + 'px) translateZ(0)'

	    },

	    _dragend: function( ev ){

	      var dragInfo = this._dragInfo;
	      if(!dragInfo.start) return;

	      ev.preventDefault();
	      var start = dragInfo.start;
	      this._dragInfo = {};
	      var pageX = ev.pageX;

	      // 看走了多少距离
	      var deltX = pageX - start.x;
	      if( Math.abs(deltX) > this.breakPoint ){
	        this._step(deltX>0? -1: 1)
	      }else{
	        this._step(0)
	      }

	      //重新启动自动轮播
	      if(this.autoPlay){
				var that = this;
				this.timer = setInterval(function(){that.target.next()},this.autoPlay) 
		  }

	    }

	 })

	window.Slider = Slider;

})(util)