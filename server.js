var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    articleOne:{
  title :'Article 1 Hari',
  heading :'Article One',
  date :'Oct 10,2016',
  content:`<p>
            This is my first article.This is my first article.This is my first article.This is my first article.
            This is my first article.This is my first article.This is my first article.
            This is my first article.This is my first article.This is my first article.
        </p>
        
        <p>
            This is my first article.This is my first article.This is my first article.This is my first article.
            This is my first article.This is my first article.This is my first article.
            This is my first article.This is my first article.This is my first article.
        </p>
        
        <p>
            This is my first article.This is my first article.This is my first article.This is my first article.
            This is my first article.This is my first article.This is my first article.
            This is my first article.This is my first article.This is my first article.
        </p>`
  
  
},
    articleTwo:{
  title :'Article 2 Hari',
  heading :'Article Two',
  date :'Oct 11,2016',
  content:`This is my second article.`
},
    articleThree:{
  title :'Article 3 Hari',
  heading :'Article Three',
  date :'Oct 12,2016',
  content:`This is my third article.`
}
};
function f(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
 var htmltemplate=`
 <html>
    <head>
        <title>
            ${title}
        </title>
    <link href="/ui/style.css" rel="stylesheet" />
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    </head>
    <body>
        <div class=container>
        <div>
            <a href='/'>Home</a>
        </div>
        <hr/>
        <h1>
            ${heading}
        </h1>
        <div>
            ${date}
        </div>
            ${content}
        </div>
    </body>
</html>`;
return htmltemplate;


}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/article-one',function(req,res){
    res.send(f(articleOne));
});

app.get('/article-two',function(req,res){
    res.send(f(articleTwo));
});


app.get('/article-three',function(req,res){
    res.send(f(articleThree));

    
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
