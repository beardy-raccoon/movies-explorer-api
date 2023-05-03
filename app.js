const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./utils/limiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const crashTest = require('./utils/crashTest');
const errorHandler = require('./utils/errorHandler');
const corsConfig = require('./middlewares/cors');
const { DEV_DB_URL } = require('./utils/consts');

const { handleOauth } = require('./controllers/oauth');

require('dotenv').config();

const { PORT = 3001, NODE_ENV, DB_URL } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

mongoose.connect(NODE_ENV !== 'production' ? DEV_DB_URL : DB_URL);

app.use(corsConfig);

app.get('/crash-test', crashTest);

app.use('/oauth', handleOauth);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
