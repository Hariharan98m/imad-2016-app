var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var Pool=require('pg').Pool;
var config={
   user:'hariharan98m',
   database:'hariharan98m',
   host:'db.imad.hasura-app.io',
   port:'5432',
   password:process.env.DB_PASSWORD
   
};
var pool=new Pool(config);
var usernamesaved='X';
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
        <div class=special>
            <div>
                <a href='/articles'>Back to Articles</a>
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
        
        <div>
        <h5>Comments:</h5>
        <p><input type='text' id='cts' class=special placeholder='Comments'></p>
        <p><input type='submit' value="Submit" id='subbtn'></p>
        <p id='sc'></p>
        <p>
        <a href=/${title} id='refresh'>
        
        <a>
        </p>
        </div>
        <script type="text/javascript" src="/ui/main.js">
        </script>
    </body>
</html>`;
return htmltemplate;


}

function temp(data){
    var list='<ul>';
    for (var i=0;i<data.length;i++){
        var title=data[i].title;
        list+='<li><a href=/'+title+'>'+title+'</a></li>';
    }
    list+='</ul>';
    var htmltemplate=`
 <html>
    <head>
    <link href="/ui/style.css" rel="stylesheet" />
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    </head>
    <body>
        <div class=special>
            <div>
                <a href='/'>Home</a>
            </div>
            <hr/>
            <h3>
                MY ARTICLES
            </h3>
            <div>
                ${list}
            </div>
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

var counter=0;

app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});



app.get('/submitbtn', function (req, res) {
  var name=req.query.name;
  usernamesaved=req.query.name;
  var password=req.query.password;
  pool.query("SELECT * from users where name='"+name+"' and password='"+password+"'",function(err,result){
        if(err){
            res.status(500).send(JSON.stringify(err));
        }
        else
        {   if(result.rows.length===0){
            res.send('Invalid username/password. Try Again');
            }
            else{
            res.send('Successful check for credentials');
            }
        }
    });
    //respond with data
    
});

var crypto=require('crypto');
app.get('/test-db',function(req,res){
    //make a request
    var name='hari';
    pool.query("SELECT * from users where name='"+name+"' and password='"+name+"'",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('Success');
        }
    });
    //respond with data
    
    
});


function hash(input){
    var hashed=crypto.pbkdf2Sync(input,'this-is-a-random-string',10000,512,'sha512');
    return ['pbkdf2Sync','10000','this-is-a-random-string',hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
    //make a request
    var hashedString=hash(req.params.input);
    res.send(hashedString);
    
});
































app.get('/ui/ologo.PNG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ologo.PNG'));
});

app.get('/ui/profilepic.PNG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profilepic.PNG'));
});

app.get('/ui/20151115_084151.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '20151115_084151.jpg'));
});

app.get('/ui/login.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

app.get('/ui/signup.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signup.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/articles.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.html'));
});

var list=[];
app.get('/articles', function (req, res) {
    
    pool.query("SELECT title from articles",function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else{
        
    if(result.rows.length===0){
        res.status(404).send('No articles penned by the author');
    }
    else
        {
            var articleData=result.rows;
            res.send(temp(articleData));
        }
    }
    });
});
/*

app.get('/:articleName',function(req,res){
    //'article-one'
    pool.query("SELECT * from articles where title=$1",[req.params.articleName],function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else if(result.rows.length===0){
        res.status(404).send('Article not found');
    }
    else
        {
            var articleData=result.rows[0];
            res.send(f(articleData));
            
        }
    });
});


*/
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

