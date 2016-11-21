
var submit=document.getElementById('submitbtn');
submit.onclick=function(){
    
    //Make a request to the server and send the name
    
    var request=new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if (request.readyState==XMLHttpRequest.DONE){
          //Take some action
          if(request.status==200){
              //Capture the response and save it
              var reply=request.responseText;
              var message=document.getElementById('namelist');
              message.innerHTML=reply;
          }
      }  
      //Not done yet
    };
    

var nameInput= document.getElementById('name');
var name=nameInput.value;
var PasswordInput=document.getElementById('pw');
var pswd=PasswordInput;
request.open('GET','http://hariharan98m.imad.hasura-app.io/submitbtn?name='+name+'&password='+pswd, true);
request.send(null);
}; 


/*
var button=document.getElementById('counter');
button.onclick=function(){
//Make a request to the counter endpoint
    var request=new XMLHttpRequest();
//Capture the request and store it in a variable
    request.onreadystatechange=function(){
      if (request.readyState==XMLHttpRequest.DONE){
          //Take some action
          if(request.status==200){
              var counter=request.responseText;
              
  var span=document.getElementById('count');
  span.innerHTML=counter;
          }
      }  
      //Not done yet
    };


//Make the request
request.open('GET','http://hariharan98m.imad.hasura-app.io/counter', true);
request.send(null);
};

//Render the variable in correct form
//button.onclick=function(){
  //counter+=1;
  //var span=document.getElementById('count');
  //span.innerHTML=counter;
  
//};

//Submit name
var submit=document.getElementById('submitbtn');
submit.onclick=function(){
    
    //Make a request to the server and send the name
    
     var request=new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if (request.readyState==XMLHttpRequest.DONE){
          //Take some action
          if(request.status==200){
              //Capture a list of names and render it as a list
              var names=request.responseText;
              names=JSON.parse(names);
              var list='';
              for(var i=0;i<names.length;i++){
                  list+='<li>'+names[i]+'</li>';
              }
              var ul=document.getElementById('namelist');
              ul.innerHTML=list;
          }
      }  
      //Not done yet
    };


//Make the request

var nameInput= document.getElementById('name');
var name=nameInput.value;
request.open('GET','http://hariharan98m.imad.hasura-app.io/submitbtn?name='+name, true);
request.send(null);
}; 


*/
  

