//创建事件发射器
const EventEmitters = require('events').EventEmitter;
const channel = new EventEmitters();

channel.on('join', () => {
    console.log('Welcome!');
});

//发送事件
channel.emit('join');
