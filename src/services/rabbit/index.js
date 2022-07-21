require("dotenv").config();
const amqp = require("amqplib/callback_api");
const { getNewPost } = require("../post/service");

const connect = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
      if (Boolean(err)) {
        reject(err);
      }
      resolve(connection);
    });
  });
};

const createChannel = (connection) => {
  return new Promise((resolve, reject) => {
    connection.createChannel((err, channel) => {
      if (Boolean(err)) reject(err);
      resolve(channel);
    });
  });
};

exports.bootstrap = async () => {
  try {
    const connection = await connect();
    const channel = await createChannel(connection);

    channel.assertQueue("create-post", {
      durable: false,
    });

    channel.consume(
      "create-post",
      (msg) => {
        const post = JSON.parse(msg.content.toString());
        getNewPost(post);
      },
      {
        noAck: true,
      }
    );
  } catch (e) {
    console.log("err rabbit");
  }
};
