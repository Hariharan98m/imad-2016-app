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

var counter=0;

app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});


var names=[];
app.get('/submitbtn', function (req, res) {
  var name=req.query.name;
  names.push(name);
  //JSON
  res.send(JSON.stringify(names));
});


app.get('/:articleName',function(req,res){
    res.send(req.params.articleName);
    //'article-one'
    pool.query("SELECT * from articles where title='"+req.params.articleName+"'",function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else if(result.rows.length===0){
        res.status(404).send('Article not found');
    }
    else
        {
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
        }
    });
});


var Pool=require('pg').Pool;
var config={
   user:'hariharan98m',
   database:'hariharan98m',
   host:'db.imad.hasura-app.io',
   port:'5432',
   password:process.env.DB_PASSWORD
   
};
var pool=new Pool(config);
app.get('/test-db',function(req,res){
    //make a request
    pool.query('SELECT * from test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
    //respond with data
    
    
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

