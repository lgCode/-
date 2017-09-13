$(function(){
		// console.log("已引入JQuery");
		var time = 1000,
		timer = null;
		var _div = $('#div');
		var _ul = $('#uls');
		var _li = $('li');
		var leftMove = $('#leftMove');//左
		var rightMove = $('#rightMove');//右
		var _slidePoint = $('#slidePoint');//p父容器
		
		var _ulWidth = _ul.width();//ul的宽度，控制什么时候回头
		var _liWidth = _li.width();//li img的宽度，300px;
		//用来计数
		var temp =0;


		//========动态添加P小圆点
		for (var i = 0; i < _li.length; i++) {
			$("<p></p>").appendTo(_slidePoint);
		};
		//=========================
		var _ps = $('p');//小圆点

		_ps.eq(0).addClass('redP');
		//========================================
		//计时器自执行
		(function clock(){
			clearInterval(timer);
			timer = setInterval(slide,2000);
		})();
		
		//========================================
		_slidePoint.width(_li.length * 30);
		_slidePoint.css('margin-left',-_li.length*30/2);
		_ul.width(_li.length*_liWidth);


		//循环
		function slide(){
			if(temp < _li.length-1){
				temp++;
			}else{
				temp = 0;
			}
			_ps.eq(temp).siblings().removeClass('redP');
			_ps.eq(temp).addClass('redP');
			slideAnimate(_ul,_liWidth,temp,time);
		}
		//左
		leftMove.on('click',function(){
			//slide();
			if(temp < _li.length - 1 ){  //3-1=2
				temp++;
			}else{
				temp = 0;
			}
			// _ul.css("left",-temp*_liWidth);
			// _ul.stop().animate({
			// 	left:-temp*_liWidth
			// },time);
		_ps.eq(temp).siblings().removeClass('redP');
		_ps.eq(temp).addClass('redP');
		slideAnimate(_ul,_liWidth,temp,time);
		clock();

	});
		//右
		rightMove.on('click',function(){
			if(temp > 0){
				temp --;
			}else{
				temp = _li.length-1;
			}
			// _ul.css("left",-temp*_liWidth);
			// _ul.stop().animate({
			// 	left:-temp*_liWidth
			// },time);
		_ps.eq(temp).siblings().removeClass('redP');
		_ps.eq(temp).addClass('redP');
		slideAnimate(_ul,_liWidth,temp,time);
		clock();
	});
		//小圆点点击事件
		_ps.on('click',function(){
			// console.log($(this).index());
			 temp = $(this).index();//获取下标
			// _ul.css("left",-temp*_liWidth);
			// _ul.stop().animate({
			// 	left:-temp*_liWidth
			// },time);
		$($(this).siblings()).removeClass('redP');
		$(this).addClass('redP');
		slideAnimate(_ul,_liWidth,temp,time);
		clock();
	})

		//动画向左移动公共方法
		function slideAnimate(ele,i,n,time){
			ele.stop().animate({
				left: -i*n
			},time);
		}



	});

