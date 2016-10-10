var counter=0;
var button=document.getElementById('counter');






//Render the variable in correct form
button.onclick=function(){
  counter+=1;
  var span=document.getElementById('count');
  span.innerHTML=counter;
  
};