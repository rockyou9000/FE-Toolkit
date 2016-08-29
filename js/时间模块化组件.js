/**
     *  时间Date 模块化组件
     *  {yyyy|yy}年--{MM|M}月--{dd|d}日 {hh}时:{mm}分:{ss}秒:{S}毫秒
     *  第{{qq|q}}季度
     *  星期{w}
     *  写法{new Date().format("yyyy年MM月dd日 hh:mm:ss")}
     */
    if(!Date.prototype.format){
        Date.prototype.format = function(template){
            var fullyear = this.getFullYear();
            var o = {
                "M+" : this.getMonth() + 1,
                "d+" : this.getDate(),
                "h+" : this.getHours(),
                "m+" : this.getMinutes(),
                "s+" : this.getSeconds(),
                "q+" : Math.floor((this.getMonth() + 3) / 3),
                "S" : this.getMilliseconds(),
                "w" : "日一二三四五六".charAt(this.getDay())
            };

            template = template.replace(/y{4}/,fullyear).replace(/y{2}/,fullyear.toString().substring(2));

            for(var k in o){
                if(o.hasOwnProperty(k)){
                    var regx = new RegExp(k);
                    template = template.replace(regx,match);
                }
            }
            function match(m){
                return m.length === 1 ? o[k] : ("00" + o[k]).substr((""+o[k]).length);
            }
            return template;
        }
    }