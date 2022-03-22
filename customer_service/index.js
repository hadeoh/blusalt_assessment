import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import * as error from './config/error';

/**
 * express application
 */
const app = express();

const PORT = process.env.PORT;

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors({ credentials: true, origin: true }));

// parsing the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mount all routes on root /api/v1 path
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

export default app;