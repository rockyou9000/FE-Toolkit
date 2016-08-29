/**
 * Created by Administrator on 2016/8/1 0001.
 */
window.yii = {
            getCsrfParam : function(){
                return $('meta[name=csrf-param]').attr('content');
            },

            getCsrfToken : function(){
                return $('meta[name=csrf-token]').attr('content');
            },

            setCsrfToken : function( name, value ){
                $('meta[name=csrf-param]').attr('content', name);
                $('meta[name=csrf-token]').attr('content', value);
            }

        };
function trim(str){
	var str = str;
	var reg = /^\s*|\s*$/g ;
	str = str.replace(reg,'')
	return str;
}   
function len(a){
    if($(a).data('name')==1){
        setTimeout("$('#select-list').hide();",300)
    }
	var realy=trim($(a).val());
	var realLength = 0;
	 for (var i = 0; i < realy.length; i++)   
    {  
        charCode = realy.charCodeAt(i);  
        if (charCode >= 0 && charCode <= 128)   
        realLength += 1;  
        else   
        realLength += 2;  
    }  
    if(realLength>14){
    	$(a).val("");
    	if ($(a).data('name')==1) {
			$(".require").text("您输入的节目名称过长").fadeIn();
    	}
    	else if($(a).data('name')==2){
			$(".require").text("您输入姓名过长，请重新输入").fadeIn();
    	}
    	
    	setTimeout("$('.require').fadeOut()",1000);
    }
    else if(realLength<=14){
		$(a).val(realy);
    }
}  	
function openshare(){
        $('.share-box').fadeIn();
    }
$(document).ready(function() {
	

	var pageConfig = window.pageConfig;
	var isPed=1;
	var limit=1;
	
	/*var data={};
	var word="";*/
	if(pageConfig.isUser==1){
		$(".cap").fadeIn().children('.cap-box').text("您的账号可能在其他设备登陆，请重新登陆");
        return;
	}
	$(".btn-cpm1").click(function() {
		$(".warn-box").fadeOut();
	});
	function limit_data(){
			 word=$("#item-name").val();
			 data={
			word:word
		};
			return data;
		};
    var t=4;
    var tt;
	document.getElementById("item-name").addEventListener("input", myFunction);
    function myFunction(){
        t=4;
        pageConfig.re_soid="";
        clearTimeout(tt);
        send();
    }
    function send(){
        t-=1;
        if(t==0){
         var word=$("#item-name").val();
         var data={
            word:word
        };
        data[window.yii.getCsrfParam()] = window.yii.getCsrfToken();
        $.ajax({
            type:"GET",
            url: "search.html?aid="+pageConfig.aid+"&sessionid="+pageConfig.sessionId,
            dataType: "json",
            data: data,
            success:function(rel){
                    console.log(rel);
                if(rel.data.result.length==0){
                        $(".select-list").hide().children('p').eq(0).text("");
                        $(".select-list").children('p').eq(1).text("");
                        $(".select-list").children('p').eq(2).text("");
                    }
                    else if(rel.data.result.length==1){
                        $(".select-list").show().children('p').eq(0).text(rel.data.result[0].SoName);
                        $(".select-list").show().children('p').eq(1).text("");
                        $(".select-list").show().children('p').eq(2).text("");
                    }
                    else if(rel.data.result.length==2){
                        $(".select-list").show().children('p').eq(0).text(rel.data.result[0].SoName);
                        $(".select-list").children('p').eq(1).text(rel.data.result[1].SoName);
                        $(".select-list").children('p').eq(2).text("");
                    }
                    else if(rel.data.result.length==3){
                        $(".select-list").show().children('p').eq(0).text(rel.data.result[0].SoName);
                        $(".select-list").children('p').eq(1).text(rel.data.result[1].SoName);
                        $(".select-list").children('p').eq(2).text(rel.data.result[2].SoName);
                    }                   
            },
            error:function(){
                
            }
        })
           clearTimeout(tt);
           return;
        };
        tt=setTimeout(send,200);
        console.log(t);
    }
	//$(".item-list").eq(1).children('.light').attr("src","../img/light.png").siblings('.item-invite').css({"background":"url('../img/invite2.png')","background-size":"contain"});
	$(".resend").click(function() {
		if(isPed==0){
			return;
		}
		isPed=0;
        console.log(pageConfig.re_soid);
		var item_name=$("#item-name").val();
		var name=$("#name").val();
		var tel=$("#tel").val();
		var city=$("#city").val();
		if(item_name==""||name==""||tel==""||city==""){
			$(".require").text("请您将信息输入完整").show();
                setTimeout(no,1000);
                function no(){
                    $('.require').fadeOut();
                    isPed=1;
                }
		}
		else{
				var data = {soname:item_name,
            	enname:name,
            	entel:tel,
            	encity:city,
            	soid:pageConfig.re_soid};
            	
            data[window.yii.getCsrfParam()] = window.yii.getCsrfToken();
			$.ajax({
			type: "POST",
            url: "enroll.html?aid="+pageConfig.aid+"&sessionid="+pageConfig.sessionId,
            dataType: "json",
            data: data,
                 success:function(data){
                 	isPed=1;
                 	console.log(data);
                 	if(data.data.state==1){
                 		$(".warn-box").fadeIn();
                        $(".add-item").append("<div class='item-list'><img src='../img/no-light.png' class='light'><span class='item-name'>《<i>"+item_name+"</i>》</span><div class='item-invite' onclick='openshare()'>邀请好友助力点亮</div><div class='item-people'><i>1</i>人想看</div></div>");
                 	}
                    else if(data.data.state==2){
                        $(".cap").fadeIn().children('.cap-box').text("报名太过频繁，请稍后再试");
                    }
                    else if(data.data.state==0){
                        $(".cap").fadeIn().children('.cap-box').text("网络问题，报名失败，请稍后再试");
                    }
                    else if(data.data.state==3){
                        $(".cap").fadeIn().children('.cap-box').text("您已经报名过此节目啦");
                    }
                    else if(data.data.state==4){
                        $(".cap").fadeIn().children('.cap-box').text("您已经点亮过此节目啦");
                    }
                 }
		})
		}
	});
	$(".item-incolor,.item-inwidth").click(function() {
		var soname=$(this).siblings('.item-name').children('i').text();
		$("#item-name").val(soname);
		location="#banner";
        pageConfig.re_soid=$(this).data('soid');
	});
    $("#likelist").click(function() {
        window.location="likelist.html?aid="+pageConfig.aid+"&sessionid="+pageConfig.sessionId;
    });
    $("#lightlist").click(function() {
        window.location="lightlist.html?aid="+pageConfig.aid+"&sessionid="+pageConfig.sessionId;
    });
    $(".select-list p").click(function() {
        $(".select-list").hide();
        var content=$(this).text();
        $("#item-name").val(content);

    });
    $("#name,#tel,#city").on('focus',function(){
        $(".select-list").hide();
    })
    $(".cap").click(function() {
        $(".cap").fadeOut();
    });
    $(".item-want").click(function() {
            var soid=$(this).data('soid');
            var data={soid:soid};
             data[window.yii.getCsrfParam()] = window.yii.getCsrfToken();
            var item=$(this);
            $.ajax({
                url: 'lightup.html?aid='+pageConfig.aid+"&sessionid="+pageConfig.sessionId,
                type: 'POST',
                dataType: 'json',
                data: data,
                success:function(data){
                    console.log(data.data.state);
                    var d=parseInt(data.data.state);
                    switch (d)
                    {
                        case 0:
                            $(".cap").fadeIn().children('.cap-box').text("网络问题，点亮失败，请稍后再试");
                            break;
                        case 1:
                            $(".cap").fadeIn().children('.cap-box').text("点亮成功");
                            var num=parseInt(item.siblings('.ip-inwidth').children('i').text());
                            num+=1;
                            item.siblings('.ip-inwidth').children('i').text(num);
                            break;
                        case 2:
                            $(".cap").fadeIn().children('.cap-box').text("请稍后再试");
                            break;
                        case 3:
                            $(".cap").fadeIn().children('.cap-box').text("您已经报名此节目");
                            break;
                        case 4:
                            $(".cap").fadeIn().children('.cap-box').text("您已经点亮过此节目");
                            break;
                    }

                }
            })
    });
    if(pageConfig.so_name!=""&&pageConfig.soid!=""){
        $("#item-name").val(pageConfig.so_name);
         pageConfig.re_soid=pageConfig.soid;
    }
    $(".share").click(function() {
        $(".share-box").fadeIn();
    });
    $(".share-box").click(function() {
        $(".share-box").fadeOut();
    });
    var add_item=$(".add-item > .item-list").size();
    for(var i=0;i<add_item;i++){
        var nums=parseInt($(".item-list").eq(i).children('.item-people').children('i').text());
        if(nums>=500){
            $(".item-list").eq(i).children('.light').attr("src","../img/light.png").siblings('.item-invite').css({"background":"url('../img/invite2.png')","background-size":"contain"});
        }
        if(nums<500){
            $(".no-light").show();
        }
    }
    $('.m-form').click(function() {
        var index=$(this).index();
        if(index!=1){
            $('.select-list').hide();
        }
    });
    $(".btn-cpm2").click(function() {
        $(".warn-box").fadeOut();
        $('.share-box').fadeIn();
    });
});