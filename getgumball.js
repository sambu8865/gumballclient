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

exports.getgumball = function(req, res){

console.log("before opening db");
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
    function(arg1, c){
    	db.collection('gumballnode',function(err,collection){
    		console.log("error: "+err);
    		collection.find({serial_number:'1201'}).toArray(function(err,results){
    			var data=results[0];
    			var rec_id=data._id;
    			console.log(rec_id);
    			if(err){
    				console.log("err:"+err);
    				c(err,null);
    			}else{
    				console.log("no error");
    				c(null,data);
    			}
    		});
    	});
    }
],
function(err, results) {
    console.log( "err: " + err ) ;
    console.log( "results: " + results.count_gumballs ) ;
    res.send(results);
}
);

	
};
