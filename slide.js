window.onload = function(){

	function gId(id){
		return document.getElementById(id);
	}
	var time = 2000,
	timer = null;
	var _div = gId('div');
	var _ul = gId('uls');

		var leftMove = gId('leftMove');//左
		var rightMove = gId('rightMove');//右

		var _li = _ul.getElementsByTagName('li')[0];

		var _left = _ul.offsetLeft;//ul的left值，控制向左移动
		var _ulWidth = _ul.offsetWidth;//ul的宽度，控制什么时候回头
		var _liWidth = _li.offsetWidth;//li img的宽度，


		var _ps = document.getElementsByTagName('p');

		function move(){
			clearInterval(timer);
			if(_left <= _liWidth-_ulWidth){
				_left = 0;//重新开始
			}else{
				_left -= _liWidth;
			}			
			_ul.style.left = _left + "px";
			timer = setInterval(move,time);
		}
		move();

// 左右
		leftMove.onclick = move;
		rightMove.onclick = function(){
			clearInterval(timer);
			if(_left >= 0){
				_left = _liWidth-_ulWidth;//重新开始
			}else{
				_left += _liWidth;
			}			
			_ul.style.left = _left + "px";
			timer = setInterval(move,time);
		}


//圆点
		var pLength = _ps.length;
		for (var i = 0; i < pLength; i++) {	
			var index;
			_ps[i].index = i;
			_ps[i].onclick = function(){
				clearInterval(timer);
				_left = -this.index*_liWidth;
				_ul.style.left = _left + "px";
				timer = setInterval(move,time);
			}
		};


	}