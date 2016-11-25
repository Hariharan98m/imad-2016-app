
/*
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
              var cont=document.getElementById('continue');
              if(reply=='Successful check for credentials'){
                  cont.innerHTML='Continue';
              }
              else{
                  cont.innerHTML='';
              }
              var message=document.getElementById('message');
              message.innerHTML=reply;
              
          }
      }  
      //Not done yet
    };
    

var nameInput= document.getElementById('name');
var name=nameInput.value;
var PasswordInput=document.getElementById('pw');
var pswd=PasswordInput.value;
request.open('GET','http://hariharan98m.imad.hasura-app.io/submitbtn?name='+name+'&password='+pswd, true);
request.send(null);
};*/ 


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

*/
//Render the variable in correct form
//button.onclick=function(){
  //counter+=1;
  //var span=document.getElementById('count');
  //span.innerHTML=counter;
  
//};



//new user
var sub=document.getElementById('signsubmitbtn');
sub.onclick=function(){
    
    //Make a request to the server and send the name
    var request=new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if (request.readyState==XMLHttpRequest.DONE){
          //Take some action
          if(request.status==200){
              //Capture the response and save it
              console.log('Logged in');
              alert('Logged in');
              var reply=request.responseText;
              var cont=document.getElementById('continue');
              if(reply=='User successfully created'){
                  cont.innerHTML='Continue';
              }
              else{
                  cont.innerHTML='';
              }
              var message=document.getElementById('message');
              message.innerHTML=reply;
              
          }
          else if(status==403){
              console.log('Password is incorrect');
                alert('Password is incorrect');
              
          }
              else{
                  alert('Something went wrong');
              }
          
      }  
      //Not done yet
    };
    

var name= document.getElementById('name').value;
var password=document.getElementById('pw').value;
request.open('POST','http://hariharan98m.imad.hasura-app.io/signin', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:name},{password:password}));
}; 



































//Submit name
var submit=document.getElementById('subbtn');
submit.onclick=function(){
    
    //Make a request to the server and send the name
    
    var request=new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if (request.readyState==XMLHttpRequest.DONE){
          //Take some action
          if(request.status==200){
              //Capture a list of names and render it as a list
              var re=document.getElementById('refresh');
              var reply=request.responseText;
              if(reply=='Successfully commented'){
                  re.innerHTML='Refresh the page to see your comment';
              }
              else{
                  re.innerHTML='Try Again';
              }
              var com=document.getElementById('sc');
              com.innerHTML=reply;
          }
      }  
      //Not done yet
    };


//Make the request

var comments= document.getElementById('cts');
comments=comments.value;
request.open('GET','http://hariharan98m.imad.hasura-app.io/subbtn?comments='+comments, true);
request.send(null);
}; 



  

