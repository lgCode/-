function slideFn( slideIds ){
	for(var i in slideIds){
		this[i] = slideIds[i];
	}
	this.temp 		= 0;
	this.liLength 	= 0;
	this.liWidth 	= 0;
	this.timer 		= null;
	this.init();
}
slideFn.prototype = {
	init:function(){
		var _this = this;
		_this.ulDom(_this.uls);

		_this.rightBtnFn();
		_this.pointerBtnFn();
		_this.slideInterval();
		_this.slideMove();
		_this.leftBtnFn();
	},
	ulDom:function( _ulId ){
		//创建ulDOM结构
		var _this = this;
		var chi = ' ';
		_this.createDom( _ulId );//创建ul里面的li

		chi = _ulId.children();//li
		_this.liLength 	= chi.length;//li个数
		_this.liWidth 	= chi.eq(0).width();//li单个宽度
		
		_ulId.width(_this.liLength * _this.liWidth);//ul的宽度
		
		_this.createIconBtn( _this.liLength );//调用生成小圆点的方法

		_this.pointerWrap( _this.liLength );//调用设置小圆点父容器位置的方法
		
		_this.pointerBtnFn( );//小圆点添加事件
	},
	createDom:function( _ulId ){
		//生成li
		var _this = this;
		var imgs = _this.getDate();
		for (var i = 0; i < imgs.length; i++) {
			$('<li/>')
			.html('<img src = '+ imgs[i] +' />')
			.appendTo( _ulId );
		};
	},
	getDate:function(){
		//获取图片
		var _this = this;
		var _urls = slideImgUrl.urls;
		return _urls;
	},
	leftBtnFn:function(){
		//左按钮
		var _this = this;
		_this.leftMove.on('click',function(){
			// if(_this.temp < _this.liLength - 1){
			// 	_this.temp ++;
			// }else{
			// 	_this.temp = 0;
			// }
			// slideAnimate(_this.uls,_this.temp,_this.liWidth);//调用动画的公共方法
			// _this.iconStyle();//小圆点样式
			_this.slideMove();
			_this.slideInterval();
		});
	},
	rightBtnFn:function(){
		//右按钮
		var _this = this;
		_this.rightMove.on('click',function(){
			if(_this.temp > 0 ){
				_this.temp --;
			}else{
				_this.temp = _this.liLength - 1;
			}
			slideAnimate(_this.uls,_this.temp,_this.liWidth);//调用动画的公共方法
			_this.iconStyle();//小圆点样式
			_this.slideInterval();
		});	
	},
	createIconBtn:function( _liNum ){
		//生成小圆点
		var _this = this;
		for (var i = 0; i < _liNum; i++) {
			$('<p></p>',{}).appendTo( _this.slidePoint);
		};
		$('p:first-child').addClass('redP');
	},
	pointerWrap:function( _liNum ){
		//小圆点容器
		var _this = this;
		var _iconWrapWidth = _liNum * 30;
		_this.slidePoint.width( _iconWrapWidth );
		_this.slidePoint.css('margin-left',-_iconWrapWidth / 2);
	},
	pointerBtnFn:function(){
		//小圆点添加事件
		var _this  = this;
		var _icons = _this.slidePoint.find('p');
		_icons.on('click',function(){
			_this.temp = $(this).index();
			slideAnimate(_this.uls,_this.temp,_this.liWidth);
			_this.iconStyle();
		});
	},
	iconStyle:function(){
		//给小圆点添加样式
		var _this = this;
		var _icons = _this.slidePoint.find('p');
		_icons.eq(_this.temp)
		.addClass('redP')
		.siblings()
		.removeClass('redP');
	},
	slideMove:function(){
		//自动移动
		var _this = this;
		if(_this.temp < _this.liLength - 1){
				_this.temp ++;
			}else{
				_this.temp = 0;
			}
		slideAnimate(_this.uls,_this.temp,_this.liWidth);//调用动画的公共方法
		_this.iconStyle();//小圆点样式	
		_this.slideInterval();
	},
	slideInterval:function(){
		//定时器
		var _this = this;
		clearInterval(_this.timer);
		_this.timer = setInterval(function(){
			_this.slideMove();
		},1500);
	}

}

var slideImgUrl = {
	urls:[
	'temp2.jpg',
	'temp3.jpg',
	'temp1.jpg',
	'temp1.jpg',
	'temp2.jpg',
	'temp3.jpg'
	]
}
var slideIds = {
	uls 		: $('#uls'),//ul容器
	slidePoint 	: $('#slidePoint'),//小圆点父容器
	leftMove 	: $('#leftMove'),//左
	rightMove 	: $('#rightMove')//右
}
//动画向左移动公共方法
function slideAnimate(ele,i,n,time){
	ele.stop().animate({
		left: - i * n
	},500);
}
new slideFn( slideIds );


