// JavaScript Document

//跨浏览器对象
var crossObj = {
	//获取事件对象
	getEvent:function(ev){
		return ev||window.ev;
	},

	//返回事件的目标
	getTarget:function(ev){
		return ev.target||ev.srcElement;
	},
	
	//添加事件
	addEvent:function(obj,type,fn){
		if(obj.addEventListener){
			obj.addEventListener(type,fn,false);
		}else if(obj.attachEvent){
			obj.attachEvent('on'+type,fn);
		}else{
			obj['on'+type] = fn;
		}
	},
	
	//移除事件
	removeEvent:function(obj,type,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(type,fn,false);
		}else if(obj.detachEvent){
			obj.detachEvent('on'+type,fn);
		}else{
			obj['on'+type] = null;
		}
	},
	
	//获取样式值
	getStyle:function(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	},
	
/*
	//设置透明度
	setOpacity:function(obj,){
	}
*/
	//获取窗口的可视宽度
	getDocWidth:function(){
		return document.documentElement.clientWidth||document.body.clientWidth;
	},
	
	//获取窗口的可视高度
	getDocHeight:function(){
		return document.documentElement.clientHeight||document.body.clientHeight;
	}
};


function Point(px,py){
	if(px){
		this.x=  px;
	}else{
		this.x = 0;
	}
	if(py){
		this.y = py;
	}else{
		this.y = 0;
	}

	this.setPoint = function(x,y){
		this.x = x;
		this.y = y;
	}
	
}


Point.prototype.equalPoint = function(p){
	if(p){
		if(this.x==p.x&&this.y==p.y){
			return true;
		}else{
			return false;
		}
	}
}


function isPoint(p){
	if(p){
		if(p.x&&p.y){
			return true;
		}else{
			return false;
		}
	}
	
}


//获取id
function gId(obj){
	return !obj?null:document.getElementById(obj);
}

function gClass(obj){
	return !obj?null:document.getElementsByClassName(obj);
}


//显示
function show(obj){
	obj.style.display = 'block';
}

//隐藏
function hide(obj){
	obj.style.display = 'none';
}

//方法
//属性变化函数   参数意义（变化的物体、变化的属性、变化的速度、变化的目标数值、回调函数）
	function myMove(object,dir,speed,target,endFn){
		var distance = parseInt(getStyle(object,dir));
		if(distance > target){
			speed = -speed;
		}
		clearInterval(object.timer);

		object.timer = setInterval(function(){
			distance+=speed;
			//alert(distance<target&&speed<0);
			if(distance<target&&speed<0||distance>target&&speed>0){
				distance = target;
			}
			
			object.style[dir] = distance+'px';	
			if(distance==target){
				clearInterval(object.timer);
				if(endFn){
					endFn();
				}
				
			}
		},30);
		
		
	}
	
	
//获取元素属性（兼容IE、其他）
function getStyle(element,attr){
	return element.currentStyle? element.currentStyle[attr]:getComputedStyle(element)[attr];
}



//功能函数

function labelinit(i){
	var g1 = gId(i);
	g1.innerHTML = '';
}

function addPic(par,i,sr,sty,cla){
	var pic = document.createElement('img');
	if(i){pic.id = i;}
	pic.src = 'images/'+sr;
	if(sty){pic.setAttribute('style',sty);}
	if(cla){pic.className = cla;}	
	par.appendChild(pic);
	
}


function setPic(i,s){
	gId(i).src = s;
}

//获取元素索引
function indexT(obj,num){
	var listLi = obj.parentNode.getElementsByTagName(obj.tagName);
	for(var i=0;i<num;i++){
		listLi[i].index = i;
	}
	return obj.index;
}

//改变透明度
function opacityMove(obj,opaSpeed,tSpeed,target,endFn){ 
 
		var op = Number(getOpacity(obj));//透明度0-100  
		if(target<op){
			opaSpeed = -opaSpeed;
		}
		
		if(obj.filters){  //说明是ie6，7，8
			obj.opacityTimer = setInterval(function(){
				op+=opaSpeed;
				if(op>target&&opaSpeed>0||op<target&&opaSpeed<0){
					op = target;
				}
				obj.style.filter = 'alpha(opacity='+op+')';
				if(op==target){
					clearInterval(obj.opacityTimer);
					if(endFn){
						endFn();
					}
				}
			},tSpeed);
		}else{
			target = target/100;
			opaSpeed = opaSpeed/100;
			obj.opacityTimer = setInterval(function(){
				op+=opaSpeed;
				if(op>target&&opaSpeed>0||op<target&&opaSpeed<0){
					op = target;
				}
				obj.style.opacity = op;
				if(op==target){
					clearInterval(obj.opacityTimer);
					if(endFn){
						endFn();
					}
				}
			},tSpeed);
		}
	}
	
	
	function stringToNumber(str){
		var num = '';
		str = str.split('');//将str转化为数组
		for(var i=0;i<str.length;i++){
			if(Number(str[i])==Number(str[i])){
				num +=str[i];	
			}
		}
		return Number(num);
	}
	
	
	
	function getOpacity(obj){
		return obj.filters?stringToNumber(getStyle(obj,'filter')):getStyle(obj,'opacity');
	}
//改变透明度结束
/***********设置透明度**********/
function setOpacity(obj,op){
	if(obj.filters){
		obj.style.filter  = 'alpha(opacity='+op+')';
	}else{
		op /=100;
		obj.style.opacity = op;
	}
}
/***********设置透明度**********/

/*************抖动函数***************/
function shake(obj,attr,fq,amp,endFn){
	var arr = [],num = 0,objAttr;
	if(!fq){
		fq = 50;
	}
	if(!amp){amp=3;}
	clearInterval(obj.shakeTimer);
	for(var i = 5*amp;i>0;i=i-amp){
		arr.push(i,-i);
	}
	arr.push(0);
	if(typeof(obj.objAttr)=='undefined'){
		obj.objAttr = parseInt(getStyle(obj,attr));
	}
	objAttr = obj.objAttr;
	obj.shakeTimer = setInterval(function(){
		objAttr +=arr[num];
		obj.style[attr] = objAttr +'px';
		num++;
		if(num==arr.length){
			clearInterval(obj.shakeTimer);
			if(endFn){
				endFn();
			}
			obj.objAttr=undefined;
		}
	},fq);
}
/*************抖动函数***************/



/*************轮播函数***************/
function appearInfo(n){
		oTitle.innerHTML = info[n].title;
		oContent.innerHTML = info[n].content;
		myMove(oInfo,'bottom',12,0);
}
	


//参数：轮播的对象、有多少张图片、标题信息的对象、轮播速度
function myCarouse(obj,childNum,info,infoArr,fq){
	var oTitle = info.getElementsByTagName('h2')[0],
		oContent = info.getElementsByTagName('p')[0],
		oLi = obj.getElementsByTagName('li');
		
	for(var i=0;i<childNum;i++){
		oList.innerHTML += '<li><a href="#"><img src="'+infoArr[i].src+'" alt="'+infoArr[i].title+'"/></a></li>';
	}
	var oLiWidth = parseInt(getStyle(oLi[0],'width'))+2;
	obj.style.width =oLiWidth*childNum+'px';
	
	//计时器
	obj.carouseTimer = setInterval(function(){
	
		var currentAttr = parseInt(getStyle(obj,'left'));
		var infoHeight = parseInt(getStyle(info,'height'));
		info.style.bottom = -infoHeight+'px';
		if(obj.i==undefined){
			obj.i = 0;
			setTimeout(function(){appearInfo(obj.i)},600);
		}
		
		if(obj.i > 0){
			myMove(obj,'left',30,currentAttr-oLiWidth,function(){appearInfo(obj.i)});
			//oList.style.left=currentAttr-oLiWidth+'px';
		}
		
		obj.i++;
		//alert('oList.i:'+oList.i+'而picNum:'+picNum+'现在的left：'+getStyle(oList,'left') );
		if(obj.i==picNum){
			obj.i = 0;
			myMove(obj,'left',120,0,function(){setTimeout(function(){appearInfo(obj.i)},1200);});
			//clearInterval(oList.carouseTimer);
		}
	},fq);
}
/*************轮播函数***************/

/***************数组的indexOf方法*******************/
function arrIndexOf(arr,elem){
	for(var i=0;i<arr.length;i++){
		if(arr[i]===elem){
			return i;
		}
	}
	return -1;
}

/***************数组的indexOf方法*******************/


/***************判断传入对象与数组里面有无相同项*******************/
function arrNoSame(a,arr){
	for(var i=0;i<arr.length;i++){
		if(a===arr[i]){
			return false;
		}
	}
	return true;	
}

/***************判断传入对象与数组里面有无相同项*******************/

/***************产生x-y之间的随机数*******************/

function randomXtoY(x,y){
	return Math.round(Math.random()*(y-x)+x);
}

/***************产生x-y之间的随机数*******************/

/*********数组的冒泡排序********/
function Bubble_Sort(array){
	var temp;
	for(var i=0;i<array.length;i++){
		for(var j=0;i+j<array.length-1;j++){
			if(array[j]>array[j+1]){
				temp = array[j+1];
				array[j+1] = array[j];
				array[j] = temp;
			}
		}
	}
	return array;
}
/*******数组的冒泡排序法*********/




//DOM操作
/*******获得元素与浏览器的距离（左边和上边）*********/
function getPos(obj){
	var pos = {left:0,top:0};
	while(obj){
		pos.left +=obj.offsetLeft;
		pos.top +=obj.offsetTop;
		obj = obj.offsetParent;
	}
	return pos;
}
/********获得元素与浏览器的距离**********/

/*********getElementsByClassName增强*********/
function myGetElementsByClassName(obj, tagName, classNames){
	var classes = classNames.split('.');
	var ele = obj.getElementsByTagName(tagName),elem=[];
	for(var j=0;j<ele.length;j++){
		ele[j].flag = true;
		for(var i=0;i<classes.length;i++){
			if(!ele[j].className.match(classes[i])){
				ele[j].flag = false;
			}
		}
		if(ele[j].flag){
			elem.push(ele[j]);
		}
	}
	return elem;
}
/**************getElementsByClassName增强*************/


/*
	画布id名为myCanvas
	将上选项栏或者是左选项栏的选项上添加major属性，且属性值为true
	主选项栏索引为答案索引
*/
function linePractice(btnId1,btnId2,btnNum,correctArr,finishFn,correctFn){

	var temp1,temp2,t1,t2,arr1=[],arr2=[],p1,p2,flag=1;
	var correct = [0,3,4,1,2];  //保存正确答案
	var can = gId('myCanvas'),
		cxt = can.getContext('2d');

	for(var i=1;i<btnNum+1;i++){
		gId(btnId1+i).draw =0;
		gId(btnId2+i).draw =0;
		gId(btnId1+i).matchan =undefined;
		gId(btnId2+i).matchan =undefined;
		gId(btnId1+i).index =i-1;
		gId(btnId2+i).index =i-1;
		crossObj.addEvent(gId(btnId1+i),'click',opClick);
		crossObj.addEvent(gId(btnId2+i),'click',opClick);
		
	}


	function isCorrect(){
		for(var i=0;i<btnNum;i++){

			if(gId(btnId1+(i+1)).matchan!=correct[i]){
				return false;
			}
		}
		return true;
	}


	function isAllFill(){
		for(var i=0;i<btnNum;i++){

			if(gId(btnId1+(i+1)).matchan==undefined){
				return false;
			}
		}
		return true;
	}

	function opClick(){

		if(this.getAttribute('major')){
			temp1 = this.index;

		}else{
			temp2 = this.index;
		}
		
		flag = !flag;

		if(flag){//确保已经点击两下（每两次画一次图）
			if(temp1>-1&&temp2>-1){//确保点击一上一下（一左一右）
				
				if(gId(btnId1+(temp1+1)).draw&&!gId(btnId2+(temp2+1)).draw){
				//如果上已绘下未绘

					gId(btnId2+(gId(btnId1+(temp1+1)).matchan+1)).matchan = undefined;
					gId(btnId2+(gId(btnId1+(temp1+1)).matchan+1)).draw = 0;

				}else if(!gId(btnId1+(temp1+1)).draw&&gId(btnId2+(temp2+1)).draw){
					//如果上未绘下已绘

					gId(btnId1+(gId(btnId2+(temp2+1)).matchan+1)).matchan = undefined;
					arr1[gId(btnId1+(gId(btnId2+(temp2+1)).matchan+1)).index] = undefined;
					gId(btnId1+(gId(btnId2+(temp2+1)).matchan+1)).draw = 0;
					
				}else if(gId(btnId1+(temp1+1)).draw&&gId(btnId2+(temp2+1)).draw){
					//如果上下均已绘

					gId(btnId2+(gId(btnId1+(temp1+1)).matchan+1)).matchan = undefined;
					gId(btnId1+(gId(btnId2+(temp2+1)).matchan+1)).matchan = undefined;
					gId(btnId2+(gId(btnId1+(temp1+1)).matchan+1)).draw = 0;
					gId(btnId1+(gId(btnId2+(temp2+1)).matchan+1)).draw = 0;
					arr1[gId(btnId1+(gId(btnId2+(temp2+1)).matchan+1)).index] = undefined;

				}

				gId(btnId2+(temp2+1)).matchan = temp1;
				gId(btnId1+(temp1+1)).matchan = temp2;

				p1 = new Point(parseFloat(gId(btnId1+(temp1+1)).style.left)+parseFloat(gId(btnId1+(temp1+1)).style.width)/2,parseFloat(gId(btnId1+(temp1+1)).style.top)+parseFloat(gId(btnId1+(temp1+1)).style.height));

				p2 = new Point(parseFloat(gId(btnId2+(temp2+1)).style.left)+parseFloat(gId(btnId2+(temp2+1)).style.width)/2,parseFloat(gId(btnId2+(temp2+1)).style.top));

				arr1[temp1] = p1;
				arr2[temp1] = p2;

				drawLine(arr1,arr2);

				if(isAllFill()){
					if(finishFn){
						finishFn();
					}
					if(isCorrect()){
						if(correctFn){
							correctFn();
						}
					}
				}
				
			}

		}


	}




	function drawLine(arr1,arr2){
		
		cxt.clearRect(0,0,1280,720); //清空
		cxt.lineWidth = '3';
		cxt.strokeStyle = 'white';
		cxt.beginPath();//记得表明路径开始，防止清除画布不干净
		for(var i=0;i<arr1.length;i++){
			if(isPoint(arr1[i])&&isPoint(arr2[i])){

				cxt.moveTo(arr1[i].x,arr1[i].y);
				cxt.lineTo(arr2[i].x,arr2[i].y);
				cxt.stroke();
	
			}
		}
		gId(btnId1+(temp1+1)).draw = 1;  //将刚点击的两个选项的绘画属性设为已绘
		gId(btnId2+(temp2+1)).draw = 1;
		temp1 = undefined;  //清空储存刚点击的两个选项索引值的临时变量
		temp2 = undefined;
		
	}

}


//图片预加载
function preLoadImages(arr){   
    var newimages=[], loadedimages=0
    var postaction=function(){}  //此处增加了一个postaction函数
    var arr=(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
            postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image()
        newimages[i].src=arr[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }
    return { //此处返回一个空白对象的done方法
        done:function(f){
            postaction=f || postaction
        }
    }
}