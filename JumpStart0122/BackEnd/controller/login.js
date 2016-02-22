var login = require('../module/login'),
	multer = require('multer'),
	update = multer().single(),
	mongo_handler = require('../../SDK/mongo_handler');


function route(app, mongoClient,callback){
	app.post('/login',function(req,res){ 
		update(req,res,function(err){
			if(err){
				console.log(err);
				return;
			}else{
				var condition= {
						projection: {"_id":0,"psw":1,"acc":1,},
						sort: {},
						skip: 0,
						limit: 0
					};
				mongo_handler.handle(mongoClient,'find',null,'member',req.body,condition,function(err,status,result){
					console.log(result.acc+" 11111");
					console.log(status);
					if(!login.check(req.body,result)){
						res.send('error,please enter the correct account and passwords.');
					}else{
						console.log('psw checked');
						var query = {};
						condition = {
							projection:{"_id":0},
							sort:{},
							skip:0,
							limit:0
						};
						mongo_handler.handle(mongoClient,'find',null,'detail',query,condition,function(err,status,result){
							if(err){
								console.log('error while loading the docs from detail collection');
								console.log(err);
							}else if( result === null){
								res.send(error);
							}else{
								console.log(result);
								console.log("send the doc to jade");
								res.render('index',{results:results});
							}

						});
					}
				});
			}
		});
	});
}
 
exports.route = route;