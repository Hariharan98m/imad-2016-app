console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML='New Value';
var img=document.getElementById('image');
var marginLeft=0;
function moveRight(){
    marginLeft+=10
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
        var interval=setiinterval(moveRight(),100)
}

