var util = (function(){
	return {
		// 赋值属性
		// extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
		extend: function(o1, o2){
		    for(var i in o2) if (o1[i] == undefined ) {
		    o1[i] = o2[i]
		    }
	    },

	    //转换str为html_node
		html2node: function(str){
	    var container = document.createElement('div');
	    container.innerHTML = str;
	    return container.children[0];
	  },

		hasClass:function (obj, cls) {  
			    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	  },
		addClass:function(obj, cls) {  
			    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
	  },
			  
		removeClass: function (obj, cls) {  
			    if (this.hasClass(obj, cls)) {  
			        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
			        obj.className = obj.className.replace(reg, ' ');  
			    }  
	  },

	    emitter: {
		  // 注册事件
		  on: function(event, fn) {
		    var handles = this._handles || (this._handles = {}),
		      calls = handles[event] || (handles[event] = []);

		    // 找到对应名字的栈
		    calls.push(fn);

		    return this;
		  },

		  // 解绑事件
		  off: function(event, fn) {
		    if(!event || !this._handles) this._handles = {};
		    if(!this._handles) return;

		    var handles = this._handles , calls;

		    if (calls = handles[event]) {
		      if (!fn) {
		        handles[event] = [];
		        return this;
		      }
		      // 找到栈内对应listener 并移除
		      for (var i = 0, len = calls.length; i < len; i++) {
		        if (fn === calls[i]) {
		          calls.splice(i, 1);
		          return this;
		        }
		      }
		    }
		    return this;
		  },
		  
		  // 触发事件
		  emit: function(event){
		    var args = [].slice.call(arguments, 1),
		      handles = this._handles, calls;

		    if (!handles || !(calls = handles[event])) return this;
		    // 触发所有对应名字的listeners
		    for (var i = 0, len = calls.length; i < len; i++) {
		      calls[i].apply(this, args)
		    }
		    return this;
		  }
		}
	}
})()