//css 调试代码  控制台输入:
[].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})


;!function(win){        
"use strict";

var path = ''; //所在路径，如果非模块加载不用配置
path = path ? path : document.scripts[document.scripts.length-1].src.match(/[\s\S]*\//)[0];
var doc = document, query = 'querySelectorAll', claname = 'getElementsByClassName', S = function(s){
    return doc[query](s);
};

//插入css
document.head.appendChild((function(){
    var link = doc.createElement('link');
    link.href = './layer.css';
    link.type = 'text/css';
    link.rel = 'styleSheet';
    link.id = 'layermcss';
    return link;
}()));