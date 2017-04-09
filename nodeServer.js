//用nodejs写服务器

//引入http模块
var http = require('http');

//引入url模块
var url = require('url');

//引入querystring模块
var qs = require('querystring');


//用http创建服务器,并监听8888端口；
http.createServer(function (req,res) {
	//给服务器设置请求头，允许所有域名访问
	res.setHeader("Access-Control-Allow-Origin" , "*");
	
	
	var query = url.parse(req.url).query;
	var queryObj = qs.parse(query);
	var myUrl = queryObj.myUrl;
	
	
	var data = "";

	// 开始请求数据
	http.get(myUrl, function (request) {
        // 监听myUrl地址的请求过程
        request.setEncoding("utf8");

        // 数据传输过程中会不断触发data事件
        request.on("data" , function (response) {

			data += response;
        });

        // 当数据传输结束时触发end事件
        request.on("end" , function () {
            res.end(data);
        });

    }).on("error" , function () {
		console.log("请求myUrl地址出错！！！");
    });

	
}).listen(8888);
console.log('houtai');