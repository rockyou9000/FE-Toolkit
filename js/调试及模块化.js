//css ���Դ���  ����̨����:
[].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})


;!function(win){        
"use strict";

var path = ''; //����·���������ģ����ز�������
path = path ? path : document.scripts[document.scripts.length-1].src.match(/[\s\S]*\//)[0];
var doc = document, query = 'querySelectorAll', claname = 'getElementsByClassName', S = function(s){
    return doc[query](s);
};

//����css
document.head.appendChild((function(){
    var link = doc.createElement('link');
    link.href = './layer.css';
    link.type = 'text/css';
    link.rel = 'styleSheet';
    link.id = 'layermcss';
    return link;
}()));