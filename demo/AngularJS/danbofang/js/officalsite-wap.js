$(function(){
		var navH = $(".topMenu").offset().top;
		//滚动条事件
		$(window).scroll(function(){
		//获取滚动条的滑动距离
		var scroH = $(this).scrollTop();
		//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
			if(scroH>=navH){
				$(".topMenu").css({"position":"fixed","top":0});
			}else if(scroH<navH){
				$(".topMenu").css({"position":"static"});
			}
		})


		/***搜索框显隐***/
		$('.topSearch .cancel').click(function(){
			$("#tSearch").fadeOut();				
		})
		$('.topMenu .magnifier').click(function(){
			$("#tSearch").fadeIn();				
		})	
		
		/***INPUT-focusblur***/
		var defaultValue = "请输入关键词";
		$('.topSearch .inputstyle').css("color","#015754");
		$('.topSearch .inputstyle').bind({
			focus:function(){
				if (this.value == this.defaultValue){
				this.value="";
				$(this).css("color","#333333");
				}
			},
			blur:function(){
				if (this.value == ""){
				this.value = this.defaultValue;
				$(this).css("color","#015754");
				}
			}
		});
		
		/***slidesubmenu***/
		var wHeight = $(window).height();
		$(".subM").css("height",wHeight-120);
		$(".topMenu .submenu").click(function() {
			$(".slideSubmenu").stop(true,false).animate({"left":0},300);
			$(".topMenu").stop(true,false).animate({"left":250},300);
			$("#Main").stop(true,false).animate({"left":250},300);
			$("#Main-mask").show().stop(true,false).animate({"left":250},300);
			$(".btmtext").show().css("top",wHeight-50);
			$(".bottomMenu ul").hide();
		}); 
		
		$(".larrow").click(function() {
			$(".slideSubmenu").stop(true,false).animate({"left":-250},300);
			$(".topMenu").stop(true,false).animate({"left":0},300);
			$("#Main").stop(true,false).animate({"left":0},300);
			$("#Main-mask").hide().stop(true,false).animate({"left":0},300);
			$(".btmtext").hide();
			$(".bottomMenu ul").show();
		});
		
		/***目录里面2级菜单***/
		$(".slideSubmenu ul li").mousemove(function(){
			$(this).addClass('cur');
		});
		$(".slideSubmenu ul li").mouseleave(function(){	
			$(this).removeClass('cur');
		});
		

		/***下拉框点击显隐***/
		$('.sel-all').click(function(){
			var display = $('.sel-hide').css('display');
			if(display == 'none'){
				$('.sel-hide').show();						
			}else{
				$('.sel-hide').hide();
			}					
		})
		/***下拉框下拉列表点击显隐***/
		$('.sel-hide').hover(
			function(){
			},
			function(){
				$(this).hide();
			}
		);
		
		/***下拉框下拉列表点击操作***/
		$('.select-style li').each(function(){
			$(this).on('click',function(){
				var selText = $(this).text(),
				selDataValue = $(this).attr('data-value');											
				$('.sel-all').text(selText);
				$('.sel-hide').hide();
				//page_ajax(1,'get_pinzixun?app_page=null&a=3&cat_id='+selDataValue,"ajax_article_list");
			});
			//page_ajax(1,'get_pinzixun?app_page=null&a=3',"ajax_article_list");	
		})
		
		
		//原ajax如有需要在这里进行修改
		/*
		function page_ajax(page,url,div) {
			var params ="page="+page+"&ajax_url="+encodeURIComponent(url,'UTF-8')+"&ajax_div="+div;
			$.post(url, params, 
					function (s){
						if(s !='') {
							$("#"+div).html(s);
							if($("#"+div).css('display') =='block' || $("#"+div).css('display') =='') {
								$("#"+div).show();
							}else {
								$("#"+div).hide();
							}
						}else{
							$("#"+div).hide();
						}
					});
		}*/
		
});


