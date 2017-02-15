var http = require('http');
var express = require('express');
var app = express();  //实例化
var key = 'OxLYdFmu3YS1haMUcaBmGMBK0P7PbOqb'; //百度api的key


var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json()); //json编码

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//post请求,url/map
app.post('/map',function(req,res){
	var ipArr = req.body;
	var result = Array();
	for (var i = 0; i < ipArr.length; i++) {
		var tree = '';
		var options = {  
		    hostname: 'api.map.baidu.com',  
		    port: 80,  
		    path: '/location/ip?ak=' + key + "&coor=bd09ll&ip=" + ipArr[i],  
		    method: 'GET'  
		};  
        // 向远程服务器端发送请求
      	var getLocation = http.request(options, function(response){
		   	response.on('data', function(data) {
		      	tree += data;
		      	result.push(tree); 
		      	//避免缓存
		      	tree = ''; 	
		   	}); 
		});   
	    getLocation.end();   
	     
	}

	//延后发送请求响应
	setTimeout(function(){
		res.status(200).send(result);
	}, 500);
	

})

//监听8081接口打印请求域名和端口
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})