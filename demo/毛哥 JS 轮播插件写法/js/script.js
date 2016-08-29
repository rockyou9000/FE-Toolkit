
/*---------------------------------- 丰胸案例 ：点击切换 --------------------------------------*/
var Effect = (function() {
	
	
    var Slider = function(o) {
		/*typeof检查一个变量是否存在,是否有值，判断一个值不等于undefined也不等于null*/
        this.setting      = typeof o === 'object' ? o : {};
        this.target       = this.setting.target || 'slider';
        this.showMarkers  = this.setting.showMarkers || false;
        this.showControls = this.setting.showControls || false;
		
        this.timer = timer2 = null;
        this.currentTime  = null;
        this.ms           = 35;
        this.autoMs       = 3000;
        this.iTarget      = 0;
        this.nextTarget   = 0;
        this.speed        = 0;
        
		n  = this.setting.n || null;
		
        this.init();
        this.handleEvent();	
    };
    
	/*object.prototype.name=value*/
    Slider.prototype = {
        init: function() {
            this.obj      = document.getElementById(this.target);
            this.oUl      = this.obj.getElementsByTagName('ul')[0];
            this.aUlLis   = this.oUl.getElementsByTagName('li');
            this.width    = this.aUlLis[0].offsetWidth;
            this.number   = this.aUlLis.length;
            
            this.oUl.style.width = this.width * this.number + 'px';
            
            if(this.showMarkers) {
                var oDiv = document.createElement('div');
                var aLis = [];
				
                for(var i = 0; i < this.number; i++) {
					/*push是往数组里增加东西*/
                    aLis.push('<li>'+ (i+1) +'<\/li>');
                };
				
				/*join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。*/
                oDiv.innerHTML = '<ol>'+ aLis.join('') +'<\/ol>';
                this.obj.appendChild(oDiv.firstChild);
                this.aLis = this.obj.getElementsByTagName('ol')[0].getElementsByTagName('li');
                this.aLis[0].className = 'active';
                oDiv = null;
            };
            
            if(this.showControls) {
                this.oPrev = document.createElement('p');
                this.oNext = document.createElement('p');
                this.oPrev.className = 'prev';
                this.oPrev.innerHTML = '&laquo;';
                this.oNext.className = 'next';
                this.oNext.innerHTML = '&raquo;';
                this.obj.appendChild(this.oPrev);
                this.obj.appendChild(this.oNext);
                
            };
            
        },
        
        handleEvent: function() {
            var that = this;
            
            this.currentTime = setInterval(function() {
                that.autoPlay();
            }, this.autoMs);
            
            this.addEvent(this.obj, 'mouseover', function() {
                clearInterval(that.currentTime);
            });
            
            this.addEvent(this.obj, 'mouseout', function() {
                that.currentTime = setInterval(function() {
                    that.autoPlay();
                }, that.autoMs);
            });
            
            if(this.showMarkers) {
                for(var i = 0; i < this.number; i++) {
                    var el = this.aLis[i];
                    (function(index) {
                        that.addEvent(el, 'mouseover', function() {
                            that.goTime(index,n);
                        });
                    })(i);
                };
            };
            
            if(this.showControls) {
                this.addEvent(this.oPrev, 'click', function() {
                    that.fnPrev();
                });
                this.addEvent(this.oNext, 'click', function() {
                    that.autoPlay();
                });
            };
            
        },
        
        addEvent: function(el, type, fn) {
            if(window.addEventListener) {
                el.addEventListener(type, fn, false);
            }
            else if(window.attachEvent) {
                el.attachEvent('on' + type, fn);
            };
        },
        
        fnPrev: function() {
            this.nextTarget--;
            if(this.nextTarget < 0) {
                this.nextTarget = this.number - 1;
            };
            this.goTime(this.nextTarget,n);
        },
        
        autoPlay: function() {
            this.nextTarget++;
            if(this.nextTarget >= this.number) {
                this.nextTarget = 0;
            };
            this.goTime(this.nextTarget,n);
        },
        
        goTime: function(index,n) {
			
            var that = this;
            
            if(this.showMarkers) {
                for(var i = 0; i < this.number; i++) {
                    i == index ? this.aLis[i].className = 'active' : this.aLis[i].className = '';
                };
            };
            /*case1*/
            this.iTarget = -index * this.width;
			/*case2*/
			this.iTarget2 = index;
			/*othercase*/
			
            if(this.timer) {
                clearInterval(this.timer);
            };
			
            this.timer = setInterval(function() {
				
				
				switch(n){
					case 1:
					that.doMove(that.iTarget);
					break;
					case 2:
					that.doMove2(that.iTarget2);
					break;
					case 3:
					that.doMove3(that.iTarget2);
					break;
				}
				
                
            }, this.ms);
        },
        
        doMove: function(target) {
            this.oUl.style.left = this.speed + 'px';
            this.speed += (target - this.oUl.offsetLeft) / 3;
            /*abs() 方法可返回数的绝对值*/
			if(Math.abs(target - this.oUl.offsetLeft) === 0) {
                this.oUl.style.left = target + 'px';
                clearInterval(this.timer);
                this.timer = null;
            };
        },
		
		doMove2: function(target) {
			for(i=0; i < this.number; i++){
				this.aUlLis[i].style.display = "none";
				this.aUlLis[target].style.display = "block";
			}
		}
		/******/
	
		/******/

    };
    
    return {
        
        slider: function(o) {
            var tt = new Slider(o);
        }
		
    };
})();

// 调用语句
Effect.slider({
    'target': 'aaa',
    'showMarkers': true,
    'showControls': true,
	'n': 1,
});