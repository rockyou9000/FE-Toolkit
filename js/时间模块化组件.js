/**
     *  ʱ��Date ģ�黯���
     *  {yyyy|yy}��--{MM|M}��--{dd|d}�� {hh}ʱ:{mm}��:{ss}��:{S}����
     *  ��{{qq|q}}����
     *  ����{w}
     *  д��{new Date().format("yyyy��MM��dd�� hh:mm:ss")}
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
                "w" : "��һ����������".charAt(this.getDay())
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