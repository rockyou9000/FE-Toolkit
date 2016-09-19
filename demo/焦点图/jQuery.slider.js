(function($){
	$.fn.slider=function(options){
		var setting =$.extend({
			type:1,
			time:3000
		},options||{});

		var slider = this;

		var sliderPic = this.find('.slider_pic');

		var sliderPicLi = this.find('.slider_pic li');

		var sWidth = slider.width();

		var sHeight = slider.height();

		var len = sliderPicLi.length;

		var bt = "<div class='slider_num clearfix'><ul>";

		for(var i=0;i<len;i++){
			bt+="<li>"+(i+1)+"</li>";
		};

		bt+="</ul></div>"

		slider.append(bt)
		var iNow =0;
		var iNow2 = 0;
		var timer= null;

		slider.hover(function(){
					clearInterval(timer)
				},function(){
					autoPlay(iNow,setting.type)
				})
		switch(setting.type){
			case 1:  	//简单切换
				$('.slider_num li').mouseover(function(){
					iNow = $(this).index();
					slider1(iNow);
				}).eq(0).trigger('mouseover')
				autoPlay(iNow,setting.type)
			break;
			case 2:    //谈入谈出
				$('.slider_num li').mouseover(function(){
					iNow = $(this).index();
					slider2(iNow);
				}).eq(0).trigger('mouseover')
				autoPlay(iNow,setting.type)
			break;
			case 3:   //上下翻动有缝
				$('.slider_pic').css('position','absolute')
				$('.slider_num li').mouseover(function(){
					iNow = $(this).index();
					slider3(iNow);
				}).eq(0).trigger('mouseover')
				autoPlay(iNow,setting.type)
			break;
			case 4:  //上下翻动无缝
				$('.slider_pic').css('position','absolute')
				$('.slider_num li').mouseover(function(){
					iNow=iNow2= $(this).index();
					slider4(iNow,iNow2);
				}).eq(0).trigger('mouseover')
				autoPlay(iNow,setting.type)
			break

			case 5:  //左右翻动间隔无序
				$('.slider_pic li').css('position','absolute').first().siblings().css('left',sWidth);
				$('.slider_num li').mouseover(function(){
					iNow2=$(this).index()
					slider5(iNow,iNow2)
					iNow = $(this).index()		
				}).eq(0).trigger('mouseover')
					autoPlay(iNow2,setting.type)
			break;	

			case 6:  //手风琴
				$('div').remove('.slider_num')
				$('.slider_pic li').css('position','absolute')
				for(var i=1;i<len;i++){
					$('.slider_pic li').eq(i).css('left',sWidth-(sWidth/3)+i*40)
				}

				$('.slider_pic li').mouseover(function(){
					var index  =$(this).index()
					slider6(index)
				})

			break;

			case 7:  //手风琴
				$('div').remove('.slider_num')
				$('.slider_pic li').css('position','absolute')
				var num = Math.ceil(sWidth/len);
				$('.slider_pic li').each(function(n){
					$('.slider_pic li').eq(n).css('left',num*n)
				})	
				$('.slider_pic li').mouseover(function(){
					var index  =$(this).index()
					slider6(index)
				}).mouseout(function(){
					$('.slider_pic li').each(function(n){
						$('.slider_pic li').eq(n).stop(true,false).animate({'left':num*n},400)
					})
				})
			break;
		}

		function slider1(iNow){
			$('.slider_pic li').eq(iNow).show().siblings().hide();
			sliderNum(iNow)
		}

		function slider2(iNow){
			$('.slider_pic li').hide().fadeOut().eq(iNow).fadeIn('slow').show()
			sliderNum(iNow)
		}

		function slider3(iNow){
			$('.slider_pic').stop(true,false).animate({"top":-iNow*sHeight},200)
			sliderNum(iNow)
		}

		function slider4(iNow,iNow2){
			$('.slider_pic').stop(true,false).animate({"top":-iNow2*sHeight},200)
			sliderNum(iNow)
		}

		function slider5(iNow,iNow2){
			if(iNow<iNow2){
				$('.slider_pic li').eq(iNow).stop(false,true).animate({'left':-sWidth},500)
				$('.slider_pic li').eq(iNow2).css('left',sWidth)
			}else if(iNow>iNow2){
				
				$('.slider_pic li').eq(iNow).stop(false,true).animate({'left':sWidth},500)
				$('.slider_pic li').eq(iNow2).css('left',-sWidth)
			}
			
			$('.slider_pic li').eq(iNow2).stop(false,true).animate({'left':0},500)
			sliderNum(iNow2)	
		}

		function slider6(index){
			for(var i=0;i<len;i++){
						if(i<=index){
							$('.slider_pic li').eq(i).stop(true,false).animate({'left':i*40},400)
						}else{
							$('.slider_pic li').eq(i).stop(true,false).animate({'left':sWidth-(sWidth/3)+i*40},400)
						}
					}
		}


		function autoPlay(iNow,n){
			timer=setInterval(function(){
				if(iNow==0&&setting.type==4){
						$('.slider_pic').css('top',0).find('li').first().css('position','static')
						iNow2=0;
					}
				if(iNow==len-1){
					iNow=0;
					if(setting.type==4){
					$('.slider_pic li').first().css({'top':len*sHeight,'position':'relative'})
					}
				}else{
					iNow++
				}
				iNow2++
				switch(n){
					case 1:
					slider1(iNow);
					break;
					case 2:
					slider2(iNow);
					break;
					case 3:
					slider3(iNow);
					break;
					case 4:
					slider4(iNow,iNow2);
					break;
					case 5:
					slider5(iNow,iNow2);
					break;
				}
			},setting.time)
		}

		function sliderNum(iNow){
			$('.slider_num li').eq(iNow).addClass('seled').siblings().removeClass('seled');
		}



	}
})(jQuery);