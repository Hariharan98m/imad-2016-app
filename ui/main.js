var counter=0;
var button=document.getElementById('counter');
//
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
//Render the variable in correct form
/*button.onclick=function(){
  counter+=1;
  var span=document.getElementById('count');
  span.innerHTML=counter;
  
};*/