// Eg: coco98.imad.hasura-app.io/articles/article-one will result in article-one
// Submit username/password to login
    var submit = document.getElementById('subbtn');
    submit.onclick = function () {
        // Create a request object
        /*
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };
        */
        // Make the request
        var comment = document.getElementById('commentbox').value;
        var form = document.getElementById('comment_form').value;
        form.innerHTML='I ve changed the comment';
        console.log(comment);
        console.log(form);
    };