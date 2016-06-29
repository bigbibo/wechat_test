'use strict'

//有关微信测试号验证和自动回复

var sha1 = require('sha1');
var Wechat = require('./wechat');
var getRawBody = require('raw-body');
var util = require('./util');

module.exports = function(opts) {

	//测试时，不需要票据操作；自动回复消息也不需要获取票据
	var wechat = new Wechat(opts);

	return function *(next) {
				var that = this;

				var signature = this.query.signature;
				var echostr = this.query.echostr;
				var timestamp = this.query.timestamp;
				var nonce = this.query.nonce;
				var token = opts.token;

				var str = [token, timestamp, nonce].sort().join('');
				var sha = sha1(str);

				if (this.method === 'GET') {
					if (sha = signature) {
						this.body = echostr + '';
					} else {
						this.body = 'failed!';
					}
				}
				else if (this.method === 'POST') {
					if (sha !== signature) {
						this.body = 'failed!';
						return false;
					}

					var data = yield getRawBody(this.req, {
						length: this.length,
						limit: '1mb',
						encoding: this.charset
					})
					console.log(data.toString());
					
					//暂停执行后面的代码，直到调用next()方法才会继续执行
					var content = yield util.parseXMLAsync(data);
					console.log(content);

					var message = util.formatMessage(content.xml);
					console.log(message);

					this.weixin = message;

					//这里应该yield，走向外层逻辑，把控制权交给业务层，来决定回复何种消息

					//通过call改变上下文，将next作为参数传递给handler
					yield handler.call(this, next);

					wechat.reply.call(this);



				}
			}
	}


