/*
	滚动条插件
	@parm:
		slidewaysrc:模拟滚动条滑道UI
		slidersrc：模拟滚动条滑块UI
		slidewayid：模拟滚动条滑道id
		sliderid：模拟滚动条滑块id
		slidersizepos：模拟滚动条滑块大小位置
		slidewaysizepos：模拟滚动条滑块大小位置
		stageWidth：舞台宽度
		stageHeight：舞台宽度
	使用前引入库：
		jquery
	Updated in March 13, 2017
 */
$.fn.extend({ 
	'imitateScrollBarWidget':function(options){
		var defaultOptions = {
			"slidewaysrc":"images/slideway.png",//模拟滚动条滑道UI
			"slidersrc":"images/slider.png",//模拟滚动条滑块UI
			"slidewayid":"slideway",//模拟滚动条滑道id
			"sliderid":"slider",//模拟滚动条滑块id
			"slidersizepos":{"w":34,"h":34,"l":606.7,"t":250.89},//模拟滚动条滑块大小位置
			"slidewaysizepos":{"w":11,"h":530,"l":618.8,"t":268.27},//模拟滚动条滑块大小位置
			"stageWidth":640,
			"stageHeight":1138
		};
		var parm;//参数集合
		var $_this = $(this);
		var sliderTop;
		init();
		function init(){	
			parm = $.extend({},defaultOptions,options);
			setEle();
			sliderTop = document.getElementById(parm.sliderid).style.top;
			$_this.on('touchstart',touchStartHandler);
			$_this.on('touchmove',touchMoveHandler);
		}
		function scrollBarTemplate(){
			var __SCROLLBAR__ = '<img id="{{slidewayid}}" src="{{slidewaysrc}} "  style="position:absolute;width:{{slidewayw}};height:{{slidewayh}};left:{{slidewayl}};top:{{slidewayt}}" alt=""/><img id="{{sliderid}}" style="position:absolute;width:{{sliderw}};height:{{sliderh}};left:{{sliderl}};top:{{slidert}}" src="{{slidersrc}}" alt=""/>';
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{slidewaysrc}}',parm.slidewaysrc);
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{slidersrc}}',parm.slidersrc);
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{slidewayid}}',parm.slidewayid);
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{sliderid}}',parm.sliderid);

			__SCROLLBAR__ = __SCROLLBAR__.replace('{{slidewayw}}',(parm.slidewaysizepos.w/parm.stageWidth*100)+'%');
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{slidewayh}}',(parm.slidewaysizepos.h/parm.stageHeight*100)+'%');
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{slidewayl}}',(parm.slidewaysizepos.l/parm.stageWidth*100)+'%');
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{slidewayt}}',(parm.slidewaysizepos.t/parm.stageHeight*100)+'%');

			__SCROLLBAR__ = __SCROLLBAR__.replace('{{sliderw}}',(parm.slidersizepos.w/parm.stageWidth*100)+'%');
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{sliderh}}',(parm.slidersizepos.h/parm.stageHeight*100)+'%');
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{sliderl}}',(parm.slidersizepos.l/parm.stageWidth*100)+'%');
			__SCROLLBAR__ = __SCROLLBAR__.replace('{{slidert}}',(parm.slidersizepos.t/parm.stageHeight*100)+'%');
			return __SCROLLBAR__;

		}
		function setEle(){
			var $tempScrollSlider  = $('#'+parm.sliderid);
			var $tempScrollSlideWay  = $('#'+parm.slidewayid);
			//设置大小宽高
			setSizeAndPos($tempScrollSlider,(parm.slidersizepos.w/parm.stageWidth)+'%',
											(parm.slidersizepos.h/parm.stageHeight)+'%',
											(parm.slidersizepos.l/parm.stageWidth)+'%',
											(parm.slidersizepos.t/parm.stageHeight)+'%');
			setSizeAndPos($tempScrollSlideWay,(parm.slidewaysizepos.w/parm.stageWidth)+'%',
											(parm.slidewaysizepos.h/parm.stageHeight)+'%',
											(parm.slidewaysizepos.l/parm.stageWidth)+'%',
											(parm.slidewaysizepos.t/parm.stageHeight)+'%');
			$_this.parent().append(scrollBarTemplate());
			this.innerHTML+=scrollBarTemplate();
			
		}
		function touchStartHandler(){

		}

		function touchMoveHandler(){
			var contentTop = document.getElementById($_this.attr('id')).style.top;//图片上划百分比
			var contentHeight = document.getElementById($_this.attr('id')).style.height;//图片内容总高度(百分比)
			var slidewayHeight = document.getElementById(parm.slidewayid).style.height;//滑道总高度（百分比）
			var slidewayPerTop = percentagecalu(slidewayHeight,100,'/');//单位滑道高度(百分比)
			var contentTopPer = percentagecalu(contentTop,percentagecalu(contentHeight,100,'-'),'/');//已拖动页面高度占总超出高度的百分比
			var tempContentTop = percentagecalu(slidewayPerTop,contentTopPer ,'*');//已拖动（滑道百分比）
			var xx = percentagecalu(sliderTop,tempContentTop,'-');
			
			$('#'+parm.sliderid).css({'top':xx});
			
		}
		function setSizeAndPos($ele,w,h,l,t){
			$ele.css({"width":w,"height":h,"left":l,"top":t});
		}
		function percentageToNum(percentage){
			return parseFloat(percentage).toFixed(3);
		}
		function percentagecalu(num1,num2,oper){
			if(oper=='+'){
				return ((parseFloat(num1)/100+parseFloat(num2)/100)*100).toFixed(3)+'%';
			}
			if(oper=='/'){
				return (((parseFloat(num1)/100)/(parseFloat(num2)/100))*100).toFixed(3)+'%';
			}
			if(oper=='-'){
				return ((parseFloat(num1)/100-parseFloat(num2)/100)*100).toFixed(3)+'%';
			}
			return (parseFloat(num1)/100*parseFloat(num2)/100*100).toFixed(3)+'%';
		}

		return $(this);
	}
});