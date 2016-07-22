window.onload=function(){
  waterfall('parent','box');

  var dataInt={'data':[{'src':'5.jpg'},{'src':'4.jpg'},{'src':'8.jpg'},{'src':'3.jpg'},{'src':'6.jpg'}]};

  window.onscroll=function(){
  	if(checkscrollside()){
  		var oParent=document.getElementById('parent');
  		for(var i=0;i<dataInt.data.length;i++){
  			var oBox=document.createElement('div');
  			 oBox.className="box";
  			 oParent.appendChild(oBox);
  			 var oimg=document.createElement('div');
  			 oimg.className='img';
  			 oBox.appendChild(oimg);
  			 var iimg=document.createElement('img');
  			 iimg.src='img/'+dataInt.data[i].src;
  			 oimg.appendChild(iimg);
  		}
  		waterfall('parent','box');
  	};
  }
}


   //  查早parent中所用classname的节点
function getClassObj(parent,className){
	var obj=parent.getElementsByTagName('*');
	var boxS=[];
	for(var i=0;i<obj.length;i++){
		if(obj[i].className==className){
			boxS.push(obj[i]);
		}
	};
	return boxS;
}

function waterfall(parent,box){
	var oParent=document.getElementById(parent);
	var aBox=getClassObj(oParent,box);
	var iBoxW=aBox[0].offsetWidth;
	var num=Math.floor(document.documentElement.clientWidth/iBoxW);
	    oParent.style.cssText='width:'+iBoxW*num+'px;margin:0 auto;';
    var  boxHArr=[];
    for(var i=0;i<aBox.length;i++){
    	var boxH=aBox[i].offsetHeight;
    	if(i<num){
    		boxHArr[i]=boxH;
    	}else{
    		var minH=Math.min.apply(null,boxHArr);
    		var minHIndex=getminHIndex(boxHArr,minH);
    		aBox[i].style.position='absolute';
    		aBox[i].style.top=minH+'px';
    		aBox[i].style.left=aBox[minHIndex].offsetLeft+'px';
            boxHArr[minHIndex]+=aBox[i].offsetHeight;
    	}
    } 
}

        //返回最短的图片位置，在一排中第几张
function getminHIndex(arr,minH){
	for(var i in arr){
		if(arr[i]==minH){
			return i;
		}
	}

}

function checkscrollside(){
	var oParent=document.getElementById('parent');
	var aBox=getClassObj(oParent,'box');
	var lastBoxH=aBox[aBox.length-1].offsetTop+Math.floor(aBox[aBox.length-1].offsetHeight/2);
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var documentH=document.documentElement.clientHeight;
	 return (lastBoxH<scrollTop+documentH)?true:false;
}