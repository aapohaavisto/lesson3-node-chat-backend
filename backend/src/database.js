var Sequelize = require('sequelize');

/** INIT DATABASE **/

const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: './db/chat.sqlite',
});

/** INIT CHAT TABLE WITH MESSAGE **/

const Chat = sequelize.define('chats', {
  acc_x: Sequelize.TEXT,
  acc_y: Sequelize.TEXT,
  acc_z: Sequelize.TEXT,
  heading: Sequelize.TEXT,
  magnetometer_x: Sequelize.TEXT,
  magnetometer_y: Sequelize.TEXT,
  magnetometer_z: Sequelize.TEXT,
  raw_heading: Sequelize.TEXT,
  altitude: Sequelize.TEXT,
  pressure: Sequelize.TEXT,
  temperature: Sequelize.TEXT
}, {
  timestamps: true,
  instanceMethods: {
    toJSON: async function () {
      return {
        // Id and timestamps are generated automatically in the table
        id: this.id,
        createdAt: this.createdAt,

        // Message was added on the POST request
        acc_x: this.acc_x,
      };
    },
  },
});

/** EXPORT CHAT OBJECT **/

exports.sync = (options) => {
  return sequelize.sync(options);
};

exports.Chat = Chat;
