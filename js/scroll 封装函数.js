var navH = $(".topMenu").offset().top;
		//滚动条事件
		$(window).scroll(function(){
		//获取滚动条的滑动距离
		var scroH = $(this).scrollTop();
		//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
			if(scroH>=100){
				$(".topMenu").css({"position":"fixed","top":0});
				$(".topsubMenu").css("display","none");
				$(".topMenu").css("background-color","#afdae5");
				$(".topMenu").css("opacity",0.8);
			}
			else if(scroH == navH){
				$(".topsubMenu").css("display":"block",);
				$(".topMenu").css("background-color","#ffffff");
				$(".topMenu").css("opacity",1);
			}
		})