(function($){
	$.fn.rollText=function(){
		var text = this;
		var self = text.find("ul:first");
		
		var selftop = text.find("li:first");
		
		var lineHeight = self.find("li:first").height();
		var timer =null;
		text.hover(function(){
			clearInterval(timer)
		},function(){
			textPlay2(text)
		}).trigger("mouseout")
		

		function textPlay(text){
			timer=setInterval(function(){
				self.animate({"margin-top":-lineHeight},600,function(){
					self.css("margin-top",0).find("li:first").appendTo(self)
				})
			},1000)
		}
		
		function textPlay2(text){
			timer=setInterval(function(){
				self.animate({"margin-top":lineHeight},600,function(){
					self.css("margin-top",0).find("li:last").appendTo(self)
				})
			},1000)
		}
		
		
	}

})(jQuery)