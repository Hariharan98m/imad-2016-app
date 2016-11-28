var sub=document.getElementById('subbtn');
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
              if (reply==='Log in to comment'){
                  alert(reply);
              }
              temp=document.getElementById('sc').value;
              temp.innerHTML=reply;
          }
      }  
      //Not done yet
    };
var comment=document.getElementById('cts').value;
var title=document.getElementsById('me').value;
console.log(title);
request.open('GET','http://hariharan98m.imad.hasura-app.io/call', true);
request.send(null);
};


