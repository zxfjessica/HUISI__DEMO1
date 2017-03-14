function setMyCompleted(obj){
	window.parent.postMessage("setCompleted#"+obj,"*");
}
function totalLoPage(num){
	window.parent.postMessage("totalPage#"+num,"*");
}
function nowLoPage(num){
	window.parent.postMessage("nowPage#"+num,"*");
}
function setMyVideoState(str){
	//window.parent.postMessage("setVideoState#"+str,"*");
}
function updateMyPercent(str){
	//window.parent.postMessage("updatePercent#"+str,"*");
}
/////////////////////////////////
function loadImgInit(){
	var imgTotal=loadImgInit.arguments.length;
	var totalWidth=getNumValue(getId('loadingbar').style.width);
	var suf=getSuffixStyle(getId('loadingbar'),"width");
	var imgLoaded=0;
	getId('loadingbar').style.width="0"+suf;
	showId('loadingbar');
	var preloadList=new Array();
	for (var i = 0; i < imgTotal; i++) {
		preloadList[i] = new Image();
		preloadList[i].mysrc = loadImgInit.arguments[i];
		preloadList[i].src = loadImgInit.arguments[i];
		preloadList[i].onload=afterImageLoaded;
	}
	function afterImageLoaded(){
		imgLoaded++;
		var loadingWidth=totalWidth*imgLoaded/imgTotal;
		getId('loadingbar').style.width=loadingWidth+suf;
		if(imgLoaded==imgTotal){
			saveTolF.arr[0].style.display='none';
			if(suf=="%" && typeof(sw)!="undefined" && typeof(sh)!="undefined"){
				var imgObj=new Object();
				for (var i=0;i<imgTotal;i++){
					var mysrc=preloadList[i].mysrc;
					var w=preloadList[i].width;
					var h=preloadList[i].height;
					var wp=Math.round(w/sw*100*1000)/1000;
					var hp=Math.round(h/sh*100*1000)/1000;
					imgObj[mysrc]={width:wp+"%",height:hp+"%"};
				}
				loadImgInit.imgObj=imgObj;
			}
			loadImgInit.end();
		}
	}
}
function rspImg(obj,url,Json){
	obj.src=url;
	if(Json){
		for(var p in Json){	
			obj.style[p]=Json[p];
		}
	}
}
function attr(obj,Json){
	if(Json){
		for(var p in Json){	
			obj.style[p]=Json[p];
		}
	}
}
function savaRspImg(){	
	var curArr=[];
	for(var i=0; i<arguments.length;i++){	
		curArr[i]=arguments[i];
	}
	return savaRspImg.arr=curArr;
}
function savaClickO(){	
	var curArr=[];
	for(var i=0; i<arguments.length;i++){	
		curArr[i]=arguments[i];
		// curArr[i].isActive='false';
	}
	return savaClickO.arr=curArr;
}
function saveTolF(){	
	var curArr=[];
	for(var i=0; i<arguments.length;i++){	
		curArr[i]=arguments[i];
	}
	return saveTolF.arr=curArr;
}
function getStyle(obj, porperty) {
    if (obj.currentStyle) {
        return obj.currentStyle[porperty];
    } else {
        return getComputedStyle(obj, false)[porperty];
    }
}
// 播放视频
function playVid(className,url,fn){	
	showCurF(getId('myVideo'));
	getId('myVideo').innerHTML="<video id='videoMP4' class="+className+" controls='controls' autoplay='autoplay' onplay='setMyVideoState(true)' onpause='setMyVideoState(false)' onended='videoMP4onended("+fn+")'><source src="+url+".ogv type='video/ogg'><source src="+url+".mp4 type='video/mp4'></video>";
	getId('videoMP4').play();
}
function videoMP4onended(fn){
	getId('myVideo').innerHTML='';
	fn();
}
// 播放声音
var audio=new Audio();
function playAud(url){
	if(url){audio.src=url;}else{audio.src="";}
	if(audio.currentTime>0){audio.currentTime=0;}
	audio.play();
}
var audio1=new Audio();
function playAud1(url,fn){
	if(audio1.fn){
		audio1.removeEventListener('ended',audio1.fn);
	}
	if(url){
		audio1.src=url;
		audio1.play();
		if(audio1.currentTime>0){
			audio1.currentTime=0;
		}
		if(fn){
			audio1.fn=fn
			audio1.addEventListener('ended',fn,false);
		}
	}else{
		audio1.src="";
	}
}
function playAud2(obj,url,fn,pfn,tufn){
	if(obj.fn){
		obj.removeEventListener('ended',obj.fn);
	}
	if(obj.pfn){
		obj.removeEventListener('play',obj.pfn);
	}
	if(obj.tufn){
		obj.removeEventListener('timeupdate',obj.tufn);
	}
	if(url){
		obj.src=url;
		obj.play();
		if(obj.currentTime>0){
			obj.currentTime=0;
		}
		if(fn){
			obj.fn=fn;
			obj.addEventListener('ended',fn,false);
		}
		if(pfn){
			obj.pfn=pfn;
			obj.addEventListener('play',pfn,false);
		}
		if(tufn){
			obj.tufn=tufn;
			obj.addEventListener('timeupdate',tufn,false);
		}
	}else{
		obj.src="";
	}
}
function playAud3(obj,isplay,fn,pfn,tufn){
	if(obj.fn){
		obj.removeEventListener('ended',obj.fn);
	}
	if(obj.pfn){
		obj.removeEventListener('play',obj.pfn);
	}
	if(obj.tufn){
		obj.removeEventListener('timeupdate',obj.tufn);
	}
	if(isplay){
		obj.play();
		if(obj.currentTime>0){
			obj.currentTime=0;
		}
		if(fn){
			obj.fn=fn;
			obj.addEventListener('ended',fn,false);
		}
		if(pfn){
			obj.pfn=pfn;
			obj.addEventListener('play',pfn,false);
		}
		if(tufn){
			obj.tufn=tufn;
			obj.addEventListener('timeupdate',tufn,false);
		}
	}else{
		obj.pause();
	}
}
function showCurFId(id){
	showCurF(getId(id));
}
function showCurF(bestTopObj){
	for(var i=0;i<saveTolF.arr.length;i++){
		hidden(saveTolF.arr[i]);
	}
	show(bestTopObj);
}
//////////////////////////////////////////////////////////////////////////////////////////
function getId(o){
	return document.getElementById(o);
}
function show(objD){
	objD.style.display='block';
}
function hidden(objH){
	objH.style.display='none';
}
function showId(id){
	getId(id).style.display='block';
}
function hideId(id){
	getId(id).style.display='none';
}
function showList(showlist){
	for (var i = 0; i < showlist.length; i++) {
		showId(showlist[i]);
	}
}
function hideList(hidelist){
	for (var i = 0; i < hidelist.length; i++) {
		hideId(hidelist[i]);
	}
}
//更换图片
function switchImg(obj,imgUrl){
	if(loadImgInit.imgObj && loadImgInit.imgObj[imgUrl]){
		rspImg(obj,imgUrl,loadImgInit.imgObj[imgUrl]);
	}else{
		obj.src=imgUrl;
	}
}
function a(obj){
	var Tempobj = document.getElementById(obj);
	return Tempobj;
}
function b(obj)
{	var Tempobj = document.getElementsByName(obj);
	return Tempobj;
}
function c(obj)
{    var Tempobj = document.getElementsByTagName(obj);
	return Tempobj;
}
function ab(obj1,obj2)
{var Tempobj = document.getElementById(obj1).getElementsByName(obj2);
return Tempobj;
}
function ac(obj1,obj2)
{var Tempobj = document.getElementById(obj1).getElementsByTagName(obj2);
return Tempobj;
}
function bc(obj1,obj2)
{var Tempobj = document.getElementsByName(obj1).getElementsByTagName(obj2);
return Tempobj;
}
function acafc(obj1,obj2,Num){//获得目录中的某个对象
	var TempObj = document.getElementById(obj1).getElementsByTagName(obj2)[Num];
	return TempObj;
}
function acnfc(obj1,obj2,Num,objF,objC){
	var TempObj = document.getElementById(obj1).getElementsByTagName(obj2)[Num];
	myswitch(TempObj,objF,objC);
}
function acnfc2(obj1,obj2,Num,objF,objC){
	var TempObj = document.getElementById(obj1).getElementsByTagName(obj2)[Num];
	return myswitch2(TempObj,objF,objC);
}
function afc(obj,objF,objC){
	var TempObj = document.getElementById(obj);
	myswitch(TempObj,objF,objC);
}
function afc2(obj,objF,objC){
	var TempObj = document.getElementById(obj);
	return myswitch2(TempObj,objF,objC);
}
function bfc(obj,objF,objC){
	var TempObj = document.getElementsByName(obj);
	myswitch(TempObj,objF,objC);
}
function cfc(obj,Num,objF,objC){
	var TempObj = document.getElementsByTagName(obj)[Num];
	myswitch(TempObj,objF,objC);
}
function myswitch(TempObj,objF,objC){
	switch(objF){
		case "d":
		TempObj.style.display = objC;break;
		case "o":
	    TempObj.style.opacity = objC;break;
		case "w":
		TempObj.style.width = objC+"px";break;
		case "h":
		TempObj.style.height = objC+"px";break;
		case "l":
		TempObj.style.left = objC+"px";break;
		case "t":
		TempObj.style.top = objC+"px";break;
		case "i":
		TempObj.innerHTML = objC;break;
		case "s":
		TempObj.src = objC;break;
	}
}
function myswitch2(TempObj,objF,objC){
	switch(objF){
		case "d":
		  if(TempObj.style.display == objC){return true; }
		case "o":
	    if(TempObj.style.opacity == objC){return true; }
		case "w":
		if(TempObj.style.width == objC+"px"){return true; }
		case "h":
		if(TempObj.style.height == objC+"px"){return true; }
		case "l":
		if(TempObj.style.left == objC+"px"){return true; }
		case "t":
		if(TempObj.style.top == objC+"px"){return true; }
	}
	return false;
}
function myswitch2Id(id,objF,objC){
	return myswitch2(getId(id),objF,objC);
}
function getmyswitch(id,objF){
	switch(objF){
		case "d":
			return TempObj.style.display;
		case "o":
			return TempObj.style.opacity;
		case "w":
			return TempObj.style.width;
		case "h":
			return TempObj.style.height;
		case "l":
			return TempObj.style.left;
		case "t":
			return TempObj.style.top;
		case "i":
			return TempObj.innerHTML;
		case "s":
			return TempObj.src;
	}
	return "";
}
//===========================================声音==================================
var MingCorseSound=new Audio();
function s(objMP3,funObj)
{
if(objMP3){MingCorseSound.src=objMP3;}else{MingCorseSound.src="";}
if(MingCorseSound.currentTime>0){MingCorseSound.currentTime=0;};
MingCorseSound.play();
if(funObj){MingCorseSound.addEventListener("ended",function(){funObj})}
}
//===========================================视频使用程序==================================
function VideoShow(ObjV,objFun){
afc("myVideo","i",v("video/"+ObjV+".ogv","video/"+ObjV+".mp4",objFun,"",""));
afc("myVideo","d","block");
}
function VideoHide(){
afc("myVideo","d","none");
afc("myVideo","i","");
}
function v(objOGV,objMP4,funObj,thx,thy){
	if(thx==undefined||thx=="undefined"||thx==""||thx==NaN||thx=="NaN"||thx=="Null"||thx==null){thx=1256;}
	if(thy==undefined||thy=="undefined"||thy==""||thy==NaN||thy=="NaN"||thy=="Null"||thy==null){thy=647;}
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' autoplay='autoplay' onended = '"+funObj+"' onplay = 'setMyVideoState(true)' onpause = 'setMyVideoState(false)' id='videoMP4' autobuffer='true'><source src='"+objOGV+"' type='video/ogg'><source src='"+objMP4+"' type='video/mp4'>Your browser does not support the video tag.</video>"
}
function v2(objOGV,objMP4,funObj,thx,thy){
	if(thx==undefined||thx=="undefined"||thx==""||thx==NaN||thx=="NaN"||thx=="Null"||thx==null){thx=1256;}
	if(thy==undefined||thy=="undefined"||thy==""||thy==NaN||thy=="NaN"||thy=="Null"||thy==null){thy=647;}
	return "<video width='"+thx+"' height='"+thy+"' controls='controls' onended = '"+funObj+"' onplay = 'setMyVideoState(true)' onpause = 'setMyVideoState(false)' id='videoMP4' autobuffer='true'><source src='"+objOGV+"' type='video/ogg'><source src='"+objMP4+"' type='video/mp4'>Your browser does not support the video tag.</video>"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<img id="beginbtn" style="position:absolute;left:847px;top:250px;" src="m4/jenny0001.png" alt="">
//var obj=document.getElementById("beginbtn");
//alert(obj.offsetWidth)
//obj.style.width="144px";
//obj.style.height="144px";
//obj.src="m4/jenny0001.png";
//startObjMove(obj,{left:-50,top:-50,opacity:0.5,width:200,height:200},beginbtnmovecomplete);
//var animList=new Array(["m4/jenny0001.png",200],["m4/jenny0002.png",200],["m4/jenny0003.png",200],["m4/jenny0004.png",200]);
//addListenerObj(getId("beginbtn"),"toBig",clickbeginbtnfun);
//function clickbeginbtnfun(e){var mcName=e.currentTarget.id;var idx=parseInt(mcName.substring(7));}
function addListenerObj(obj,className,clickFun,overFun,outFun,downFun,upFun,moveFun){
	obj.style.cursor="pointer";
	obj.className=className;
	if(overFun){
		obj.onmouseover=overFun;
	}
	if(outFun){
		obj.onmouseout=outFun;
	}
	if(clickFun){
		obj.onclick=clickFun;
	}
	if(downFun){
		obj.onmousedown=downFun;
	}
	if(upFun){
		obj.onmouseup=upFun;
	}
	if(moveFun){
		obj.onmousemove=moveFun;
	}
}
function removeListenerObj(obj) {
	obj.className=null;
	obj.style.cursor="";
	obj.onmouseover=null;
	obj.onmouseout=null;
	obj.onclick=null;
	obj.onmousedown=null;
	obj.onmouseup=null;
	obj.onmousemove=null;
}
function animationObjTab(obj,animList,completeFun,animCurIdx,updateFun){
	clearInterval(obj.animationtimer);
	obj.animCurIdx=fixLoToNumber(animCurIdx);
	animNextObj();
	function animIntervalHandler() {
		if(obj.animCurIdx<animList.length-1){
			obj.animCurIdx++;
			animNextObj();
		}else{
			if(completeFun){
				obj.animCurIdx=animList.length-1;
				obj.src=animList[obj.animCurIdx][0];
				clearInterval(obj.animationtimer);
				completeFun(obj);
			}else{
				obj.animCurIdx=0;
				animNextObj();
			}
		}
	}
	function animNextObj(){
		clearInterval(obj.animationtimer);
		obj.src=animList[obj.animCurIdx][0];
		obj.animationtimer = setInterval(animIntervalHandler, animList[obj.animCurIdx][1]);
		if(updateFun){
			updateFun(obj);
		}
	}
}
//var obj=document.getElementById("beginbtn");
//obj.style.width="251px";
//obj.style.height="62px";
//startObjMove(obj,{left:-50,top:-50,opacity:0.5,width:20,height:10},allcompletebegins);
//startObjMove(getId("p1btn"),{left:"58px",top:"60px",opacity:"0.5",width:"20px",height:"10px"},allcompletebegins);
//startObjMove(getId("p1btn"),{left:"58%",top:"60%",opacity:"0.5",width:"20%",height:"10%"},allcompletebegins);
function startObjMove(obj,json,fnEnd,effframes,updateFuns,completeFuns){
	clearInterval(obj.timer);
	effframes=effframes || {};
	obj.json=json;
	for(var attr in json){
		json[attr]=getNumValue(json[attr]);
		obj["eff"+attr+"suffix"]=getSuffixStyle(obj,attr);
		obj["eff"+attr+"Count"]=fixLoToNumber(effframes[attr],25);
		obj["eff"+attr+"addValue"]=(json[attr]-getnfs(attr))/obj["eff"+attr+"Count"];
		obj["eff"+attr+"CurInt"]=0;
	}
	var tmpJson=getCopyJson();
	obj.tmpJson=tmpJson;
	obj.timer=setInterval(timeInterval,40);
	/////////////////////
	function timeInterval(){
		for(var attr in tmpJson){
			if(obj["eff"+attr+"CurInt"]<obj["eff"+attr+"Count"]-1){
				obj["eff"+attr+"CurInt"]++;
				obj.style[attr]=getnfs(attr)+obj["eff"+attr+"addValue"]+obj["eff"+attr+"suffix"];
				if(updateFuns){
					updateFuns(obj,attr);
				}
			}else{
				obj["eff"+attr+"CurInt"]=obj["eff"+attr+"Count"];
				obj.style[attr]=json[attr]+obj["eff"+attr+"suffix"];
				delete tmpJson[attr];
				if(completeFuns){
					completeFuns(obj,attr);
				}else{
					if(updateFuns){
						updateFuns(obj,attr);
					}
				}
				if(getAllJsonObjComplete()){
					clearInterval(obj.timer);
					if(fnEnd){
						fnEnd(obj);
					}
				}
			}
		}
	}
	function getCopyJson(){
		var returnobj={}
		for(var attr in json){
			returnobj[attr]=json[attr];
		}
		return returnobj;
	}
	function getAllJsonObjComplete(){
		for(var attr in tmpJson){
			return false;
		}
		return true;
	}
	function getnfs(attr){
		var str=obj.style[attr];
		if(attr=="opacity"){
			return fixLoToNumber(str || 1);
		}else{
			return getNumValue(str);
		}
	}
}
function randomize_lo_arr(n, m) {
	//randomize_arr n：共多少个进行随机,m:取多个随机数,//randomize_arr(10,10)  return: 1-10
	var temp_arr = new Array();
	var return_arr = new Array();
	var i;
	for (i=1; i<=n; i++) {
		var tmp=parseInt(Math.random()*(temp_arr.length+1));
		temp_arr.splice(tmp,0,i);
	}
	for (i=0; i<m; i++) {
		return_arr.push(temp_arr[i]);//-1
	}
	return return_arr;
}
function randomize_lozero_arr(n, m) {
	//randomize_arr n：共多少个进行随机,m:取多个随机数,//randomize_arr(10,10)  return: 0-9
	var temp_arr = new Array();
	var return_arr = new Array();
	var i;
	for (i=1; i<=n; i++) {
		var tmp=parseInt(Math.random()*(temp_arr.length+1));
		temp_arr.splice(tmp,0,i);
	}
	for (i=0; i<m; i++) {
		return_arr.push(temp_arr[i]-1);
	}
	return return_arr;
}
function fixLoStrZeroLen(str, len) {
	var preStr="";
	for(var i=0;i<len;i++) {
		preStr+="0";
	}
	preStr+=str;
	return preStr.substring(preStr.length-len);
}
function fixLoNumberBound(num0, num1, num2) {
	num0 = parseInt(fixLoToNumber(num0));
	num1 = parseInt(fixLoToNumber(num1));
	num2 = parseInt(fixLoToNumber(num2));
	if (num0 < num1) {
		return num1;
	} else if (num0 > num2) {
		return num2;
	} else {
		return num0;
	}
}
function fixLoNumberForScoreBound(num0, num1, num2, num3) {
	num0 = fixLoToNumber(num0);
	num1 = fixLoToNumber(num1);
	num2 = fixLoToNumber(num2);
	if(num3){
		num0 = Number(   parseFloat(num0).toFixed(  fixLoToNumber(num3)  )   ); //四舍五入,并保留 num3 位小数位
	}else{
		num0 = Math.round(num0 * 10) / 10; //四舍五入,并保留一位小数位
	}
	if (num0 < num1) {
		return num1;
	} else if (num0 > num2) {
		return num2;
	} else {
		return num0;
	}
}
function fixLoToNumber(num,defaultNum) {
	num = Number(num);
	if (isNaN(num)) {
		defaultNum=Number(defaultNum);
		if(isNaN(defaultNum)){
			return 0;
		}else{
			return defaultNum;
		}
	} else {
		return num;
	}
}
function getNumValue(num){
	return fixLoToNumber(parseFloat(num));//.toFixed(2)
}
function getScopeN(m0, m1, m, n0, n1){
	return (m-m0)/(m1-m0)*(n1-n0)+n0;
}
function getPx(pernum,max){
	pernum=getNumValue(pernum);
	return Number(parseFloat(pernum*max/100).toFixed(3));//四舍五入,并保留三位小数位
}
function getPer(pxnum,max){
	pxnum=getNumValue(pxnum);
	return Number(parseFloat(pxnum/max*100).toFixed(3));//四舍五入,并保留三位小数位
}
function getAttrStyle(obj,attr){
	return obj.style[attr];
}
function getSuffixStyle(obj,attr){
	var str=obj.style[attr];
	if(attr=="opacity"){
		return "";
	}else if((str.substring(str.length-1).toLowerCase()=="%")){
		return "%";
	}else{
		return "px";
	}
}
function clickQuit(){
	var browserName=navigator.appName;
	if (browserName=="Netscape") {
		if (window.top != window && window.top != null) {
			window.top.opener = null;
			window.top.open('','_self','');
			window.top.close();
		}
		else{
			window.opener = null;
			window.open('','_self','');
			window.close();
		}
	} 
	else if(browserName=="Microsoft Internet Explorer"){
		if (window.top != window && window.top != null){
			window.top.opener = null;
			window.top.close();
		}
		else{
			window.opener = null;
			window.close();
		}
	}
}
//是否电脑
function IsPC()  {  
   var userAgentInfo = navigator.userAgent;  
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
   var flag = true;  
   for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}
function isSupportHTML5Video(){//是否支持h5
	var isMp4Supp=supportType('video/mp4','avc1.42E01E, mp4a.40.2');
	var isOgvSupp=supportType('video/ogg','theora, vorbis');
	//isMp4Supp="";
	//isOgvSupp="";
	if(isMp4Supp!="" || isOgvSupp!=""){
		return true;
	}else{
		return false;
	}
	///////////////////////function
	function supportType(vidType,codType){ 
		var myVid=document.createElement('video');
		var isSupp="";
		try {
			isSupp=myVid.canPlayType(vidType+';codecs="'+codType+'"');
		} catch (myError) {
			isSupp="";
		} finally {
			//无论是否出现错误，都会执行 finally 代码块
		}
		return isSupp;
	}
}
function isWeiXin(){//是否是微信
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function stageScreenSetting(divname,curW,curH,isfull){
	//<div id="content" style="position:absolute;overflow:hidden; width:1280px; height:720px;">
	var htmlw=document.documentElement.clientWidth;//document.getElementById("htmlfulls").offsetWidth;
	var htmlh=document.documentElement.clientHeight;//document.getElementById("htmlfulls").offsetHeight;
	var scaleX=htmlw/curW;
	var scaleY=htmlh/curH;
	if(isfull==false){
		var scaleXY=Math.min(scaleX,scaleY);
		scaleX=scaleXY;
		scaleY=scaleXY;
	}
	var matrixStr="scale3d("+scaleX+","+scaleY+",1)";//var matrixStr="matrix("+scaleX+",0,0,"+scaleY+",0,0)";
	var ContentDiv=document.getElementById(divname);   //最外层包裹id="window"
	ContentDiv.style.transform=matrixStr;
	ContentDiv.style.msTransform=matrixStr;//IE 9 
	ContentDiv.style.MozTransform=matrixStr;//Firefox
	ContentDiv.style.webkitTransform=matrixStr;// Safari 和 Chrome 
	ContentDiv.style.oTransform=matrixStr;// Opera
	
	var tmpw=htmlw*scaleX;
	var tmph=htmlh*scaleY;
	var tmp2w=curW*scaleX;
	var tmp2h=curH*scaleY;
	var tmpL=(tmpw-tmp2w)/2;
	var tmpT=(tmph-tmp2h)/2;
	ContentDiv.style.left=tmpL/scaleX+"px";
	ContentDiv.style.top=tmpT/scaleY+"px";
	ContentDiv.tmpw=tmpw;
	ContentDiv.tmph=tmph;
	ContentDiv.tmp2w=tmp2w;
	ContentDiv.tmp2h=tmp2h;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isTouchDevice(obj,startfun,movefun,endfun){
	if(obj.killListtener){
		obj.killListtener();
	}
	var isHaveTouch=(IsPC())?false:true;
	if(isHaveTouch){
		obj.addEventListener('touchstart',touchstart,false);
	}else{
		obj.onmousedown=touchstart;
	}
	function setTouchObjXYList(arr){
		var returnList = new Array();
		for(var i=0;i<arr.length;i++){
			var obj=new Object();
			obj.x=arr[i].pageX;
			obj.y=arr[i].pageY;
			returnList[i]=obj;
		}
		return returnList;
	}
	function copyTouchObjXYList(arr) {
		var returnList = new Array();
		for(var i=0;i<arr.length;i++){
			var obj=new Object();
			obj.x=arr[i].x;
			obj.y=arr[i].y;
			returnList[i]=obj;
		}
		return returnList;
	}
	//var satrtXYList=copyTouchObjXYList(obj.satrtXYList);//obj.satrtXYList=copyTouchObjXYList(obj.moveXYList);function myTriangleLen(a,b){return Math.pow(Math.pow(a,2)+Math.pow(b,2),0.5);}
	function touchstart(evt){
		if(evt.touches){
			obj.satrtXYList=setTouchObjXYList(evt.touches);
			obj.moveXYList=copyTouchObjXYList(obj.satrtXYList);
			obj.removeEventListener('touchmove',touchmove);
			obj.removeEventListener('touchend',touchend);
			obj.addEventListener('touchmove',touchmove,false);
			obj.addEventListener('touchend',touchend,false);
		}else{
			obj.satrtXYList=setTouchObjXYList([evt]);
			obj.moveXYList=copyTouchObjXYList(obj.satrtXYList);
			obj.onmousemove=null;
			obj.onmouseup=null;
			obj.onmousemove=touchmove;
			obj.onmouseup=touchend;
		}
		if(startfun){
			startfun(evt,obj);
		}
	}
	function touchmove(evt){
		if(evt.touches){
			obj.moveXYList=setTouchObjXYList(evt.touches);
		}else{
			obj.moveXYList=setTouchObjXYList([evt]);
		}
		if(movefun){
			movefun(evt,obj);
		}
	}
	function touchend(evt){
		if(evt.touches){
			obj.removeEventListener('touchmove',touchmove);
			obj.removeEventListener('touchend',touchend);
		}else{
			obj.onmousemove=null;
			obj.onmouseup=null;
		}
		if(endfun){
			endfun(evt,obj);
		}
	}
	obj.killListtener=function(){
		obj.removeEventListener('touchstart',touchstart);
		obj.removeEventListener('touchmove',touchmove);
		obj.removeEventListener('touchend',touchend);
		obj.onmousedown=null;
		obj.onmousemove=null;
		obj.onmouseup=null;
	}
}
function getFirstLabelDiv(objf){
	var divarr=objf.getElementsByTagName("div");
	var returnList=new Array();
	for(var n=0;n<divarr.length;n++){
		var obj=divarr[n];
		if(obj.parentNode.id==objf.id){
			returnList.push(obj)
		}
	}
	return returnList;
}
function stopObjMoveEffect(){
	for(var i=0;i<saveTolF.arr.length;i++){
		killObjsEnterFrame(saveTolF.arr[i],true,null,null);
	}
}
function killObjsEnterFrame(objf,isHaveSelf,isDivSH,isImgSH){
	if(isHaveSelf){
		killEnterFrame(objf);
		if(isDivSH==true){
			show(objf);
		}else if(isDivSH==false){
			hidden(objf);
		}
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		killEnterFrame(imgarr[m]);
		if(isImgSH==true){
			show(imgarr[m]);
		}else if(isImgSH==false){
			hidden(imgarr[m]);
		}
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		killEnterFrame(divarr[n]);
		if(isDivSH==true){
			show(divarr[n]);
		}else if(isDivSH==false){
			hidden(divarr[n]);
		}
	}
}
function killEnterFrame(obj){
	clearInterval(obj.timer);
	clearTimeout(obj.timerout);
	clearInterval(obj.animationtimer);
	for(var m=0;m<20;m++){
		clearTimeout(obj["timer"+m]);
		clearTimeout(obj["timerout"+m]);
		clearTimeout(obj["animationtimer"+m]);
	}
	if(obj.killListtener){
		obj.killListtener();
	}
	if(obj.onclick){
		removeListenerObj(obj);
	}
}
function saveObjsLTWH(objf,isHaveSelf,iskill,isDivSH,isImgSH){
	if(isHaveSelf){
		saveObjLTWH(objf,iskill,isDivSH);
	}
	var imgarr=objf.getElementsByTagName("img");
	for(var m=0;m<imgarr.length;m++){
		saveObjLTWH(imgarr[m],iskill,isImgSH);
	}
	var divarr=objf.getElementsByTagName("div");
	for(var n=0;n<divarr.length;n++){
		saveObjLTWH(divarr[n],iskill,isDivSH);
	}
}
function saveObjLTWH(obj,iskill,isSH){
	if(obj){
		if(!obj.pleft){
			obj.pleft=obj.style.left;
		}
		if(!obj.ptop){
			obj.ptop=obj.style.top;
		}
		if(!obj.pwidth){
			obj.pwidth=obj.style.width;
		}
		if(!obj.pheight){
			obj.pheight=obj.style.height;
		}
		if(iskill){
			killEnterFrame(obj);
		}
		if(isSH==true){
			show(obj);
		}else if(isSH==false){
			hidden(obj);
		}
	}
}
