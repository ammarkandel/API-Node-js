import express from 'express';
const app = express();
import listEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';
dotenv.config()
import 'express-async-errors';

// db connect user
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import mealsRouter from './routes/mealsRoutes.js';


// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/meals', mealsRouter);

// Get the available routes
const routes = listEndpoints(app);
console.log(routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}

start();
