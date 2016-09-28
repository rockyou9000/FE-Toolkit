var pageConfig=window.pageConfig;

function warn(a) {
    $('.warn').fadeIn().text(a);
    setTimeout("$('.warn').hide()",1000);
}

function isshow() {
    if(pageConfig.is_pay==0){
        $('#pay_money').text('免费');
    }

    if(pageConfig.get_way==0){
        $('#get_way').text('报名即可获得');
    }
    else if(pageConfig.get_way==1){
         $('#get_way').text('从报名用户中抽取');
    }

    for(var i=0;i<$('.mess').length;i++){
        if($('.mess').eq(i).children('.mess-tit').text()=='姓名'){
            $('.mess').eq(i).append("<div class='mess-warn'>请填写真实姓名哦</div>");
        }
    }

}

function winner() {
    $.post(pageConfig.www+'/activity_tpl/winning_users', {size:5,tid:gets.tid}, function(res) {
        console.log(res);
         for(var i=0;i<res.data.length;i++){
            var time= FormatDate(res.data[i].dateline)
            $('.win_box').append("<div class='main-box'><img src='"+res.data[i].avatar+"' class='avatar'> <div class='nickname'>"+res.data[i].nickname+"</div><div class='linetime'>"+time+"</div> </div> <div class='main-line'></div>")
        }
    },'json');
}
function FormatDate (strTime) {
    var date = new Date(strTime*1000);
    var hour=date.getHours();
    var minutes=date.getMinutes();
    if(hour<10){
        hour='0'+hour;
    }
    if(minutes<10){
        minutes='0'+minutes;
    }
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+' '+hour+':'+minutes;
}
function join_user() {
    $.post(pageConfig.www+'/activity_tpl/join_users', {size:5,tid:gets.tid}, function(res) {
        console.log(res);
        for(var i=0;i<res.data.length;i++){
            var time= FormatDate(res.data[i].dateline)
            $('.join_box').append("<div class='main-box'><img src='"+res.data[i].avatar+"' class='avatar'> <div class='nickname'>"+res.data[i].nickname+"</div><div class='linetime'>"+time+"</div> </div> <div class='main-line'></div>")
        }
    },'json');
}
function join() {
    var isPed=false;
    $('.sure-btn').bind('click',function(){
        var mess=$('.mess');
        var fields={};
        if(isPed){return;}
        isPed=true;
        for(var i=0;i<mess.length;i++){
            fields[i]=$('.mess').eq(i).children('.mess-val').val();
            if(fields[i]==''){
                warn('请输入您的'+$('.mess').eq(i).children('.mess-tit').text());
                isPed=false;
                return;
            }
        }
        if(pageConfig.is_photo==1){
            if(pageConfig.img_photo==''){
                warn('请上传照片');
                return;
            }
        }
        $.ajax({
            url: pageConfig.www+'/activity_tpl/join',
            type: 'POST',
            dataType: 'json',
            data: {uid:pageConfig.uid,
                   tid:gets.tid,
                    fields:fields,
                    thumb:pageConfig.img_photo
                },
            success:function(res){
                isPed=false;
                console.log(res);
                if(res.code!=0){
                    if(res.data=='user is exists'){
                        warn('您已经报过名了');
                        $('.sure-btn').css('background','#ababab').text('已报名');
                        isPed=true;
                    }
                    else{
                        warn(res.data);
                        console.log(fields)
                    }
                }
                else{
                    if(pageConfig.is_pay==1){
                        window.location=pageConfig.www+'/pay/activity_pay?order_id='+res.data.order_id+'&tid='+gets.tid;
                    }
                    else{
                             $('.success').fadeIn();
                            $('.sure-btn').css('background','#ababab').text('已报名');
                    }
                }
            }

        })      
    })
}
function close() {
    $('.success-btn').click(function() {
       $('.success').fadeOut();
    });
}
function basic_click() {
    $('#winner').bind('click',function(){
        window.location=pageConfig.www+'/activity_tpl/users?tid='+gets.tid+'&sessionid='+gets.sessionid+'&type=1';
    });
    $('#joiner').bind('click',function(){
        window.location=pageConfig.www+'/activity_tpl/users?tid='+gets.tid+'&sessionid='+gets.sessionid+'&type=0';
    })
}

function upload() {
    var key='';var token=''; var file='';
    $('#upload').bind('change',function(){
        $('.jindu').css('width','0').text('');
        $.post(pageConfig.www+'/site/token', {}, function(res) {
             var str=document.getElementById("upload").value;
             var pos = str.lastIndexOf(".");
             var lastname = str.substring(pos,str.length);
             var timestamp=new Date().getTime();
             if(lastname!='.jpg'&&lastname!='.png'&&lastname!='.JPG'&&lastname!='.PNG'){
                    warn('请选择正确的照片格式')
             }
             else{
                 file=document.getElementById('upload').files[0];
                token=res;
                key=timestamp+pageConfig.uid+lastname;
                doUpload();
             }          
        });
        
            function doUpload() {  
                 var formData = new FormData($( "#uploadForm" ));
                    formData.append('file',file);
                   formData.append('key',key);
                   formData.append('token',token);
                 $.ajax({  
            url:'http://upload.qiniu.com/',  
            type: "POST",  
            data: formData,  
            processData: false,  // tell jQuery not to process the data  
            contentType: false,   // tell jQuery not to set contentType  
            xhr: function(){        //这是关键  获取原生的xhr对象  做以前做的所有事情  
                var xhr = jQuery.ajaxSettings.xhr();  
                xhr.upload.onload = function (){  
 
                }    
                xhr.upload.onprogress = function (ev) {  
                    if(ev.lengthComputable) {  
                        var percent = 100 * ev.loaded/ev.total;
                        percent=percent+'%';  
                         $('.jindu').css('width',percent).text('正在上传');
                    }  
                }  
                return xhr;  
            },  
            success:function(data){ 
                 $('.jindu').text('上传成功').css('width','100%'); 
                 pageConfig.img_photo=data.key;
                 console.log(pageConfig.img_photo);
            },
            error:function(){
                $('.jindu').text('上传失败').css('width','100%');
            } 
        })  
            }
    })
}
$(document).ready(function() {
    $('.end_time').text(FormatDate(pageConfig.end_time));
    close();
    isshow();
    basic_click();
    if(pageConfig.state==1){
           if(pageConfig.quota==1){
                $('.sure-btn').css('background','#ababab').text('名额已满');
           }
           else{
                if(pageConfig.is_pay==1){
                     if(pageConfig.is_join==1){
                    $('.sure-btn').css('background','#ababab').text('待付款');
                    window.location=pageConfig.www+'/pay/activity_pay?order_id='+pageConfig.order_id+'&tid='+gets.tid;
                    }
                    else if(pageConfig.is_join==2){
                    $('.sure-btn').css('background','#ababab').text('已报名');
                    }
                    else{
                        upload();
                        join();
                    }
                }
                else{
                    if(pageConfig.is_join==1){
                $('.sure-btn').css('background','#ababab').text('已报名');
                }
                else{
                    upload();
                    join();
                }
                }
           }
    }
    else if(pageConfig.state==-1){
         $('.sure-btn').css('background','#ababab').text('活动已删除');
    }
    else if(pageConfig.state==9){
        $('.sure-btn').css('background','#ababab').text('活动已结束');
    }
    join_user();
    winner();
});