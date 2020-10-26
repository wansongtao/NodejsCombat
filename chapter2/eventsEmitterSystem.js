//用事件发射器实现的简单的发布/预订系统
const events = require('events');
const net = require('net');

//新建一个事件发射器对象
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};

/**
 * 添加wstJoin事件的监听器，保存用户的client对
 * 象，以便程序可以将数据发送给用户。
 */
channel.on('wstJoin', function(id, client) {
    this.clients[id] = client;  //保存用户的client对象

    this.subscriptions[id] = (senderId, message) => {
        //忽略发出这一广播数据的用户
        if (id != senderId) {
            this.clients[id].write(message);
        }
    };

    //创建一个专门针对当前用户的broadcast事件监听器
    this.on('broadcast', this.subscriptions[id]);
});

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;

    /**
     * 当有用户连到服务器上时发出一个wstJoin事件，指明
     * 用户ID和client对象
     */
    channel.emit('wstJoin', id, client);

    /**
     * 当有用户发送数据时，发出一个频道broadcast事件
     * 指明用户ID和消息
     */
    client.on('data', data => {
        data = data.toString();
        channel.emit('broadcast', id, data);
    });
});

server.listen(8888);