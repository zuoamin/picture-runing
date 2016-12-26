;(function($){
	$.fn.tab=function(opt){
		var obj={
			ind:0,
			count:2,
			timer:600,
			speed:500,
			autoplay:true,
			type:'click',
			prev:'',
			next:''
		}
		var set=$.extend({},obj,opt);
		var timer=null,ind=0;
		var count=set.count;
		var uls=$('#wrap').find('ul');
		var w=uls.children('li').outerWidth();
		var len=uls.children('li').length;
		var prev=$(set.prev),next=$(set.next);
		uls.width(w*len);

		//当autoplay为true时，再自动播放
		if(set.autoplay){
			autoplay();
			//鼠标滑过盒子，清除定时器
			$(this).hover(function(){
				clearInterval(timer);
			},function(){
				autoplay();
			})
		}

		function autoplay(){
			timer=setInterval(function(){
				autoimg();
			},set.timer);
		}

		//点击上一张
		prev.on(set.type,function(){
			uls.css("margin-left",-w*count);
			uls.children("li").slice(-count).prependTo(uls);
			uls.stop().animate({"margin-left":0},set.speed);
		})
		//点击下一张
		next.on(set.type,function(){
			autoimg();
		})

		//封装每次自动轮播几张的方法
		function autoimg(){			
			uls.stop().animate({'margin-left':-w*count},set.speed,function(){
				uls.children('li').slice(0,count).appendTo(uls);
				uls.css('margin-left',0);
			});
		}
	}
})(jQuery)