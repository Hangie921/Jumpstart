//upload the file , call the submit module , send the status to user

function route(app, mongoClient){	
	app.get('/submit',function(req,res){
		res.render('submit');
	});
}

exports.submit_route = route;