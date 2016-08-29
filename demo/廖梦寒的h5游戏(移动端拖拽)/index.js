
    var t = 15;
    var tt;
    function showTime(){  
    t -= 1;  
    if(t>9){
        $("#count").text(t);
    } 
    else if(t<10){
        $("#count").text("0"+t);
    }
    if(t==0){  
        $(".page2").hide();
        $(".page3").show();
      clearTimeout(tt);
      return;
    }  
     tt=setTimeout("showTime()",1000);  
}  
    function clues(a){
        $(a).click(function() {
            var eq=$(a).index();
            if(eq==0){
                $("#clue1").fadeIn();
            }
            else if(eq==1){
                $("#clue2").fadeIn();
            }
            else if(eq==2){
                $("#clue3").fadeIn();
            }
        });
    }
$(document).ready(function() {
     var pageConfig = window.pageConfig;
     var times=3;
     $(".sbtn-left,.sbtn-left2").click(function() {
        $(".share-box").fadeIn();
     });
     $(".share-box").click(function() {
         $(".share-box").fadeOut();
     });
     $(".sbtn-right2,.sbtn-right").click(function() {
          window.location="entrance.html?aid="+pageConfig.aid+"&sessionid="+pageConfig.sessionid;
     });
    $(".dialog").click(function() {
        $(".dialog").hide();
        });
	clues("#lantern1");clues("#lantern2");clues("#lantern3");
    $(".c-button").click(function() {
        $(".page1").hide();
        $(".page2").show();
        showTime();
    });
	function drag(a){
	// 获取节点
	
    var block = document.getElementById(a);
    var oW,oH;
    var starLeft=block.style.left;
    var starTop=block.style.top;
    // 绑定touchstart事件
    block.addEventListener("touchstart", function(e) {
        block.style.zIndex="5";
        var touches = e.touches[0];
        oW = touches.clientX - block.offsetLeft;
        oH = touches.clientY - block.offsetTop;
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove",defaultEvent,false);
    },false)

    block.addEventListener("touchmove", function(e) {
        var touches = e.touches[0];
        var oLeft = touches.clientX - oW;
        var oTop = touches.clientY - oH;
        if(oLeft < 0) {
            oLeft = 0;
        }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
            oLeft = (document.documentElement.clientWidth - block.offsetWidth);
        }
        block.style.left = oLeft + "px";
        block.style.top = oTop + "px";
    },false);

    block.addEventListener("touchend",function() {
        block.style.zIndex="4";
       var task_left1=parseInt(0.15*parseInt($(".p3-box").width())/10);
       var task_left2=parseInt(3.38667*parseInt($(".p3-box").width())/10);
       var task_left3=parseInt(6.666667*parseInt($(".p3-box").width())/10);
       var task_top=parseInt(10.45*parseInt($(".p3-box").width())/10);
       var objTop=parseInt(block.style.top)/document.documentElement.clientWidth*10;
       var objLeft=parseInt(block.style.left)/document.documentElement.clientWidth*10;
        var isPed1=false; var isPed2=false; var isPed3=false;  
        var num=0;var data1="";var data2="";var data3="";
        function sure(){
            for(i=0;i<9;i++){
                var t_left=parseFloat($(".p-box").eq(i).css("left"));
                var t_top=parseFloat($(".p-box").eq(i).css("top"));
                var t_data=$(".p-box").eq(i).data("num");
                if((t_left==task_left1&&t_top==task_top)||(t_left==task_left2&&t_top==task_top)||(t_left==task_left3&&t_top==task_top)){
                        if(t_left==task_left1){data1=t_data}
                        if(t_left==task_left2){data2=t_data}
                        if(t_left==task_left3){data3=t_data}
                        num+=1;         
                }
            }
                if(num==3){
                    if(times==1){
                        $(".page3").hide();
                        $(".page5").show();
                         return;
                    }
                    times-=1;
                    if(data1==pageConfig.pass1&&data2==pageConfig.pass2&&data3==pageConfig.pass3){
                       $(".page3").hide();
                        $(".page4").show();
                    }
                    else{
                        $(".fault").css("opacity","1");
                        $(".prompt").css("opacity","1").children('#times').text(times);
                    }
                }
        }
       if(objTop<9.1||objTop>12.1){
        block.style.top=starTop;
        block.style.left=starLeft;
       }
       if(objTop>=9.1&&objTop<=12.1&&objLeft<1.3){             
            for(var i=0;i<9;i++){
                var t_left1=parseFloat($(".p-box").eq(i).css("left"));
                var t_top1=parseFloat($(".p-box").eq(i).css("top"));
                if(t_left1==task_left1&&t_top1==task_top){
                    isPed1=true;
                }
            }
             if(isPed1){
                block.style.top=starTop;
                block.style.left=starLeft;
                }
                else{
            block.style.top=task_top+"px";
            block.style.left=task_left1+"px";
                sure();
               
                }
       }
       else if(objTop>=9.1&&objTop<=12.1&&objLeft>=1.3&&objLeft<5){
            for(var i=0;i<9;i++){
                var t_left2=parseFloat($(".p-box").eq(i).css("left"));
                var t_top2=parseFloat($(".p-box").eq(i).css("top"));
                if(t_left2==task_left2&&t_top2==task_top){
                    isPed2=true;
                }
            }
             if(isPed2){
                block.style.top=starTop;
                block.style.left=starLeft;
                }
                else{
            block.style.top=task_top+"px";
            block.style.left=task_left2+"px";
              sure();
                }
            
       }
       else if(objTop>=9.1&&objTop<=12.1&&objLeft>=5){
           for(var i=0;i<9;i++){
                var t_left3=parseFloat($(".p-box").eq(i).css("left"));
                var t_top3=parseFloat($(".p-box").eq(i).css("top"));
                if(t_left3==task_left3&&t_top3==task_top){
                    isPed3=true;
                }
            }
             if(isPed3){
                block.style.top=starTop;
                block.style.left=starLeft;
                }
                else{
            block.style.top=task_top+"px";
            block.style.left=task_left3+"px";
              sure();
                }
           
       }
        document.removeEventListener("touchmove",defaultEvent,false);

    },false);
    function defaultEvent(e) {
        e.preventDefault();
    }

	}
 
	drag("box1");
    drag("box2");
    drag("box3");
    drag("box4");
    drag("box5");
	drag("box6");
    drag("box7");
    drag("box8");
    drag("box9");
});