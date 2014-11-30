/*var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var fs=require('fs');
var Client=require('node-rest-client').Client;

app.use("/images",express.static(__dirname+'/images'));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
var crypto=require('crypto');
var fs= require('fs');
var express= require('express');
var Client=require('node-rest-client').Client;

var app=express();
app.use(express.bodyParser());
app.use=("/images",express.static(__dirname+'/images'));

var secretKey="l4w0rggP8rFv0pdpT9T7X6mal6UK5cC2";

var get_hash=function(state,ts){
	text=state+"|"+ts+"|"+secretkey;
	hmac=crypto.createHmac("sha256",secretkey);
	hmac.setEncoding('base64');
	hmac.write(text);
	hmac.end();
	hash=hmac.read();
	return hash();
}

var error=function(req,res,msg,ts){
	body=fs.readFileSync('./gumball.html');
	res.setHeader('Content-Type','text/html');
	res.writeHead(200);
	state="error";
	hash=get_hash(state,ts);
	var html_body=""+body;
	var html_body=html_body.replace("{message}",msg);
	var html_body=html_body.replace("{ts}",ts);
	var html_body=html_body.replace("{hash}",hash);
	var html_body=html_body.replace(/id="state".*value=".*"/,"id=\"state\" value=\""+state+"\"");
	res.end(html_body);
}

var page= function(req,res,state){
	body=fs.readFileSync("./gumball.html");
	res.setHeader('Content-Type','text/html');
	res.writeHead(200);
	
	var client=new Client();
	var count="";
	client.get("https://1234gumballmachine.cfapps.io/gumballrestcontroller",
	function(data,response_raw){
		console.log(data);
		count=data.countGumballs;
		console.log("count= "+count);
		var msg="\n\nMighty Gumball, Inc.\nModel NUmber: "+data.modelNumber+"\n"+"serial: "+data.serialNumber+"\nCount: "+data.countGumballs;
		var msg=msg+"\nState: "+state;
		var html_body=""+body;
		var html_body=html_body.replace("{message}",msg);
		var html_body=html_body.replace(/id="state".*value=".*"/,"id=\"state\" value=\""+state+"\"");
		if(state==null)
			state="no-coin";
		var html_body=html_body.replace("{state}",state);
		res.end(html_body);
	});
}

var order=function(req,res){
	var client=new Client();
		var count=0;
		client.get("https://1234gumballmachine.cfapps.io/gumballrestcontroller",
				function(data,response_raw){
			console.log(data);
			count=data.countGumballs;
			console.log("count before= "+count);
			if(count>0)
				count--;
			console.log("count after= "+count);
			var args={
					data:{"countGumballs":+count},
					headers:{"Content-type":"application/json"}
			};
			client.put("https://1234gumballmachine.cfapps.io/gumballrestcontroller",args,
					function(data,response_raw){
				console.log(data);
				page(req,res,"no-coin");
			}
			);
		});
}

var handle_post=function(req,res){
	console.log("Post: "+"Action: "+req.body.event+"State: "+req.body.state+"\n");
	var state=""+req.body.state;
	var action=""+req.body.event;
	if(action=="Insert Quarter"){
		console.log("inside if");
		if(state=="no-coin")
			page(req,res,"has-coin");
		else
			page(req,res,state);
	}
	else if(action=="Turn Crank"){
		if(state=="has-coin"){
			console.log("inside turn the crank");
			order(req,res);
		}
		else
			page(req,res,state);
	}
}

var handle_get=function(req,res){
	console.log("Get:....");
	page(req,res,"no-coin");
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post("*", handle_post);
app.get("*", handle_get);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var crypto=require('crypto');

var fs=require('fs');
var Client=require('node-rest-client').Client;

app.use("/images",express.static(__dirname+'/images'));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


var secretkey="l4w0rggP8rFv0pdpT9T7X6mal6UK5cC2";

var get_hash=function(state,ts){
	text=state+"|"+ts+"|"+secretkey;
	hmac=crypto.createHmac("sha256",secretkey);
	hmac.setEncoding('base64');
	hmac.write(text);
	hmac.end();
	hash=hmac.read();
	return hash;
}

var error=function(req,res,msg,ts){
	body=fs.readFileSync('./gumball.html');
	res.setHeader('Content-Type','text/html');
	res.writeHead(200);
	state="error";
	hash=get_hash(state,ts);
	var html_body=""+body;
	var html_body=html_body.replace("{message}",msg);
	var html_body=html_body.replace("{ts}",ts);
	var html_body=html_body.replace("{hash}",hash);
	var html_body=html_body.replace(/id="state".*value=".*"/,"id=\"state\" value=\""+state+"\"");
	res.end(html_body);
}

var page= function(req,res,state,ts){
	body=fs.readFileSync("./gumball.html");
	res.setHeader('Content-Type','text/html');
	res.writeHead(200);
	
	var client=new Client();
	var count="";
	client.get("https://1234gumballmachine.cfapps.io/gumballrestcontroller",
	function(data,response_raw){
		console.log(data);
		count=data.countGumballs;
		console.log("count= "+count);
		hash=get_hash(state,ts);
		console.log("INside page: "+hash+ts);
		var msg="\n\nMighty Gumball, Inc.\nModel NUmber: "+data.modelNumber+"\n"+"serial: "+data.serialNumber+"\nCount: "+data.countGumballs;
		var msg=msg+"\nState: "+state;
		var html_body=""+body;
		var html_body=html_body.replace("{message}",msg);
		var html_body=html_body.replace("{ts}",ts);
		var html_body=html_body.replace("{hash}",hash);
		var html_body=html_body.replace(/id="state".*value=".*"/,"id=\"state\" value=\""+state+"\"");
		if(state==null)
			state="no-coin";
		var html_body=html_body.replace("{state}",state);
		res.end(html_body);
	});
}

var order=function(req,res,state,ts){
	var client=new Client();
		var count=0;
		client.get("https://1234gumballmachine.cfapps.io/gumballrestcontroller",
				function(data,response_raw){
			console.log(data);
			count=data.countGumballs;
			console.log("count before= "+count);
			if(count>0){
				count--;
			console.log("count after= "+count);
			var args={
					data:{"countGumballs":+count},
					headers:{"Content-type":"application/json"}
			};
			client.put("https://1234gumballmachine.cfapps.io/gumballrestcontroller",args,
					function(data,response_raw){
				console.log(data);
				page(req,res,"no-coin",ts);
			}
			);
			}else {
				error(req,res,"***OUT OF STOCK***",ts);
			}
		});
}

var handle_post=function(req,res){
	console.log("Post: "+"Action: "+req.body.event+"State: "+req.body.state+"\n");
	var hash1=""+req.body.hash;
	var state=""+req.body.state;
	var action=""+req.body.event;
	var ts=parseInt(req.body.ts);
	console.log("TS: "+ts);
	var now= new Date().getTime();
	var diff=((now-ts)/1000);
	hash2=get_hash(state,ts);
	console.log("Diff: "+diff);
	console.log("Hash1: "+hash1);
	console.log("Hash2: "+hash2);
	
	if(diff>120||hash1!=hash2){
		error(req,res,"***SESSION INVALID***",ts);
	}
	else if(action=="Insert Quarter"){
		console.log("inside if");
		if(state=="no-coin")
			page(req,res,"has-coin",ts);
		else
			page(req,res,state,ts);
	}
	else if(action=="Turn Crank"){
		if(state=="has-coin"){
			console.log("inside turn the crank");
			order(req,res,"no-coin",ts);
		}
		else
			page(req,res,state,ts);
	}
}

var handle_get=function(req,res){
	console.log("Get:....");
	ts=new Date().getTime();
	console.log(ts);
	page(req,res,"no-coin",ts);
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post("*", handle_post);
app.get("*", handle_get);

var ip=process.env.OPENSHIFT_NODEJS_IP||'127.0.0.1',
    port=process.env.OPENSHIFT_NODEJS_PORT||'8080';

http.createServer(function(req,res){
  console.log('Express server listening on port ' + 'port');
}).listen(port,ip);


