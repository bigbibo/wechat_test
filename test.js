'use strict'

var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/g');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');
var config = {
	wechat: {
		appID: 'wx7cee4fdeff2e4c78',
		appSecret: '26aa96f6539b4fa000d168aa4696a88a',
		token: 'imoocwechat',
		getAccessToken: function() {
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken: function(data) {
			data = JSON.stringify(data);
			return util.writeFileAsync(wechat_file, data);
		}
	}
}

//Koa框架的所有中间件都必须是生成器函数
var app = new Koa();
app.use(wechat(config.wechat));

app.listen(1234);
console.log('Listening: 1234!');
