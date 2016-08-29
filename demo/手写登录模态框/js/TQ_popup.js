//added by maowei on 20160818弹出框插件
//added by maowei on 20160818 弹出框插件
;(function($){
  $.extend($.fn,{
    PopupChange:function(options){
    //added by maowei on 20160818 插件属性
    var setting = $.extend({
      openElement:"",
      closeElement:"",
      confirmElement:""
    },options||{});
    
    /***start***/
    var thisF = {
      //added by maowei on 20160818 弹出框弹出
      popup:function(popupName,maskName){
        var _windowHeight = $(window).height(),//获取当前窗口高度
        _windowWidth = $(window).width(),//获取当前窗口宽度
        _popupHeight = popupName.height(),//获取弹出层高度
        _popupWeight = popupName.width();//获取弹出层宽度
        //_posiTop = (_windowHeight - _popupHeight)/2;
        _posiTop = 30;
        _posiLeft = (_windowWidth - _popupWeight)/2;
        popupName.css({"left": _posiLeft + "px","top":_posiTop + "px","display":"block"});//设置position
        maskName.show();
      },
      
      //added by maowei on 20160818 弹出框关闭
      popupclose:function(popupName,maskName){
        popupName.hide();
        maskName.hide();
      }
    }
    //added by maowei on 20160818 指定元素点击事件
    $(""+setting.openElement+"").click(function(){
        thisF.popup($(".popuparea"),$(".maskfrm"));
        $(""+setting.confirmElement+"").attr("kfvalue","");
        $("body").css("overflow","hidden");        
    })
    //added by maowei on 20160818 指定元素关闭事件
    $(""+setting.closeElement+"").click(function(){
        thisF.popupclose($(".popuparea"),$(".maskfrm"));
        $("body").css("overflow","auto");           
    })
    //added by maowei on 20160818 遮罩点击事件
    $('.maskfrm').click(function(){
        thisF.popupclose($(".popuparea"),$(".maskfrm"));
        $("body").css("overflow","auto");          
    })

    }
  }); 
})(jQuery);

window.onload = function(){
	//added by maowei on 20160818 弹出层插件初始化
	$(this).click().PopupChange({
		openElement:"#listItems",//
		closeElement:"#popupClose"//POPUP取消
		//confirmElement:"#popupConfirm"//弹出框确认
	})
	$("#listItems table tr").on("click",function(){
		var thisordersn = $(this).children('td').eq(2).html();
		//alert(thisordersn);
		$.ajax({
			url: '/?app_act=call_center/OrderDetail',
			type: 'post',
			data:{order_sn:thisordersn},
			success: function(data){
				$('.inner-content').html(data);
			}
		});
	});

  $('.order_detail_list_title ul li').on("click",function(){
      $(this).addClass("now").siblings().removeClass("now");
      var thisindex = $(this).index();

      if(thisindex == 0){
        $("#test2_1").show().siblings().hide();
      }
      else if(thisindex == 1){
        $("#test2_2").show().siblings().hide();
      }
      else if(thisindex == 2){
        $("#test2_3").show().siblings().hide();
      }
      else if(thisindex == 3){
        $("#test2_4").show().siblings().hide();
      }
      //$("#tab-content > div").hide().eq($('.order_detail_list_title ul li').index(this)).show();
  }); 
  /*
  $(function() {
          //$(".new-user-menu-title ul li").click(menu_tab);
          $(".new-user-menu-title ul li").on("click",menu_tab);
          function menu_tab() {
            $(this).addClass("now").siblings().removeClass("now");
            var menu_tab = $(this).attr("title");
            $("#" + menu_tab).show().siblings().hide();
          };
  });
  */
}