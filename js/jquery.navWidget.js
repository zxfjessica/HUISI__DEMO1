/*
	@parm:
		navbtn:底部导航按钮（id,图片来源，大小位置信息，二级导航的个数）
		activeItem:当前激活的选项（navbtn：表示一级选项，navbtnitem：表示二级选项）
		showContentId：显示选项长图的外框id名
		stageWidth：舞台宽
		stageHeight：舞台高
		scrollBar:是否出现模拟滚动条
		slidewaysrc:模拟滚动条滑道UI
		slidersrc：模拟滚动条滑块UI
		slidewayid：模拟滚动条滑道id
		sliderid：模拟滚动条滑块id
		slidersizepos：模拟滚动条滑块大小位置
		slidewaysizepos：模拟滚动条滑块大小位置
		.
		.
		.
		其他参数：
		例：nav_left：某个一级选项，该属性名来自navbtn中，其中包括其范围内的各二级选项的id，normal图片，active图片，大小宽高信息，选项点击展开内容的图片路径
	使用前引入库
		jquery,jquery.imitateScrollBarWidget
	Updated in March 13, 2017
 */
$.fn.extend({
	"navWidget":function(options){
		var $_this = $(this);
		var defaultOptions = {
			"navbtn":[{"id":"nav_left","src":"images/nav1.png","activesrc":"images/nav11.png","info":{'w':219,'h':144,'l':64,'t':964},"optionsnum":4},
						{"id":"nav_right","src":"images/nav2.png","activesrc":"images/nav22.png","info":{'w':219,'h':144,'l':316,'t':964},"optionsnum":4}],
			"nav_left":[{"id":"nav11","src":"images/l1.png","activesrc":"images/l11.png","info":{'w':195,'h':144,'l':64,'t':964},"content":'images/bg2.jpg',"contentinfo":{'w':640,'h':1187}},
						{"id":"nav12","src":"images/l2.png","activesrc":"images/l22.png","info":{'w':195,'h':144,'l':64,'t':964},"content":'images/bg1.jpg',"contentinfo":{'w':640,'h':1020}},
						{"id":"nav13","src":"images/l3.png","activesrc":"images/l33.png","info":{'w':195,'h':144,'l':64,'t':964},"content":'images/bg3.jpg',"contentinfo":{'w':640,'h':2100}},
						{"id":"nav14","src":"images/l4.png","activesrc":"images/l44.png","info":{'w':195,'h':144,'l':64,'t':964},"content":'images/bg4.jpg',"contentinfo":{'w':640,'h':1300}}],
			"nav_right":[{"id":"nav21","src":"images/r1.png","activesrc":"images/r11.png","info":{'w':195,'h':144,'l':64,'t':964},"content":'images/bg5.jpg',"contentinfo":{'w':640,'h':1100}},
						{"id":"nav22","src":"images/r2.png","activesrc":"images/r22.png","info":{'w':195,'h':144,'l':64,'t':964},"content":'images/bg6.jpg',"contentinfo":{'w':640,'h':2100}},
						{"id":"nav23","src":"images/r3.png","activesrc":"images/r33.png","info":{'w':195,'h':144,'l':64,'t':964},"content":'images/bg7.jpg',"contentinfo":{'w':640,'h':1900}},
						{"id":"nav24","src":"images/r4.png","activesrc":"images/r44.png","info":{'w':195,'h':144,'l':64,'t':964},"content":'images/bg8.jpg',"contentinfo":{'w':640,'h':1820}}],
			"activeItem":{"navbtn":0,"navbtnitem":0},
			"showContentId":'content1',
			"stageWidth":640,
			"stageHeight":1138,
			"scrollBar":true,
			"slidewaysrc":"images/slideway.png",//模拟滚动条滑道UI
			"slidersrc":"images/slider.png",//模拟滚动条滑块UI
			"slidewayid":"slideway",//模拟滚动条滑道id
			"sliderid":"slider",//模拟滚动条滑块id
			"slidersizepos":{"w":34,"h":34,"l":606.7,"t":250.89},//模拟滚动条滑块大小位置
			"slidewaysizepos":{"w":11,"h":530,"l":618.8,"t":268.27},//模拟滚动条滑块大小位置
		};
		var parm;
		init(options);

		/*插件初始化函数*/
		function init(options){
			parm = $.extend({},defaultOptions,options);//合并参数
			$_this.append(navTemplate());//根据模板生成元素

			pageInit();
			
		}
		
		function pageInit(){ 
			//将导航一级按钮开关状态设置为关
			for(var i=0;i<parm.navbtn.length;i++){
				document.getElementById(parm.navbtn[i].id).op = false;
				document.getElementById(parm.navbtn[i].id).index = i;
				if(parm.navbtn[i].optionsnum==parm[parm.navbtn[i].id].length){
					for(var j=0;j<parm[parm.navbtn[i].id].length;j++){
						document.getElementById(parm[parm.navbtn[i].id][j].id).index = j;
						document.getElementById(parm[parm.navbtn[i].id][j].id).parentIndex = i;
					}
				}else{
					alert('选项个数和选项设置不一致！');
					return ;
				}
				
			}

			
			//展开菜单的位置
			
			if(document.getElementById('nav_list').className!=''){
				if(document.getElementById('nav_list').className =='left-active'){
					
					document.getElementById('nav_list').style.bottom = (1-parseFloat($('#nav_left').css('top'))/100)*100+'%';
					document.getElementById('nav_list').style.left = document.getElementById('nav_left').style.left;
					//document.getElementById('nav_list').style.width = parseInt(crossObj.getStyle(document.getElementById('nav_left'),'width'))+'%';
					document.getElementById('nav_list').style.width = parseInt($('#nav_left').width())+'%';
				}else{
					document.getElementById('nav_list').style.bottom = (1-parseFloat($('#nav_left').css('top'))/100)*100+'%';
					document.getElementById('nav_list').style.left = document.getElementById('nav_right').style.left;
					//document.getElementById('nav_list').style.width = parseInt(crossObj.getStyle(document.getElementById('nav_left'),'width'))+'px';
					document.getElementById('nav_list').style.width = parseInt($('#nav_left').width())+'px';
				}
			}

			//设置默认打开图片的内容
			//
			$('#'+parm.showContentId).css('top','0%');
			var img = '<img id="content_bg" src="{{imgcontent}}"  style="width:{{contentwidth}};height:{{contentheight}};position:absolute;top:0%" alt="">';
			var __imgcontent__ = parm[parm.navbtn[0].id][0].content;
			var __imgcontentwidth__ = (parm[parm.navbtn[0].id][0].contentinfo.w/parm.stageWidth*100)+'%';
			
			var __imgcontentheight__ = (parm[parm.navbtn[0].id][0].contentinfo.h/parm.stageHeight*100)+'%';
			img = img.replace('{{imgcontent}}',__imgcontent__);
			img = img.replace('{{contentwidth}}',__imgcontentwidth__);
			img = img.replace('{{contentheight}}',__imgcontentheight__);
			
			$('#'+parm.showContentId).append(img);


			//设置激活选项的图片
			document.getElementById(parm.navbtn[parm.activeItem.navbtn].id).src = parm.navbtn[parm.activeItem.navbtn].activesrc;
			
			document.getElementById(parm[parm.navbtn[parm.activeItem.navbtn].id][parm.activeItem.navbtnitem].id).src = parm[parm.navbtn[parm.activeItem.navbtn].id][parm.activeItem.navbtnitem].activesrc;

			btnHandler();//添加按钮点击事件
		}


		function createImg(i,j){

			var img = '<img id="content_bg" src="{{imgcontent}}"  style="width:{{contentwidth}};height:{{contentheight}};position:absolute;top:0%" alt="">';
			var __imgcontent__ = parm[parm.navbtn[i].id][j].content;
			var __imgcontentwidth__ = (parm[parm.navbtn[i].id][j].contentinfo.w/parm.stageWidth*100)+'%';
			var __imgcontentheight__ = (parm[parm.navbtn[i].id][j].contentinfo.h/parm.stageHeight*100)+'%';
			img = img.replace('{{imgcontent}}',__imgcontent__);
			img = img.replace('{{contentwidth}}',__imgcontentwidth__);
			img = img.replace('{{contentheight}}',__imgcontentheight__);
			
			document.getElementById(parm.showContentId).innerHTML = img;
		}

		function btnHandler(){

			for(var i=0;i<parm.navbtn.length;i++){
				
				document.getElementById(parm.navbtn[i].id).onclick = function(e){
					var target = e.target;
					target.op = !target.op;
					
					if(target.op){

						//清除其他激活状态
						for(var i=0;i<parm.navbtn.length;i++){
							document.getElementById(parm.navbtn[i].id+'_list').className = document.getElementById(parm.navbtn[i].id).className.replace('active','');


							//将其他一级选线的开关状态都设置为关闭
							if(i!=target.index){
								document.getElementById(parm.navbtn[i].id).op = false;
							}
							
						}
						$('#nav_list').show();
						document.getElementById(target.id+'_list').className = 'active';console.log();
						document.getElementById('nav_list').style.bottom = (100-parseFloat(document.getElementById('nav_left').style.top)).toFixed(3)+'%';
						document.getElementById('nav_list').style.left = document.getElementById(target.id).style.left;
						
						
						for(var j = 0;j<parm[parm.navbtn[this.index].id].length;j++){
							
							document.getElementById(parm[parm.navbtn[this.index].id][j].id).onclick = function(){
								
								document.getElementById(parm.showContentId).innerHTML = '';
								createImg(this.parentIndex,this.index);

								//如果图片超出范围，则可以下拉
								if(parseFloat(document.getElementById('content_bg').style.height)>=100){
									$('#content_bg').imitateScroll({
										"direction":"y",
										"stageWidth":parm.stageWidth,
										"stageHeight":parm.stageHeight,
										"scrollBar":parm.scrollBar,//是否存在模拟滚动条
										"slidewaysrc":parm.slidewaysrc,//模拟滚动条滑道UI
										"slidersrc":parm.slidersrc,//模拟滚动条滑块UI
										"slidewayid":parm.slidewayid,//模拟滚动条滑道id
										"sliderid":parm.sliderid,//模拟滚动条滑块id
										"slidersizepos":parm.slidersizepos,//模拟滚动条滑块大小位置
										"slidewaysizepos":parm.slidewaysizepos,//模拟滚动条滑块大小位置
									});
								}
								document.getElementById(parm.navbtn[this.parentIndex].id).op = false;
								
								$('#'+parm.navbtn[this.parentIndex].id+'_list').removeClass('active');
								$('#nav_list').hide();

								


								//恢复先前点击按钮的未点击状态
								document.getElementById(parm.navbtn[parm.activeItem.navbtn].id).src = parm.navbtn[parm.activeItem.navbtn].src;
								
								document.getElementById(parm[parm.navbtn[parm.activeItem.navbtn].id][parm.activeItem.navbtnitem].id).src = parm[parm.navbtn[parm.activeItem.navbtn].id][parm.activeItem.navbtnitem].src;
								//将激活选项放入激活选项变量里
								parm.activeItem.navbtn = this.parentIndex;
								
								parm.activeItem.navbtnitem = this.index;
								
								//设置激活选项的图片
								document.getElementById(parm.navbtn[parm.activeItem.navbtn].id).src = parm.navbtn[parm.activeItem.navbtn].activesrc;
								
								document.getElementById(parm[parm.navbtn[parm.activeItem.navbtn].id][parm.activeItem.navbtnitem].id).src = parm[parm.navbtn[parm.activeItem.navbtn].id][parm.activeItem.navbtnitem].activesrc;
								
							};
							
						}


					}else{
						hide(document.getElementById('nav_list'));
						document.getElementById('nav_list').className = '';
					}

					
					
				};
			}
			
			if($('#content_bg').height()>100){//如果图片超出范围可以下拉
				$('#content_bg').imitateScroll({
					"direction":"y",
					"stageWidth":parm.stageWidth,
					"stageHeight":parm.stageHeight,
					"scrollBar":parm.scrollBar,//是否存在模拟滚动条
					"slidewaysrc":parm.slidewaysrc,//模拟滚动条滑道UI
					"slidersrc":parm.slidersrc,//模拟滚动条滑块UI
					"slidewayid":parm.slidewayid,//模拟滚动条滑道id
					"sliderid":parm.sliderid,//模拟滚动条滑块id
					"slidersizepos":parm.slidersizepos,//模拟滚动条滑块大小位置
					"slidewaysizepos":parm.slidewaysizepos,//模拟滚动条滑块大小位置
				});
			}
			


		}

		

		function initNav(){
			document.getElementById('nav_left').op = false;
			document.getElementById('nav_right').op = false;
			document.getElementById('nav_list').className = '';
			hide(document.getElementById('nav_list'));
		}

		/*百分数的加减乘除*/
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



		/*求百分比*/
		function caluPercentage(n1,n2){
			var result;
			result = n1/n2*100;
			result+='%';
			return 	result;
		}

		/*生成导航模板*/
		function navTemplate(){

			var __navBtn__='';
			for(var i=0;i<parm.navbtn.length;i++){

				__navBtn__ += '<img id="'+parm.navbtn[i].id+'" src="'+parm.navbtn[i].src+'" style="position:absolute;width:'+caluPercentage(parm.navbtn[i].info.w,parm.stageWidth)+';height:'+caluPercentage(parm.navbtn[i].info.h,parm.stageHeight)+';left:'+caluPercentage(parm.navbtn[i].info.l,parm.stageWidth)+';top:'+caluPercentage(parm.navbtn[i].info.t,parm.stageHeight)+';"/>';
			}
			
			var __navBtnList__ ='';
			for(var i=0;i<parm.navbtn.length;i++){
				__navBtnList__+= '<div id="'+parm.navbtn[i].id+'_list">';
				
				if(parm.navbtn[i].optionsnum==parm[parm.navbtn[i].id].length){
					for(var j=0;j<parm[parm.navbtn[i].id].length;j++){
						
						__navBtnList__+='<img id="'+parm[parm.navbtn[i].id][j].id+'" width="'+caluPercentage(parm[parm.navbtn[i].id][j].info.w,parm.stageWidth)+'" src="'+parm[parm.navbtn[i].id][j].src+'"/>';
					}
				}

				__navBtnList__+= '</div>';

			}

			var __navTempContent__ = '<nav id="nav" style="display:none;width:100%;height:'+caluPercentage(parm.navbtn[0].info.h,parm.stageHeight)+';top: 81.5%;left: 0;background: #fff;">'
										+'<div id="nav_wrapper"  style="width:100%;margin:0 auto">'
											+__navBtn__
											+'<div id="nav_list" class="left-active">'
												+__navBtnList__
												+'<div  style="width: 100%;height: 22px;background:url(images/caret.png) no-repeat center top"></div>'
											+'</div>'
										+'</div>'
										
									+'</nav>';
			return __navTempContent__;
		}

		function setSizeAndPos($obj,info){
			$obj.css({
				"position":"absolute",
				"width":(info.w/parm.stageWidth)*100+'%',
				"height":(info.h/parm.stageHeight)*100+'%',
				"left":(info.l/parm.stageWidth)*100+'%',
				"top":(info.t/parm.stageHeight)*100+'%'
			});
		}

		function setPos($obj,l,t){
			$obj.css({
				"left":(l/parm.stageWidth)*100+'%',
				"top":(t/parm.stageHeight)*100+'%'
			});
		}

		return $_this;
	}
});


/*
	模仿拖动插件
	@parm:
		direction:拖动方向，
		stageWidth:舞台宽度
		stageHeight:舞台高度
		scrollBar:是否显示模拟滚动条
		slidewaysrc:模拟滚动条滑道UI
		slidersrc：模拟滚动条滑块UI
		slidewayid：模拟滚动条滑道id
		sliderid：模拟滚动条滑块id
		slidersizepos：模拟滚动条滑块大小位置
		slidewaysizepos：模拟滚动条滑块大小位置
 */
$.fn.extend({
	"imitateScroll":function(options){
		var $_this = $(this);
		var parm;
		var defaultOptions = {
			"direction":"y",
			"stageWidth":640,
			"stageHeight":1138,
			"scrollBar":true,//是否存在模拟滚动条
			"slidewaysrc":"images/slideway.png",//模拟滚动条滑道UI
			"slidersrc":"images/slider.png",//模拟滚动条滑块UI
			"slidewayid":"slideway",//模拟滚动条滑道id
			"sliderid":"slider",//模拟滚动条滑块id
			"slidersizepos":{"w":34,"h":34,"l":606.7,"t":250.89},//模拟滚动条滑块大小位置
			"slidewaysizepos":{"w":11,"h":530,"l":618.8,"t":268.27},//模拟滚动条滑块大小位置
		};
		init();
		function init(){
			parm = $.extend({},defaultOptions,options);
			$_this.on('touchstart',contentTouchStartHandler);
			$_this.on('touchmove',contentTouchMoveHandler);
			if(parm.scrollBar){
				$_this.imitateScrollBarWidget({
					"slidewaysrc":parm.slidewaysrc,//模拟滚动条滑道UI
					"slidersrc":parm.slidersrc,//模拟滚动条滑块UI
					"slidewayid":parm.slidewayid,//模拟滚动条滑道id
					"sliderid":parm.sliderid,//模拟滚动条滑块id
					"slidersizepos":parm.slidersizepos,//模拟滚动条滑块大小位置
					"slidewaysizepos":parm.slidewaysizepos,//模拟滚动条滑块大小位置
					"stageWidth":parm.stageWidth,
					"stageHeight":parm.stageHeight
				});
			}
		}
		function contentTouchStartHandler(e){
			e = e||window.event;
			//阻止默认事件
			if(e.stopPropagation){
				e.preventDefault();
			}else{
				e.returnValue = false;
			}
			$first = (parm.direction=='y')?e.touches[0].clientY:e.touches[0].clientX;
			
			
		}
		function contentTouchMoveHandler(e){
			var $dis = 0;//滑动距离	


			e = e||window.event;
			//阻止默认事件
			if(e.stopPropagation){
				e.preventDefault();
			}else{
				e.returnValue = false;
			}

			$last = (parm.direction=='y')?e.touches[0].clientY:e.touches[0].clientX;
			if(parm.direction=='y'){
				var dirtrue = $last-$first;
				var dir = dirtrue/parm.stageHeight*100;
				if(parseInt(document.getElementById($(this).attr('id')).style.top)+dir>0){//顶部
					$(this).css({"top":0});
					
				}else if((parseInt(document.getElementById($(this).attr('id')).style.top)+dir)<(100-(parseInt(document.getElementById($(this).attr('id')).style.height)))){//到底了
					document.getElementById($(this).attr('id')).style.top = (100-(parseFloat(document.getElementById($(this).attr('id')).style.height)))+'%';
					
				}else{//在中间（正常）
					
					var currentTop = parseFloat(document.getElementById($(this).attr('id')).style.top);
					
					
					document.getElementById($(this).attr('id')).style.top = Number(currentTop)+Number(dir)+"%";
					
				}
				$first = $last;
			}else if(parm.direction=='x'){

			}else{}
			
			
			
		}
		return $(this);	
	}
});