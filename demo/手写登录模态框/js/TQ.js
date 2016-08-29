
var $app_url='/';
(function($){
    $.extend(jQuery.fn,{
        light_menu:function(menu_name,sub_menu_id){
            if(typeof menu_name =='undefined') return false;
            if(menu_name == 'index'){
                $('dl[menu_name]').show();
                return false;
            }
            //Top Navi
            $('.os_sys_menu_sel').removeClass('.os_sys_menu_sel');
            $('[menu_id="'+menu_name+'"]').addClass('os_sys_menu_sel');

            //Sub Nav
            $('dl[menu_name ="'+ menu_name +'"]').show();
            $('.current').removeClass('current');
            $('dl[menu_name="'+menu_name+'"]').find('[sub_menu_id='+sub_menu_id+']').parent().addClass('current');
        }
    });
})(jQuery);

//閬嶅巻OBJECT鎵€鏈夊厓绱 
function subObj(obj){
    var objContent="";
    $.each(obj,function(key,val){
        if($.isPlainObject(val) || $.isArray(val)){
            subObj(val);
        }else{
            objContent+=key+'='+val+'\n'
            //alert(key+'='+val);
        }
    });
    return objContent;
}
//鐐瑰嚮鍒嗛〉琛ㄦ牸澶撮儴鍥哄畾鍦ㄤ笂闈�
function resetTop(){
    var tableW = $(".os_main_data_th");
    var topTable = $(".os_main_data_th>table");
    topTable.fadeIn(400).css("top",0);
    tableW.scrollTop(0);    
};

$(document).ready(function(){
    (function(){
        //榧犳爣婊氬姩鏃惰〃鏍煎ご閮ㄥ浐瀹氬湪涓婇潰
        var tableW = $(".os_main_data_th");
        var topTable = $(".os_main_data_th>table");
        topTable.css({'position':'absolute','left':'0'});
        tableW.scroll(function(){
            tableWH = $(this).scrollTop();
            topTable.stop(false,true).fadeIn(400).css("top",tableWH);
        });
    })();

    Tipper = new OSTipper();
    systemMsg = new OSMsg();
    /*
    var WHeight = $(window).height();
    if( WHeight  > 250){
        var tab_height=0;
        $("#content").height( WHeight -45);
        $(".os_leftframe").height( WHeight  -45);
        $("#right_side_content").height( WHeight  -45);
        if($('.tab_select').length>0) tab_height=$('.tab_select').height();
        $(".os_main_data_list").height( WHeight -145-tab_height);
        $(".os_main_data_list_02").height( WHeight -120);
    }
    
    $(window).resize(function() {
        $('.os_main_data_th').width(document.body.clientWidth - 175);
    });
    */

    $('dd').hover(function(){
        $(this).addClass('ui-menu-hover');
    },function(){
        $(this).removeClass('ui-menu-hover');
    });

    $('#_hide_left').click(function(){
        $('#_disp_left_m').click();
    });

    $('#_disp_left_m').toggle(function(){
        //hide
        $("#left_side").fadeOut(function(){
            $('.os_main_data_th').width(function(){
                return $(this).width() + 170 +'px';
            });
        });
        $(this).attr('title','鏄剧ず宸︿晶鑿滃崟');
    },function(){
        $('.os_main_data_th').width(function(){
            return $(this).width() - 170 +'px';
        });
        $("#left_side").fadeIn();
        $(this).attr('title','闅愯棌宸︿晶鑿滃崟');
    });

    /*
    $('[sub_menu_id]').click(function(event){
        event.stopPropagation();
        $('.current').removeClass('current');
        $(this).parent().addClass('current');
        $('#mainFrame').load(  $(this).attr('hrefer')+'&app_page=null' );
    });
    
    $('[menu_id]').click(function(event){
        event.stopPropagation();
        $('.os_sys_menu_sel').removeClass('os_sys_menu_sel');
        $('#mainFrame').load(  $(this).attr('hrefer')+'&app_page=null' );
        $(this).parent().addClass('os_sys_menu_sel');
    });
    */
});








//addedby maowei on 20160812 把原来ADMIN后台RobPub1.full.js取出放在TQ.JS中
/*
---
Package RobPub1.js : common tool package of openshop
file md5 code:
version :
/*
---
name: nsp
description: Private RobPub1 Nsp
copyright: Copyright (c)  2011, AUTHORS.txt (http://www.baison.com.cn)
authors: Roban Lee
provides: [Tipper, SystemMsg, Grid, Sortable, Editable, Dialog,Validator ect]
*/

var RobPub1;
if (!RobPub1) RobPub1 = {};
if (!RobPub1.Sys) RobPub1.Sys = {};
if (!RobPub1.User) RobPub1.User = {};

/**
 * bgIframe
 */
(function($){
      $.fn.bgIframe=$.fn.bgiframe=function(s){
            if($.browser.msie&&/6.0/.test(navigator.userAgent)){
                  s=$.extend({
                        top:'auto',
                        left:'auto',
                        width:'auto',
                        height:'auto',
                        opacity:true,
                        src:'javascript:false;'
                  },s||{});
                  var prop=function(n){
                        return n&&n.constructor==Number?n+'px':n;
                  },html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';
                  return this.each(function(){
                        if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);
                  });
            }
            return this;
      };

})(jQuery);
;

;/*!
 * RobPub1 Package Cookie
 * Arguments : duration , fnCallBack
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 * @version 2.0
 */
(function(){
      Cookie = {
            get:function( name ){
                  var CookieName    = encodeURIComponent( name ) + '=',
                  CookieStart   = document.cookie.indexOf( CookieName ),
                  CookieValue   = null;

                  if( CookieStart > -1  ) {
                        var CookieEnd   = document.cookie.indexOf(";" ,CookieStart );
                        if( CookieEnd ==-1){
                              CookieEnd = document.cookie.length;
                        }
                        CookieValue = decodeURIComponent( document.cookie.substring(CookieStart+ CookieName.length,CookieEnd ) );
                  }

                  return CookieValue;
            },
            set:function(name,value,exp,path,domain,secure){
                  var text = encodeURIComponent( name ) + '=' + encodeURIComponent(value);
                  if( exp instanceof Date)  text+=';expires='+exp.toGMTString();
                  if( path ) text+=';path='+path;
                  if( domain ) text+=';domain='+domain;
                  if( secure ) text+=';secure';

                  document.cookie = text;
            },
            unset:function(name,path,domain,secure){
                  this.set(name, '', new Date(0), path, domain, secure)
            }
      }
})();

;/*!
 * RobPub1 Package Delay
 * Arguments : duration , fnCallBack
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 * @version 2.0
 */
(function(){
      var delay = this.delay = function(duration,callBack){
            setTimeout(callBack,duration);
      }
})();

;/*!
 * RobPub1 Package Tipper
 * @version 2.0
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 */
(function(){

      var OSTipper = this.OSTipper = function() {
            this.item = $('#RobPub1Tipper2');
            this._init();
      };
      
      OSTipper.prototype = {
            _init:function(){
                  if( this.item.size() <=0 ) return false;
                  var top =(document.body.clientHeight)/2+document.documentElement.scrollTop;
                  top -=80;
                  var left = (document.body.clientWidth/2-this.item.clientWidth/2);
                  this.item.css('background-color','#FFF4E9').css('top',top+'px').css('left',left+'px');
            },
            show:function(){
                  this.item.show();
            },
            hide:function(callBack){
                  this.item.fadeOut(300,function(){
                        if(callBack != undefined) {
                              if(typeof callBack =='function') return callBack();
                              else return systemMsg.display(callBack);
                        }
                  });

            },
            delay:function(duration){
                  this.item.delay(duration);

            }
      }
      
})();


;/*!
 * RobPub1 SysMsg
 *
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 * @version 2.0
 */
(function(){

      var OSMsg = this.OSMsg = function(){
            if(! this.SysMsg ) this.SysMsg = this._create();
      };
     
      OSMsg.prototype={
            _create:function(){
                  if( $('#RobPub1SysMsg').size() >0 ) return $('#RobPub1SysMsg');

                  var div = $('<div id="RobPub1SysMsg"><p class="msg"></p><p class="closer"></p></div>');
                  div.appendTo( $('body') );
                  var top =(document.body.clientHeight)/2+document.documentElement.scrollTop;
                  var left = (document.body.clientWidth/2+80);
                  top -=80;
                  div.css({
                        top:top+'px',
                        left:left+'px'
                  });
                  return div;
            },
            display:function(msg,duration,callBack){
                  return this.show(msg, duration, callBack);
            },
            show:function(msg,duration,callBack){
                  var _duration ,callBackFunc = callBack;

                  if( $.isFunction(  duration  )  ){
                        var callBackFunc = duration;
                        _duration = 1300 ;
                        callBack = undefined;

                  } else  _duration = duration || 1300;
                  this.SysMsg.children('p.msg').html(msg).end().fadeIn(function(){
                        $(this).delay( ~~_duration ).fadeOut(function(){
                              if($.isFunction(callBackFunc)) return callBackFunc();
                        });
                  });
            },
            hide:function(){
                  this.SysMsg.fadeOut();
            },
            delay:function(duration){
                  this.SysMsg.delay(duration);
            }
      }

})();


;/*!
 * RobPub1 Package Dialog
 *
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 */
(function(){


      //Dialog
      var OSDialog = this.OSDialog = function(_dialog_id){
            this.id  = _dialog_id || '_RobPub1Dialog';

            this.dialogID = 'ui-dialog-title-' + this.id;

            if( ! this.dialog ) this.dialog = this._create();

      };
      OSDialog.prototype={
            _create:function(){
                  if($('[aria-labelledby="'+this.dialogID+'"]').size() != 0){
                        $('[aria-labelledby="'+this.dialogID+'"]').remove();
                        $('#'+this.id).remove();
                  //CollectGarbage();
                  //console.log('Object Removed!');
                  }

                  var _dlg = $('<div title="Dialog"></div>');
                  _dlg.attr('id',this.id);
                  $('body').append(_dlg);
                  var _h = document.body.clientHeight < 600 ? document.body.clientHeight : 600;

                  var that = this;
                  _dlg.dialog({
                        position:[200,100],
                        height:_h,
                        bgiframe: true,
                        autoOpen:false,
                        resizable:false,
                        buttons:{
                              '鍏抽棴':function(){
                                    $(this).dialog('close');
                              }
                        },
                        modal:true,
                        close:function(){
                        //$('[aria-labelledby="ui-dialog-title-'+that.id+'"] > *').remove();
                        //that.html('');
                        }
                  });
                  return _dlg;
            },
            html:function(_html){
                  if( ! this.dialog ) return false;
                  this.dialog.html(_html);
            },
            open:function(options){
                  if( ! this.dialog ) return false;
                  Tipper.hide();

                  if(options.height !=undefined){
                        options.height =  (document.body.clientHeight < options.height ? document.body.clientHeight : options.height);
                  }else options.height=document.body.clientHeight;
                  
                  if(options) this.dialog.dialog( options );

                  if(options.templet != undefined && options.templet != ''){
                    this.dialog.html(options.templet);
                  }
                  if( options.url !=undefined && options.url != '' ){
                        this.dialog.unbind('dialogopen');
                        this.dialog.html('<img src="/theme/default/images/ajax-loader-tr.gif">loading....');
                        this.dialog.bind('dialogopen',function(event,ui){
                              //Tipper.hide();
                              var obj = $(this);

                              $.ajax({
                                    url:options.url,
                                    type:'GET',
                                    async:true,
                                    success:function(data){
                                          //var s = eval(data);
                                          //alert(s['code']);
                                          if(data.length < 120 ) {
                                                var s = eval('('+data+')');
                                                obj.fadeOut(function(){
                                                      $(this).html( '<a href="/?app_act=login/">'+ s['msg'] +'</a>').fadeIn();
                                                });

                                                return false;
                                          }
                                          if(options.callBack != undefined && typeof options.callBack=='function')
                                                return options.callBack( obj, data );
                                          else 
                                                obj.fadeOut(function(){
                                                      $(this).html(data).fadeIn();
                                                });

                                    },
                                    error:function(jqXHR, textStatus, errorThrown){
                                          obj.fadeOut(function(){
                                                $(this).html(jqXHR.responseText)
                                                .append('<Br/>')
                                                .append('请求失败,请检查URL：<br/><font color=red>'+options.url + '</font>')
                                                .fadeIn();
                                          });
                                    //Tipper.hide();
                                    }
                              });

                        });
                  }
                  //Tipper.hide();
                  this.dialog.dialog('open');
                  return this.dialog;
            },
            close:function(){
                  this.dialog.dialog('close');
            }
      }
})();


;/*!
 * RobPub1 Package Validator
 *
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 */
(function(){
      //Validator

      var OSValidator = this.OSValidator = function(options){
            if(! options ) return false;
            this.opt = options;
            this.init();
      };

      OSValidator.prototype={
            options:{
                  xOffset     :   -20,
                  yOffset     :   20,
                  extendParam :   '',
                  hoverImg    :   '/theme/default/images/vtip_arrow.gif',
                  TipMsg      :   '',
                  url         :   ''
            },
            init:function(){
                  var that = this;
                  this.opt.frm.find('[reg]').hover(function(e){
                        if($(this).attr('tip') != undefined){
                              var top = (e.pageY + that.options.yOffset);
                              var left = (e.pageX + that.options.xOffset);
                              $('body').append( '<p id="rTip"><img id="rtipArrow" src="'+that.options.hoverImg+'"/>' + $(this).attr('tip') + '</p>' );
                              $('p#rTip').css("top", top+"px").css("left", left+"px");
                              $('p#vtip').bgiframe();
                        }
                  },function(){
                        if($(this).attr('tip') != undefined){
                              $("p#rTip").remove();
                        }
                  }).mousemove(
                        function(e) {
                              if($(this).attr('tip') != undefined){
                                    var top = (e.pageY + that.options.yOffset);
                                    var left = (e.pageX + that.options.xOffset);
                                    $("p#rTip").css("top", top+"px").css("left", left+"px");
                              }
                        }
                        ).blur(function(){
                        if($(this).attr("reg") == undefined){
                        //ajax_validate($(this));
                        }else{
                              that.validate($(this));
                        }
                  });
            },
            validate:function(obj){
                  var reg = new RegExp(obj.attr("reg"));
                  var objValue = obj.attr("value");
                  if(!reg.test(objValue)){
                        this.errorMsg.call(obj,true);
                        return false;
                  }else{
                        this.errorMsg.call(obj,false);
                        return true;
                  }
            },
            errorMsg:function(show){
                  if(show){
                        this.addClass('errorMsg');
                        if(this.siblings('span').size()>0)
                              this.siblings('span').css('color','red').html(this.attr('tip'));
                  }
                  else{
                        this.removeClass('errorMsg').css('background-color','');

                        if(this.siblings('span').size()>0) this.siblings('span').html('');
                  }
            },
            validateForm:function(frm){
                  var isSubmit = true;
                  var that = this;
                  frm.find("[reg]").each(function(){
                        if(!that.validate($(this))) isSubmit = false;
                  });
                  frm.find("[confirm]").each(function(){
                        var confirm = $(this).attr('confirm');

                        if( $(this).val() != $('#'+confirm).val()) {
                              that.errorMsg.call($(this),true);
                              isSubmit = false;
                        }else that.errorMsg.call($(this),false);
                  });
                  return isSubmit;
            },
            setUrl:function(url){
                  this.newUrl = url;
            },
            getURL:function(){
                  return this.newUrl;
            },
            post:function(callBackSuccess){
                  return this.postForm(callBackSuccess);
            },
            postForm:function(callBackSuccess){
                  var objFrm = this.opt.frm;
                  
                  var url = this.getURL() || this.opt.url || undefined;
 
                  if(! url || !objFrm ) {
                        systemMsg.display('楠岃瘉缂哄皯蹇呭鐨勫弬鏁癧 url鎴� objFrm ]');
                        return false;
                  }

                  var isSubmit = this.validateForm(objFrm);
                  if(! isSubmit ) {
                        //systemMsg.display('<h1 style="color:black">鎿嶄綔閿欒:</h1><br/>鎶辨瓑,鎮ㄨ緭鍏ョ殑閮ㄥ垎淇℃伅娌℃湁閫氳繃楠岃瘉,<br><br>璇锋鏌ョ孩鑹茶竟妗嗙殑鍐呭!');
                        return false;
                  }


                  Tipper.show();
                  var param = objFrm.serialize() +'&'+this.options.extendParam;

                  $.ajax({
                        url:url,
                        data:param,
                        type:'POST',
                        dataType:'json',
                        success:function(data){
                              if(callBackSuccess != undefined && typeof callBackSuccess =='function'){
                                    if(data.code == -401) {
                                        Tipper.hide( data.msg  );
                                        return false;
                                    }
                                     
                                    var msg = callBackSuccess(data);
                                    if( typeof msg != 'string')  msg = null;
                                    Tipper.hide( msg  || null );
                                    return false;
                              }
                        },
                        error:function(jqXHR, textStatus, errorThrown){
                              Tipper.hide('<h1 style="color:black">鎻愮ず:璇锋眰澶辫触</h1><br/>閿欒浠ｇ爜:'
                                    +jqXHR.status +'<br/>閿欒浠ｇ爜锛�'
                                    +errorThrown+'<br/>閿欒淇℃伅:'
                                    +'<div style="font-size:12px;">'+jqXHR.responseText+'</div>');
                              return false;
                        }

                  });

                  return true;
            }
      }
})();

;/*!
 * RobPub1 Package Grid
 * Last Modified : 9/6/2011
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 */
(function(){
      var OSGrid = this.OSGrid = function(options){
            this.options = options;
            this.sortParameter = '';
            this.init();
      };
      OSGrid.prototype = {
            init:function(){

                  if(! this.options.pageList) this.options.pageList = '#page_list';
                  if(! this.options.loader) this.options.loader = '#myList';
                  this.getColumns();
                  this.makeResizable();
                  this.doRequest();
            //if(window.console && console.log) console.log('Initialized');
            },
            getColumns:function(){
                  var obj = $('#'+this.options.tableID);
                  if(obj.size() <= 0) throw 'can not find TABLE ID';

                  this.tableColumns = obj.find('th');
                  this.primary_key = obj.attr('primary_key');
                  //this.appendTableHead();
                  return true;
            },
            
            makeResizable:function(){
                  var that = this;
                  if( ! this.tableColumns ) return false;
                  if(this.tableColumns.find('.ui-resizable').size()!=0) {
                        return false;
                  }

                  //Normal Columns
                  var columnsNormal = this.tableColumns.find('.res');

                  if(columnsNormal.size() <=0) return;

                  $.each(columnsNormal,function(i,v){
                        $(v).resizable({
                              handles:'e',
                              maxHeight:40,
                              minWidth:20,
                              maxWidth:400,
                              alsoResize:'table[name="'+that.options.tableID+'_content"] .rec[key="'+$(v).parent().attr('key')+'"]'
                        }).hover(function(){
                              $(this).addClass('rob-grid-header-hover');
                        },function(){
                              $(this).removeClass('rob-grid-header-hover');
                        });
                  });


                  //CheckBox
                  var columnsCheckBox  = this.tableColumns.find(':checkbox');
                  if (columnsCheckBox.size() != 0) {
                        columnsCheckBox.each(function(){
                              $(this).attr('col', that.primary_key).click(function(){
                                    $(':checkbox[pk="' + that.primary_key + '"]').attr('checked', $(this).attr('checked')).trigger('change');
                              });
                        });
                  }

                  $('.ui-resizable').click(function(){
                        return false;
                  });


                  //Sortable
                  var sortable = $('#'+this.options.tableID + ' th[sortable]');
                 
                  if( sortable.size() >0 ){
                        sortable.unbind( 'click' );
                        
                        sortable.css('cursor','pointer').toggle(function(){
                              $(this).attr('title','闄嶅簭').children('.res').removeClass('up').addClass('down');

                              var sortkey=$(this).attr('sortkey');
                              if(typeof(sortkey)=='undefined'){
                                  sortkey=$(this).attr('key');
                              }
                              
                              if( $.isFunction( that.options.onSort ) )
                                    return that.options.onSort(sortkey,'DESC');
                              else
                                    return that.onSort(sortkey,'DESC');
                        },function(){
                              $(this).attr('title','鍗囧簭').children('.res').removeClass('down').addClass('up');

                              var sortkey=$(this).attr('sortkey');
                              if(typeof(sortkey)=='undefined'){
                                  sortkey=$(this).attr('key');
                              }
                              
                              if( $.isFunction( that.options.onSort ) )
                                    return that.options.onSort(sortkey,'ASC');
                              else
                                    return that.onSort(sortkey,'ASC');
                        });
                  };
            //End Sortbal


            },
            onSort:function(key,asc){
                  
            },
            doRequest:function(){
                  if( ! this.options.requestUrl ) return false;
                  var that = this;
                  Tipper.show();
                  var urlAppend = '';
                  if(this.options.requestExtend != undefined)
                        urlAppend = encodeURI(this.options.requestExtend,'UTF-8');
                  //璇锋眰鍒楄〃椤垫暟鎹�
                  $.getJSON(this.options.requestUrl+urlAppend + this.sortParameter,'',function(json){
                        that.requestCallBack2(json);
                        Tipper.hide();
                  });
            },
            onCallBack:function(data){
                  return data;
            },
            requestCallBack2:function( JSON  ){
                  var table = this.createContainer();
                  var that = this;
                  var data = JSON;
                  this.onCallBack(data);
                  if(data.data.page_items == null || data.data.page_items == '') {
                        $(that.options.pageList).hide();
                        $(that.options.loader).html('<div class="rob-empty-record"><span class="rob-empty-alert"></span>抱歉,没有查询到任何数据!</div>');
                        return;
                  }
                  $.each(data.data.page_items,function(di,dv){
                        var tr = $('<tr></tr>');
                        tr.addClass('row').attr('primary_value',dv[that.primary_key]);
                        $.each(that.tableColumns,function(i,v){
                              if($(v).children(':checkbox').size() !=0 ) {
                                    tr.append(that.colCheckBox($(v),dv[that.primary_key]));
                                    return;
                              }
                              if($(v).attr('key') == '_cmd') {
                                    tr.append(that.colCmd($(v),dv[that.primary_key]));
                                    return;
                              }
                              tr.append(that.colNormal($(v),dv[$(v).attr('key')]));
                              return;
                        });
                        table.append(tr);
                  });
                  //鍒嗛〉涓嬬殑鍒嗛〉鏉�
                  $(that.options.pageList).html(this.pageList(data.data.page_info, data.data.page_link)).show(); 
                  $(that.options.loader).html(table).fadeIn();
                  this.tableEffect();
                  if(this.options.editable) {
                        new Editable(this.options,table);
                  }
            },
            createContainer:function(){
                  var table = $('<table  cellpadding="0" cellspacing="0" border="0" id="RobPub1Container"  name="'+this.options.tableID+'_content" ></table>');
                  //Set Attr
                  return table;
            },
            colNormal:function(obj,value){
                  var td = $('<td></td>');
                  td.attr({
                        key:obj.attr('key'),
                        editable: obj.attr('editable')
                  }).css('display',obj.css('display'));
                  var div = $('<div></div>');
                  //edited by maowei 2016.08.12 原来td内填充DIV并在DIV上加宽度，现在是改为TD上加宽度
                  td.css('width',obj.children('.res').css('width')).attr('key',obj.attr('key')).addClass('rec');
                  //edit by dyb 2015.12.29
                  var white_space = obj.children('.res').css('white-space');
                  if(white_space){
                      div.css('white-space', white_space);
                  }
                  //edited by maowei 2016.08.12 原来td内填充DIV并在DIV上加数据，现在是改为TD上加数据
                  td.append(value);
                  //td.append(div);
                  return td;
            },
            colCheckBox:function(obj,value){
                  var td = $('<td></td>');

                  td.css('display',obj.css('display'));
                  var div = $('<div></div>');
                  var checkbox = $('<input type="checkbox" />');

                  checkbox.attr('value',value).attr('pk',this.primary_key).change(function(){
                        if( $(this).attr('checked') ){
                              $('tr[primary_value="'+value+'"] ').addClass('ui-row-checked');
                        }else $('.ui-row-checked').removeClass('ui-row-checked');
                  });
                  //div.css('width',obj.attr('vwidth')).attr('key',obj.attr('key')).addClass('rec');

                  //div.append(checkbox);
                  td.append(checkbox);
                  return td;
            },
            colCmd :function(obj,val){
                  var td = $('<td></td>');
                  var div = $('<div></div>');
                  var that = this;
                  var html = obj.children('.rob_cmd').html();
                  var link = $('<span style="cursor:pointer">'+html+'</span>');

                  link.click(function(){
                        var data = {
                              primary_key:that.primary_key,
                              primary_value:val,
                              type:obj.attr('type')
                        };
                        //$('tr[primary_value="'+val+'"]').addClass('ui-row-checked');
                   
                        that.onEdit(data);
                        return false;
                  });
                  div.append( link );

                  div.attr('key',obj.attr('key')).addClass('rob_cmd_list');
                  td.append(div);
                  return td;
            },
            tableEffect:function(){

                  //if IE
                  if ( $.browser.msie ) {
                        //edited by maowei on 20160812 改变偶行背景颜色为无色
                        $('tr.row').filter(':odd')
                        .find('td').css('background-color','');

                        $('tr.row').mousemove(function(){
                              $(this).find('td').addClass('ui-hover_before');
                        }).mouseout(function(){
                              $(this).find('td').removeClass('ui-hover_before');
                        });

                  }else{
                        $('tr.row').hover(function(){
                              $(this).addClass('ui-hover_before');
                        },function(){
                              $(this).removeClass('ui-hover_before');
                        }).filter(':odd').addClass('odd');
                  }
            },
            pageList:function(page_info,page_link){
                  var result = '';
                  result += '     <div class="os_main_page_count">';
                  result += '         '+page_info;
                  result += '     </div>';
                  result += '     <div class="os_main_page_jump">';
                  result += '         <div class="os_list_page_content">';
                  result += '             <ul><li>';
                  result += '             '+page_link;
                  result += '         </div>';
                  result += '      </div>';
                  return result;

            }

      }

})();


;/*!
 * RobPub1 Package Editable
 *
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 */
(function(){
      var Editable = this.Editable= function(option,table){
            //Load options from Grid
            this.options = option;
            //Object Table
            this.table = table;
            //Default function
            this.init();
            this.updateData();
      };

      Editable.prototype={

            init:function(){

                  var obj = $('#'+this.options.tableID);
                  var colHead = obj.children().find('th[editable]');  //Find object by attr editable
                  if(colHead.size() <=0 ) return false;

                  var that = this;

                  colHead.each(function(){
                        //$(this).css('color','red');         //for temp
                        var key = $(this).attr('key');     //attr key

                        //Find elements under current value of key
                        var objEdit = that.table.children().find('td[key="'+key+'"]');
                        if(objEdit.size() <=0)  return false;


                        //if there's no any args , then return;
                        if(that.options.editableParam[key] ==undefined ) return false;

                        //Also need setup element's type and group options
                        //Reset Element value
                        objEdit.children('.rec').each(function(){
                              var type = that.options.editableParam[key]['type'];
                              if(type =='text' ) return;

                              var oriHTML = $(this).html();
                              var newHtml = that.options.editableParam[key]['group'][oriHTML];
                              if(type=='img') $(this).html('<img src="'+newHtml+'" />');
                              else $(this).html(newHtml);
                        });



                        //Temp Editor
                        var edt =that.createEditor();

                        if($(this).attr('editable') == 'false') return;
                        //Bind Click Event;
                        //Click Editable Element to do edit
                        objEdit.each(function(){
                              $(this).unbind('click').unbind('dblclick');
                              var parent = $(this).parent();
                              var options  = that.options.editableParam;
                              var myOptions = that.options.editableParam[key];
                              var type = myOptions['type'];

                              if(type == 'img'){
                                    var obj = $(this).find('img');
                                    if(obj.size() <= 0) return false;



                                    obj.click(function(){
                                        

                                          var finder = '',valNew='';
                                          var objImg = $(this);
                                          $.each(myOptions['group'],function(i,v){
                                                if(objImg.attr('src') != v) {
                                                      finder =v;
                                                      valNew =i;
                                                }
                                          });
                                          //$(this).attr('src',finder);

                                          var param = "field="+key+
                                          '&value='+encodeURI(valNew,'UTF-8')+'&primary_value='
                                          +encodeURI(parent.attr('primary_value'),'UTF-8');

                                          var table = myOptions.table||options.table;

                                          param += '&primary_key='+options.primary_key+'&table='+table;

                                          getJSON(options.postUrl,param,function(json){
                                              systemMsg.display(json.msg,3000);
                                              if(json.code==0){
                                                objImg.attr('src',finder);
                                              }
                                          });
                                          return false;
                                    });
                              }else{
                                    $(this).click(function(){
                                          //Remove red border of  last marked element
                                          $('.RobPub1BlueBorder').removeClass('RobPub1BlueBorder');

                                          //Mark with red border;
                                          $(this).children('.rec').addClass('RobPub1BlueBorder');
                                    }).dblclick(function(){
                                          //Clear Tipper
                                          $('#RobPub1EditTipper').html('').hide();
                                          //Set this primary value
                                          //If already setup by options group,then use it ,by default
                                          $('#RobPub1HidPV').val( parent.attr('primary_value'));
                                          if(myOptions['field'] != undefined)
                                                $('#RobPub1HidPK').val(myOptions['field']);
                                          //Else use current column name
                                          else $('#RobPub1HidPK').val(key);

                                          //Mutiplt table support
                                          if(myOptions['table'] != undefined)
                                                $('#RobPub1HidTBL').val(myOptions['table']);
                                          else $('#RobPub1HidTBL').val(options['table']);
                                          //Reset tempeditor's css style and clear inner html
                                          edt.children('#RobPub1EdtContent').html('').end()
                                          .css('top',$(this).offset().top+30).css('left',$(this).offset().left+3);

                                          var children = $(this).children('.rec');
                                          //Get children innerhtml
                                          var oriHTML = children.html();

                                          //Diffrent type,diffrent way to edit
                                          //Support: text,radio,select
                                          switch(myOptions['type']){

                                                //Start of radio
                                                case 'radio':

                                                      $.each(myOptions['group'],function(i,v){
                                                            if( oriHTML == v ) checked='checked';
                                                            else checked='';
                                                            edt.children('#RobPub1EdtContent').
                                                            append('<input '+checked+' type="radio" val="'+v+'" name="'+key+'" value="'+i+'">'+v);
                                                      });
                                                      break;
                                                //End of radio

                                                //type of text
                                                case 'text':
                                                      var obj = $('<input type="text" value="'+oriHTML+'" name="'+key+'" />');
                                                      edt.children('#RobPub1EdtContent').html(obj);
                                                      break;
                                                //type of select
                                                case 'select':
                                                      var obj = $('<select name="'+key+'"></select>');

                                                      getJSON(myOptions['loadUrl'],function(data){

                                                            $.each(data,function(i,v){
                                                                  if(oriHTML == v['name'])
                                                                        obj.append('<option selected value="'+v['value']+'">'+v['name']+'</option>');
                                                                  else
                                                                        obj.append('<option value="'+v['value']+'">'+v['name']+'</option>');
                                                            });
                                                      });
                                                      edt.children('#RobPub1EdtContent').html(obj);
                                                      break;
                                          }
                                          edt.hide().fadeIn();

                                    });
                              }
                        });

                  });

            },
            createEditor:function(){
                  var edt = $('<div id="RobPub1Editor" style="z-Index:99999"><div id="RobPub1EdtContent"></div><div id="RobPub1EditTipper"></div></div>');
                  var btnEdt = $('<input type="button" id="RobPub1ColEditor" value="鏇存柊"/>');
                  var btnCalcel = $('<input type="button" value="鍙栨秷"/>');
                  btnCalcel.click(function(){
                        edt.hide();
                        $('.RobPub1BlueBorder').removeClass('RobPub1BlueBorder');
                  });
                  var warp1 = $('<div></div>');
                  warp1.append('<input type="hidden" id="RobPub1HidPV" value="" />');
                  warp1.append('<input type="hidden" id="RobPub1HidPK" value="" />');
                  warp1.append('<input type="hidden" id="RobPub1HidTBL" value="" />');
                  warp1.append(btnEdt).append(btnCalcel).appendTo(edt);
                  if($('#RobPub1Editor').size() !=0) return $('#RobPub1Editor');
                  edt.appendTo(  $('body') );
                  return edt;
            },
            updateData:function(){
                  var that = this;
                  $('#RobPub1ColEditor').unbind('click');
                  $('#RobPub1ColEditor').click(function(){
                        var s = $('#RobPub1EdtContent').find(':input');
                        var value = '';
                        if(s.size() !=1){
                              value=$('#RobPub1EdtContent').find(':checked').val();
                              var html = $('#RobPub1EdtContent').find(':checked').attr('val');
                              if(s.attr('vt') != undefined){
                                    html = '<img src="'+html+'" />';
                              }
                              $('.RobPub1BlueBorder').html( html ).removeClass('RobPub1BlueBorder');
                        }
                        else{

                              if(s.is('select')){
                                    value = s.val();
                                    $('.RobPub1BlueBorder').html(s.children('option:selected').html()).removeClass('RobPub1BlueBorder');
                              }else{

                                    if(that.options.editableParam[s.attr('name')]['reg'] !=undefined){

                                          var reg = that.options.editableParam[s.attr('name')]['reg'];

                                          if(! reg.test(s.val())){
                                                s.addClass('errorMsg');
                                                $('#RobPub1EditTipper').html(that.options.editableParam[s.attr('name')]['tip'] || '鎮ㄨ緭鍏ョ殑鍐呭涓嶇鍚堣鑼�!').show();
                                                s.focus();
                                                return false;
                                          }else {
                                                s.removeClass('errorMsg');
                                                $('#RobPub1EditTipper').html('').hide();
                                          }
                                    }else{
                                          if(! s.val() ){
                                                s.addClass('errorMsg');
                                                $('#RobPub1EditTipper').html('鎮ㄤ笉鑳借緭鍏ョ┖鏂囨湰!').show();
                                                s.focus();
                                                return false;
                                          }else{
                                                s.removeClass('errorMsg');
                                                $('#RobPub1EditTipper').html('').hide();
                                          }
                                    }

                                    $('.RobPub1BlueBorder').html(s.val()).removeClass('RobPub1BlueBorder');
                                    value = s.val();
                              }

                        }
                        var table = $('#RobPub1HidTBL').val() || that.options.editableParam.table;
                        var param = "field="+$('#RobPub1HidPK').val()+'&value='+encodeURI(value,'UTF-8')+'&primary_value='+encodeURI($('#RobPub1HidPV').val(),'URTF-8');
                        param += '&primary_key='+that.options.editableParam.primary_key+'&table='+table;
                        getJSON(that.options.editableParam.postUrl,param,function(json){
                            //if (json.code == 0) {
                                systemMsg.display(json.msg,3000);
                            //}
                        });
                        $('#RobPub1Editor').hide();
                  });
            }

      }
})();


;
/*!
 * RobPub1 Package SingleResize
 * Arguments : url, data, callback
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 */
(function(){
      var resize = this.resize=function(){
            var target = $('th[key !=""]');
            target.each(function(){
                  var self = $(this);
                  $(this).find('.res').resizable({
                        handles:'e',
                        maxHeight:40,
                        minWidth:20,
                        maxWidth:400,
                        alsoResize:'.rec[key="'+self.attr('key')+'"]'
                  });

                  if ( $.browser.msie ) {
                        $('tr.row').filter(':odd')
                        .find('td').css('background-color','#e5eef5');

                        $('tr.row').mousemove(function(){
                              $(this).find('td').addClass('ui-hover_before');
                        }).mouseout(function(){
                              $(this).find('td').removeClass('ui-hover_before');
                        });
                  }else{
                        $('tr.row').hover(function(){
                              $(this).addClass('ui-hover_before');
                        },function(){
                              $(this).removeClass('ui-hover_before');
                        }).filter(':odd').addClass('odd');
                  }

                  
            });
      }
})();
;/*!
 * RobPub1 Package getJSON
 * Arguments : url, data, callback
 * Copyright 2011, AUTHORS.txt (http://www.baison.com.cn)
 * Roban Lee robanlee@gmail.com
 */
(function($){
      var getJSON  = this.getJSON = function( url, data, callback ){

            if ( $.isFunction( data ) ) {
                  callback = data;
                  data = undefined;
            }
            var callBack = callback || false;
            return $.ajax({
                  type: 'GET',
                  url: url,
                  data: data,
                  success: function(data){
                        if( data.code ==-412 ) {
                              systemMsg.display('鐧诲綍瓒呮椂,璇烽噸鏂扮櫥褰�', 1000, function(){
                                    location.href = '/';
                                    return false;
                              });

                              return false;
                        }else if( data.code ==-401 ) {
                             systemMsg.display('鏈垎閰嶆鏉冮檺锛岃鑱旂郴绠＄悊鍛�', 1000, function(){
                                    location.href = '/';
                                    return false;
                              });

                              return false;
                        }
                       
                        if( callBack ) return callBack(data);
                  },
                  dataType: 'JSON'
            });
      }
})(jQuery);
var modCheckPages = {
      check:function(maxPage,callBack){
            resetTop();
            var str = callBack+'_'+maxPage;
            if(str.indexOf('.'>0)) {
                str = str.replace('.', '_');
            }
            var page = $('#'+str+'gotopage').val();
            if( ! /^\d/.test ($('#'+str+'gotopage').val()) || $('#'+str+'gotopage').val()> maxPage)
                  page=1;
            return  eval( callBack + '('+page+')' );
      }
}
var modClearTimer = {
    init:function(){
        //鐢ㄦ潵瀛樻斁褰撳墠姝ｅ湪鎿嶄綔鐨勬棩鏈熸枃鏈鐨勫紩鐢�
        var datepicker_CurrentInput;
        // 璁剧疆DatePicker 鐨勯粯璁よ缃�
        $.datepicker.setDefaults({ showButtonPanel: true, currentText: '娓呯┖', beforeShow: function (input, inst) { datepicker_CurrentInput = input; } });
        // 缁戝畾鈥淒one鈥濇寜閽殑click浜嬩欢锛岃Е鍙戠殑鏃跺€欙紝娓呯┖鏂囨湰妗嗙殑鍊�
        $(".ui-datepicker-current").live("click", function (){
            datepicker_CurrentInput.value='';
        });
    }
}