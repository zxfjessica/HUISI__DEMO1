/*
updated on 20160308
14:15
*/
//********块操作方法********
//set zIndex
function setzindex(id,num){
	getID(id).style.position = "absolute";
	getID(id).style.zIndex = num;
}
//get element
function getID(id){	
	return document.getElementById(id);
}
//hide element
function Hide(id){
	getID(id).style.display = "none";
}
//hide element
function Show(id){
	getID(id).style.display = "block";
}
//hied all element
function Hidebyclassname(classname){
	var btn = document.getElementsByClassName(classname);
	for(i=0;i<btn.length;i++){
		btn[i].style.display = "none";
	}
}
//show all element
function Showbyclassname(classname){
	var btn = document.getElementsByClassName(classname);
	for(i=0;i<btn.length;i++){
		btn[i].style.display = "block";
	}
}
//remove element
function RemoveElement(tagname){
	var element = document.getElementsByTagName(tagname);
	for(i=0;i<element.length;i++){
		element[i].style.display = "none";
	}
}
//set Listener(id)
function SetListener(id,name,event){
	getID(id).addEventListener(event,name,false);
}
//remove Listener
function RemoveListener(id,name,event){
	getID(id).removeEventListener(event,name,false);
}
//set Listener(classname)
function Setclickbtn(event,name,fun){
	var btn = document.getElementsByClassName(name);
	for(i=0;i<btn.length;i++){
		btn[i].addEventListener(event,fun,false);
	}
}
function Removeclickbtn(event,name,fun){
	var btn = document.getElementsByClassName(name);
	for(i=0;i<btn.length;i++){
		btn[i].removeEventListener(event,fun,false);
	}
}
//连线题 classname为数字

function Setlink(classname1,top1,left1,classname2,top2,left2){
	var pic1 = document.getElementsByClassName(classname1);
	var pic2 = document.getElementsByClassName(classname2);
	var left_0 = [0,0,0];
	var right_0 = [0,0,0];
	var choice = [0,0];
	var Choice = [1,1];
	var startx = [0,0];
	var starty = [0,0];
	var Ans = [0,0,0];
	var none = [0,0,0];
	var sort = [0,0,0];
	var choose = 0;
	var sign1 = 0;
	var sign2 = 0;
	var line;
	var count = 0;
	for(i=0;i<pic1.length;i++){
		var l = i+1;
		pic1[i].style.display = "block";
		pic1[i].src = "images/l"+l+".png";//
		pic1[i].style.top = top1[i]+"px";
		pic1[i].style.left = left1[i]+"px";
		var id1 = classname1+l;
		SetListener(id1,drawline,"click");
	}
	for(i=0;i<pic2.length;i++){
		var r = i+1;
		pic2[i].style.display = "block";
		pic2[i].src = "images/r"+r+".png";//
		pic2[i].style.top = top2[i]+"px";
		pic2[i].style.left = left2[i]+"px";
		var id2 = classname2+r;
		SetListener(id2,drawline,"click");
	}
	function initnum(){
		startx = [0,0];
		starty = [0,0];
		choice = [0,0];
		left_0 = [0,0,0];
		right_0 = [0,0,0];
		sign1 = 0;
		sign2 = 0;
		//count = 0;
	}
	function drawline(){
		//Message(Ans);
		var str = this.id;   
		var s_ = str.substring(1);
		var s = parseInt(str.substring(1));
		var flag = str.substring(0,1);//left or right
		var thisx = getID(str).style.left;
		var thisy = getID(str).style.top;
		var x = parseInt(thisx.substring(0,3));
		var y = parseInt(thisy.substring(0,3));
		var c=document.getElementById("demoCanvas");
		var cxt=c.getContext("2d");
		cxt.strokeStyle = "#1E90FF";//color
		cxt.lineWidth = 4;//width
		if(flag==0){
			choice[0] = 1;
			startx[0] = x+160;
			starty[0] = y+41.5;	
			left_0 = [0,0,0];
			left_0[s-1] = 1;
			if(right_0.toString()==none.toString()){
				sign1 = str;
				sign2 = s_;
			}
			else{}
			//Message(sign1);
		}
		else{
			choice[1] = 1;
			startx[1] = x;
			starty[1] = y+41.5;	
			right_0 = [0,0,0];
			right_0[s-1] = 1;
			if(left_0.toString()==none.toString()){
				sign1 = str;
				sign2 = s_;
			}
			else{}
		}
		if(choice.toString()==Choice.toString()){
			cxt.moveTo(startx[0],starty[0]);
			cxt.lineTo(startx[1],starty[1]);
			cxt.stroke();
			line = sign2+s_;
			Ans[choose]=parseInt(line);
			//var a = Ans.sort(function(a,b){return a-b;});
			RemoveListener(sign1,drawline,"click");
			RemoveListener(str,drawline,"click");
			initnum();
			choose = choose+1;
			
		}
		else{
			//initnum();
		}
		if(choose==3){
			var SORT = Ans.sort(function(a,b){return a-b;});
			Message(SORT);
		}
		else{}
	}
}
//choose 选择题 strr控制单选或者多选
function Setchoose(classname,top,left,ans,fun,num,strr){
	var pic = document.getElementsByClassName(classname);
	var flag = [0,0,0,0,0];
	var Ans = [0,0,0,0,0];
	for(i=0;i<pic.length;i++){
		pic[i].style.display = "block";
		pic[i].src = "images/c1.png";//
		pic[i].style.top = top[i]+"px";
		pic[i].style.left = left[i]+"px";
		var n = i+1;
		var id = classname+n;
		SetListener(id,mark,"click");
	}
	//
	function mark(){
		var str = this.id;                     
		var m = parseInt(str.substring(1));
		var m = m-1;
		if(flag[m]==0){
			var s = "single";
			if(strr == s){
				for(i=0;i<pic.length;i++){
					Ans[i] = 0;
					flag[i] = 0;
					pic[i].src = "images/c1.png"
				}
			}
			else{
				
			}
			pic[m].src = "images/c2.png";
			Show(submit);
			Setpic("submit","submitbtn.png",517,875.6);//submit
			SetListener("submit",checkans,"click");
			Ans[m] = 1;
			flag[m] = 1;
		}
		else{
			pic[m].src = "images/c1.png";
			flag[m] = 0;
			Ans[m] = 0;
			var none = [0,0,0,0,0];
			if(none.toString()==Ans.toString()){
				Hide(submit);
				RemoveListener("submit",checkans,"click");
			}
			else{
			}
		}
	}
	//
	function checkans(){
		for(i=0;i<pic.length;i++){
			pic[i].style.display = "block";
			var n = i+1;
			var id = classname+n;
			RemoveListener(id,mark,"click");
		}
		count = count+1;
		if(ans.toString()==Ans.toString()){
			//Message(num);
			var src1 = "fbrbg"+num+".jpg";
			var src2 = "fbr"+num+".png";
			Hide(submit);
			Show(jixu);
			Show(mask);
			Show(fbr);
			Setpic("bg",src1,0,0);
			Setpic("mask","a.png",250.0,332,36.6,249.2);
			Setpic("fbr",src2,339.3,283.4);
			right = right+1;
		}
		else{
			//Message("wrong");
			var src1 = "fbw"+num+".png";
			Hide(submit);
			Show(mask);
			Show(jixu);
			Show(fbw);
			Setpic("mask","a.png",250.0,332,36.6,249.2);
			Setpic("fbw",src1,526.5,389.4);
		}
		Setpic("jixu","jixubtn.png",610.1,1041.2);
		//
		if(count==5){
			SetListener("jixu",retrytest,"click");
			
		}
		else{
			SetListener("jixu",fun,"click");
		}
		RemoveListener("submit",checkans,"click");
	}
	//
	function retrytest(){
		if(right==5){
			Show(goon);
			Setpic("bg","fballr.jpg",0,0);
			Setpic("goon","continuebtn.png",502.1,1045.8);
			SetListener("goon",goahead,"click");
		}
		else{
			var ss = "fbw"+right+".jpg";
			Setpic("bg",ss,0,0);
			Show(retry);
			Setpic("retry","retrybtn.png",502.1,1045.8);
			SetListener("retry",over,"click");
			flag = [0,0,0,0,0];
			Ans = [0,0,0,0,0];
		}
		init();
		RemoveListener("jixu",retrytest,"click");
	}
	//
	function init(){
		Hide(mask);
		Hide(fbr);
		Hide(fbw);
		Hide(jixu);
		Hidebyclassname("e");
		flag = [0,0,0,0,0];
		Ans = [0,0,0,0,0];
	}
}

//set pic by px(class)
function Setpics(classname,top,left){
	var pic = document.getElementsByClassName(classname);
	for(i=0;i<pic.length;i++){
		pic[i].src = "images/c1.png";
		pic[i].style.top = top[i]+"px";
		pic[i].style.left = left[i]+"px";
	}
}

//set pic by px(id)
function Setpic(id,name,top,left,width,height){
	var pic = getID(id);
	pic.src = "images/"+name;
	pic.style.top = top+"px";
	pic.style.left = left+"px";
	pic.style.width = width+"px";
	pic.style.height = height+"px";
}
//
function Setpicc(id,name,top,left,width,height){
	var pic = getID(id);
	pic.src = "zmages/"+name;
	pic.style.top = top+"px";
	pic.style.left = left+"px";
	pic.style.width = width+"px";
	pic.style.height = height+"px";
}
//set div
function Setdiv(id,num,top,left,width,height){
	var div = getID(id);
	div.style.left = left+"px";
	div.style.top = top+"px";
	div.style.width = width+"px";
	div.style.height = height+"px";
	div.style.zIndex = num;
}
//set pic by %
function Setfullpic(id,name,width,height){
	var pic = getID(id);
	pic.src = "images/"+name;
	pic.style.width = width+"%";
	pic.style.height = height+"%";
}
//Drag
function Rundrag(id){
	//Setpic("drag","tri.png",100,100,56,70);
	SetListener(id,DragStart,"touchstart");
	SetListener(id,DragMove,"touchmove");
	SetListener(id,DragEnd,"touchend");
}
var isdrag=false; 		
var tx,x,ty,y;
var disX = 0;
var disY = 0;
var drag = getID(drag);
function DragStart(e){
	var e = e || window.event;
	isdrag = true; 
	e.preventDefault();
	tx = parseInt($("#drag").css('left'));
	ty = parseInt($("#drag").css('top'));    	
	x = e.touches[0].pageX;
	y = e.touches[0].pageY;
	//Message(y);
}
function DragMove(e){
	var e = e || window.event;
	if (isdrag){
		var left = parseInt(getID("drag").style.left);
		var top = parseInt(getID("drag").style.top);
		e.preventDefault();
		var n = tx + e.touches[0].pageX - x;
		var m = ty + e.touches[0].pageY - y;
		
		if(n<0){
			n=0;
		}
		if(m<0){
			m=0;
		}
		if(n>1224){
			n=1224;
		}
		if(m>650){
			m=650;
		}
		$('#drag').css('left',n);
		$('#drag').css('top',m);
	} 
	else{
		
	}
}
function DragEnd(e){
	var e = e || window.event;
	isdrag = false;
	
}
//********change page*************
function addTouchevent(id,fun){
	getID(id).addEventListener('touchstart',touchstart,false);
	getID(id).addEventListener('touchend',touchend,false);
	getID(id).addEventListener('touchend',window[fun],false);
}
var theoneY;
var theotherY;
var theoneX;
var theotherX;
var changescreen = 0;  //1上2下3左4右
function touchstart(e){
	e.preventDefault();  //阻止出现滚动条
	theoneX=e.touches[0].clientX;
	theoneY=e.touches[0].clientY;
	changescreen = 0;
}


function touchend(e){
	e.preventDefault();  //阻止出现滚动条
	theotherX=e.changedTouches[0].clientX;
	theotherY=e.changedTouches[0].clientY;
	
	if(Math.abs(theotherY-theoneY)>Math.abs(theotherX-theoneX)){
		if(theotherY-theoneY>20){
			changescreen = 2;//down
		}
		else if(theotherY-theoneY<-20){
			changescreen = 1;//up
		}
	}
	else{
		if(theotherX-theoneX>20){
			changescreen = 4;//right
		}
		else if(theotherX-theoneX<-20){
			changescreen = 3;//leftd
		}
	}
}

function Nextpage(id,n,page,XY){
	var p = (page-1)*100;
	switch(XY){
		case "X":
			if(n<=-10&&parseInt(getID(id).style.left)>-p){
				setTimeout(function(){Nextpage(id,n+10,p,"X")},20);
				getID(id).style.left=parseInt(getID(id).style.left)-10+"%";
			}
			else if(n>=10&&parseInt(getID(id).style.left)<-0){
				setTimeout(function(){Nextpage(id,n-10,p,"X")},20);
				getID(id).style.left=parseInt(getID(id).style.left)+10+"%";
			};
			break;
		case "Y":
			if(n<=-10&&parseInt(getID(id).style.top)>-p){
				setTimeout(function(){Nextpage(id,n+10,p,"Y")},20);
				getID(id).style.top=parseInt(getID(id).style.top)-10+"%";
			}
			else if(n>=10&&parseInt(getID(id).style.top)<-0){
				setTimeout(function(){Nextpage(id,n-10,p,"Y")},20);
				getID(id).style.top=parseInt(getID(id).style.top)+10+"%";
			};
			break;
		default:
			break;		
	}
}
function Stagechange(){
	//1上2下3左4右
	switch(changescreen)
	{
		case 1:
			break;
		case 2:
			break;
		case 3:
			Nextpage("slide",-100,15,"X");
			break;
		case 4:
			break;
		default:
			break;
	}
}
//********effect********
function MoveX(id,lengthX,speedX,length){
	var num = parseInt(length);
	if(lengthX>=1){
		getID(id).style.left=parseInt(getID(id).style.left)+num+"px";
		setTimeout(function(){MoveX(id,parseInt(lengthX-1),speedX,length)},1000/speedX);
	}
	if(lengthX<=-1){
		getID(id).style.left=parseInt(getID(id).style.left)-num+"px";
		setTimeout(function(){MoveX(id,parseInt(lengthX+1),speedX,length)},1000/speedX);
	}
}
function MoveY(id,lengthY,speedY,length){
	var num = parseInt(length);
	if(lengthY>=1){
		getID(id).style.top=parseInt(getID(id).style.top)+num+"px";
		setTimeout(function(){MoveY(id,parseInt(lengthY-1),speedY,length)},1000/speedY);
	}
	if(lengthY<=-1){
		getID(id).style.top=parseInt(getID(id).style.top)-num+"px";
		setTimeout(function(){MoveY(id,parseInt(lengthY+1),speedY,length)},1000/speedY);
	}
}
//set opacity
function SetOpacity(id,opacity1,opacity2,speed){
	if(parseInt(opacity1)<parseInt(opacity2)){
		getID(id).style.opacity=opacity1/100;
		getID(id).style.opacity=Number(getID(id).style.opacity)+0.1;
		setTimeout(function(){
		SetOpacity(id,parseInt(opacity1+10),opacity2,speed);}
		,1000/speed);
	}
	else if(parseInt(opacity1)>parseInt(opacity2)){
		getID(id).style.opacity=opacity1/100;
		getID(id).style.opacity=Number(getID(id).style.opacity)-0.1;
		setTimeout(function(){
		SetOpacity(id,parseInt(opacity1-10),opacity2,speed)}
		,1000/speed);
	}
	else{return;}
}
//set style
function Setstyle(id,style,num){
	switch(style){
		case "width":
			getID(id).style.width = num +"px";
			break;
		case "height":
			getID(id).style.height = num +"px";
			break;
		case "top":
			getID(id).style.top = num +"px";
			break;
		case "left":
			getID(id).style.left = num +"px";
			break;
		case "opacity":
			getID(id).style.opacity = num/100;//0-100
			break;
		default:
			break;
	}
}
//set opacity from 0-1 or 1-0
function Fade(id,num,speed){
	if(num>=0.01){//fadeIn
		getID(id).style.opacity=parseFloat(getID(id).style.opacity)+0.01;
		setTimeout(function(){Fade(id,parseFloat(num-0.01),speed)},1000/speed);
	}
	if(num<=-0.01){//fadeOut
		getID(id).style.opacity=parseFloat(getID(id).style.opacity)-0.01;
		setTimeout(function(){Fade(id,parseFloat(num+0.01),speed)},1000/speed);
	}
}
function Scale(id,length,speed){
	var n = parseFloat(parseFloat(getID(id).style.width)/parseFloat(getID(id).style.height));
	var m = parseFloat(1/n);
	//Message(n)
	if(length>=1){
		getID(id).style.width=parseInt(getID(id).style.width)+1+"px";
		getID(id).style.height=parseInt(getID(id).style.height)+m+"px";
		setTimeout(function(){Scale(id,parseInt(length-1),speed)},1000/speed);
	}
	if(length<=-1){
		getID(id).style.width=parseInt(getID(id).style.width)-m+"px";
		getID(id).style.height=parseInt(getID(id).style.height)-1+"px";
		setTimeout(function(){Scale(id,parseInt(length+1),speed)},1000/speed);
	}
}
//********media********
//soundplay have callback
function PlayAud(url,fn){
	var audio=new Audio;
	audio.src='audio/'+url+'.wav';
	audio.play();
	if(fn){	
		//audio.onended = function(){fn;}
		audio.addEventListener('ended',fn);
	}
	else{}
}
	
//soundplay
var isPlayaudio = 0;
var isPlayvideo = 0;
var video;
var audio;
function Playaudio(id,name,btn){
	audio = getID(id);
	audio.src = "media/"+name;
	SetListener(btn,Plays,"touchstart");
}
function Plays(){
	if(isPlayaudio==0){
		audio.play();
		isPlayaudio = 1;
	}
	else{
		audio.pause();
		isPlayaudio = 0;
	}
}
//soundplay only
function PlaySound(name,time) {
	var audio=new Audio;
	audio.src = "audio/"+name;
	audio.currentTime = time;
	audio.play();
}
function StopSound(name) {
	var audio = document.getElementById(mcName);
	audio.pause();
}
//videoplay
function PlayVid(id,className,url,fn){
	getID('vi').style.display="block";
	getID(id).innerHTML="<video id='videoMP4' width='1280px' height='720px' class="+className+" autoplay"+" controls><source src="+url+".mp4 type='video/mp4'></video>"//width height
	getID('videoMP4').onended=function(){
		//getID(id).innerHTML='';
		fn();
	}
}
//videoclear
function ClearVid(DivName){
	var video=document.getElementById("videoMP4");
	if(video){
		stopVideoFromName("videoMP4");
	}
	var videodiv = getID(DivName);
	videodiv.innerHTML="";
	videodiv.style.display="none";
}
//videoplay
function Playvideo(id,name,btn,width,height){
	video = getID(id);
	video.src = "video/"+name;
	video.style.width = width+"px";
	video.style.height = height+"px";
	SetListener(btn,Playv,"touchstart");
	//video.play();
}
function Playv(){
	if(isPlayvideo==0){
		video.play();
		isPlayvideo = 1;
	}
	else{
		video.pause();
		isPlayvideo = 0;
	}
}
//图片预加载
function preLoadImg(arrImg,fct0,fct1){
	var numDone=0;
	var numAll=arrImg.length;
	for(var i=0;i<arrImg.length;i++){
		var img=new Image();
		img.src=arrImg[i];
		img.onload=function(){
			numAdd(this.src);
			console.log(this.src);
		}
	}
	function numAdd(src){
		numDone++;
		if(numDone<numAll){
			console.log("图片"+src+"加载完毕");
			fct0(numDone,numAll);
		}else if(numDone==numAll){
			console.log("图片全部加载完毕！");
			fct1();
		}
	}
}
//********test********
function Message(str){
	alert(str)
}