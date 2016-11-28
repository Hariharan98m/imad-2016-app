var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var bodyParser=require('body-parser');
app.use(bodyParser.json());

var Pool=require('pg').Pool;
var config={
   user:'hariharan98m',
   database:'hariharan98m',
   host:'db.imad.hasura-app.io',
   port:'5432',
   password:process.env.DB_PASSWORD
};
var pool=new Pool(config);
var session=require('express-session');
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{maxAge: 1000*60*60*24*30}
}));
var crypto=require('crypto');


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



function f(data){
    console.log(data);
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var comments=data.comments;
 var htmltemplate=`
 <html>
      <head>
          <title>
              ${title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head> 
      <body>
          <div class="special">
              <div>
                  <a href="/articles">Back to articles</a>
              </div>
              <hr/>
              <h1>
                  ${heading}
              </h1>
              <div>
                  ${date.toDateString()}
              </div>
              <div>
                ${content}
              </div>
              <hr/>
              <div style='margin:100px'>
        
                  <input type='text' id='cts' class=special1 placeholder='Comment box'/><br><br>
                  <input type='submit' value="Submit" id='subbtn' style='font-family:calibri'/><br><br>
                  <h5>Comments:</h5>
                  <div id="comments">
                  ${comments}
                  </div>
              
              </div>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
      </body>
    </html>
`;
 
 
 
return htmltemplate;
}

app.get('/call',function(req,res){
    res.send('Success');
});
function temp(data,user){
    console.log('in temp u:'+user);
    var list='<ul>';
    for (var i=0;i<data.length;i++){
        var title=data[i].title;
        var date=data[i].date1;
        var d=title+' ('+date+')';
        list+='<li><a href=/'+title+'>'+d+'</a></li><br>';
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
            <i> ${user} </i>
            <br><br>
            <div>
                <a href='/logout'>Logout</a>
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

app.get('/clogin',function(req,res){
    if (req.session&&req.session.auth&&req.session.auth.userId){
        pool.query("Select name from users where id='"+req.session.auth.userId.toString()+"'",function(err,result){
        res.send('Hi'+result.rows[0].name);    
        });
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
app.get('/ui/login.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});
app.get('/ui/signup.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signup.html'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/main3.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main3.js'));
});
app.get('/ui/main2.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main2.js'));
});

function pass(name,age){
    return age;
}
app.get('/simple', function (req, res) {
    var name='Hari';
    res.send(pass({'name':name},'age'));
});
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
            {   var articleData=result.rows;
                var u='';
                if (req.session&&req.session.auth&&req.session.auth.userId){
                pool.query("Select name from users where id='"+req.session.auth.userId.toString()+"'",function(err,result){
                u='Hi '+result.rows[0].name.toString();
                res.send(temp(articleData,u));
                });
                }
                else
                {u='You are not logged in';
                res.send(temp(articleData,u));
                }
                console.log(u);
                
            }
    }
    });
});

function lout(){
    var htmltemp=`<html>
    <head>
    <link href="/ui/style.css" rel="stylesheet" />
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    </head>
    <body>
        <div class=header>
        <h5>Logout Successful</h5>
        <hr/>
        <div>
        <a href='/'>Back to Home</a>
        </div>
    </body>
</html>`;
return htmltemp;
}

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send(lout());
});
app.get('/comment',function(req,res){
    var comment=req.query.comment;
    var title=req.query.title;
    console.log('I m here in the comments page'+comment+' '+title);
    var user='';
    if (req.session&&req.session.auth&&req.session.auth.userId){
        pool.query("SELECT name from articles where id=$1",[req.session.auth.userId.toString()],function(err,result){
                user=result.rows[0].name;
        pool.query("UPDATE articles set comments=$1 where title=$2",[user+': '+comment+'\n', title],function(err,result){
        
        pool.query("SELECT comments from articles where title=$1",[title],function(err,result){
            res.send(result.rows[0].comments);
        });
    });
        });
    
    }
    else{
        res.send('Log in to comment');
    }
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
            res.send(f(articleData));
        }
    });
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});