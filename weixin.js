'use strict'

//进行消息种类的区别操作

exports.reply = function* (next) {
	var message = this.weixin;

	if (message.MsgType === 'event') {
		if (message.Event === 'subscribe') {
			if (message.EventKey) {
				console.log('扫二维码进来' + message.EventKey + ' ' + message.ticket);
			}

			this.body = '你订阅了这个号';
		}
		else if (message.Event === 'unsubscribe') {
			console.log('无情取关');
			this.body = '';
		}
		else if (message.Event === 'LOCATION') {
			this.body = '您上报的位置：' + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
		}
		else if (message.Event === 'CLICK') {
			this.body = '您点击了菜单： ' + message.EventKey;
		}
		else if (message.Event === 'SCAN') {
			console.log('关注后扫二维码' + message.EventKey + ' ' + message.Ticket);
			this.body = '看到你扫了一下哦';
		}
		else if (message.Event === 'VIEW') {
			this.body = '您点击了菜单中的链接' + message.EventKey;
		}
	}
	else if (message.MsgType === 'text'){ 
		var content = message.Content;
		var reply = '额，你说的' + content + '太复杂了';

		if (content === '1') {
			reply = '天下第一';
		}
		else if (content === '2') {
			reply = '天下第二';
		}
		else if (content === '3') {
			reply = '天下第三';
		}
		else if (content === '4') {
			reply =  [{
				title: '技术改变世界',
				description: '只是个描述而已',
				picUrl: 'http://img0.imgtn.bdimg.com/it/u=3040442226,3914537080&fm=21&gp=0.jpg',
				url: 'https://github.com'
			}, {
				title: 'Nodejs开发微信',
				description: '爽到爆',
				picUrl: 'http://img3.imgtn.bdimg.com/it/u=93649700,1706056687&fm=21&gp=0.jpg',
				url: 'https://nodejs.org'
			}]
		}

		this.body = reply;
	}

	yield next;
} 