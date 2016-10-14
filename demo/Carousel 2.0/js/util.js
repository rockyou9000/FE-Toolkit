var util = (function(){

	return{
		html2node:function (str){
			var node = document.createElement('div');
			node.innerHTML = str;
			return node.children[0]
		},
		extend:function(o1,o2){
			for(var i in o2){
				if(o1[i] == undefined ){
					o1[i] = o2[i]
				}
			}
		},
		addClass:function (obj, cls){
	     		 if (!this.hasClass(obj, cls)) obj.className += " " + cls;
	    },
	    delClass:function (obj, cls){
			      if (this.hasClass(obj, cls)) {
		        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		        obj.className = obj.className.replace(reg, ' ');
		    }
	    },
	    hasClass:function(obj,cls){
	    		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	    },
		emitter:{
			on: function (event,fn){
				var handles =  this._handles || (this._handles = {}),
					calls = handles[event] || (handles[event] = []);

				// 找到对应名字的栈
			        calls.push(fn);

			        return this;
			},
			off:function(event,fn){
				if(!event || !this._handles) this._handles = {};
				if(!this._handles) return this;

				var handles = this._handles , calls;
				
				if (calls = handles[event]) {
		          if (!fn) {
		            handles[event] = [];
		            return this;
		          }

				for(var j = 0,len = calls.lenght; j<len ;j++){
					if(fn === calls[j]){
							calls.splice(j,1);
							return this;
						}
					}
				}
			},
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