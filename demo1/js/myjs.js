function addListenerObj(obj,className,clickFun){
	obj.style.cursor="pointer";
	obj.className=className;
	obj.onclick=function(){}
	isTouchDevice(obj,null,null,touchend);
	function touchend(evt,obj){
		if(Math.abs(obj.satrtXYList[0].x-obj.moveXYList[0].x)<=15 && Math.abs(obj.satrtXYList[0].y-obj.moveXYList[0].y)<=15){
			if(clickFun){
				clickFun(evt,obj);
			}
		}
	}
}
function removeListenerObj(obj) {
	obj.className=null;
	obj.style.cursor="";
	obj.onclick=null;
	if(obj.killListtener){
		obj.killListtener();
	}
}
function runEffectImg(obj,offest,endfun,speed){
	var suf=getSuffixStyle(obj,"left");
	obj.style.left=getNumValue(obj.pleft)+getNumValue(offest.left)+suf;
	obj.style.top=getNumValue(obj.ptop)+getNumValue(offest.top)+suf;
	obj.style.width=getNumValue(obj.pwidth)+getNumValue(offest.width)+suf;
	obj.style.height=getNumValue(obj.pheight)+getNumValue(offest.height)+suf;
	if(offest.opacity || offest.opacity==0){
		obj.style.opacity=getNumValue(offest.opacity);
	}else{
		obj.style.opacity=1;
	}
	if(!speed){
		speed={left:10,top:10,width:10,height:10,opacity:10};
	}
	startObjMove(obj,{left:obj.pleft,top:obj.ptop,width:obj.pwidth,height:obj.pheight,opacity:1},endfun,speed);
}
function getZoomOffestImg(obj){
	var offest={left:getNumValue(obj.pwidth)/2,top:getNumValue(obj.pheight)/2,width:-getNumValue(obj.pwidth),height:-getNumValue(obj.pheight),opacity:0};
	return offest;
}
function yoyoEffectLeftImg(obj){
	eff1();
	function eff1(){
		startObjMove(obj,{left:getNumValue(obj.pleft)+5},eff2,{left:10});
	}
	function eff2(obj){
		startObjMove(obj,{left:getNumValue(obj.pleft)-5},eff1,{left:10});
	}
}
function yoyoEffectTopImg(obj){
	eff1();
	function eff1(){
		startObjMove(obj,{top:getNumValue(obj.ptop)+5},eff2,{top:10});
	}
	function eff2(obj){
		startObjMove(obj,{top:getNumValue(obj.ptop)-5},eff1,{top:10});
	}
}
function yoyoEffectWHImg(obj){
	var scaW=getNumValue(obj.pwidth);
	var scaH=getNumValue(obj.pheight);
	eff1();
	function eff1(){
		var scaX=1.1;
		var scaY=1.1;
		var endPoint={left:getNumValue(obj.pleft)+scaW/2*(1-scaX),top:getNumValue(obj.ptop)+scaH/2*(1-scaY),width:scaW*scaX,height:scaH*scaY};
		startObjMove(obj,endPoint,eff2,{left:10,top:10,width:10,height:10});
	}
	function eff2(obj){
		var scaX=0.9;
		var scaY=0.9;
		var endPoint={left:getNumValue(obj.pleft)+scaW/2*(1-scaX),top:getNumValue(obj.ptop)+scaH/2*(1-scaY),width:scaW*scaX,height:scaH*scaY};
		startObjMove(obj,endPoint,eff1,{left:10,top:10,width:10,height:10});
	}
}
function gotoJumpPage(gotoPage,isdown,curPage){
	stopObjMoveEffect();
	for(var i=0;i<saveTolF.arr.length;i++){
		var objf=saveTolF.arr[i];
		if(objf.id=="F"+curPage || objf.id=="F"+gotoPage){
		}else{
			hidden(objf);
		}
	}
	getId("F"+curPage).style.top="0px";
	if(isdown==false){
		startObjMove(getId("F"+curPage),{top:"1005px"},effOutFPape,{top:20});
		getId("F"+gotoPage).style.top="-1005px";
	}else{
		startObjMove(getId("F"+curPage),{top:"-1005px"},effOutFPape,{top:20});
		getId("F"+gotoPage).style.top="1005px";
	}
	startObjMove(getId("F"+gotoPage),{top:"0px"},null,{top:15});
	eval("fn"+gotoPage)();
	function effOutFPape(obj){
		hidden(obj);
	}
}