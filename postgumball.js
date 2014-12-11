/**
 * New node file
 */
var async = require("async") ;

var Db = require('mongodb').Db,
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,	
ReplSetServers = require('mongodb').ReplSetServers,
ObjectID = require('mongodb').ObjectID,
Binary = require('mongodb').Binary,
GridStore = require('mongodb').GridStore,
Grid = require('mongodb').Grid,
Code = require('mongodb').Code,
BSON = require('mongodb').pure().BSON,
assert = require('assert');

exports.postgumball = function(req, res){

	console.log(req.body);
	res.on('data',function(data){
		console.log(data);
	});
	//console.log(req.query);
//	res.send("HEllo gumball");
	var db = new Db('cmpe281hitesh', new Server('ds043180.mongolab.com', 43180,
			{auto_reconnect: true,
			 poolSize:20}),{w:1});
	
async.waterfall([
    function(callback){ // is is a variable which can be invoked "closure"
    console.log("Opening db");
    db.open(callback);
    },
    function(result,callback){
    	console.log("authentication the db");
    	db.authenticate('temp', 'temp123', function(err, res){
    		if(!err){
    			console.log("Auth done");
    			callback( null, "b" ) ;
    	} else {
    			console.log("auth err");
    			console.log(err);
    			process.exit(-1);
    		}
    	});
             // "a" is pass as arg1   // this "c" is invoking the below function
    },
    function(arg1, callback){
    		console.log("here");
    		db.collection('gumballnode',function(err,collection){
    			console.log("till here "+req.body.version);
    			var document = req.body;
    			console.log("document is ");
        		//collection.insert(document, {w: 1}, function(err,result){
    			collection.update({serial_number:req.body.serial_number}, 
    					{$set:{count_gumballs:req.body.count_gumballs}},
    					function(err,result){
        			if(err){
        				console.log(err);
        				callback(err,null);
        			}
        			else{
        				console.log(result);
        				callback(null,result);
        			}
        		});
        	});
    		//res.send(data);	
    		//callback(null,"here1")
    }
],
function(err, result) {
    console.log( "err: " + err ) ;
    console.log( "results: " + result ) ;
    res.send(result);
}
);

	
};
