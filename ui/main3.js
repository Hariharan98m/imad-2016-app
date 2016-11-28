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
              temp=document.getElementById('comments').value;
              temp.innerHTML=reply;
          }
      }  
      //Not done yet
    };
var com=document.getElementById('com').value;
var comment=document.getElementById('cts').value;
console.log(comment);

console.log(com);
request.open('GET','http://hariharan98m.imad.hasura-app.io/call', true);
request.send(null);
};