

(function($){
	$.fn.waterfall=function(options){
		var setting=$.extend({
			box:".box"
			},options||{})	

		var waterfall = this;
		var imageJson ={"image":[{"src":"01.jpg"},{"src":"02.jpg"},{"src":"03.jpg"},{"src":"04.jpg"},{"src":"05.jpg"},{"src":"06.jpg"},{"src":"07.jpg"},{"src":"08.jpg"},{"src":"09.jpg"},{"src":"10.jpg"}]}
		fall()

		$(window).scroll(function(){
			var lastImg =waterfall.find(setting.box).last().position().top;
			var clientHeight=$(window).height();
			var scrollTop=$(window).scrollTop();
			if(lastImg<(clientHeight+scrollTop)){
				for(var i=0;i<imageJson.image.length;i++){
					var newDiv = document.createElement('div');
					var newDiv2 =document.createElement('div');
					var newP =document.createElement('p');
					$(newP).html('商品介绍')
					$(newDiv).addClass('box');
					$(newDiv2).addClass('img_box');
					var newImg =document.createElement('img');
					$(newImg).attr("src","images/"+imageJson.image[i].src);
					$(newDiv2).append(newImg);
					$(newDiv2).append(newP);
					$(newDiv).append(newDiv2);
					waterfall.append(newDiv);
				}
				fall()
			}
		})

		


		function fall(){
		var aImg =waterfall.find(setting.box);

		var aImgHeight=[];

		var aImgNum =Math.floor($(window).width()/aImg.eq(0).outerWidth());

		waterfall.css("width",aImgNum*aImg.eq(0).outerWidth());
		aImg.each(function(i){
			if(i<aImgNum){
				aImgHeight[i]=$(this).outerHeight();
			}else{
				$(this).css("position","absolute");
			 	var aImgMin = Math.min.apply(null,aImgHeight);
			 	var aImgMinIndex = getImgMinIndex(aImgHeight,aImgMin);
			 	$(this).css({"top":aImgMin,"left":aImg.eq(aImgMinIndex).position().left});
			 	aImgHeight[aImgMinIndex]=$(this).outerHeight()+aImgHeight[aImgMinIndex];

			}
		})

		}
		

		function getImgMinIndex(aImgHeight,aImgMin){
			for(var i in aImgHeight){
				if(aImgHeight[i]==aImgMin){
					return i
				}
			}
		}


	}
})(jQuery)