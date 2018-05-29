const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('kcors');

const database = require('./database');

/** CREATE AND CONF THE WEB SERVER **/

const app = module.exports = new Koa();

app.use(logger());

app.use(cors({ credentials: true }));
app.use(bodyParser());

/** METHODS TO RESPOND TO THE ROUTES **/

const listChats = async (ctx) => {
  let options = {};

  let result = await database.Chat.findAll(options);
  let chats = await Promise.all(result.map(chat => chat.toJSON()));

  let response = {
    results: chats,
  };

  ctx.body = response;
};

const createChat = async (ctx) => {
  const params = ctx.request.body;
  console.log(params);
  data = {
    acc_x: params.motion.accelerometer[0],
    acc_y: params.motion.accelerometer[1],
    acc_z: params.motion.accelerometer[2],
    heading: params.motion.heading,
    magnetometer_x: params.motion.magnetometer[0],
    magnetometer_y: params.motion.magnetometer[1],
    magnetometer_z: params.motion.magnetometer[2],
    raw_heading: params.motion.raw_heading,
    altitude: params.weather.altitude,
    pressure: params.weather.pressure,
    temperature: params.weather.temperature
  }

  const chat = await database.Chat.create(data);

  ctx.body = await chat.toJSON();
  ctx.status = 201;
};

/** CONFIGURING THE API ROUTES **/

const publicRouter = new Router({ prefix: '/api' });

publicRouter.get('/chats', listChats);
publicRouter.post('/chats', createChat);

app.use(publicRouter.routes());
app.use(publicRouter.allowedMethods());
