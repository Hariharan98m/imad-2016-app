
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
              var reply=request.responseText;
              var cont=document.getElementById('continue');
              if(reply=='User successfully created:'+username){
                  cont.innerHTML='Continue';
                  clas='#b4da88';
                  
              }
              else{
                  cont.innerHTML='';
                  clas='#e27c74';
              }
              reply="<div style='background-color:"+clas+"';>"+reply+'</div>';
              var message=document.getElementById('message');
              message.innerHTML=reply;
          }
      }  
      //Not done yet
    };
    

var username= document.getElementById('name').value;
var password=document.getElementById('pw').value;
request.open('POST','http://hariharan98m.imad.hasura-app.io/create-user', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({'username':username,'password':password}));
};

