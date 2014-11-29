
/**
 * Module dependencies.
 */

var express = require('express')
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

