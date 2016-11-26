var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var bodyParser=require('body-parser');
var Pool=require('pg').Pool;
var config={
   user:'hariharan98m',
   database:'hariharan98m',
   host:'db.imad.hasura-app.io',
   port:'5432',
   password:process.env.DB_PASSWORD
   
};

app.use(bodyParser.json());
var pool=new Pool(config);
var session=require('express-session');

app.use(session({
    secret:'someRandomSecretValue',
    cookie:{maxAge: 1000*60*60*24*30}
}));
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
                ${date.toDateString()}
            </div>
                ${content}
        </div>
        
        <div style='margin:100px'>
            <h5>Comments:</h5>
            <p id='sc'></p>
            <br>
            <input type='text' id='cts' class=special1 placeholder='Comments'>
            <br><br>
            <br>
            <input type='submit' value="Submit" id='subbtn' style='font-family:calibri'>
            </div>
    </body>
</html>`;
return htmltemplate;


}

function temp(data,user){
    var list='<ul>';
    for (var i=0;i<data.length;i++){
        var title=data[i].title;
        var date=data[i].date;
        var d=title+' ('+date+')';
        list+='<li><a href=/'+d+'>'+d+'</a></li><br>';
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
        <h4>Hi ${user} </h4>
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
    var name='hari2';
    var pass='value';
    pool.query("insert into users values('"+name+"','"+pass+"')",function(err,result){
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


function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2Sync','10000',salt,hashed.toString('hex')].join('$');
}




app.post('/create-user', function (req, res) {
    //username,password
    //JSON
    var username=req.body.username;
    var password=req.body.password;
    
   var salt=crypto.randomBytes(128).toString('hex');
   var dBstring=hash(password,salt);
    pool.query("insert into users(name,password) values($1,$2)",[username,dBstring],function(err,result){
        if(err){
            res.send('Username already taken. Choose a different one');
        }
        else
        {
            res.send('User successfully created:'+username);
        }
    });
});


app.post('/login', function (req, res) {
    //username,password
    //JSON
    var username=req.body.username;
    var password=req.body.password;
    pool.query('Select * from users where name=$1',[username],function(err,result){
    if(err){
        res.status(500).send('Something went wrong in the server.');
    }
    else if(result.rows.length===0){
    
        res.send('Username Invalid. Try again.');
    }
    else{
        console.log('I m here');
        var dBstring=result.rows[0].password;
        var salt=dBstring.split('$')[2];
        var hashed=hash(password,salt);
        if (hashed===dBstring){
        //Set the session
        
        req.session.auth={userId:result.rows[0].id};
        
        
        res.send('Successful check for credentials:'+username);
        
        }
        else
        res.send('Password Mismatch. Try again.');
    }
    
    });
});


app.get('/clogin',function(req,res){
    if (req.session&&req.session.auth&&req.session.auth.userId){
        res.send('You are logged in:'+req.session.auth.userId);
    }
    else
    res.send('You are not logged in');
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


app.get('/ui/main2.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main2.js'));
});


app.get('/ui/articles.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.html'));
});

var list=[];
app.get('/articles', function (req, res) {
    
    pool.query("SELECT * from articles",function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else{
        
    if(result.rows.length===0){
        res.send('No articles penned by the author');
    }
    else
        {
            var articleData=result.rows;
            res.send(temp(articleData,user));
        }
    }
    });
});

app.get('/:articleName',function(req,res){
    //'article-one'
    pool.query("SELECT * from articles where title=$1",[req.params.articleName],function(err,result){
    if(err){
        res.status(500).send('Something went wrong');
    }
    else if(result.rows.length===0){
        res.send('Article not found');
    }
    else
        {   var articleData=result.rows[0];
            var user;
            
    if (req.session&&req.session.auth&&req.session.auth.userId)
        {  
            pool.query("SELECT name from articles where id=$1",[req.session.auth.userId],function(err,result){
                user=result.rows[0].name;
            }
        }
        res.send(f(articleData,user));
            
        }
    });
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

