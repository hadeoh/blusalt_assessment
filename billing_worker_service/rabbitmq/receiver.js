const amqp = require('amqplib/callback_api');


exports.clientReceiver = () => {
    amqp.connect(process.env.MESSAGE_QUEUE, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            const subscribedExchanges = ['Billing Worker', 'Billing'];

            for(let i = 0; i < subscribedExchanges.length; i++){
                channel.assertExchange(subscribedExchanges[i], 'fanout', {
                    durable: false
                });

                channel.assertQueue('', {
                    exclusive: true
                }, function(error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(` [*] Client waiting for messages in %s. To exit press CTRL+C`, q.queue);

                    channel.bindQueue(q.queue, subscribedExchanges[i], '');

                    channel.consume(q.queue, async function(msg) {
                        if(msg.content) {
                            console.log(` [x] Client received: ${ msg.content.toString() } `);
                        }
                    }, {
                        noAck: true
                    });
                });
            }
        });
    });
}