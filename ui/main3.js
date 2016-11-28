// Eg: coco98.imad.hasura-app.io/articles/article-one will result in article-one
// Submit username/password to login
    var submit = document.getElementById('subbtn');
    submit.onclick = function () {
        // Create a request object
        
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    var reply=request.responseText;
                    if (reply==='Log in to comment'){
                        alert(reply);
                    }
                    else{
                    var cont=document.getElementById('comment_form');
                    cont.innerHTML=request.responseText;
                    }   
                } 
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('commentbox').value;
        var title = document.getElementById('tit').innerHTML;
        request.open('POST', '/comment', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({'comment': comment,'title':title}));  
        submit.value = 'Submitting...';
    };