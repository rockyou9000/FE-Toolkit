
// 核心或者基础模块
!function(window,document){

    function Es(arr){
        this.length=arr.length
        for(var i=0;i<this.length;i++){
            this[i]=arr[i]
        }
    }

    Es.prototype.obj_type='Es'

    window.$=function(str,dom){

        dom=dom || document

        if(str.nodeName)return new Es([str])

        if(str.obj_type=='Es')return str

        if(typeof str=='string')return new Es(dom.querySelectorAll(str))

        if('length' in str)return new Es(str)
    }

    $.fn=Es.prototype
}(window,document),

// 扩展方法
function(fn,$,ufind){

    fn.for=function(fun){
        for(var i=0;i<this.length;i++)
            fun.call(this[i],i)

        return this
    }
    fn.each=function(fun){
        for(var i=0;i<this.length;i++){
            if(fun.call(this[i],i)===false)
                return this
        }
        return this
    }


    fn.indexOf=function(el){
        if('length' in el)el=el[0]
        return Array.prototype.indexOf.call(this,el)
    }


    fn.css=function(name,value){
        switch(arguments.length){
            case    0:
                return window.getComputedStyle(this[0])
            case    1:
                return window.getComputedStyle(this[0])[name]
            default :
                return this.for(function(){
                    this.style[name]=value
                })
        }
    }

    fn.show=function (){
        return this.css('display','block')
    }
    fn.hide=function (){
        return this.css('display','none')
    }


    // 扩展class操作
    fn.addClass=function(name){
        return this.for(function(){
            this.classList.add(name)
        })
    }
    fn.removeClass=function(name){
        return this.for(function(){
            this.classList.remove(name)
        })
    }
    fn.hasClass=function(name){
        return this[0].classList.contains(name)
    }
    fn.toggleClass=function(name){
        return this.for(function (){
            this.classList.toggle(name)
        })
    }


    fn.hasAttr=function(name){
        return this[0].hasAttribute(name)
    }
    fn.removeAttr=function(name){
        return this.for(function(){
            this.removeAttribute(name)
        })
    }
    fn.attr=function(name,value){
        switch(arguments.length){
            case    0:
                return this[0].attributes
            case    1:
                return this[0].getAttribute(name)
            default :
                return this.for(function(){
                    this.setAttribute(name,value)
                })
        }
    }
    fn.value=function(str){
        if(arguments.length)
            return this.for(function (){
                this.value=str
            })
        return this[0].value
    }
    fn.html=function (str){
        if(arguments.length)
            return this.for(function (){
                this.innerHTML=str
            })
        return this[0].innerHTML
    }
    fn.addHtml=function(str){
        return this.for(function (){
            this.innerHTML+=str
        })
    }


    // dom操作
    fn.find=function(str){
        var newEl=[]

        for(var i=0;i<this.length;i++){
            var theEl=this[i]

            if(!theEl.id){
                theEl.id='id'+(new Date()).getTime()
                theEl.ID=true;
            }

            str='#'+theEl.id+' '+str;

            var els=theEl.ownerDocument.querySelectorAll(str)
            if(theEl.ID){
                theEl.removeAttribute('id')
                delete theEl.ID
            }
            for(var i2=0;i2<els.length;i2++){
                newEl.push(els[i2])

            }
        }

        return $(newEl)
    }
    var dom={
        '<':'parentElement',
        '>':'children',
        '+':'nextElementSibling',
        '-':'previousElementSibling',
    }
    fn.dom=function(str){

        var the=this[0]

        str=str.split('')

        for(var i=0;i<str.length;i++){
            the=the[dom[str[i]]]
            if(!the)return null

            if('length' in the){
                if(i==str.length-1)
                return $(the)

                the=the[0]
            }
        }

        return $(the)
    }
    fn.remove=function (){
        return this.for(function (){
            this.parentElement.removeChild(this)
        })
    }
    fn.insert=function (el,dom){
        var the=this[0]
        if(el.length)el=el[0]

        switch(dom){
            case '-':
                the.parentElement.insertBefore(el,the)
                the.parentElement.insertBefore(the,el)
                break
            case '+':
                the.parentElement.insertBefore(el,the)
                break
            case '<':
                var children=the.childNodes
                if(children.length)
                    the.insertBefore(el,children[0])
                else
                    the.appendChild(el)
                break

            default:
                the.appendChild(el)
        }
        return this
    }
}($.fn,$),


// 模版模块
function($){

    function isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    // 生成模版方法的方法
    function temp(str,filter,filtertype){

        str=str.split('{');
        for(var i=1;i<str.length;i++){
            var index=str[i].indexOf('}');

            str[i]={
                key : str[i].slice(0,index),
                str : str[i].slice(index+1)
            };
        }

        return new Temp(str,filter,filtertype);
    }

    // 模板对象
    function Temp(data,filter,filtertype){
        this.data=data;
        this.filter=filter;
        this.page=0;
        this.filtertype=filtertype
    }

    // 输出模板
    Temp.prototype.tohtml=function (data){
        if(!isArray(data))data=[data];

        if(this.filter){
            if(this.filtertype){
                for(var i=0;i<data.length;i++)
                    data[i]=this.filter(data[i]) || data[i]
            }
            else
                data=this.filter(data) || data
        }


        var str=this.data;
        var html='';
        var str2;

        for(var i=0;i<data.length;i++){
            str2=str[0];
            for(var i2=1;i2<str.length;i2++){
                
                switch(str[i2].key){
                    case '$this':
                        str2+=data[i]+str[i2].str;
                        break
                    case '$index':
                        str2+=i+str[i2].str;
                        break
                    default:
                        str2+=data[i][str[i2].key]+str[i2].str;
                }
            }
            html+=str2;
        }
        return html;
    }

    // 输出为div元素
    Temp.prototype.todiv=function (data){
        this.page++;
        var div=document.createElement('div');
        div.innerHTML = this.tohtml(data);
        div.dataset.page=this.page;
        return div;
    }

    $.temp=temp;
}($),


// 数据绑定模块
function (define,temp,$){

    // 表示正在获取焦点的输入框
    var focus_input

    // 绑定输入事件，实现双向绑定
    document.addEventListener('input',function (e){
        var input=e.target
        focus_input = input

        if(input.bind_data){
            input.bind_data[input.bind_type]=input.value
        }
    },true)
    document.addEventListener('blur',function (e){
        focus_input = null
    },true)


    function bind(data){

        set_hidden_value(data,'_bind',{
            text : {},
            input : {},
            attr : {},
        })

        set_hidden_value(data,'_data',{})
        set_hidden_value(data,'_temp',{})
        set_hidden_value(data,'_tag',{})


        var attr


        // 绑定（b='属性名'）
        var text=document.querySelectorAll('[b]')
        for(var i=0;i<text.length;i++){

            attr = text[i].getAttribute('b')

            if(attr.charAt(0)==':')
                bind_b_temp(text[i],attr.slice(1),data)
            else
                bind_b(text[i],attr,data)
        }


        // 绑定（:src='属性名'）,和（$click='alert1,alert2'）
        var tag=document.querySelectorAll('*')
        for(var i=0;i<tag.length;i++){
            if(tag[i].attributes.length){
                var attr=tag[i].attributes
                for(var i2=0;i2<attr.length;i2++){


                    var name = attr[i2].name
                    var value=attr[i2].value

                    
                    if(name.indexOf('::')!=0)continue
                    name=name.slice(2)

                    tag[i].setAttribute(name,'')
                    var n_attr=attr.getNamedItem(name)

                    if(value.indexOf(':')==0)
                        bind_attr_temp(n_attr,value.slice(1),data)
                    else
                        bind_attr(n_attr,value,data)
                }
            }
        }



        // 汇总html绑定的属性，
        for(var name in data._temp){
            if(!(name in data))data[name]=''
        }
        for(var i in data._bind){
            for(var name in data._bind[i]){
                if(!(name in data))data[name]=''

                // 整理tag标签
                if(!data._tag[name])
                    data._tag[name]=[]
                data._tag[name]=data._tag[name].concat(data._bind[i][name])

                //ownerElement
            }
        }


        // 绑定tag标签
        for(var i in data._tag){

            for(var i2=0;i2<data._tag[i].length;i2++)
            if(data._tag[i][i2].ownerElement)
                data._tag[i][i2]=data._tag[i][i2].ownerElement

            if(data._tag[i].length==1)
                data._tag[i]=data._tag[i][0]
        }

        // 设置get set并初始化
        for(var name in data){
            data._data[name] = data[name]
            get_set(data,name)
        }

        return data
    }

    function set_hidden_value(data,name,value){
        define(data ,name, {
            enumerable : false,
            value : value,
        })
    }

    function bind_b(text,attr,data){

        if(text.tagName=='INPUT' || text.tagName=='TEXTAREA'){

            if(!data._bind.input[attr])data._bind.input[attr]=[]
            data._bind.input[attr].push(text)

            text.bind_type=attr
            text.bind_data=data
        }
        else{
            if(!data._bind.text[attr])data._bind.text[attr]=[]
            data._bind.text[attr].push(text)
        }
    }

    function bind_b_temp(text,attr,data){
        var t=temp(attr)
        var key
        for(var i=1;i<t.data.length;i++){
            key=t.data[i].key

            if(!data._temp[key])data._temp[key]=[]
            data._temp[key].push({
                tag : text,
                temp : t,
                value : 'innerHTML'
            })
        }
    }

    function bind_attr(attr,value,data){

        if(!data._bind.attr[value])
        data._bind.attr[value]=[]
        data._bind.attr[value].push(attr)
    }

    function bind_attr_temp(attr,value,data){
        var t=temp(value)
        var key
        for(var i=1;i<t.data.length;i++){
            key=t.data[i].key

            if(!data._temp[key])data._temp[key]=[]
            data._temp[key].push({
                tag : attr,
                temp : t,
                value : 'value'
            })
        }
    }

    function get_set(data,name){
        define(data,name,{
            set: function (value){
                setData(data,name,value)
            },
            get: function(value){
                return this._data[name]
            },
        })

        // 初始化
        data[name]=data[name]
    }

    function setData(data,name,value){

        data._data[name]=value

        if(data._bind.input[name]){
            var inputs = data._bind.input[name]
            for(var i=0;i<inputs.length;i++)
                if(focus_input!=inputs[i])
                    inputs[i].value=value
        }

        if(data._bind.text[name]){
            var texts = data._bind.text[name]
            for(var i=0;i<texts.length;i++)
                texts[i].innerHTML=value
        }

        if(data._bind.attr[name]){
            var attrs = data._bind.attr[name]
            for(var i=0;i<attrs.length;i++)
                attrs[i].value=value
        }

        if(data._temp[name]){
            var temps = data._temp[name]
            for(var i=0;i<temps.length;i++)
                temps[i].tag[temps[i].value]=temps[i].temp.tohtml(data._data)
        }
    }

    $.bind=bind
}(Object.defineProperty,$.temp,$),


// 事件绑定
function (document,$){

    var events=['click','focus','blur','input']
    var focus_el=['INPUT','TEXTAREA']

    for(var i=0;i<events.length;i++)
        document.addEventListener(events[i],event,true)

    function getFn(name){

        var fn=$.event

        name=name.split('(')
        var value=name[1]

        if(!value)value=')'
        value=JSON.parse('['+value.slice(0,value.length-1)+']')

        name=name[0].split('.')

        for(var i=0,length=name.length;i<length;i++){
            fn=fn[name[i]]
            if(!fn)break
        }

        return {
            fn : fn,
            value : value
        }
    }

    function event(e){

        var type=':'+e.type
        var tag=e.target
        var eventName
        var fn
        while(tag && tag!=document){

            eventName = tag.getAttribute(type)
            if(eventName){

                eventName=eventName.split(';')

                for(var i2=0;i2<eventName.length;i2++){

                    fn=getFn(eventName[i2])
                    if(typeof fn.fn=='function'){
                        fn.value.unshift(e)
                        fn.fn.apply(tag,fn.value)

                        if(e.stop)
                        break
                    }
                }

                if(e.stop)
                break
            }

            tag=tag.parentNode
        }

        if(e.stop && e.stopPropagation)
            e.stopPropagation()

        if(e.def && e.preventDefault)
            e.preventDefault()

        
        if(e.url)
        if(!e.def){
            if(window.mui){
                mui.openWindow(e.url)
            }
            else
                window.open(e.url,'_self')
        }

        if(type==':click'){
            var tag=e.target
            var input=tag
            if(focus_el.indexOf(input.nodeName)==-1){

                while(tag && tag!=document){
                    if(tag.nodeName=='LABEL'){
                        input=tag.querySelector(focus_el.toString()) || document.querySelector('#'+tag.getAttribute('for'))
                        if(input)
                            break
                    }
                    tag=tag.parentNode
                }
            }

            if(input && focus_el.indexOf(input.nodeName)==-1)
                document.activeElement.blur()
            else
                tag.focus()
        }
    }

    $.event={}
    $.bindEvent=function(type){
        if(events.indexOf(type)!=-1)return
        events.push(type)
        document.addEventListener(type,event,true)
    }

    window.eve=$.event

    $.event.stop=function (e){
        e.stop=true
    }
    $.event.def=function (e){
        e.def=true
    }
    $.event.url=function (e,url){
        if(!e.url)
            e.url=url
    }
}(document,$),


// tap to click补丁
function(document){

    var focus_el=['INPUT','TEXTAREA']

    var xy1,xy2,xy3,
        time1,time2,time3,
        event_data

    document.addEventListener('touchstart',start,true)
    document.addEventListener('touchmove',move,true)
    document.addEventListener('touchend',end,true)

    function start(e){
        time1 = e.timeStamp
        xy3 = xy1 = [e.touches[0].clientX,e.touches[0].clientY]
        xy2 = null
    }

    function move(e){
        time2=e.timeStamp
        xy2 = [e.touches[0].clientX,e.touches[0].clientY]
    }

    function end(e){
        
        time3 = e.timeStamp
        if(xy2){
            xy3 = xy2
        }

        if(time3 - time1 <300){

            if((!xy2) || Math.abs(xy3[0]-xy1[0])<3 && Math.abs(xy3[1]-xy1[1])<3){
                e.preventDefault()
                toClick(e.target,document.createEvent('MouseEvents'))
            }
        }

    }

    function toClick(tag,eve){

        eve.initMouseEvent('click',true,true)
        eve.clientX = xy3[0]
        eve.clientY = xy3[1]
        eve.tapToClick = true

        tag.dispatchEvent(eve)
    }

}(document),


// 工具
function (window,JSON,$){

    $.null_fun=function(){}

    $.getUrlData=function(){

        var arr=decodeURI(location.search.slice(1)).split('&')
        var str
        var data={}

        if(arr[0])
        for(var i=0;i<arr.length;i++){
            str=arr[i].split('=')
            data[str[0]]=str[1]
        }

        return data
    }

    $.setUrlData=function(data){
        var arr=[]
        for(var name in data){
            arr.push(name+'='+data[name])
        }

        return encodeURI(arr.join('&'))
    }

    $.objJoin=function(obj,obj2){
        for(var name in obj2){
            obj[name] = obj2[name]
        }
    }
    $.tostr=function(obj){
        return JSON.stringify(obj)
    }
    $.toobj=function(str){
        return JSON.parse(str)
    }




    // 缓存图片
    $.cache_img=function (){
        $('[cache_src]').for(function (){
            var img=this
            img.src=img.getAttribute('cache_src')
        })
    }
    function cacheImg(img){
        var url=img.getAttribute('cache_src')

        if(!url)return

        api.imageCache({
            url: url
        },function(ret, err) {
            if(ret)
                img.src=ret.url
            else
                img.src=url
        })
    }
}(window,JSON,$),


// mui的扩展方法
function(mui,window,$){

    function getBMap(fn){
        if(getBMap.run){
            return
        }
        getBMap.run=true

        window.BMap_loadScriptTime = (new Date).getTime();
        var script=document.createElement('script')
        script.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=DraGF1TcdB3os28EWEpglUoXfCmuw50R&services='
        document.body.appendChild(script)
        script.onload=function (){
            getBMap.load=true
        }
    }

    // 获取位置
    window.getCurrentPosition=function(fn){

        getBMap()

        if(!getBMap.load){

            setTimeout(function(){
                getCurrentPosition(fn)
            },50)

            return
        }

        var geoc = new BMap.Geocoder();
        var geolocation = new BMap.Geolocation();

        // 获取地理位置
        geolocation.getCurrentPosition(
            function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){

                    geoc.getLocation(r.point, function(rs){
                        var addComp = rs.addressComponents;


                        localStorage.position_lon = r.point.lng
                        localStorage.position_lat = r.point.lat

                        localStorage.position_province      = addComp.province
                        localStorage.position_city          = addComp.city
                        localStorage.position_district      = addComp.district
                        localStorage.position_street        = addComp.street
                        localStorage.position_streetNumber  = addComp.streetNumber


                        // 设置位置信息为可用
                        localStorage.position_type = 'true'
                        localStorage.position_time = new Date().getTime()

                        console.log('重新获取位置信息完成')

                        if(fn)fn()
                    })
                }
                else {
                    mui.alert('获取位置信息失败')
                }
            },
            {enableHighAccuracy: true}
        )
    }

    if(!mui)return

    window.ajax=function(url,input_data,success0000,success0001,error,option){

        if(typeof input_data=='function'){
            option=error
            error=success0001
            success0001=success0000
            success0000=input_data
            input_data={}
        }

        var ajax_data={
            data : input_data,
            success : function (back_data){

                mui.closePopup()

                console.log('传入：' , url , '\n\t' , input_data)
                console.log('\t' , back_data , '\n\n')

                if(back_data.state=='0000')
                    return success0000(back_data)
                else{
                    if(success0001)
                        success0001(back_data)
                    return
                }
            },
            error : function (){

                mui.closePopup()

                console.log('传入：' , url , '\n\t' , input_data)
                console.log('ajax连接失败')
                console.log('\t' , arguments , '\n\n')

                if(error)error()
            },
            dataType : 'json',
            type : 'post',
            timeout : 30000,
            xhrFields:{withCredentials: true}
        }


        if(option)
            $.objJoin(ajax_data,option)

        mui.ajax(rootUrl+url,ajax_data)
    }


    var alert2_pass=''

    mui.closePOPup=mui.closePopup
    
    mui.closePopup=function (pass){
        if(alert2_pass && alert2_pass!=pass)return
        
        alert2_pass=''
        mui.closePOPup()
    }


    window.alert2=function (str,pass){
        mui.closePopup()
        mui.alert(str)

        alert2_pass=pass

        $('.mui-popup-buttons').hide()
        $('.mui-popup-inner').css('border-radius','13px')
    }
    window.alertMsg=function (data){
        mui.alert(data.msg)
    }


    // type1  刷新，关闭下拉
    // type2  刷新并显示"没有更多数据"

    // type3  加载，关闭上拉
    // type4  加载并显示"没有更多数据"
    mui.closePull=function(pullRefresh,type){

        var pull=pullRefresh.pullRefresh()

        switch(type){
            case 1:
                pull.endPulldownToRefresh()
                pull.refresh(true)
                break
            case 2:
                pull.endPulldownToRefresh()
                pull.endPullupToRefresh(true)
                $(pullRefresh).find('.mui-pull-bottom-pocket').addClass('mui-visibility').html('<div class="mui-pull"><div class="mui-pull-loading mui-icon mui-spinner mui-hidden"></div><div class="mui-pull-caption mui-pull-caption-nomore">没有更多数据了</div></div>')
                break
            case 3:
                pull.endPullupToRefresh()
                break
            case 4:
                pull.endPullupToRefresh(true)
        }
    }

    mui.initPull=function (url,inputdata,pull,fn){
        pull.pullRefresh({
            down: {
                auto: true,
                callback: function (){
                    getList(true)
                }
            },
            up: {
                callback: function (){
                    getList(false)
                }
            }
        })

        function getList(load){
            if(load)
                inputdata.page=1
            ajax(
                url,
                inputdata,
                function(data){

                    if(data.data.length<inputdata.cont)
                        mui.closePull(pull,load?2:4)
                    else
                        mui.closePull(pull,load?1:3)

                    fn(load,data)
                },
                function(){
                    if(load){
                        mui.closePull(pull,2)
                        fn(load,{data:[]})
                    }
                }
            )
            inputdata.page++
        }
    }


        mui(document.body)
        .on('tap','a[href]',function(e){
            var href=this.getAttribute('href')

            if(href.indexOf('tel:')==0){
                api.call({
                    type: 'tel_prompt',
                    number:href.slice(4),
                });
            }

            if(href && href.charAt(0)!='#' && href.indexOf('tel')!=0){
                mui.openWindow(href)
            }

        })


        mui.init()

        // 初始化滚动条
        mui('.mui-scroll-wrapper').each(function(){
            var the=$(this)
            if(!the.hasClass('pullRefresh')){
                mui(this).scroll()
            }
        })
}(window.mui,window,$);


window.apirun=[]

if(localStorage.api=='true'){
    document.write('<script src="apiready.js"></script>')
}
else{
    setTimeout(function(){
        for(var i=0;i<apirun.length;i++){
            apirun[i]()
        }
        apirun.push=function (fn){
            fn()
        }
    },10)
}